# Day 27：session、context 与上下文压缩

## 今日目标

今天理解 Agent CLI 如何记录历史，以及为什么需要上下文压缩。你会实现一个简单 JSONL session 日志。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | session、history、context compaction |
| 35 分钟 | 代码练习 | 写 session 记录器 |
| 25 分钟 | 源码阅读训练 | 阅读一个 history/session 模块 |
| 15 分钟 | 复盘笔记 | 写上下文生命周期 |

## 必学知识点

1. session 记录用户输入、工具调用、观察结果。
2. context 是下一轮决策可见的信息。
3. compaction 是把长历史压缩成摘要。

## 先讲清楚：session 和 context 不一样

```text
session：完整历史记录，适合存档。
context：当前要交给模型或决策层的信息。
compaction：把长 session 压缩成短 context。
```

真实 Agent 项目不会无限把所有历史塞进上下文，否则会超出模型窗口，也会混入无关信息。

## 代码练习：JSONL session

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

使用：

```ts
await recordEvent({
  type: "user",
  content: task.text,
  createdAt: new Date().toISOString(),
});
```

## 源码阅读训练：读 history 类型

阅读：

```ts
type HistoryItem =
  | { role: "user"; content: string }
  | { role: "tool"; name: string; output: string };
```

回答：

1. 这个 union 记录哪些事件？
2. 判别字段是什么？
3. 哪个分支记录工具输出？

## 当天产出

- 一个 `session.jsonl` 日志。
- 一张上下文生命周期图。
- 一篇 session/context 区分笔记。

## 参考笔记示例

```md
# Day 27 笔记

session 是完整历史。
context 是下一步决策可见内容。
compaction 是把长历史压缩为摘要。

生命周期：
user input -> tool call -> observation -> session log -> context summary
```

## 常见坑

- 把所有历史都塞进 context。
- 不区分原始日志和摘要。
- session 记录格式不统一。
- 不记录工具观察结果。

## 过关标准

你能解释 session、history、context、compaction 的区别，并实现一个 JSONL 记录器。

## 有余力再做

写一个 `compactSession(events)`，把多条事件压缩成 5 行摘要。

