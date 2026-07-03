# Day 12：discriminated union 与项目 1 验收

## 今日目标

用 discriminated union 完成项目 1，掌握真实项目中常见的状态建模方式。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | discriminant 字段、穷尽检查 |
| 35 分钟 | 代码练习 | 完成任务统计输出 |
| 25 分钟 | 源码阅读训练 | 读一个状态 union |
| 15 分钟 | 复盘笔记 | 写项目 1 验收说明 |

## 必学知识点

1. discriminated union 依赖共同的判别字段。
2. `switch` 很适合阅读状态流。
3. `never` 可用于检查是否处理了所有分支。

## C 语言类比

C 中常见 `struct { int tag; union {...}; }` 表达变体；TS discriminated union 是更安全、更易读的版本，`status` 或 `type` 就是 tag。

## 代码练习

新增 `src/report.ts`：

```ts
import type { Task } from "./task";

export function describeTask(task: Task): string {
  switch (task.status) {
    case "blocked":
      return `${task.title} is blocked: ${task.reason}`;
    case "todo":
    case "doing":
    case "done":
      return `${task.title}: ${task.status}`;
    default: {
      const exhaustive: never = task;
      return exhaustive;
    }
  }
}
```

在 `index.ts` 输出任务统计和每个任务描述。

## 源码阅读训练

找一个含 `type: "..."` 或 `kind: "..."` 的 union 类型。只追踪一个 `switch`，看每个分支处理什么。

## 当天产出

- 完成项目 1。
- 一份项目 1 验收说明。
- 一个状态流阅读笔记。

## 项目 1 验收清单

- 能定义任务数据结构。
- 能用 union 表示状态。
- 能用 type guard 或 `switch` 做类型收窄。
- 能用泛型函数处理列表。
- 能输出统计结果。

## 常见坑

- 判别字段命名不统一。
- 增加新状态后忘记更新所有处理逻辑。
- 不会从 `switch` 反推数据状态。

## 过关标准

你能用自己的话说明项目 1 的类型设计，并能画出 `Task -> stats/report -> console` 的数据流。

## 有余力再做

把统计结果保存为 JSON 文件，为后续 Node.js 文件操作预热。

