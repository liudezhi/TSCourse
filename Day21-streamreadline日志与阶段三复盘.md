# Day 21：stream、readline、日志与阶段三复盘

## 今日目标

理解终端交互、流式输出和日志，完成第 3 周复盘。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | stream、readline、日志级别 |
| 35 分钟 | 代码练习 | 增加交互式确认 |
| 25 分钟 | 源码阅读训练 | 阅读一个终端交互函数 |
| 15 分钟 | 复盘笔记 | 回答第 3 周问题 |

## 必学知识点

1. stream 是 Node.js 处理输入输出的重要抽象。
2. readline 可实现简单终端问答。
3. 日志要区分普通输出、调试信息和错误信息。

## C 语言类比

C 里有 `stdin/stdout/stderr`；Node.js 也有对应的 process streams。CLI 项目中，普通结果常走 stdout，错误走 stderr。

## 代码练习

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

在执行子进程前询问用户是否确认。

## 源码阅读训练

找一个 CLI 项目的 prompt/confirm 逻辑。只看：它如何接收用户输入，又如何影响后续流程？

## 当天产出

- 一个确认函数。
- 第 3 周复盘笔记。

## 第 3 周复盘问题

- 我能不能说清楚一个 CLI 命令从输入到执行的全过程？
- 我能不能解释 `async/await` 和 `Promise` 的关系？
- 我能不能从源码中找出文件读写位置？
- 我能不能识别子进程调用位置？
- 我能不能解释为什么 shell 命令需要权限确认？

## 常见坑

- 把日志和业务输出混在一起。
- readline 用完后忘记关闭。
- 交互逻辑散落在核心业务层。

## 过关标准

你能为一个危险操作加确认，并能解释 stdout/stderr 的区别。

## 有余力再做

增加 `--yes` 参数，允许跳过确认。

