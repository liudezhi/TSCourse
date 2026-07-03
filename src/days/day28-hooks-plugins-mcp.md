# Day 28：hook、plugin、MCP 与阶段四复盘

## 今日目标

今天理解扩展机制。重点不是深入 MCP 协议，而是建立源码阅读时的识别能力：哪里定义扩展点？谁注册？谁调用？

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | hook、plugin、MCP 类扩展 |
| 35 分钟 | 代码练习 | 实现 before/after tool hook |
| 25 分钟 | 源码阅读训练 | 阅读一个插件或 hook 入口 |
| 15 分钟 | 复盘笔记 | 回答第 4 周问题 |

## 必学知识点

1. hook 是在关键流程点插入回调。
2. plugin 是可加载的一组能力。
3. MCP 类机制可理解为把外部工具和资源接入 Agent。

## 代码练习：实现 hook

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

export function onAfterTool(hook: Hook): void {
  afterToolHooks.push(hook);
}

export async function runBeforeTool(context: HookContext): Promise<void> {
  for (const hook of beforeToolHooks) await hook(context);
}

export async function runAfterTool(context: HookContext): Promise<void> {
  for (const hook of afterToolHooks) await hook(context);
}
```

调用位置：

```ts
await runBeforeTool({ toolName, input });
const result = await runTool(toolName, input);
await runAfterTool({ toolName, input });
```

## 源码阅读训练：识别扩展点

阅读：

```ts
plugins.forEach((plugin) => {
  plugin.registerTools(registry);
  plugin.registerHooks(hooks);
});
```

回答：

1. 插件能注册什么？
2. 核心系统暴露了哪些扩展点？
3. 你会继续追踪哪个函数？

参考答案：注册工具和 hook；扩展点是 registry/hooks；继续追踪 `registerTools` 和 `registerHooks`。

## 第 4 周复盘问题

- 我能不能解释 agent loop？
- 我能不能解释 tool calling？
- 我能不能识别权限确认模块？
- 我能不能说清楚 session/context 的区别？
- 我能不能从源码里找出插件或 hook 扩展点？

## 当天产出

- 一个 hook 系统。
- 第 4 周复盘笔记。
- 一张扩展机制图。

## 参考笔记示例

```md
# Day 28 笔记

hook 是主流程中的插入点。
plugin 是一组可注册能力。
MCP 类机制可以理解为外部工具/资源接入方式。

读扩展机制三问：
谁注册？注册到哪里？什么时候被调用？
```

## 常见坑

- hook 调用顺序不清楚。
- 插件可以随意改核心状态。
- 把 MCP 当成模型能力，而不是工具/资源扩展方式。
- 只看插件文件，不看注册入口。

## 过关标准

你能解释 hook 在 agent loop 中插入的位置，并能从一段源码里识别扩展点。

## 有余力再做

让 after hook 记录工具执行完成的时间。

