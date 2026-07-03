# Day 03：数组、对象与数据建模

## 今日目标

用数组和对象表达一组任务数据，练习 `map`、`filter`、`reduce` 这类源码中高频出现的数据处理方式。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | 数组方法、对象字段、回调函数 |
| 35 分钟 | 代码练习 | 统计任务数量 |
| 25 分钟 | 源码阅读训练 | 找一个 `.map` 或 `.filter` 调用 |
| 15 分钟 | 复盘笔记 | 写下回调函数的数据流 |

## 必学知识点

1. 数组方法常用回调函数表达遍历逻辑。
2. 对象数组是 TypeScript 项目最常见的数据形态之一。
3. 读源码时先看数据从哪来，再看被怎样变换。

## C 语言类比

C 中你可能用 `for` 循环处理数组；TS 项目里常用 `tasks.filter(...).map(...)`。回调函数类似把一段处理逻辑作为参数传给遍历函数，有点像函数指针，但更常见、更轻量。

## 代码练习

创建 `day03-tasks-basic.ts`：

```ts
type Task = {
  id: number;
  title: string;
  done: boolean;
};

const tasks: Task[] = [
  { id: 1, title: "read README", done: true },
  { id: 2, title: "find entry", done: false },
  { id: 3, title: "draw call chain", done: false },
];

const unfinished = tasks.filter((task) => !task.done);
const titles = unfinished.map((task) => task.title);

console.log({ total: tasks.length, unfinished: unfinished.length, titles });
```

## 源码阅读训练

搜索一个真实项目里的 `.map(`、`.filter(` 或 `.reduce(`。今天只追踪一个链式调用：输入数组是什么？输出数组是什么？

## 当天产出

- 一个任务统计 `.ts` 文件。
- 一张小数据流：`tasks -> filter -> map -> titles`。

## 常见坑

- 把 `.map` 当成普通循环，却忽略它会返回新数组。
- 在长链式调用里迷路，不知道每一步的数据形状。
- 没有给数组元素定义类型。

## 过关标准

你能用一句话描述一个数组链式调用每一步的数据变化。

## 有余力再做

用 `reduce` 统计已完成和未完成数量。

