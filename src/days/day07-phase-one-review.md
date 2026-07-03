# Day 07：阶段一复盘与源码阅读小测

## 今日目标

今天不堆新语法，而是把前 6 天串起来：从 JS/TS 心智模型，到对象、数组、模块、编译、入口阅读。你的目标是完成一次小型源码阅读小测。

今天结束时，你应该能从一个小项目中找出：

1. 怎么运行。
2. 入口在哪里。
3. 入口依赖哪些模块。
4. 当前还能看懂哪些类型和函数。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | 回顾 JS/TS/C 差异与入口阅读顺序 |
| 35 分钟 | 代码练习 | 整理前 6 天代码为一个小目录 |
| 25 分钟 | 源码阅读训练 | 做一次入口追踪小测 |
| 15 分钟 | 复盘笔记 | 回答第 1 周复盘问题 |

## 必学知识点

1. TypeScript 类型与 JavaScript 运行时要分开看。
2. `package.json` 是 Node.js 项目的入口地图。
3. 模块依赖图从 `import` 行开始画。

## 一周复盘：你现在应该建立的直觉

看到一个 TypeScript/Node.js 项目，不要直接打开最大文件。先按这个顺序：

```text
README
  -> package.json
  -> scripts/bin/main/exports
  -> tsconfig
  -> 入口文件
  -> 入口 import 的模块
```

这套流程会贯穿后面 23 天。你越早养成它，后面读 CLI 和 Agent 源码越轻松。

## C 语言类比

C 项目里，你通常会看构建脚本、头文件、`main()` 和核心结构体。TS/Node 项目同样要先找“怎么构建、怎么运行、入口在哪、核心类型是什么”。

区别只是入口不一定叫 `main`，构建配置也不一定是 Makefile。

## 代码练习：整理阶段一代码

创建：

```text
phase1-review/
  package.json
  src/
    task.ts
    stats.ts
    index.ts
  README.md
```

`src/task.ts`：

```ts
export type Task = {
  id: number;
  title: string;
  done: boolean;
};
```

`src/stats.ts`：

```ts
import type { Task } from "./task.ts";

export function getUnfinishedTitles(tasks: Task[]): string[] {
  return tasks.filter((task) => !task.done).map((task) => task.title);
}
```

`src/index.ts`：

```ts
import type { Task } from "./task.ts";
import { getUnfinishedTitles } from "./stats.ts";

const tasks: Task[] = [
  { id: 1, title: "review package.json", done: true },
  { id: 2, title: "draw module graph", done: false },
];

console.log(getUnfinishedTitles(tasks));
```

`README.md` 写：

```md
# phase1-review

入口：src/index.ts
核心类型：Task
核心流程：准备任务数组 -> 筛选未完成标题 -> 输出
```

## 源码阅读训练：入口追踪小测

用你刚整理的小项目做一次阅读。不要看自己脑中的记忆，只按流程写答案：

1. `package.json` 中哪个 script 可以运行项目？
2. 入口文件是谁？
3. 入口文件 import 了哪些模块？
4. `Task` 类型在哪里定义？
5. `getUnfinishedTitles` 的输入和输出是什么？

参考答案：

```text
npm run dev -> src/index.ts
index.ts -> task.ts, stats.ts
Task 在 task.ts
getUnfinishedTitles: Task[] -> string[]
```

## 当天产出

- 一个 `phase1-review` 小项目。
- 一张入口依赖图。
- 一篇第 1 周复盘笔记。

## 第 1 周复盘问题

- 我能不能解释 TypeScript 和 JavaScript 的关系？
- 我能不能看懂真实源码中的 `import/export`？
- 我能不能从 `package.json` 找到入口？
- 我能不能说清楚 `const` 对对象引用的限制？
- 我能不能画出一个两文件项目的模块依赖？

## 参考笔记示例

```md
# 第 1 周复盘

我现在能做的事：
1. 从 package.json 找 dev 命令。
2. 从入口文件看 import 关系。
3. 把 Task[] -> string[] 的数据流写出来。

我还薄弱的地方：
1. tsconfig 只知道大概作用。
2. ESM/CommonJS 还不清楚。
3. reduce 还不熟。
```

## 常见坑

- 复盘时只说“我懂了”，但写不出证据。
- 一次读太多文件，忘了今天只做入口追踪。
- 不画图，导致第二天又重新找入口。

## 过关标准

你能在 25 分钟内完成一个小项目的入口追踪，并写出：

```text
运行命令 -> 入口文件 -> import 模块 -> 核心类型 -> 一条数据流
```

## 有余力再做

找一个真实小型 npm 包，按同样格式写 10 行入口分析笔记。
