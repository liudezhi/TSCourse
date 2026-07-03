# Day 23：项目 2 验收与 CLI 调用链阅读

## 今日目标

今天完成项目 2 验收。重点不是功能多，而是你能从用户命令追踪到核心函数，再追踪到输出报告。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | 调用链、边界层、核心层 |
| 35 分钟 | 代码练习 | 整理 CLI 报告输出 |
| 25 分钟 | 源码阅读训练 | 追踪一次 CLI 调用链 |
| 15 分钟 | 复盘笔记 | 写项目 2 阅读报告 |

## 必学知识点

1. CLI 调用链从命令输入开始。
2. 入口层负责参数、错误、输出。
3. 核心层负责扫描、统计、格式化。

## 代码练习：格式化报告

`src/report.ts`：

```ts
export type TodoReport = {
  file: string;
  count: number;
};

export function formatReport(reports: TodoReport[]): string {
  const total = reports.reduce((sum, item) => sum + item.count, 0);
  const lines = reports.map((item) => `${item.file}: ${item.count}`);
  return [`TODO total: ${total}`, ...lines].join("\n");
}
```

入口输出：

```ts
const reports = await Promise.all(files.map(countTodos));
console.log(formatReport(reports));
```

## 源码阅读训练：追踪调用链

对项目 2 写出这条链：

```text
用户命令
  -> cli.ts main(argv)
  -> parse targetDir
  -> findMarkdownFiles(targetDir)
  -> countTodos(file)
  -> formatReport(reports)
  -> console.log
```

每一箭头旁边写输入输出类型。

## 项目 2 验收清单

- 有 `package.json` 和 CLI 入口。
- 能读取命令行参数。
- 能扫描 Markdown 文件。
- 能异步读取文件并统计 TODO。
- 能处理错误并输出报告。
- 能解释文件读写和子进程风险。

## 当天产出

- 完成项目 2。
- 一张 CLI 调用链图。
- 一份项目 2 简短源码阅读报告。

## 参考报告示例

```md
# todo-scan-cli 阅读报告

用途：扫描 Markdown 文件中的 TODO。
入口：src/cli.ts。
核心模块：
- scanner.ts：找 Markdown 文件
- report.ts：统计和格式化报告

主调用链：
main(argv) -> findMarkdownFiles -> countTodos -> formatReport

异步点：readdir、readFile、Promise.all。
```

## 常见坑

- 只会运行，不会解释调用链。
- 忽略错误处理。
- 把日志和最终报告混在一起。
- 不记录异步点。

## 过关标准

你能画出项目 2 从用户输入到最终输出的完整调用链，并指出异步文件操作位置。

## 有余力再做

把报告输出到 `todo-report.md`，并记录这是一个文件写入边界。

