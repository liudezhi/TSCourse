# Day 10：类型收窄与 type guard

## 今日目标

今天解决 union 类型的下一个问题：**既然一个值可能是多种形态，代码如何安全地知道当前是哪一种？**

答案是类型收窄。你会用 `status` 判断任务是否 blocked，然后 TypeScript 才允许访问 blocked 任务独有的 `reason` 字段。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | 类型收窄、自定义 type guard |
| 35 分钟 | 代码练习 | 写 `isBlockedTask` 和阻塞原因统计 |
| 25 分钟 | 源码阅读训练 | 阅读一个 `if` 分支中的类型收窄 |
| 15 分钟 | 复盘笔记 | 写收窄前/收窄后的类型变化 |

## 必学知识点

1. TypeScript 会根据条件判断缩小类型范围。
2. `value is Type` 是自定义 type guard 的返回类型。
3. 读源码时要注意 `if`、`switch` 如何改变变量类型。

## 先讲清楚：为什么需要收窄

如果 `Task` 可能是普通任务，也可能是阻塞任务：

```ts
type NormalTask = {
  status: "todo" | "doing" | "done";
  title: string;
};

type BlockedTask = {
  status: "blocked";
  title: string;
  reason: string;
};

type Task = NormalTask | BlockedTask;
```

那么这段代码不安全：

```ts
function printReason(task: Task): void {
  console.log(task.reason);
}
```

因为普通任务没有 `reason`。你必须先判断：

```ts
if (task.status === "blocked") {
  console.log(task.reason);
}
```

在这个 `if` 分支里，TypeScript 知道 `task` 是 `BlockedTask`。

## C 语言类比

C 中常见 tagged union：

```c
struct Event {
  int kind;
  union { ... } data;
};
```

你要先看 `kind`，再决定访问哪个字段。TypeScript discriminated union 也是这个思路，只是类型系统会帮你检查分支。

## 代码练习：写 type guard

### 第 1 步：修改 `src/task.ts`

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

### 第 2 步：写 `src/stats.ts`

```ts
import type { BlockedTask, Task } from "./task.ts";

export function isBlockedTask(task: Task): task is BlockedTask {
  return task.status === "blocked";
}

export function getBlockedReasons(tasks: Task[]): string[] {
  return tasks.filter(isBlockedTask).map((task) => task.reason);
}
```

重点看：

```ts
task is BlockedTask
```

它告诉 TypeScript：如果这个函数返回 `true`，那么传入的 `task` 可以被当作 `BlockedTask`。

### 第 3 步：入口验证

```ts
const tasks: Task[] = [
  { id: "T1", title: "learn narrowing", status: "doing" },
  { id: "T2", title: "fix config", status: "blocked", reason: "missing file" },
];

console.log(getBlockedReasons(tasks));
```

预期输出：

```text
[ 'missing file' ]
```

## 源码阅读训练：读收窄分支

阅读：

```ts
type ToolResult =
  | { ok: true; output: string }
  | { ok: false; error: string };

function printResult(result: ToolResult): void {
  if (result.ok) {
    console.log(result.output);
  } else {
    console.error(result.error);
  }
}
```

回答：

1. `result.ok` 起什么作用？
2. 哪个分支能访问 `output`？
3. 哪个分支能访问 `error`？

参考答案：

`ok` 是判别字段。`true` 分支中 result 是成功结果，可以访问 `output`；`false` 分支中 result 是失败结果，可以访问 `error`。

## 当天产出

- 一个 `isBlockedTask` type guard。
- 一个 `getBlockedReasons` 函数。
- 一段收窄阅读笔记。

## 参考笔记示例

```md
# Day 10 笔记

Task = NormalTask | BlockedTask。
收窄前只能访问共有字段 id/title/status。
判断 task.status === "blocked" 后，可以访问 reason。

type guard 的格式：
function isX(value: Union): value is X
```

## 常见坑

- 在未收窄前直接访问某个分支专有字段。
- 没有共同判别字段，导致 union 难读。
- 忘记 type guard 必须做真实的运行时判断。
- 以为 `as BlockedTask` 和 type guard 一样安全。

## 过关标准

你能解释：

1. 为什么 `task.reason` 不能直接访问。
2. `task is BlockedTask` 的含义。
3. `filter(isBlockedTask)` 后为什么能 `map(task => task.reason)`。

## 有余力再做

给 done 任务增加：

```ts
finishedAt: string;
```

然后写一个 `isDoneTask`，提取所有完成时间。

