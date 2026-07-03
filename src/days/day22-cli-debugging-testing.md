# Day 22：CLI 调试与最小测试

## 今日目标

今天给 CLI 加最小测试意识。你不需要马上掌握测试框架，只要先做到：把核心逻辑抽成纯函数，并写一个能失败也能通过的小测试脚本。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | 断点、日志、纯函数、最小测试 |
| 35 分钟 | 代码练习 | 抽出 TODO 统计纯函数并测试 |
| 25 分钟 | 源码阅读训练 | 阅读一个测试文件 |
| 15 分钟 | 复盘笔记 | 写调试路径 |

## 必学知识点

1. CLI 入口难测试，核心逻辑要抽出去。
2. 纯函数更容易测试。
3. 测试先覆盖小行为，再覆盖整条 CLI。

## 先讲清楚：为什么入口要薄

不推荐：

```ts
// cli.ts 里直接读 argv、读文件、统计、打印
```

推荐：

```text
cli.ts：拿参数、处理错误、输出
report.ts：统计 TODO
scanner.ts：找文件
```

这样你可以单独测试 `countTodoLines(content)`。

## 代码练习：写最小测试

`src/report.ts`：

```ts
export function countTodoLines(content: string): number {
  return content
    .split("\n")
    .filter((line) => line.includes("TODO"))
    .length;
}
```

`src/report.test.ts`：

```ts
import { countTodoLines } from "./report.ts";

const result = countTodoLines("a\nTODO: one\nb\nTODO: two");

if (result !== 2) {
  throw new Error(`expected 2, got ${result}`);
}

console.log("report.test ok");
```

运行：

```bash
npx tsx src/report.test.ts
```

## 源码阅读训练：读一个测试

阅读：

```ts
test("counts todo lines", () => {
  expect(countTodoLines("TODO: a\nb")).toBe(1);
});
```

回答：

1. 测试的目标函数是什么？
2. 输入是什么？
3. 预期输出是什么？

参考答案：目标是 `countTodoLines`；输入是两行文本；预期是 1。

## 当天产出

- 一个纯函数。
- 一个最小测试脚本。
- 一篇测试阅读笔记。

## 参考笔记示例

```md
# Day 22 笔记

countTodoLines 是纯函数：输入字符串，输出数字。
它不读文件、不依赖 argv、不打印结果，所以容易测试。

调试路径：
argv -> scan files -> read file -> countTodoLines -> format report
```

## 常见坑

- 所有逻辑都写进 `main`。
- 用日志代替测试。
- 测试太大，失败后定位困难。
- 只测试成功路径。

## 过关标准

你能写一个不依赖文件系统的测试脚本，验证 TODO 统计逻辑。

## 有余力再做

试用 Node.js 内置 `node:test` 改写这个测试。

