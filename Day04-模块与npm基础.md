# Day 04：module 与 npm 基础

## 今日目标

理解 TypeScript 模块、`import/export`、`package.json` 与 npm scripts，能把代码拆成两个文件运行。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | module、npm scripts、项目入口 |
| 35 分钟 | 代码练习 | 拆分 `task.ts` 和 `index.ts` |
| 25 分钟 | 源码阅读训练 | 从 `package.json` 找脚本命令 |
| 15 分钟 | 复盘笔记 | 画出模块依赖 |

## 必学知识点

1. `export` 暴露模块能力，`import` 使用模块能力。
2. `package.json` 的 `scripts` 是项目常用命令入口。
3. 源码阅读先从入口文件与模块边界开始。

## C 语言类比

C 用 `.h` 声明、`.c` 实现，再通过编译链接组合；TS 用模块系统表达边界。`export type` 更像暴露类型声明，`export function` 暴露运行时代码。

## 代码练习

创建 `task.ts`：

```ts
export type Task = {
  id: number;
  title: string;
  done: boolean;
};

export function countDone(tasks: Task[]): number {
  return tasks.filter((task) => task.done).length;
}
```

创建 `index.ts`：

```ts
import { countDone, type Task } from "./task";

const tasks: Task[] = [
  { id: 1, title: "split modules", done: true },
  { id: 2, title: "read scripts", done: false },
];

console.log(countDone(tasks));
```

## 源码阅读训练

打开一个 `package.json`，只追踪一个问题：`npm run build` 或 `npm run dev` 最终执行了什么命令？

## 当天产出

- 两个模块文件。
- 一张模块依赖图：`index.ts -> task.ts`。
- 一条 npm script 阅读笔记。

## 常见坑

- 忘记相对路径中的 `./`。
- 分不清 `import type` 和普通 `import`。
- 阅读项目时不看 `scripts`，错过真实启动方式。

## 过关标准

你能把一个功能拆成两个 TS 文件，并能从 `package.json` 找出常用命令实际执行内容。

## 有余力再做

查阅一个项目的 `exports` 字段，记录它暴露了哪些入口。

