# Day 13：utility types 与真实类型阅读

## 今日目标

认识 `Partial`、`Pick`、`Omit`、`Record`、`ReturnType` 等常见工具类型，读懂真实项目中的类型变换。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | 常见 utility types |
| 35 分钟 | 代码练习 | 为项目 1 增加输入类型 |
| 25 分钟 | 源码阅读训练 | 找一个 `Pick`/`Omit`/`Record` |
| 15 分钟 | 复盘笔记 | 写工具类型翻译表 |

## 必学知识点

1. `Partial<T>` 表示字段可选化。
2. `Pick<T, K>`/`Omit<T, K>` 表示选择或排除字段。
3. `Record<K, V>` 表示键值映射对象。

## C 语言类比

C 的结构体字段通常固定；TS 可以在类型层面对对象形状做变换。utility types 像“类型层面的结构体加工工具”，不影响运行时对象本身。

## 代码练习

新增类型：

```ts
import type { Task, TaskStatus } from "./task";

export type TaskInput = Omit<Task, "id">;
export type TaskPatch = Partial<TaskInput>;
export type StatusCount = Record<TaskStatus, number>;
```

写一个 `createTask(input: TaskInput): Task`，给任务自动生成 `id`。

## 源码阅读训练

搜索 `Partial<`、`Pick<`、`Omit<`、`Record<`。只选一个，翻译成自然语言：它把原类型改成了什么？

## 当天产出

- 一个工具类型练习文件。
- 一张 utility types 翻译表。

## 常见坑

- 嵌套工具类型一多就直接放弃。
- 不知道 `Record<string, X>` 本质是对象映射。
- 把工具类型当作运行时转换函数。

## 过关标准

你能把 `Omit<Task, "id">` 翻译成“没有 id 的 Task 输入类型”。

## 有余力再做

查 `Readonly<T>`，试着让任务数组不可被修改。

