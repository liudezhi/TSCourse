# Day 25：tool calling 与工具注册

## 今日目标

今天实现 Mini Agent 的工具注册表。你要理解：工具不是随便调用的函数，而是 Agent 被允许使用的一组受控能力。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | tool schema、工具注册、执行结果 |
| 35 分钟 | 代码练习 | 实现工具注册表和 `list-dir` 工具 |
| 25 分钟 | 源码阅读训练 | 阅读一个工具定义 |
| 15 分钟 | 复盘笔记 | 写工具调用链 |

## 必学知识点

1. 工具要有名称、描述、输入、输出。
2. 工具注册表让 Agent 通过名字找到实现。
3. 工具结果应统一成 observation。

## C 语言类比

工具注册表有点像函数指针表：通过名字找到对应函数。但 TypeScript 可以用类型把输入输出定义清楚。

## 代码练习：工具注册表

`src/tools/index.ts`：

```ts
export type ToolResult = {
  ok: boolean;
  output: string;
};

export type Tool = {
  name: string;
  description: string;
  run(input: string): Promise<ToolResult>;
};

const tools = new Map<string, Tool>();

export function registerTool(tool: Tool): void {
  tools.set(tool.name, tool);
}

export async function runTool(name: string, input: string): Promise<ToolResult> {
  const tool = tools.get(name);
  if (!tool) return { ok: false, output: `unknown tool: ${name}` };
  return tool.run(input);
}
```

`src/tools/list-dir.ts`：

```ts
import { readdir } from "node:fs/promises";
import type { Tool } from "./index.ts";

export const listDirTool: Tool = {
  name: "list-dir",
  description: "List files in a directory",
  async run(input) {
    const files = await readdir(input);
    return { ok: true, output: files.join("\n") };
  },
};
```

## 源码阅读训练：读工具定义

阅读：

```ts
const readFileTool = {
  name: "read-file",
  description: "Read a text file",
  run: async (path: string) => { ... }
};
```

回答：

1. 工具名是什么？
2. 谁会看到 description？
3. 输入是什么？
4. 执行结果应该如何返回？

## 当天产出

- 一个工具注册表。
- 一个 `list-dir` 工具。
- 一张调用链：

```text
AgentStep.action -> runTool -> registry -> tool.run -> ToolResult
```

## 参考笔记示例

```md
# Day 25 笔记

工具是 Agent 可调用能力。
registry 负责 name -> implementation。
ToolResult 是 observation 的基础形态。
```

## 常见坑

- 工具没有统一返回格式。
- 工具直接修改全局状态。
- 工具名和 action 名不一致。
- 未知工具不处理错误。

## 过关标准

你能解释 `tool name -> registry -> run(input) -> observation` 的完整链路。

## 有余力再做

增加 `read-file` 工具，但只允许读取文本文件。

