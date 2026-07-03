# Day 11：泛型与列表工具

## 今日目标

理解泛型是“类型层面的参数”，用它写一个可复用列表工具函数。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | 泛型函数、类型参数、约束 |
| 35 分钟 | 代码练习 | 写 `groupBy` 或 `pickFirst` |
| 25 分钟 | 源码阅读训练 | 阅读一个泛型函数签名 |
| 15 分钟 | 复盘笔记 | 用 C 语言类比泛型 |

## 必学知识点

1. 泛型让函数保留输入和输出之间的类型关系。
2. `T` 是类型参数，不是运行时变量。
3. 泛型约束如 `T extends { id: string }` 能限制可用字段。

## C 语言类比

C 没有原生泛型，常用 `void*`、宏或手写多个版本模拟；TS 泛型更安全，因为编译期知道 `T` 的关系，不需要你手动转换。

## 代码练习

新增 `src/list-utils.ts`：

```ts
export function firstOrUndefined<T>(items: T[]): T | undefined {
  return items[0];
}

export function byId<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id);
}
```

在 `index.ts` 中用 `Task[]` 调用它们。

## 源码阅读训练

搜索 `<T` 或 `<T,`，找一个泛型函数。今天只回答：`T` 从哪里来？返回值还保留了什么类型关系？

## 当天产出

- 两个泛型列表工具。
- 一篇泛型函数签名拆解笔记。

## 常见坑

- 以为 `T` 是运行时值。
- 泛型用得太泛，反而读不懂。
- 没看输入输出类型关系，只看函数体。

## 过关标准

你能解释 `byId<T extends { id: string }>` 为什么能访问 `item.id`。

## 有余力再做

实现一个 `groupByStatus(tasks)`，返回每种状态的任务列表。

