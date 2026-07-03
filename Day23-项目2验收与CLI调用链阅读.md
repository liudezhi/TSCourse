# Day 23：项目 2 验收与 CLI 调用链阅读

## 今日目标

完成项目 2 验收，训练从 CLI 命令追踪到核心函数的调用链阅读能力。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | 调用链、边界层、核心层 |
| 35 分钟 | 代码练习 | 整理 CLI 输出报告 |
| 25 分钟 | 源码阅读训练 | 追踪一次 CLI 调用链 |
| 15 分钟 | 复盘笔记 | 写项目 2 阅读报告 |

## 必学知识点

1. CLI 调用链从命令输入开始，不从某个随机函数开始。
2. 入口层负责参数、错误、输出。
3. 核心层负责文件扫描、统计、报告生成。

## C 语言类比

像读 C 程序从 `main(argc, argv)` 进入一样，读 TS CLI 要从 `bin -> cli.ts -> main(argv)` 进入，然后顺着函数调用走。

## 代码练习

为项目 2 输出最终报告：

```ts
export function formatReport(reports: TodoReport[]): string {
  const total = reports.reduce((sum, item) => sum + item.count, 0);
  const lines = reports.map((item) => `${item.file}: ${item.count}`);
  return [`TODO total: ${total}`, ...lines].join("\n");
}
```

## 源码阅读训练

对项目 2 自己做一次源码阅读。只追踪一条调用链：

`用户命令 -> cli.ts -> parse args -> scan files -> read file -> count todos -> format report`

## 当天产出

- 完成项目 2。
- 一张 CLI 调用链图。
- 一份项目 2 简短源码阅读报告。

## 项目 2 验收清单

- 有 `package.json` 和 `bin` 入口。
- 能读取 CLI 参数。
- 能扫描 Markdown 文件。
- 能异步读取文件并统计 TODO。
- 能处理错误并输出报告。
- 能解释子进程/权限确认的风险点。

## 常见坑

- 只会运行项目，不会解释调用链。
- 报告输出和日志混杂。
- 读源码时跳过错误处理。

## 过关标准

你能画出项目 2 从用户输入到最终输出的完整调用链。

## 有余力再做

把报告输出为 `todo-report.md` 文件。

