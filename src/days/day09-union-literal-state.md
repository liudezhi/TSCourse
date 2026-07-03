# Day 09：union 与 literal type 状态建模

## 今日目标

今天给任务增加状态。核心思想是：**不要用任意字符串表达有限状态，要用 union literal 把状态限定住。**

如果任务状态写成 `string`，那 `"finished"`、`"abc"`、`"随便写"` 都能传进去。真实项目里，这会让状态流失控。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | union、literal type、enum 替代方案 |
| 35 分钟 | 代码练习 | 为项目 1 增加任务状态 |
| 25 分钟 | 源码阅读训练 | 阅读一个状态 union |
| 15 分钟 | 复盘笔记 | 比较 C enum 与 TS union |

## 必学知识点

1. union 表示一个值可以是多个候选之一。
2. literal type 把具体字符串变成类型。
3. 状态建模要让非法状态尽早暴露。

## 先讲清楚：为什么不用普通 string

不推荐：

```ts
type Task = {
  status: string;
};
```

因为任何字符串都合法。

推荐：

```ts
type TaskStatus = "todo" | "doing" | "blocked" | "done";
```

这表示：

```text
status 只能是四个字符串之一。
```

这比注释更强，因为 TypeScript 会检查它。

## C 语言类比

C 中常用：

```c
enum TaskStatus {
  TODO,
  DOING,
  BLOCKED,
  DONE
};
```

TypeScript 可以用 `enum`，但很多真实项目更偏好 string literal union：

```ts
type TaskStatus = "todo" | "doing" | "blocked" | "done";
```

原因是它和 JSON、配置文件、CLI 输出更自然地结合，源码阅读时也更直观。

## 代码练习：给 Task 加状态

### 第 1 步：修改 `src/task.ts`

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

### 第 2 步：写统计函数

`src/stats.ts`：

```ts
import type { Task, TaskStatus } from "./task.ts";

export function countByStatus(tasks: Task[], status: TaskStatus): number {
  return tasks.filter((task) => task.status === status).length;
}
```

### 第 3 步：在入口调用

```ts
import type { Task } from "./task.ts";
import { countByStatus } from "./stats.ts";

const tasks: Task[] = [
  { id: "T1", title: "model task", owner: "me", status: "todo", createdAt: "2026-07-04" },
  { id: "T2", title: "read union", owner: "me", status: "done", createdAt: "2026-07-04" },
];

console.log("todo:", countByStatus(tasks, "todo"));
console.log("done:", countByStatus(tasks, "done"));
```

### 第 4 步：故意传错状态

试试：

```ts
countByStatus(tasks, "finished");
```

TypeScript 应该报错。这就是 union 的价值。

## 源码阅读训练：识别状态集合

阅读：

```ts
type AgentState = "idle" | "planning" | "running-tool" | "waiting-approval" | "finished";
```

回答：

1. 这个 union 描述什么？
2. 哪个状态和权限确认有关？
3. 如果后续看到 `state === "running-tool"`，你会怎么理解？

参考答案：

1. 描述 agent 当前生命周期状态。
2. `"waiting-approval"`。
3. agent 正在执行工具。

## 当天产出

- `TaskStatus` 联合类型。
- `countByStatus` 函数。
- 一篇 C enum 与 TS union 对比笔记。

## 参考笔记示例

```md
# Day 09 笔记

status: string 太宽，任何字符串都能传入。
TaskStatus = "todo" | "doing" | "blocked" | "done" 能限制合法状态。

C enum 常映射成整数；TS string union 更适合读源码和 JSON 数据。
```

## 常见坑

- 写成普通 `string`，让类型约束失效。
- union 太宽，等于没约束。
- 看到 `|` 只想到位运算。
- 忘了把状态类型复用到函数参数中。

## 过关标准

你能解释：

1. 为什么 `"todo" | "done"` 比 `string` 更安全。
2. `countByStatus(tasks, status)` 的 `status` 为什么要用 `TaskStatus`。
3. 一个状态 union 在源码里表达什么业务流程。

## 有余力再做

增加一个新状态 `"cancelled"`，观察 TypeScript 会在哪些地方提醒你更新代码。

