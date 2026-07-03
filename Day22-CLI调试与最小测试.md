# Day 22：CLI 调试与最小测试

## 今日目标

掌握最小限度的 CLI 调试和测试方法，避免只靠肉眼看输出。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | 断点、日志、最小测试 |
| 35 分钟 | 代码练习 | 抽出纯函数并测试 |
| 25 分钟 | 源码阅读训练 | 找一个测试文件 |
| 15 分钟 | 复盘笔记 | 写调试路径 |

## 必学知识点

1. CLI 入口难测，核心函数要保持纯净。
2. 先测数据处理函数，再测入口整合。
3. 调试时要从入口、参数、核心函数、输出逐层定位。

## C 语言类比

C 项目中也会把 `main()` 保持薄一点，把逻辑放进可测试函数；TS CLI 同理，`cli.ts` 不应承担所有逻辑。

## 代码练习

抽出纯函数：

```ts
export function countTodoLines(content: string): number {
  return content.split("\n").filter((line) => line.includes("TODO")).length;
}
```

写一个简单测试脚本 `src/report.test.ts`：

```ts
import { countTodoLines } from "./report";

const result = countTodoLines("a\nTODO: one\nb\nTODO: two");
if (result !== 2) {
  throw new Error(`expected 2, got ${result}`);
}
console.log("ok");
```

## 源码阅读训练

找一个项目的测试文件。只看一个测试：它验证了哪个函数的什么行为？

## 当天产出

- 一个纯函数。
- 一个最小测试脚本。
- 一篇测试阅读笔记。

## 常见坑

- 所有逻辑都写进 `main`，后续难测。
- 用日志代替测试。
- 测试太大，失败后不知道哪里错。

## 过关标准

你能运行一个测试脚本，并能说明为什么纯函数更容易测试。

## 有余力再做

试用 Node.js 内置 `node:test` 改写测试。

