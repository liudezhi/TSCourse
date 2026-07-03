# Day 10：类型收窄与 type guard

## 今日目标

理解类型收窄如何让 TypeScript 在分支中知道更精确的类型，并为项目 1 增加 type guard。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | `typeof`、`in`、自定义 type guard |
| 35 分钟 | 代码练习 | 写 `isBlockedTask` |
| 25 分钟 | 源码阅读训练 | 阅读一个 `if` 分支中的类型收窄 |
| 15 分钟 | 复盘笔记 | 写下“收窄前/收窄后” |

## 必学知识点

1. TypeScript 会根据条件判断缩小类型范围。
2. type guard 是返回 `value is Type` 的函数。
3. 源码中很多安全访问都依赖收窄。

## C 语言类比

C 中你常通过手动判断指针、tag 或错误码再访问字段；TS 中 discriminant 字段和 type guard 承担类似“先判断再使用”的角色，但由类型系统帮你检查。

## 代码练习

修改 `src/task.ts`：

```ts
export type NormalTask = {
  id: string;
  title: string;
  status: "todo" | "doing" | "done";
};

export type BlockedTask = {
  id: string;
  title: string;
  status: "blocked";
  reason: string;
};

export type Task = NormalTask | BlockedTask;
```

`src/stats.ts`：

```ts
import type { BlockedTask, Task } from "./task";

export function isBlockedTask(task: Task): task is BlockedTask {
  return task.status === "blocked";
}

export function getBlockedReasons(tasks: Task[]): string[] {
  return tasks.filter(isBlockedTask).map((task) => task.reason);
}
```

## 源码阅读训练

找一个源码中的 `if (x.type === "...")` 或 `if ("field" in value)`。只追踪：判断之后能访问哪些字段？

## 当天产出

- 一个自定义 type guard。
- 一段收窄阅读笔记。

## 常见坑

- 没有共同字段，导致 union 难以收窄。
- 在未收窄前直接访问某个分支专有字段。
- 把运行时判断和静态类型判断混为一谈。

## 过关标准

你能写出 `task is BlockedTask`，并解释为什么过滤后可以访问 `reason`。

## 有余力再做

给 done 任务增加 `finishedAt` 字段，写 `isDoneTask`。

