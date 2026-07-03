# Day 17：fs/path 与目录扫描

## 今日目标

用 `fs/promises` 和 `path` 扫描目录，找出 Markdown 文件。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | `fs/promises`、`path.join`、路径差异 |
| 35 分钟 | 代码练习 | 实现目录扫描 |
| 25 分钟 | 源码阅读训练 | 阅读一个文件扫描函数 |
| 15 分钟 | 复盘笔记 | 记录路径处理规则 |

## 必学知识点

1. Node.js 文件操作优先用 `fs/promises` 练异步。
2. 路径拼接用 `path.join`，不要手写 `/`。
3. 扫描函数要明确输入路径和输出文件列表。

## C 语言类比

C 里你可能用 `opendir/readdir` 或平台 API；Node.js 用 `fs.readdir`，返回的是目录项列表。跨平台路径要交给 `path`，不要自己拼字符串。

## 代码练习

`src/scanner.ts`：

```ts
import { readdir } from "node:fs/promises";
import path from "node:path";

export async function findMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => path.join(dir, entry.name));
}
```

在 `cli.ts` 中调用并打印文件列表。

## 源码阅读训练

找一个项目中使用 `fs` 或 `path` 的函数。只追踪：它读什么路径？返回什么数据？

## 当天产出

- `findMarkdownFiles` 函数。
- 一篇文件扫描函数阅读笔记。

## 常见坑

- 手写路径分隔符。
- 忘记 `await`。
- 一开始就递归扫描所有目录，超出今天范围。

## 过关标准

你能扫描一个目录并输出其中的 `.md` 文件路径。

## 有余力再做

增加一层递归扫描，但限制只递归一层。

