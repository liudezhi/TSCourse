# Day 16：项目 2 启动，CLI 入口与 argv

## 今日目标

启动项目 2：Node.js CLI 工具。理解 `bin`、shebang、`process.argv` 和命令行输入。

## 项目 2：Node.js CLI 工具说明

- 项目目标：扫描目录，读取 Markdown，统计 TODO，生成报告。
- 目录结构：

```text
todo-scan-cli/
  package.json
  src/
    cli.ts
    args.ts
    scanner.ts
    report.ts
```

- 核心功能：支持目录参数、读取 `.md` 文件、统计 TODO 行、输出报告。
- 验收方式：运行 CLI 后能输出指定目录下的 TODO 数量。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | shebang、`bin`、`process.argv` |
| 35 分钟 | 代码练习 | 创建 CLI 骨架 |
| 25 分钟 | 源码阅读训练 | 阅读一个 CLI 入口文件 |
| 15 分钟 | 复盘笔记 | 写命令输入到入口的链路 |

## 必学知识点

1. shebang 告诉系统用什么解释器执行脚本。
2. `bin` 字段把命令名映射到入口文件。
3. `process.argv` 是 CLI 参数的原始来源。

## C 语言类比

C 的 `int main(int argc, char** argv)` 对应 Node.js 的 `process.argv`。区别是 Node.js 的前两个参数通常是 node 路径和脚本路径，用户参数从 `slice(2)` 开始。

## 代码练习

`src/cli.ts`：

```ts
#!/usr/bin/env node

function main(argv: string[]): void {
  const targetDir = argv[0] ?? ".";
  console.log(`scan target: ${targetDir}`);
}

main(process.argv.slice(2));
```

## 源码阅读训练

找一个 CLI 项目的入口文件。今天只回答：它如何拿到用户输入参数？

## 当天产出

- 项目 2 骨架。
- 一个能打印目标目录的 CLI。
- 一张链路图：`shell command -> bin -> cli.ts -> main(argv)`。

## 常见坑

- 忘记 `process.argv` 前两个元素不是用户参数。
- 把参数解析和业务逻辑混在入口文件里。
- Windows 下 shebang 行不一定直接生效，开发期可用 `tsx` 运行。

## 过关标准

你能解释一个 CLI 命令从输入到 `main(argv)` 的全过程。

## 有余力再做

支持 `--help` 参数，打印简单帮助信息。

