# Day 16：项目 2 启动，CLI 入口与 argv

## 今日目标

今天进入第三阶段：Node.js CLI 与异步工程。启动项目 2：TODO 扫描 CLI。

今天只做 CLI 的入口和参数，不碰文件扫描。目标是把用户在终端输入的内容传进 `main(argv)`。

## 项目 2：TODO Scan CLI

项目目标：扫描目录，读取 Markdown，统计 TODO，生成报告。

目录：

```text
todo-scan-cli/
  package.json
  src/
    cli.ts
    args.ts
    scanner.ts
    report.ts
```

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | shebang、`bin`、`process.argv` |
| 35 分钟 | 代码练习 | 创建 CLI 骨架 |
| 25 分钟 | 源码阅读训练 | 阅读一个 CLI 入口文件 |
| 15 分钟 | 复盘笔记 | 写命令输入到入口的链路 |

## 必学知识点

1. shebang 告诉系统用什么解释器运行脚本。
2. `bin` 把命令名映射到入口文件。
3. `process.argv.slice(2)` 是用户参数。

## C 语言类比

C 的：

```c
int main(int argc, char** argv)
```

在 Node.js 里对应：

```ts
main(process.argv.slice(2));
```

只是 Node 的 `process.argv` 前两项通常不是用户参数。

## 代码练习：CLI 入口骨架

`src/cli.ts`：

```ts
#!/usr/bin/env node

export function main(argv: string[]): void {
  const targetDir = argv[0] ?? ".";
  console.log(`scan target: ${targetDir}`);
}

main(process.argv.slice(2));
```

`package.json`：

```json
{
  "type": "module",
  "bin": {
    "todo-scan": "./src/cli.ts"
  },
  "scripts": {
    "dev": "tsx src/cli.ts"
  }
}
```

运行：

```bash
npm run dev -- docs
```

预期输出：

```text
scan target: docs
```

## 源码阅读训练：读入口

阅读：

```ts
#!/usr/bin/env node

import { run } from "./run.ts";

run(process.argv.slice(2)).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

回答：

1. 用户参数在哪里进入程序？
2. 核心逻辑在哪个函数？
3. 错误在哪里处理？

参考答案：参数从 `process.argv.slice(2)` 进入；核心逻辑是 `run`；错误在 `.catch` 中处理。

## 当天产出

- 项目 2 骨架。
- 一个能打印目标目录的 CLI。
- 一张链路图：

```text
shell -> package.json scripts/bin -> cli.ts -> main(argv)
```

## 参考笔记示例

```md
# Day 16 笔记

用户输入：npm run dev -- docs
argv: ["docs"]
targetDir: "docs"

CLI 入口应该薄一点，后续扫描逻辑不要全塞进 cli.ts。
```

## 常见坑

- 忘记 `process.argv` 前两项不是用户参数。
- 把参数解析、文件扫描、报告输出都塞进入口。
- 忘记 `--` 后面的参数才会传给 npm script。

## 过关标准

你能解释一个 CLI 命令从终端输入到 `main(argv)` 的全过程。

## 有余力再做

支持：

```bash
npm run dev -- --help
```

打印用法说明。

