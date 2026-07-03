# Day 08：项目 1 启动，interface 与 type

## 今日目标

今天进入第二阶段：TypeScript 类型系统与工程化。我们启动项目 1：任务类型练习项目。

今天不追求复杂功能，只做一件关键事：**用 `interface` 和 `type` 描述数据形状，并学会从类型定义理解业务对象。**

## 项目 1：Task Type Lab

项目目标：练习 `interface`、`type`、union、泛型、类型收窄，最后输出任务统计结果。

推荐目录：

```text
task-type-lab/
  package.json
  src/
    index.ts
    task.ts
    stats.ts
```

验收目标：能运行 `npm run dev`，输出任务列表或任务统计。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | `interface` 与 `type` 的用途 |
| 35 分钟 | 代码练习 | 创建项目 1 骨架和任务类型 |
| 25 分钟 | 源码阅读训练 | 阅读一个真实或样例 `interface` |
| 15 分钟 | 复盘笔记 | 写出类型定义的业务含义 |

## 必学知识点

1. `interface` 常用于描述对象形状。
2. `type` 可以描述对象、联合类型、函数类型等。
3. 类型定义是源码阅读里的“领域词典”。

## 先讲清楚：类型不是装饰品

看到：

```ts
interface Task {
  id: string;
  title: string;
  owner: string;
}
```

不要只翻译成“一个接口”。你要把它读成：

```text
这个项目里有一种核心数据叫 Task。
每个任务至少有 id、title、owner。
后续函数如果接收 Task，就说明它处理任务对象。
```

类型定义能告诉你项目作者怎么切分世界。

## C 语言类比

C 的 `struct` 会影响内存布局；TypeScript 的 `interface/type` 不会直接存在于运行时。它们更像源码阅读时的“对象契约”。

| C | TypeScript |
| -- | -- |
| `struct Task` | `interface Task` 或 `type Task = {...}` |
| 字段存在于内存布局中 | 字段用于静态检查，运行时对象靠实际数据决定 |
| 头文件暴露结构体 | 模块中 `export type/interface` 暴露类型 |

## 代码练习：创建项目 1 骨架

### 第 1 步：创建文件

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

### 第 2 步：写入口

`src/index.ts`：

```ts
import type { Task } from "./task.ts";

const tasks: Task[] = [
  {
    id: "T1",
    title: "model task data",
    owner: "me",
    createdAt: "2026-07-04",
  },
];

console.log(tasks);
```

### 第 3 步：运行

```bash
npm run dev
```

预期输出是一个任务数组。

## 源码阅读训练：读一个 interface

阅读这个样例：

```ts
export interface ToolDefinition {
  name: string;
  description: string;
  requiresPermission: boolean;
}
```

回答：

1. 这个类型表示什么？
2. 哪个字段可能用于展示给用户或模型？
3. 哪个字段和安全边界有关？

参考答案：

1. 表示一个工具定义。
2. `description`。
3. `requiresPermission`。

## 当天产出

- `task-type-lab` 项目骨架。
- 一个 `Task` 类型定义。
- 一篇类型阅读笔记。

## 参考笔记示例

```md
# Day 08 笔记

Task 是项目 1 的核心数据。
id 用于唯一标识，title 是展示标题，owner 表示负责人，createdAt 表示创建时间。

interface 更适合对象形状；type 更灵活，后面可以表达 union。
```

## 常见坑

- 只纠结 `interface` 和 `type` 哪个更好。
- 忽略类型名背后的业务含义。
- 以为类型会自动校验外部 JSON 数据。
- 不给类型加 `export`，导致其他模块无法使用。

## 过关标准

你能做到：

1. 定义一个 `Task`。
2. 创建 `Task[]` 数据。
3. 用自然语言解释每个字段为什么存在。

## 有余力再做

给 `Task` 增加可选字段：

```ts
description?: string;
```

观察使用时 TypeScript 如何提示这个字段可能不存在。

