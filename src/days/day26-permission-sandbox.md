# Day 26：permission 与 sandbox 思维

## 今日目标

今天理解 Agent CLI 的安全边界：模型或自动流程不能默认执行所有工具。尤其是文件编辑、shell、删除、网络请求这类能力，必须有权限确认或沙箱限制。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | permission、sandbox、安全边界 |
| 35 分钟 | 代码练习 | 给工具执行前加权限检查 |
| 25 分钟 | 源码阅读训练 | 阅读一个权限判断分支 |
| 15 分钟 | 复盘笔记 | 写权限边界说明 |

## 必学知识点

1. 危险工具执行前要确认。
2. 权限请求要记录工具名、输入和原因。
3. 沙箱是限制能力范围，不是事后补救。

## 先讲清楚：为什么 Agent 更需要权限

普通 CLI 是用户明确输入命令。Agent CLI 中，模型可能根据上下文选择工具。模型可能误判，也可能被恶意提示诱导。所以工具调用必须经过边界：

```text
计划调用工具
  -> 权限判断
  -> 允许才执行
  -> 记录结果
```

## 代码练习：权限请求

`src/permission.ts`：

```ts
export type PermissionRequest = {
  toolName: string;
  input: string;
  reason: string;
};

export async function askPermission(request: PermissionRequest): Promise<boolean> {
  console.log(`[permission] ${request.toolName}`);
  console.log(`input: ${request.input}`);
  console.log(`reason: ${request.reason}`);

  return request.toolName !== "shell";
}
```

执行工具前：

```ts
const allowed = await askPermission({
  toolName: step.action,
  input: step.input,
  reason: step.reason,
});

if (!allowed) {
  return { ok: false, output: "permission denied" };
}
```

## 源码阅读训练：读权限分支

阅读：

```ts
if (tool.requiresApproval) {
  const approved = await requestApproval(tool.name, input);
  if (!approved) return { ok: false, output: "cancelled" };
}
```

回答：

1. 哪些工具需要确认？
2. 拒绝后是否还会执行工具？
3. 结果如何返回给 agent loop？

参考答案：`requiresApproval` 为真时需要确认；拒绝后不执行；返回失败 observation。

## 当天产出

- 一个权限请求类型。
- 一个工具执行前的权限检查。
- 一篇安全边界笔记。

## 参考笔记示例

```md
# Day 26 笔记

权限边界必须在工具执行前。
PermissionRequest 至少包含：toolName、input、reason。
拒绝后应该返回 observation，而不是继续执行。
```

## 常见坑

- 执行后才记录权限。
- 只靠模型自觉不调用危险工具。
- 权限判断散落在每个工具里。
- 没记录拒绝原因。

## 过关标准

你能解释为什么 shell/file edit 工具需要权限确认，并能画出 `tool request -> permission -> run/deny`。

## 有余力再做

把权限请求写入 session 日志。

