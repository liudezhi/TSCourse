# Day 09：union 与 literal type 状态建模

## 今日目标

用联合类型表达任务状态，理解为什么真实项目常用 string literal union 替代 enum。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | union、literal type、enum 替代 |
| 35 分钟 | 代码练习 | 为项目 1 增加任务状态 |
| 25 分钟 | 源码阅读训练 | 找一个 union 类型 |
| 15 分钟 | 复盘笔记 | 比较 C enum 和 TS union |

## 必学知识点

1. union 表示一个值可能属于多个类型之一。
2. literal type 可以把字符串变成有限集合。
3. 状态建模优先让非法状态无法通过类型检查。

## C 语言类比

C 的 `enum` 通常映射到底层整数；TS 的 `"todo" | "doing" | "done"` 更像一组明确字符串值，读源码时更直观，也更适合 JSON/CLI 配置。

## 代码练习

修改 `src/task.ts`：

```ts
export type TaskStatus = "todo" | "doing" | "blocked" | "done";

export interface Task {
  id: string;
  title: string;
  owner: string;
  status: TaskStatus;
  createdAt: string;
}
```

新增 `src/stats.ts`：

```ts
import type { Task, TaskStatus } from "./task";

export function countByStatus(tasks: Task[], status: TaskStatus): number {
  return tasks.filter((task) => task.status === status).length;
}
```

## 源码阅读训练

搜索 `|` 或类似 `"a" | "b"` 的类型。今天只回答：这个 union 在限制什么状态或选项？

## 当天产出

- `TaskStatus` 联合类型。
- `countByStatus` 函数。
- C enum 与 literal union 对比笔记。

## 常见坑

- 写成普通 `string`，导致任何字符串都能传入。
- union 太宽，失去约束意义。
- 看到 `|` 只想到位运算。

## 过关标准

你能用 union 限制任务状态，并能解释为什么 `"todo" | "done"` 比 `string` 更安全。

## 有余力再做

尝试传入 `"finished"`，观察 TypeScript 报错。

