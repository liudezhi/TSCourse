# Day 12：discriminated union 与项目 1 验收

## 今日目标

今天完成项目 1 的核心类型设计：用 discriminated union 表达不同状态的任务，并用 `switch` 做安全处理。

你今天要理解：**判别字段让类型系统知道当前是哪一种对象。**

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | discriminant 字段、`switch`、穷尽检查 |
| 35 分钟 | 代码练习 | 完成任务描述和统计输出 |
| 25 分钟 | 源码阅读训练 | 阅读一个状态 union 和 `switch` |
| 15 分钟 | 复盘笔记 | 写项目 1 验收说明 |

## 必学知识点

1. discriminated union 依赖共同判别字段，如 `status` 或 `type`。
2. `switch` 很适合处理有限状态集合。
3. `never` 可以帮助检查分支是否处理完整。

## 先讲清楚：判别字段是什么

```ts
type Task =
  | { status: "todo"; title: string }
  | { status: "blocked"; title: string; reason: string }
  | { status: "done"; title: string; finishedAt: string };
```

这里 `status` 就是判别字段。它决定对象是哪一种形态。

读源码时，看到这种结构，应该立刻意识到：

```text
这是一个状态模型。
每个状态有不同字段。
后面一定会有 if/switch 根据 status 处理它。
```

## C 语言类比

这和 C 的 tagged union 很像：先看 tag，再访问对应 union 字段。TypeScript 的好处是，如果你访问了不属于当前分支的字段，编辑器会提醒你。

## 代码练习：完成 Task 描述函数

`src/task.ts`：

```ts
export type TodoTask = {
  id: string;
  title: string;
  status: "todo";
};

export type BlockedTask = {
  id: string;
  title: string;
  status: "blocked";
  reason: string;
};

export type DoneTask = {
  id: string;
  title: string;
  status: "done";
  finishedAt: string;
};

export type Task = TodoTask | BlockedTask | DoneTask;
```

`src/report.ts`：

```ts
import type { Task } from "./task.ts";

export function describeTask(task: Task): string {
  switch (task.status) {
    case "todo":
      return `${task.title} is waiting`;
    case "blocked":
      return `${task.title} is blocked: ${task.reason}`;
    case "done":
      return `${task.title} finished at ${task.finishedAt}`;
    default: {
      const exhaustive: never = task;
      return exhaustive;
    }
  }
}
```

`never` 分支的作用是：如果以后新增状态但忘记处理，TypeScript 有机会提醒你。

## 源码阅读训练：读状态处理

阅读：

```ts
type Message =
  | { role: "user"; content: string }
  | { role: "tool"; toolName: string; output: string };

function renderMessage(message: Message): string {
  switch (message.role) {
    case "user":
      return message.content;
    case "tool":
      return `${message.toolName}: ${message.output}`;
  }
}
```

回答：

1. 判别字段是什么？
2. `toolName` 只能在哪个分支访问？
3. 这个类型可能出现在 Agent 项目的哪个模块？

参考答案：判别字段是 `role`；`toolName` 只能在 `role === "tool"` 分支访问；它可能出现在 session/history/context 模块。

## 项目 1 验收清单

- 能定义任务数据结构。
- 能用 union 表示任务状态。
- 能用 type guard 或 `switch` 做类型收窄。
- 能用泛型函数处理任务列表。
- 能输出任务描述或统计结果。

## 当天产出

- 完成项目 1。
- 一份项目 1 类型设计说明。
- 一张状态处理流程图。

## 参考笔记示例

```md
# 项目 1 验收笔记

核心类型：Task = TodoTask | BlockedTask | DoneTask
判别字段：status
核心流程：Task[] -> describeTask -> string[]

我现在能读懂：switch 根据 status 收窄类型。
```

## 常见坑

- 每个分支没有共同判别字段。
- 新增状态后忘记更新 `switch`。
- 在错误分支访问专有字段。
- 不知道 `never` 是为了检查遗漏状态。

## 过关标准

你能画出 `Task -> switch(status) -> 描述字符串` 的数据流，并能解释为什么 blocked 分支才能访问 `reason`。

## 有余力再做

给 `Task` 增加 `"cancelled"` 状态，观察 `describeTask` 是否需要更新。

