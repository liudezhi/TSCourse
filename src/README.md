## 课程总目标

30 天内建立 TypeScript + Node.js + CLI + AI Agent 源码阅读的主干能力。目标不是“精通全部语法”，而是能从 C 程序员视角读懂一个 TypeScript + Node.js CLI 项目的入口、模块结构、类型定义、异步流程、工具调用和安全边界。

## 适合人群

会 C 语言，有基本编程经验，但 JavaScript、TypeScript、Node.js 基础较弱；希望以后能阅读 Claude Code / AI Agent CLI / 自动化编程工具类项目源码。

## 学习前置条件

- 会使用终端运行命令。
- 安装 Node.js LTS。
- 安装 VS Code 或任意支持 TypeScript 的编辑器。
- 每天最多投入 90 分钟，严格少而精。

## 30 天总体路线图

| 天数 | 阶段 | 主题 | 核心能力 | 当天产出 |
| -- | -- | -- | ---- | ---- |
| 1 | 阶段一 | JS/TS 与 C 的差异 | 运行模型、动态值、类型检查边界 | 学习笔记 |
| 2 | 阶段一 | 变量、函数、对象 | 值、引用、函数调用 | `variables-functions.ts` |
| 3 | 阶段一 | 数组与对象建模 | 对象引用、数组处理 | `tasks-basic.ts` |
| 4 | 阶段一 | module 与 npm | import/export、package.json | 模块小项目 |
| 5 | 阶段一 | 编译运行流程 | tsc、tsx、npm scripts | 可运行 TS 项目 |
| 6 | 阶段一 | package.json 找入口 | bin/main/exports | 入口分析笔记 |
| 7 | 阶段一 | 阶段复盘 | 基础源码阅读 | 第 1 周复盘 |
| 8 | 阶段二 | interface/type | 数据结构建模 | 项目 1 骨架 |
| 9 | 阶段二 | union/literal | 状态表达 | 任务状态模型 |
| 10 | 阶段二 | 类型收窄/type guard | 安全访问字段 | 状态统计函数 |
| 11 | 阶段二 | 泛型 | 可复用数据处理 | 泛型列表工具 |
| 12 | 阶段二 | discriminated union | 真实项目状态机 | 项目 1 完成 |
| 13 | 阶段二 | utility types | 读懂工具类型 | 类型阅读笔记 |
| 14 | 阶段二 | tsconfig/声明文件 | 工程边界 | 第 2 周复盘 |
| 15 | 阶段二 | 项目结构阅读 | 分层、依赖、调用链 | 模块依赖图 |
| 16 | 阶段三 | CLI 入口 | shebang、bin、argv | 项目 2 骨架 |
| 17 | 阶段三 | fs/path | 文件扫描 | 目录扫描 CLI |
| 18 | 阶段三 | async/Promise | 异步文件处理 | TODO 统计器 |
| 19 | 阶段三 | 配置与错误 | config、Result 思维 | 配置读取 |
| 20 | 阶段三 | child_process | 外部命令调用 | 子进程实验 |
| 21 | 阶段三 | stream/readline/log | 终端交互 | 第 3 周复盘 |
| 22 | 阶段三 | CLI 调试与测试 | 断点、最小测试 | 测试笔记 |
| 23 | 阶段三 | CLI 调用链阅读 | 从命令追到函数 | 项目 2 报告 |
| 24 | 阶段四 | Agent loop | 主循环与工具选择 | 项目 3 骨架 |
| 25 | 阶段四 | tool calling | 工具注册与执行 | 工具系统 |
| 26 | 阶段四 | permission/sandbox | 安全边界 | 权限确认 |
| 27 | 阶段四 | session/context | 历史与上下文 | session 存储 |
| 28 | 阶段四 | hook/plugin/MCP | 扩展机制 | 第 4 周复盘 |
| 29 | 阶段四 | 源码阅读方法论 | 固定阅读流程 | 阅读模板 |
| 30 | 阶段四 | 最终验收 | 2 小时源码阅读报告 | 最终报告模板 |