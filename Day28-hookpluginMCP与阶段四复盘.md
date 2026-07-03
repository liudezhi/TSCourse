# Day 28：hook、plugin、MCP 与阶段四复盘

## 今日目标

理解扩展机制的基础概念，并为 Mini Agent 增加简单 hook。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | hook、plugin、MCP 类扩展 |
| 35 分钟 | 代码练习 | 实现 before/after tool hook |
| 25 分钟 | 源码阅读训练 | 阅读一个插件或 hook 入口 |
| 15 分钟 | 复盘笔记 | 回答第 4 周问题 |

## 必学知识点

1. hook 是在关键流程点插入扩展逻辑。
2. plugin 是可被加载的一组能力。
3. MCP 可理解为让工具和资源通过协议暴露给 Agent 的扩展方式。

## C 语言类比

hook 类似回调函数：主流程到某个时机调用外部注册的函数。plugin 则像动态加载的模块，但要有明确接口。

## 代码练习

`src/hooks.ts`：

```ts
export type HookContext = {
  toolName: string;
  input: string;
};

export type Hook = (context: HookContext) => Promise<void> | void;

const beforeToolHooks: Hook[] = [];
const afterToolHooks: Hook[] = [];

export function onBeforeTool(hook: Hook): void {
  beforeToolHooks.push(hook);
}

export async function runBeforeTool(context: HookContext): Promise<void> {
  for (const hook of beforeToolHooks) await hook(context);
}

export function onAfterTool(hook: Hook): void {
  afterToolHooks.push(hook);
}
```

## 源码阅读训练

找一个项目中的 `plugin`、`hook`、`extension` 关键词。只追踪：扩展点在哪里定义？谁调用它？

## 当天产出

- 一个简单 hook 系统。
- 第 4 周复盘笔记。

## 第 4 周复盘问题

- 我能不能解释 agent loop？
- 我能不能解释 tool calling？
- 我能不能识别权限确认模块？
- 我能不能说清楚 session/context 的区别？
- 我能不能从源码里找出插件或 hook 扩展点？

## 常见坑

- 插件能随意修改核心状态，没有边界。
- hook 太多，调用顺序不清楚。
- 把 MCP 当成模型能力，而不是工具/资源扩展协议思路。

## 过关标准

你能解释 hook 在 agent loop 中插入的位置，并说明它不应破坏核心流程。

## 有余力再做

给 `afterToolHooks` 增加执行函数，并记录工具输出摘要。

