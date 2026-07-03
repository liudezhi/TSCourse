# Day 30：最终验收与后续强化

## 今日目标

今天做最终验收：给定一个 TypeScript + Node.js CLI 项目，在 2 小时内完成源码阅读，并输出一份源码阅读报告。

课程内仍按 90 分钟安排，模拟正式验收的关键步骤。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | 验收标准与时间分配 |
| 35 分钟 | 代码练习 | 整理 Mini Agent 模块与调用链 |
| 25 分钟 | 源码阅读训练 | 模拟最终验收前 25 分钟 |
| 15 分钟 | 复盘笔记 | 写最终能力清单 |

## 最终验收任务

给定一个 TypeScript + Node.js CLI 项目，在 2 小时内完成：

1. 找到运行方式。
2. 找到入口文件。
3. 画出主要模块。
4. 找出核心类型。
5. 追踪一条核心调用链。
6. 标注异步、文件读写、子进程、权限相关逻辑。
7. 输出源码阅读报告。

## 2 小时时间分配

| 时间 | 任务 |
| -- | -- |
| 0-15 分钟 | README、package.json、tsconfig |
| 15-35 分钟 | 找入口和运行命令 |
| 35-60 分钟 | 找核心类型与模块 |
| 60-90 分钟 | 追踪一条主调用链 |
| 90-110 分钟 | 标注异步、文件、子进程、权限 |
| 110-120 分钟 | 整理报告 |

## 代码练习：整理最终调用链

以 Mini Agent CLI 为对象，写出一条最终调用链：

```text
cli.ts
  -> parse user task
  -> planNextStep
  -> askPermission
  -> runTool
  -> recordEvent
  -> print observation
```

然后给每一层补一句职责：

```text
cli.ts：用户输入和错误边界。
planNextStep：把任务变成下一步动作。
askPermission：在危险工具前做确认。
runTool：根据工具名找到实现并执行。
recordEvent：把历史写入 session。
```

这不是为了写更多代码，而是训练你把源码结构复述出来。

## 源码阅读训练：模拟最终验收

拿项目 2 或项目 3，限时 25 分钟完成：

1. 找 `package.json` 中的运行命令。
2. 找入口文件。
3. 写出入口文件 import 的模块。
4. 找 2 个核心类型。
5. 写出一条主调用链。

参考答案形态：

```md
运行：npm run dev
入口：src/cli.ts
入口依赖：agent.ts、tools/index.ts、session.ts
核心类型：AgentStep、ToolResult
调用链：cli -> planNextStep -> askPermission -> runTool -> recordEvent
```

## 源码阅读报告模板

```md
# TypeScript + Node.js CLI 源码阅读报告

## 项目用途

## 运行方式

## 入口文件

## 主要模块

## 核心类型

## 核心流程

## 关键调用链

## 异步流程

## 文件读写位置

## 子进程调用位置

## 权限/安全相关逻辑

## 我还没看懂的地方

## 下一步阅读计划
```

## 30 天必须掌握

- 从 `package.json` 找入口。
- 读懂基础 `interface/type/union/generic`。
- 解释 `async/await` 和 Promise 调用链。
- 读懂 CLI 参数、文件读写、子进程、配置和错误处理。
- 解释 agent loop、tool calling、permission、session、hook 的基本工程结构。
- 画模块依赖图、调用链图、数据流图。

## 15 个重点难点清单

| 难点 | 为什么难 | C 程序员易误解 | 突破方式 |
| -- | -- | -- | -- |
| JS 对象引用模型 | `const` 不等于对象不可变 | 当成值拷贝 | 多写对象修改实验 |
| Promise | 结果在未来产生 | 当成普通返回值 | 画异步调用链 |
| async/await | 写法像同步，实质异步 | 忽略 Promise 返回 | 每个 async 标返回类型 |
| ESM/CommonJS | 受 `type` 和配置影响 | 以为只有一种模块 | 对比两个 package |
| 泛型 | 类型参数不在运行时 | 当成宏或模板 | 读输入输出关系 |
| 类型收窄 | 分支改变类型认知 | 以为只是普通 if | 写 type guard |
| discriminated union | 状态和字段绑定 | 用普通 enum 思维 | 用 `switch` 处理状态 |
| utility types | 类型层变换多 | 当成运行时函数 | 翻译成自然语言 |
| tsconfig | 配置影响全项目 | 忽略编译边界 | 每次只看关键字段 |
| package.json | 入口信息分散 | 直接找 main 函数 | 固定入口流程 |
| CLI 入口 | bin/shebang/argv 多层 | 只看源码文件名 | 画命令链路 |
| 子进程 | 外部命令有风险 | 直接拼字符串 | 用 args 数组 |
| agent loop | 混合规划和执行 | 当成模型训练 | 拆成 6 步 |
| tool calling | 工具有 schema 和边界 | 当成普通函数调用 | 画 registry 链路 |
| permission/sandbox | 安全边界前置 | 执行后再确认 | 执行前做审批 |

## 30 天后继续强化

- 系统学习 JavaScript 原型链、事件循环细节和 stream 深入用法。
- 学习测试框架 Vitest/Jest。
- 深入 ESM/CommonJS 打包与发布。
- 阅读 2-3 个公开 TS CLI 项目。
- 尝试给 Mini Agent 接入真实模型 API。
- 学习 MCP server 的实际实现。

## 当天产出

- 一份最终源码阅读报告。
- 一份 30 天能力自评。
- 一张 Mini Agent 完整模块图。

## 参考自评示例

```md
# 30 天能力自评

我已经能做到：
1. 从 package.json 找 CLI 入口。
2. 解释 Task/Tool/AgentStep 这类核心类型。
3. 追踪 main -> run -> tool -> observation 调用链。
4. 标注文件读写、子进程和权限确认位置。

我还需要强化：
1. 复杂泛型。
2. ESM/CommonJS 细节。
3. 大型项目调试。
```

## 常见坑

- 把“没读完整个项目”当作失败。
- 报告只写感受，不写证据。
- 不记录未懂部分。
- 不按时间盒推进，前 30 分钟就陷入细节。

## 过关标准

你能在 2 小时内读一个小型 TS + Node.js CLI 项目，并输出一份包含入口、模块、核心类型、调用链、异步、文件、子进程、权限逻辑的源码阅读报告。

## 有余力再做

选择一个合法公开的小型 TS CLI 项目，按照模板完成一次真实验收。
