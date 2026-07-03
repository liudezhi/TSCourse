# Day 18：Promise、async/await 与 TODO 统计

## 今日目标

用异步文件读取统计 Markdown 中的 TODO 行，理解 `Promise` 和 `async/await` 的数据流。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | Promise、await、并发读取 |
| 35 分钟 | 代码练习 | 实现 TODO 统计 |
| 25 分钟 | 源码阅读训练 | 阅读一个 async 函数 |
| 15 分钟 | 复盘笔记 | 画异步调用链 |

## 必学知识点

1. `async` 函数返回 `Promise`。
2. `await` 等待 Promise 完成并取出结果。
3. `Promise.all` 用于并发等待多个异步任务。

## C 语言类比

C 常见同步调用是一行执行完再下一行；JS 异步把“未来的结果”包装成 Promise。`await` 让异步代码写起来像同步，但底层仍是事件循环。

## 代码练习

`src/report.ts`：

```ts
import { readFile } from "node:fs/promises";

export type TodoReport = {
  file: string;
  count: number;
};

export async function countTodos(file: string): Promise<TodoReport> {
  const content = await readFile(file, "utf8");
  const count = content.split("\n").filter((line) => line.includes("TODO")).length;
  return { file, count };
}
```

在 `cli.ts` 中对文件列表使用 `Promise.all(files.map(countTodos))`。

## 源码阅读训练

找一个 `async function`。只追踪一个问题：它 `await` 了什么，最终返回什么？

## 当天产出

- 一个 TODO 统计函数。
- 一张异步调用链：`main -> findMarkdownFiles -> countTodos -> readFile`。

## 常见坑

- 忘记 `await Promise.all(...)`。
- 以为 `async` 函数直接返回普通值。
- 在异步错误处理前就扩展功能。

## 过关标准

你能解释 `Promise<TodoReport>` 和 `TodoReport` 的区别。

## 有余力再做

统计 `TODO:` 后面的文本，输出前 5 条。

