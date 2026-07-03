# Day 11：泛型与列表工具

## 今日目标

今天理解泛型。你不需要一上来掌握复杂泛型体操，只要先抓住一句话：**泛型是在类型层面保留输入和输出之间的关系。**

源码里看到 `<T>` 不要慌。先问：`T` 从哪里来？返回值和 `T` 有什么关系？

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | 泛型函数、类型参数、约束 |
| 35 分钟 | 代码练习 | 写 `firstOrUndefined` 和 `byId` |
| 25 分钟 | 源码阅读训练 | 阅读一个泛型函数签名 |
| 15 分钟 | 复盘笔记 | 翻译泛型输入输出关系 |

## 必学知识点

1. `T` 是类型参数，不是运行时变量。
2. 泛型能让函数适配多种类型，同时保留类型信息。
3. `T extends ...` 表示类型参数必须满足某种形状。

## 先讲清楚：不用泛型会丢掉什么

不推荐：

```ts
function first(items: unknown[]): unknown {
  return items[0];
}
```

这样返回值是 `unknown`，你不知道它和输入数组元素是什么关系。

推荐：

```ts
function first<T>(items: T[]): T | undefined {
  return items[0];
}
```

翻译：

```text
给我一组 T，我返回一个 T 或 undefined。
```

如果传入 `Task[]`，返回 `Task | undefined`。如果传入 `string[]`，返回 `string | undefined`。

## C 语言类比

C 里常用 `void*` 或宏模拟通用函数，但类型安全弱。TypeScript 泛型更像“安全的类型参数”，编译器知道输入输出的对应关系。

## 代码练习：写列表工具

`src/list-utils.ts`：

```ts
export function firstOrUndefined<T>(items: T[]): T | undefined {
  return items[0];
}

export function byId<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id);
}
```

在 `index.ts` 中使用：

```ts
import { byId, firstOrUndefined } from "./list-utils.ts";
import type { Task } from "./task.ts";

const tasks: Task[] = [
  { id: "T1", title: "learn generic", status: "todo" },
  { id: "T2", title: "read source", status: "done" },
];

const firstTask = firstOrUndefined(tasks);
const selectedTask = byId(tasks, "T2");

console.log(firstTask);
console.log(selectedTask);
```

关键观察：

```text
firstTask 的类型是 Task | undefined。
selectedTask 的类型也是 Task | undefined。
```

## 源码阅读训练：翻译泛型签名

阅读：

```ts
function mapValues<T, R>(items: T[], mapper: (item: T) => R): R[] {
  return items.map(mapper);
}
```

回答：

1. `T` 表示什么？
2. `R` 表示什么？
3. 返回值为什么是 `R[]`？

参考答案：

- `T` 是输入数组元素类型。
- `R` 是 mapper 转换后的结果类型。
- 每个 `T` 被 mapper 变成一个 `R`，所以结果是一组 `R`。

## 当天产出

- 一个 `list-utils.ts`。
- 两个泛型函数。
- 一篇泛型签名翻译笔记。

## 参考笔记示例

```md
# Day 11 笔记

firstOrUndefined<T>(items: T[]): T | undefined
翻译：输入一组 T，返回一个 T 或 undefined。

byId<T extends { id: string }>
翻译：T 必须至少有 id 字段，所以函数体可以访问 item.id。
```

## 常见坑

- 以为 `T` 是运行时变量。
- 泛型名太多时不先找输入来源。
- 忽略 `extends` 约束。
- 不处理 `undefined`。

## 过关标准

你能解释 `byId<T extends { id: string }>` 为什么可以访问 `item.id`，并能把一个泛型函数签名翻译成自然语言。

## 有余力再做

实现：

```ts
function groupBy<T, K extends string>(items: T[], getKey: (item: T) => K): Record<K, T[]>
```

只要求能运行，不要求写得最优雅。

