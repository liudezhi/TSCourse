# Day 21：stream、readline、日志与阶段三复盘

## 今日目标

今天补上 CLI 交互的基础：标准输入输出、readline 确认、日志和阶段三复盘。你会给危险操作加一个简单确认函数。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | stdin/stdout/stderr、readline、日志 |
| 35 分钟 | 代码练习 | 增加交互式确认 |
| 25 分钟 | 源码阅读训练 | 阅读一个终端交互函数 |
| 15 分钟 | 复盘笔记 | 回答第 3 周问题 |

## 必学知识点

1. `process.stdin/stdout/stderr` 是 CLI 的基础 I/O。
2. `readline` 可实现终端问答。
3. 普通输出和错误输出要区分。

## 先讲清楚：CLI 输出不是只有 console.log

CLI 常见三种输出：

```text
stdout：正常结果，适合给管道或用户消费。
stderr：错误、警告、诊断信息。
日志：帮助开发者理解运行过程。
```

如果一个 CLI 要被脚本调用，输出边界就很重要。

## C 语言类比

C 里有 `stdin`、`stdout`、`stderr`。Node.js 里也有相同概念，只是表现为 stream。

## 代码练习：实现确认函数

`src/prompt.ts`：

```ts
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

export async function confirm(question: string): Promise<boolean> {
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(`${question} (y/N) `);
  rl.close();
  return answer.trim().toLowerCase() === "y";
}
```

使用：

```ts
if (await confirm("Run external command?")) {
  await runCommand("node", ["--version"]);
} else {
  console.error("cancelled");
}
```

## 源码阅读训练：读交互逻辑

阅读：

```ts
const answer = await prompt("Continue?");
if (answer !== "yes") {
  throw new Error("User cancelled");
}
```

回答：

1. 用户输入在哪里进入程序？
2. 拒绝后流程如何结束？
3. 错误应该在哪里被展示？

参考答案：输入来自 `prompt`；拒绝后抛错；入口层 catch 后展示。

## 第 3 周复盘问题

- 我能不能说清楚一个 CLI 命令从输入到执行的全过程？
- 我能不能解释 `async/await` 和 `Promise` 的关系？
- 我能不能从源码中找出文件读写位置？
- 我能不能识别子进程调用位置？
- 我能不能解释为什么 shell 命令需要权限确认？

## 当天产出

- 一个 `confirm` 函数。
- 一篇终端交互阅读笔记。
- 第 3 周复盘。

## 参考笔记示例

```md
# Day 21 笔记

readline 负责从终端读取用户回答。
stdout 用于正常输出，stderr 用于错误和取消信息。
危险操作前应该先 confirm，再执行。
```

## 常见坑

- readline 用完不关闭。
- 把错误输出到 stdout。
- 交互逻辑散落在业务函数里。
- 用户拒绝后仍继续执行危险操作。

## 过关标准

你能为一个外部命令调用加确认，并解释 stdout/stderr 的区别。

## 有余力再做

增加 `--yes` 参数，允许跳过确认。记录为什么这也需要谨慎。

