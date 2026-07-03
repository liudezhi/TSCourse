# Day 24：项目 3 启动，Agent loop

## 今日目标

启动项目 3：Mini Agent CLI。理解 agent loop 的主干：接收任务、选择工具、执行工具、观察结果、继续循环。

## 项目 3：Mini Agent CLI 说明

- 项目目标：模拟 AI Agent CLI 的工程结构，不必调用真实模型。
- 目录结构：

```text
mini-agent-cli/
  package.json
  src/
    cli.ts
    agent.ts
    tools/
      index.ts
      read-file.ts
      list-dir.ts
    permission.ts
    session.ts
    hooks.ts
```

- 核心功能：用户输入任务，系统选择工具，执行工具，记录 session，支持权限确认和 hook。
- 验收方式：能解释入口、主循环、工具调用、权限确认、session 的模块关系。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | agent loop 主干 |
| 35 分钟 | 代码练习 | 创建 agent 主循环骨架 |
| 25 分钟 | 源码阅读训练 | 阅读一个主循环或 orchestrator |
| 15 分钟 | 复盘笔记 | 画 loop 流程 |

## 必学知识点

1. agent loop 是循环控制，不是模型本身。
2. 工具调用需要清楚的输入、输出、错误。
3. CLI Agent 的核心是“决策层”和“执行层”的边界。

## C 语言类比

agent loop 像一个事件循环或状态机：读取输入，根据状态选择动作，执行后更新状态，再决定是否继续。

## 代码练习

`src/agent.ts`：

```ts
export type AgentTask = {
  text: string;
};

export type AgentStep = {
  action: "list-dir" | "read-file" | "finish";
  input?: string;
};

export function planNextStep(task: AgentTask): AgentStep {
  if (task.text.includes("list")) return { action: "list-dir", input: "." };
  if (task.text.includes("read")) return { action: "read-file", input: "README.md" };
  return { action: "finish" };
}
```

## 源码阅读训练

找一个项目中命名为 `run`、`execute`、`loop`、`agent`、`orchestrator` 的文件或函数。只回答：它控制了哪些步骤？

## 当天产出

- Mini Agent 项目骨架。
- agent loop 流程图。

## 常见坑

- 把 agent loop 理解成大模型训练。
- 工具执行和任务规划混在一起。
- 没有记录每一步观察结果。

## 过关标准

你能用 6 步描述 agent loop：任务、计划、工具、执行、观察、继续。

## 有余力再做

给 `AgentStep` 增加 `reason` 字段，记录选择工具的原因。

