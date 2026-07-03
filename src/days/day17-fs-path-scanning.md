# Day 17：fs/path 与目录扫描

## 今日目标

今天让 CLI 真正接触文件系统：扫描一个目录，找出其中的 Markdown 文件。

核心不是递归遍历所有情况，而是先掌握 Node.js 文件系统 API 的基本读法。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | `fs/promises`、`path.join`、路径差异 |
| 35 分钟 | 代码练习 | 实现目录扫描 |
| 25 分钟 | 源码阅读训练 | 阅读一个文件扫描函数 |
| 15 分钟 | 复盘笔记 | 记录路径处理规则 |

## 必学知识点

1. 文件操作优先用 `node:fs/promises` 练习异步。
2. 路径拼接用 `path.join`。
3. 扫描函数要明确输入目录和输出文件列表。

## C 语言类比

C 中可能用 `opendir/readdir` 或平台 API。Node.js 用 `readdir`，加上 `{ withFileTypes: true }` 后可以判断是文件还是目录。

跨平台路径不要手写 `/`，交给 `path.join`。

## 代码练习：实现扫描函数

`src/scanner.ts`：

```ts
import { readdir } from "node:fs/promises";
import path from "node:path";

export async function findMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile())
    .filter((entry) => entry.name.endsWith(".md"))
    .map((entry) => path.join(dir, entry.name));
}
```

在 `cli.ts` 中：

```ts
import { findMarkdownFiles } from "./scanner.ts";

export async function main(argv: string[]): Promise<void> {
  const targetDir = argv[0] ?? ".";
  const files = await findMarkdownFiles(targetDir);
  console.log(files);
}

main(process.argv.slice(2));
```

## 源码阅读训练：读文件扫描

阅读：

```ts
const entries = await readdir(dir, { withFileTypes: true });
const files = entries
  .filter((entry) => entry.isFile())
  .map((entry) => path.join(dir, entry.name));
```

回答：

1. `entries` 是从哪里来的？
2. `filter` 保留了什么？
3. `map` 把目录项变成了什么？

参考答案：来自 `readdir`；保留文件；转换成完整路径。

## 当天产出

- `findMarkdownFiles` 函数。
- CLI 能打印目标目录下的 `.md` 文件。
- 一篇文件扫描阅读笔记。

## 参考笔记示例

```md
# Day 17 笔记

findMarkdownFiles(dir): Promise<string[]>
输入：目录路径
输出：Markdown 文件路径列表

数据流：
dir -> readdir -> Dirent[] -> filter file/md -> string[]
```

## 常见坑

- 忘记 `await`。
- 手写路径分隔符。
- 一上来就递归，导致复杂度超出今天目标。
- 不处理目录不存在时的错误。

## 过关标准

你能扫描一个目录并输出其中的 Markdown 文件路径，并能画出 `dir -> readdir -> files` 的数据流。

## 有余力再做

增加一层递归扫描，但只允许递归一级。

