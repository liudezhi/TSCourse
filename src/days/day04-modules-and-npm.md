# Day 04：模块与 npm 基础

## 今日目标

今天开始把代码从“一个文件能跑”推进到“多个文件能组织”。真实 TypeScript 项目很少把所有逻辑写在一个文件里，源码阅读也不是逐行读，而是先看模块之间怎么连接。

今天你要掌握三个问题：

1. `export` 暴露了什么？
2. `import` 引入了什么？
3. `package.json` 里的 `scripts` 如何把命令和源码连接起来？

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | module、`import/export`、npm scripts |
| 35 分钟 | 代码练习 | 把任务统计拆成两个模块 |
| 25 分钟 | 源码阅读训练 | 从 `package.json` 追踪一个 script 到入口文件 |
| 15 分钟 | 复盘笔记 | 画出两个文件的模块依赖图 |

## 必学知识点

1. `export` 定义模块对外提供的能力。
2. `import` 定义当前文件依赖了谁。
3. `npm run xxx` 本质是执行 `package.json` 中的脚本命令。

## 先讲清楚：模块是源码阅读的地图

你以后读中大型 TypeScript 项目时，不可能从第一个文件读到最后一个文件。正确方式是先问：

```text
入口文件是谁？
入口文件 import 了哪些模块？
每个模块大概负责什么？
```

模块就是边界。一个好的模块应该让你不读内部细节，也能大概知道它对外提供什么。

例如：

```ts
export type Task = { ... };
export function countDone(tasks: Task[]): number { ... }
```

这告诉你：这个模块对外提供了一个任务类型和一个统计函数。

## C 语言类比

| C 语言 | TypeScript |
| -- | -- |
| `.h` 暴露结构体和函数声明 | `export type` / `export function` 暴露类型和函数 |
| `.c` 实现函数 | `.ts` 同时可以写类型和实现 |
| `#include` 引入声明 | `import` 引入模块成员 |
| Makefile/CMake 定义构建命令 | `package.json` scripts 定义常用命令 |

不要机械等同。TS 没有头文件和源文件的强制分离，但“暴露什么、依赖什么”的思维是相通的。

## 代码练习：把代码拆成模块

### 第 1 步：创建目录

创建：

```text
day04-modules/
  package.json
  src/
    task.ts
    index.ts
```

`package.json`：

```json
{
  "type": "module",
  "scripts": {
    "dev": "tsx src/index.ts"
  }
}
```

### 第 2 步：写 `task.ts`

```ts
export type Task = {
  id: number;
  title: string;
  done: boolean;
};

export function countDone(tasks: Task[]): number {
  return tasks.filter((task) => task.done).length;
}

export function getUnfinishedTitles(tasks: Task[]): string[] {
  return tasks.filter((task) => !task.done).map((task) => task.title);
}
```

这里 `Task` 是类型导出，`countDone` 和 `getUnfinishedTitles` 是运行时代码导出。

### 第 3 步：写 `index.ts`

```ts
import { countDone, getUnfinishedTitles, type Task } from "./task.ts";

const tasks: Task[] = [
  { id: 1, title: "split modules", done: true },
  { id: 2, title: "read scripts", done: false },
  { id: 3, title: "draw dependency graph", done: false },
];

console.log("done:", countDone(tasks));
console.log("unfinished:", getUnfinishedTitles(tasks));
```

注意 `type Task`。它提醒你：`Task` 只作为类型使用，不是运行时变量。

### 第 4 步：运行

```bash
npm run dev
```

预期输出：

```text
done: 1
unfinished: [ 'read scripts', 'draw dependency graph' ]
```

## 源码阅读训练：从 script 追踪入口

阅读这个 `package.json`：

```json
{
  "scripts": {
    "dev": "tsx src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

回答：

1. 开发时入口文件是谁？
2. 构建命令做什么？
3. 生产运行的是 TS 文件还是 JS 文件？

参考答案：

1. `npm run dev` 指向 `src/index.ts`。
2. `npm run build` 执行 `tsc`，通常把 TS 编译为 JS。
3. `npm run start` 运行 `dist/index.js`，也就是编译后的 JS。

## 当天产出

- 一个 `day04-modules` 小项目。
- 一张模块依赖图：

```text
src/index.ts -> src/task.ts
```

- 一段 scripts 阅读笔记。

## 参考笔记示例

```md
# Day 04 笔记

index.ts 是入口，负责准备数据和打印结果。
task.ts 是业务模块，负责定义 Task 和统计函数。

npm run dev -> tsx src/index.ts

模块依赖：
index.ts -> task.ts

今天我看懂了：import 行就是当前文件依赖关系的证据。
```

## 常见坑

- 忘记相对路径里的 `./`。
- 分不清 `import { Task }` 和 `import type { Task }`。
- 只看文件名猜职责，不看 `export` 和 `import`。
- 把 `scripts` 当成源码逻辑，忘了它只是命令入口。

## 过关标准

你能把一个功能拆成两个文件，并解释：

1. 哪个文件是入口。
2. 哪个文件提供类型和函数。
3. `npm run dev` 最终运行了哪个文件。

## 有余力再做

新增 `src/format.ts`，把输出格式化逻辑移进去。画出新的依赖图：

```text
index.ts -> task.ts
index.ts -> format.ts
```

