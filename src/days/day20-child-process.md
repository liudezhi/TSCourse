# Day 20：child_process 与外部命令调用

## 今日目标

今天理解 Node.js CLI 如何调用外部命令，以及为什么 AI Agent CLI 的 shell 工具必须非常谨慎。

你不是要大量使用子进程，而是要能读懂源码中出现的 `spawn`、`execFile`、命令参数和安全风险。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | `spawn`、`execFile`、命令注入风险 |
| 35 分钟 | 代码练习 | 调用 `node --version` |
| 25 分钟 | 源码阅读训练 | 阅读一个子进程调用 |
| 15 分钟 | 复盘笔记 | 写安全注意事项 |

## 必学知识点

1. 子进程让 Node.js 调用外部程序。
2. 命令和参数应分开传入，避免拼接 shell 字符串。
3. 用户输入参与命令时必须格外谨慎。

## 先讲清楚：为什么危险

危险写法：

```ts
exec(`git ${userInput}`);
```

用户输入如果包含额外命令，就可能造成命令注入。

更可控的写法：

```ts
spawn("git", ["status"]);
```

命令和参数分开，边界更清楚。

## C 语言类比

C 的 `system("...")` 简单但危险。Node.js 的 shell 调用也类似。AI Agent 项目更危险，因为“要执行什么命令”可能由模型推断，所以必须加权限确认和沙箱边界。

## 代码练习：封装子进程

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

调用：

```ts
const code = await runCommand("node", ["--version"]);
console.log("exit code:", code);
```

## 源码阅读训练：读子进程调用

阅读：

```ts
const child = spawn("git", ["status", "--short"], {
  cwd: workspace,
  stdio: "pipe",
});
```

回答：

1. 命令是什么？
2. 参数有哪些？
3. 工作目录来自哪里？
4. 这里有没有潜在用户输入？

参考答案：命令是 `git`；参数是 `status --short`；工作目录是 `workspace`；要继续追踪 `workspace` 从哪里来。

## 当天产出

- 一个 `runCommand` 封装。
- 一篇子进程调用风险笔记。
- 一张调用链：`CLI -> runCommand -> spawn -> external command`。

## 参考笔记示例

```md
# Day 20 笔记

spawn(command, args) 比拼字符串更清楚。
需要追踪：
- command 是否固定
- args 是否来自用户
- cwd 是否受控
- exit code 如何处理
```

## 常见坑

- 把用户输入直接拼进命令字符串。
- 不处理 `error` 事件。
- 忽略退出码。
- 以为子进程只是普通函数调用。

## 过关标准

你能读懂一个 `spawn(command, args)` 调用，并指出命令、参数、工作目录和潜在风险。

## 有余力再做

在执行命令前打印确认信息：

```text
About to run: node --version
```

