# Day 19：配置文件与错误处理

## 今日目标

今天给 CLI 增加配置文件读取和可理解的错误处理。真实 CLI 不能只在“路径正确、配置正确、文件存在”的理想情况下工作。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | JSON 配置、try/catch、错误边界 |
| 35 分钟 | 代码练习 | 读取 `todo-scan.config.json` |
| 25 分钟 | 源码阅读训练 | 阅读一个错误处理分支 |
| 15 分钟 | 复盘笔记 | 写错误路径说明 |

## 必学知识点

1. 配置文件是 CLI 的常见输入来源。
2. 底层函数可以抛错，入口层负责转成用户可读信息。
3. `JSON.parse` 的类型断言不是运行时校验。

## 先讲清楚：错误边界在哪里

推荐结构：

```text
cli.ts
  try/catch：把错误展示给用户

config.ts / scanner.ts / report.ts
  专心做事情，出错就抛给上层
```

入口层是边界层。它负责把内部错误转换成 CLI 用户能理解的消息。

## C 语言类比

C 常用错误码返回；Node.js 常见异常和 Promise rejection。两者目标一样：错误不能悄悄吞掉，必须在边界处被处理。

## 代码练习：读取配置

`src/config.ts`：

```ts
import { readFile } from "node:fs/promises";

export type Config = {
  includeExtensions: string[];
};

export async function readConfig(file: string): Promise<Config> {
  const raw = await readFile(file, "utf8");
  return JSON.parse(raw) as Config;
}
```

配置文件：

```json
{
  "includeExtensions": [".md"]
}
```

入口错误处理：

```ts
main(process.argv.slice(2)).catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`todo-scan failed: ${message}`);
  process.exitCode = 1;
});
```

## 源码阅读训练：读错误处理

阅读：

```ts
run(argv).catch((error) => {
  logger.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
```

回答：

1. 哪个函数可能失败？
2. 错误最终如何展示？
3. `process.exitCode = 1` 表示什么？

参考答案：`run(argv)` 可能失败；错误被记录；退出码 1 表示命令失败。

## 当天产出

- 一个配置读取函数。
- 一个入口层错误处理。
- 一条错误路径说明。

## 参考笔记示例

```md
# Day 19 笔记

readConfig(file): Promise<Config>
可能失败原因：文件不存在、JSON 格式错误。

错误边界：
config.ts 抛错 -> cli.ts catch -> console.error -> exitCode = 1
```

## 常见坑

- 在所有函数里乱 catch，导致错误来源丢失。
- `JSON.parse(raw) as Config` 当成真实校验。
- 把底层堆栈直接打印给普通用户。
- 忘记设置失败退出码。

## 过关标准

你能解释错误从 `readConfig` 到 `cli.ts catch` 的路径，并能说清楚哪里是用户边界。

## 有余力再做

没有配置文件时使用默认配置：

```ts
{ includeExtensions: [".md"] }
```

