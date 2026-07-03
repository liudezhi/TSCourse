# Day 08：项目 1 启动，interface 与 type

## 今日目标

启动项目 1：TypeScript 类型练习项目。用 `interface` 和 `type` 建立任务数据结构。

## 项目 1：TypeScript 类型练习项目说明

- 项目目标：练习 `interface`、`type`、`union`、泛型、类型收窄，输出任务统计结果。
- 目录结构：

```text
task-type-lab/
  package.json
  src/
    index.ts
    task.ts
    stats.ts
```

- 核心功能：定义任务、定义任务状态、统计任务数量。
- 验收方式：运行 `npm run dev` 输出总数、完成数、阻塞数。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | `interface` 与 `type` |
| 35 分钟 | 代码练习 | 创建项目 1 骨架 |
| 25 分钟 | 源码阅读训练 | 找真实源码中的一个 `interface` |
| 15 分钟 | 复盘笔记 | 记录数据结构含义 |

## 必学知识点

1. `interface` 常用于对象形状。
2. `type` 可以表达对象、联合、函数等更广泛类型。
3. 类型命名是源码阅读的导航牌。

## C 语言类比

C 的 `struct` 是运行时内存布局；TS 的 `interface/type` 主要是静态约束，不保证运行时真实存在。源码阅读时，类型定义告诉你作者如何理解数据。

## 代码练习

`src/task.ts`：

```ts
export interface Task {
  id: string;
  title: string;
  owner: string;
  createdAt: string;
}

export type TaskSummary = {
  total: number;
  owners: string[];
};
```

`src/index.ts`：

```ts
import type { Task } from "./task";

const tasks: Task[] = [
  { id: "T1", title: "model task", owner: "me", createdAt: "2026-07-03" },
];

console.log(tasks);
```

## 源码阅读训练

在一个 TS 项目中搜索 `interface`，只看一个类型定义。回答：这个类型表示什么数据？哪些字段是核心字段？

## 当天产出

- 项目 1 骨架。
- 一个 `Task` 类型定义。
- 一篇接口阅读笔记。

## 常见坑

- 纠结 `interface` 和 `type` 谁更高级。
- 忽略类型名背后的业务含义。
- 把类型当成运行时校验。

## 过关标准

你能解释 `Task` 每个字段的作用，并能在真实源码中读懂一个简单 `interface`。

## 有余力再做

给 `Task` 增加可选字段 `description?: string`，观察使用时的类型提示。

