# Day 26：permission 与 sandbox 思维

## 今日目标

理解 AI Agent CLI 为什么必须有权限确认机制，并在 Mini Agent 中实现简单权限检查。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | permission、sandbox、安全边界 |
| 35 分钟 | 代码练习 | 给工具执行前加确认 |
| 25 分钟 | 源码阅读训练 | 阅读一个权限判断分支 |
| 15 分钟 | 复盘笔记 | 写权限边界说明 |

## 必学知识点

1. Agent 不能默认执行所有命令和文件操作。
2. 权限机制要发生在危险操作之前。
3. 安全边界应可解释、可记录、可拒绝。

## C 语言类比

C 程序调用 `system()` 或写文件前，如果输入来自外部，就要特别小心。Agent CLI 更危险，因为“决策者”可能是模型，所以必须增加人类确认或沙箱限制。

## 代码练习

`src/permission.ts`：

```ts
export type PermissionRequest = {
  toolName: string;
  input: string;
  reason: string;
};

export async function askPermission(request: PermissionRequest): Promise<boolean> {
  console.log(`[permission] ${request.toolName}: ${request.input}`);
  console.log(`reason: ${request.reason}`);
  return request.toolName !== "shell";
}
```

在工具执行前调用 `askPermission`。

## 源码阅读训练

找一个源码中的 `permission`、`approval`、`sandbox`、`confirm` 相关逻辑。只追踪：什么时候询问？拒绝后发生什么？

## 当天产出

- 一个权限请求类型。
- 一个工具执行前的权限检查。
- 一篇安全边界笔记。

## 常见坑

- 工具执行后才记录权限。
- 权限判断散落在每个工具里，没有统一入口。
- 把“用户确认”当作唯一安全机制，忽略路径和命令边界。

## 过关标准

你能说清楚为什么 file edit 和 shell tool 需要权限边界。

## 有余力再做

把权限请求写入 session 日志。

