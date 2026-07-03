# Day 27：session、context 与上下文压缩

## 今日目标

理解 Agent CLI 如何记录历史、组织上下文，并模拟简单 session 存储。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | session、history、context compaction |
| 35 分钟 | 代码练习 | 写 session 记录器 |
| 25 分钟 | 源码阅读训练 | 阅读一个 history/session 模块 |
| 15 分钟 | 复盘笔记 | 写上下文生命周期 |

## 必学知识点

1. session 记录用户输入、工具调用、观察结果。
2. context 是模型下一步决策看到的信息。
3. context compaction 是把长历史压缩成可继续使用的摘要。

## C 语言类比

session 像程序运行状态和日志的组合；context compaction 像把大量运行记录整理成摘要状态，避免每次都加载全部历史。

## 代码练习

`src/session.ts`：

```ts
import { appendFile } from "node:fs/promises";

export type SessionEvent = {
  type: "user" | "tool" | "observation";
  content: string;
  createdAt: string;
};

export async function recordEvent(event: SessionEvent): Promise<void> {
  await appendFile("session.jsonl", JSON.stringify(event) + "\n", "utf8");
}
```

在用户输入、工具执行、观察结果处分别记录事件。

## 源码阅读训练

搜索 `session`、`history`、`context`。只看一个模块：它保存什么？谁读取它？

## 当天产出

- 一个 `session.jsonl` 日志。
- 一张上下文生命周期图。

## 常见坑

- 把所有历史都当作必须永久塞进上下文。
- 不区分原始日志和压缩摘要。
- session 写入逻辑散落各处。

## 过关标准

你能解释 session、history、context 三者的区别。

## 有余力再做

写一个 `compactSession(events)`，把多条事件压缩成 5 行摘要。

