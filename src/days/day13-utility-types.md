# Day 13：utility types 与真实类型阅读

## 今日目标

今天认识 TypeScript 真实项目里非常常见的工具类型：`Partial`、`Pick`、`Omit`、`Record`。目标不是背定义，而是能把它们翻译成人话。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | 常见 utility types |
| 35 分钟 | 代码练习 | 为项目 1 增加输入类型和状态统计 |
| 25 分钟 | 源码阅读训练 | 阅读一个工具类型组合 |
| 15 分钟 | 复盘笔记 | 写工具类型翻译表 |

## 必学知识点

1. `Partial<T>` 把字段变成可选。
2. `Pick<T, K>` / `Omit<T, K>` 选择或排除字段。
3. `Record<K, V>` 表示键值映射对象。

## 先讲清楚：工具类型是在加工类型

比如：

```ts
type TaskInput = Omit<Task, "id">;
```

翻译：

```text
创建任务时还没有 id，所以输入类型是去掉 id 的 Task。
```

再比如：

```ts
type TaskPatch = Partial<TaskInput>;
```

翻译：

```text
更新任务时可以只传一部分字段。
```

工具类型不会改变运行时对象，它只改变 TypeScript 如何检查类型。

## C 语言类比

C 结构体通常是固定的；如果你想要“去掉某个字段的结构体”，得再定义一个新结构体。TypeScript 可以在类型层基于已有类型生成新类型。

## 代码练习：增加输入类型

假设：

```ts
export type Task = {
  id: string;
  title: string;
  status: "todo" | "doing" | "done";
};
```

新增：

```ts
export type TaskInput = Omit<Task, "id">;
export type TaskPatch = Partial<TaskInput>;
export type TaskStatus = Task["status"];
export type StatusCount = Record<TaskStatus, number>;
```

写函数：

```ts
export function createTask(input: TaskInput): Task {
  return {
    id: `T-${Date.now()}`,
    ...input,
  };
}

export function emptyStatusCount(): StatusCount {
  return {
    todo: 0,
    doing: 0,
    done: 0,
  };
}
```

## 源码阅读训练：翻译工具类型

阅读：

```ts
type ToolConfig = {
  name: string;
  description: string;
  enabled: boolean;
  timeoutMs: number;
};

type ToolConfigInput = Omit<ToolConfig, "enabled">;
type ToolConfigPatch = Partial<ToolConfig>;
type ToolMap = Record<string, ToolConfig>;
```

回答：

1. `ToolConfigInput` 少了哪个字段？
2. `ToolConfigPatch` 表示什么场景？
3. `ToolMap` 是什么形状？

参考答案：

- 少了 `enabled`。
- 表示局部更新配置。
- 是字符串到 `ToolConfig` 的映射对象。

## 当天产出

- 一个工具类型练习文件。
- 一张 utility types 翻译表。
- 一篇真实类型阅读笔记。

## 参考笔记示例

```md
# Day 13 工具类型翻译表

Omit<Task, "id">：没有 id 的 Task。
Partial<Task>：字段都可选的 Task。
Pick<Task, "id" | "title">：只保留 id 和 title。
Record<TaskStatus, number>：每个状态对应一个数字。
```

## 常见坑

- 把工具类型当成运行时转换函数。
- 嵌套一多就不翻译，直接跳过。
- 不知道 `Record<string, X>` 是普通对象映射。
- 忘了工具类型只是类型层面的加工。

## 过关标准

你能把 `Omit`、`Partial`、`Record` 各翻译成一句自然语言，并能解释它们适合什么业务场景。

## 有余力再做

查 `Readonly<T>`，把任务设置成只读，观察哪些修改会报错。

