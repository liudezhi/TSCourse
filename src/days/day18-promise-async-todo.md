# Day 18：Promise、async/await 与 TODO 统计

## 今日目标

今天把扫描到的 Markdown 文件读出来，统计每个文件里的 TODO 行数。核心是理解 `async` 函数返回 `Promise`，以及 `Promise.all` 如何等待多个异步任务。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | Promise、await、并发读取 |
| 35 分钟 | 代码练习 | 实现 TODO 统计 |
| 25 分钟 | 源码阅读训练 | 阅读一个 async 函数 |
| 15 分钟 | 复盘笔记 | 画异步调用链 |

## 必学知识点

1. `async` 函数总是返回 Promise。
2. `await` 等待 Promise 完成并取出结果。
3. `Promise.all` 等待一组 Promise 全部完成。

## 先讲清楚：Promise 是未来的结果

```ts
async function countTodos(file: string): Promise<TodoReport> {
  ...
}
```

翻译：

```text
现在调用它不会立刻得到 TodoReport，而是得到一个将来会完成的 Promise。
await 之后才拿到 TodoReport。
```

## C 语言类比

C 的同步文件读取通常是一行执行完再下一行。Node.js 异步 API 返回 Promise，表示“这个 I/O 以后完成”。`await` 让代码写起来像同步，但底层仍是异步。

## 代码练习：统计 TODO

`src/report.ts`：

```ts
import { readFile } from "node:fs/promises";

export type TodoReport = {
  file: string;
  count: number;
};

export async function countTodos(file: string): Promise<TodoReport> {
  const content = await readFile(file, "utf8");
  const count = content
    .split("\n")
    .filter((line) => line.includes("TODO"))
    .length;

  return { file, count };
}
```

`cli.ts`：

```ts
const files = await findMarkdownFiles(targetDir);
const reports = await Promise.all(files.map(countTodos));
console.log(reports);
```

数据流：

```text
string[] files
  -> files.map(countTodos)
Promise<TodoReport>[]
  -> await Promise.all(...)
TodoReport[]
```

## 源码阅读训练：读 async 函数

阅读：

```ts
async function loadJson(file: string): Promise<unknown> {
  const text = await readFile(file, "utf8");
  return JSON.parse(text);
}
```

回答：

1. 这个函数返回普通值还是 Promise？
2. 它等待了什么？
3. 最终结果是什么？

参考答案：返回 `Promise<unknown>`；等待 `readFile`；最终解析 JSON 文本。

## 当天产出

- 一个 `countTodos` 函数。
- CLI 输出每个 Markdown 文件的 TODO 数。
- 一张异步调用链。

## 参考笔记示例

```md
# Day 18 笔记

countTodos(file): Promise<TodoReport>
readFile 是异步 I/O。
Promise.all(files.map(countTodos)) 把多个文件并发读取，最后得到 TodoReport[]。
```

## 常见坑

- 忘记 `await Promise.all(...)`。
- 以为 `async` 函数直接返回普通值。
- 在 `map(async ...)` 后忘记处理 Promise 数组。
- 错把异步调用链当同步调用栈。

## 过关标准

你能解释 `Promise<TodoReport>` 和 `TodoReport` 的区别，并能画出 `files -> Promise[] -> reports`。

## 有余力再做

统计 `TODO:` 后面的文本，输出前 5 条 TODO 内容。

