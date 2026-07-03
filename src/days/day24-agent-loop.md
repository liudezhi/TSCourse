# Day 24：项目 3 启动，Agent loop

## 今日目标

今天进入第四阶段：AI Agent CLI 源码阅读实战。我们启动项目 3：Mini Agent CLI。

重点不是做出真正 AI，而是理解 Agent CLI 的工程主干：任务进入、规划下一步、调用工具、记录观察、继续循环。

## 项目 3：Mini Agent CLI

目录：

```text
mini-agent-cli/
  package.json
  src/
    cli.ts
    agent.ts
    tools/
      index.ts
      list-dir.ts
      read-file.ts
    permission.ts
    session.ts
    hooks.ts
```

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | agent loop 主干 |
| 35 分钟 | 代码练习 | 创建 agent 主循环骨架 |
| 25 分钟 | 源码阅读训练 | 阅读一个 orchestrator 函数 |
| 15 分钟 | 复盘笔记 | 画 agent loop 流程 |

## 必学知识点

1. agent loop 是控制流程，不是模型训练。
2. 工具调用要有输入、输出和观察结果。
3. 规划层和执行层要分开。

## 先讲清楚：agent loop 六步

```text
接收任务
  -> 规划下一步
  -> 选择工具
  -> 执行工具
  -> 观察结果
  -> 决定继续或结束
```

真实 Agent CLI 复杂很多，但主干仍然是这个循环。

## 代码练习：规划下一步

`src/agent.ts`：

```ts
export type AgentTask = {
  text: string;
};

export type AgentStep =
  | { action: "list-dir"; input: string; reason: string }
  | { action: "read-file"; input: string; reason: string }
  | { action: "finish"; reason: string };

export function planNextStep(task: AgentTask): AgentStep {
  if (task.text.includes("list")) {
    return { action: "list-dir", input: ".", reason: "user asked to list files" };
  }

  if (task.text.includes("read")) {
    return { action: "read-file", input: "README.md", reason: "user asked to read a file" };
  }

  return { action: "finish", reason: "no supported action found" };
}
```

## 源码阅读训练：读 orchestrator

阅读：

```ts
async function runAgent(task: string): Promise<void> {
  const step = planNextStep({ text: task });
  if (step.action === "finish") return;
  const result = await runTool(step.action, step.input);
  console.log(result);
}
```

回答：

1. 哪一行做规划？
2. 哪一行执行工具？
3. 哪一行输出观察结果？

## 当天产出

- Mini Agent 项目骨架。
- `AgentTask` 和 `AgentStep` 类型。
- agent loop 流程图。

## 参考笔记示例

```md
# Day 24 笔记

Agent loop 不是模型训练，是控制流程。
planNextStep 决定下一步动作。
runTool 执行动作。
工具结果是 observation。
```

## 常见坑

- 把 agent loop 理解成模型底层训练。
- 规划和执行混在一个函数里。
- 没有记录为什么选择工具。
- 不区分 action 和 observation。

## 过关标准

你能用 6 步解释 agent loop，并能指出规划函数和工具执行函数的边界。

## 有余力再做

给 `AgentStep` 增加 `id`，记录每一步编号。

