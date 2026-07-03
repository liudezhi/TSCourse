# Day 19：配置文件与错误处理

## 今日目标

为 CLI 增加配置文件读取和可理解的错误处理，练习异常风格与 Result 思维。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | JSON 配置、try/catch、错误边界 |
| 35 分钟 | 代码练习 | 读取 `todo-scan.config.json` |
| 25 分钟 | 源码阅读训练 | 阅读一个错误处理分支 |
| 15 分钟 | 复盘笔记 | 写错误路径说明 |

## 必学知识点

1. 配置文件是 CLI 项目的常见输入。
2. 错误处理要在边界层转成用户可读信息。
3. 内部函数可抛异常，也可返回 Result 风格对象。

## C 语言类比

C 常用错误码；Node.js 中常见异常和 `try/catch`。CLI 中不要把底层异常堆栈直接丢给用户，应在入口层转换成清楚的错误消息。

## 代码练习

`src/config.ts`：

```ts
import { readFile } from "node:fs/promises";

export type Config = {
  include: string[];
};

export async function readConfig(file: string): Promise<Config> {
  const raw = await readFile(file, "utf8");
  return JSON.parse(raw) as Config;
}
```

在 `cli.ts` 中：

```ts
try {
  await main(process.argv.slice(2));
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
}
```

## 源码阅读训练

找一个 `try/catch` 或 `.catch`。只追踪：错误在哪里被捕获？用户最终看到什么？

## 当天产出

- 配置读取函数。
- 一条 CLI 错误处理链路说明。

## 常见坑

- 在所有函数里乱捕获错误，导致真正原因丢失。
- `JSON.parse` 失败时没有可读提示。
- 把配置类型断言当成运行时校验。

## 过关标准

你能说明“底层抛错，入口层展示”的边界原则。

## 有余力再做

给配置读取加默认值：没有配置文件时使用 `{ include: ["*.md"] }`。

