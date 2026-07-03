# Day 25：tool calling 与工具注册

## 今日目标

建立 Mini Agent 的工具系统，理解真实 Agent CLI 中 tool calling 的工程形态。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | tool schema、工具注册、执行结果 |
| 35 分钟 | 代码练习 | 实现 `list-dir` 与 `read-file` 工具 |
| 25 分钟 | 源码阅读训练 | 阅读一个工具定义 |
| 15 分钟 | 复盘笔记 | 写工具调用链 |

## 必学知识点

1. 工具是被 agent 调用的受控能力。
2. 每个工具应有名称、输入、输出和错误边界。
3. 工具注册表让 agent 通过名字找到实现。

## C 语言类比

工具注册表像一张函数指针表：根据工具名找到对应函数。但 TS 里可用对象映射和类型定义让输入输出更清楚。

## 代码练习

`src/tools/index.ts`：

```ts
export type ToolResult = {
  ok: boolean;
  output: string;
};

export type Tool = {
  name: string;
  run(input: string): Promise<ToolResult>;
};

export const tools = new Map<string, Tool>();

export function registerTool(tool: Tool): void {
  tools.set(tool.name, tool);
}
```

实现一个 `list-dir` 工具，返回目录文件名列表。

## 源码阅读训练

找一个 Agent 或插件项目中的 `tools`、`commands`、`actions` 定义。只追踪：工具在哪里注册？在哪里执行？

## 当天产出

- 一个工具注册表。
- 一个可执行工具。
- 一张工具调用链图。

## 常见坑

- 工具输入类型不清楚。
- 工具直接访问全局状态，难以测试。
- 工具错误没有包装成统一结果。

## 过关标准

你能解释 `tool name -> registry -> run(input) -> observation` 的完整链路。

## 有余力再做

给工具增加 `description` 字段，模拟模型选择工具时看到的说明。

