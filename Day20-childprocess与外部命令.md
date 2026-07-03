# Day 20：child_process 与外部命令调用

## 今日目标

理解 CLI 项目如何调用外部命令，以及为什么这会带来安全风险。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | `spawn`、`execFile`、命令注入风险 |
| 35 分钟 | 代码练习 | 调用 `git --version` 或 `node --version` |
| 25 分钟 | 源码阅读训练 | 阅读一个子进程调用 |
| 15 分钟 | 复盘笔记 | 写安全注意事项 |

## 必学知识点

1. 子进程让 Node.js 调用外部程序。
2. 参数应作为数组传入，避免拼接 shell 字符串。
3. AI Agent CLI 的 shell 工具必须有权限边界。

## C 语言类比

C 中 `system()` 简单但危险，参数拼接可能造成命令注入。Node.js 也一样，优先用 `spawn(command, args)` 或 `execFile`，清楚区分命令和参数。

## 代码练习

`src/run-command.ts`：

```ts
import { spawn } from "node:child_process";

export function runCommand(command: string, args: string[]): Promise<number | null> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("error", reject);
    child.on("close", resolve);
  });
}
```

在 CLI 中调用 `runCommand("node", ["--version"])`。

## 源码阅读训练

找一个使用 `child_process` 的源码。只追踪：命令是什么？参数从哪里来？有没有用户输入参与？

## 当天产出

- 一个子进程封装函数。
- 一篇命令调用风险笔记。

## 常见坑

- 把用户输入直接拼进命令字符串。
- 不处理子进程错误。
- 忽略退出码。

## 过关标准

你能解释为什么 `spawn("git", ["status"])` 比拼接 `"git status"` 更容易控制边界。

## 有余力再做

记录命令开始时间和结束时间，输出耗时。

