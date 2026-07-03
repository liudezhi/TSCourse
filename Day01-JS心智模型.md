# Day 01：JS/TS 心智模型

## 今日目标

建立 JS/TS 与 C 的基本差异框架：TypeScript 是 JavaScript 的类型层，运行时仍然是 JavaScript；源码阅读时要同时看“运行时代码”和“类型信息”。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | JS/TS/C 的运行模型差异 |
| 35 分钟 | 代码练习 | 写一个最小 `.ts` 文件并运行 |
| 25 分钟 | 源码阅读训练 | 阅读一个 `package.json`，识别 scripts/main/type |
| 15 分钟 | 复盘笔记 | 写下 3 个问题和 3 个关键词 |

## 必学知识点

1. TypeScript 类型检查发生在运行前，运行时仍是 JavaScript。
2. JavaScript 的值比 C 更动态，对象和数组是引用模型。
3. Node.js 是运行 JavaScript/TypeScript 工具链的主要环境。

## C 语言类比

C 的类型检查与编译直接决定二进制行为；TypeScript 的类型检查更像“编译前的静态审查”，最终运行的是被擦除类型后的 JavaScript。不要把 `interface` 当作运行时结构体，它不会出现在运行时代码里。

## 代码练习

创建 `day01-hello.ts`：

```ts
const language: string = "TypeScript";
const days: number = 30;

function describeCourse(name: string, totalDays: number): string {
  return `${name} course: ${totalDays} days`;
}

console.log(describeCourse(language, days));
```

运行方式可任选其一：`npx tsx day01-hello.ts`，或先 `npx tsc day01-hello.ts` 再用 `node day01-hello.js`。

## 源码阅读训练

找一个已安装或公开的 npm 包，今天只看它的 `package.json`。只追踪一个问题：这个包的入口在哪里？重点看 `scripts`、`main`、`module`、`exports`、`bin`、`type`。

## 当天产出

- 一个 `day01-hello.ts` 文件。
- 一篇 10 行以内的笔记：TypeScript 和 C 的 3 个关键不同。
- 一个 `package.json` 入口字段截图或摘录。

## 常见坑

- 以为 TypeScript 类型会在运行时自动保护你。
- 看到 `interface` 就当作 C 的 `struct`。
- 忽略 `package.json`，直接从 `src/index.ts` 猜入口。

## 过关标准

你能说清楚：TypeScript 检查的是源码，Node.js 运行的是 JavaScript；你能从一个 `package.json` 中指出项目入口字段。

## 有余力再做

查看 `tsconfig.json` 中 `target` 和 `module` 的含义，但今天不要求深入。

