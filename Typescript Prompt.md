你是一名 TypeScript 高级工程师、Node.js 工程专家、AI Coding Agent 源码阅读专家，同时也是一名擅长从零设计课程的编程老师。你的任务是为我设计一套 30 天的 TypeScript 精品自学课程。

# 30 天 TypeScript 精品课程设计 Prompt

## 一、我的背景

我会 C 语言，有一定编程基础，但 TypeScript / JavaScript / Node.js 基础较弱。

我每天最多学习 **90 分钟**。

我的最终目标不是只会写简单 TypeScript，而是：

1. 能读懂中大型 TypeScript 项目源码。
2. 能理解 Claude Code / AI Agent CLI / 自动化编程工具这类项目的核心工程结构。
3. 能看懂常见源码中的类型系统、异步流程、模块组织、CLI 命令、文件操作、进程调用、配置系统、插件机制、权限控制、工具调用循环等内容。
4. 30 天后可以独立阅读一个 TypeScript + Node.js 项目，并能画出模块结构图、调用链、核心数据流。

注意：课程应以合法公开的 TypeScript / Node.js / AI Agent 类源码、官方文档、用户提供的源码片段或本地合法安装包中可阅读的代码为练习对象，不要依赖未授权泄露源码。

---

## 二、课程总目标

请你设计一套 **30 天 TypeScript 精品自学课程**。

课程不能只是普通的 TypeScript 入门课，而要服务于一个明确目标：

> 从 C 程序员视角，30 天内建立 TypeScript + Node.js + CLI + AI Agent 源码阅读的主干能力，最终能够读懂 Claude Code / AI Agent CLI 类项目的源码结构。

如果你认为 30 天目标过重，请不要否定目标，而是把目标拆成：

1. **30 天必须掌握**
2. **30 天后继续强化**

---

## 三、每天学习时间约束

我每天最多学习 **90 分钟**，请严格按照 90 分钟设计每天内容，不要设计成 2-3 小时才能完成的课程。

每天建议按以下节奏安排：

### 1. 15 分钟：概念学习

* 只讲当天最核心的 1-3 个知识点。
* 不要堆太多语法点。
* 必须结合 C 语言做类比。

### 2. 35 分钟：代码练习

* 写一个小而完整的 TypeScript 练习。
* 练习必须可以在本地运行。
* 代码量不要太大，优先保证理解。

### 3. 25 分钟：源码阅读训练

* 阅读真实项目或示例项目中的一小段源码。
* 每天只追踪一个小目标，例如：

  * 找入口文件
  * 看懂一个 interface
  * 看懂一个 async 函数
  * 看懂一个 CLI 参数解析流程
  * 看懂一个工具函数调用链
* 不要要求一天读完整个项目。

### 4. 15 分钟：复盘与笔记

用自己的话总结当天知识，并记录 3 个问题：

1. 今天我看懂了什么？
2. 今天我哪里没看懂？
3. 明天需要继续追踪什么？

课程设计时，请明确区分：

* **90 分钟内必须完成**
* **有余力再做**
* **30 天后继续强化**

如果某个知识点很重要但 90 分钟内无法彻底掌握，请拆成多天，不要压缩到一天。

特别注意：我每天只有 90 分钟，所以课程要“少而精”。每天不要超过 3 个核心知识点。课程目标不是 30 天精通 TypeScript，而是 30 天建立 TypeScript + Node.js + CLI + AI Agent 源码阅读的主干能力。

---

## 四、课程必须覆盖的能力

### 1. TypeScript 基础能力

包括但不限于：

* JavaScript 与 TypeScript 的关系
* 变量、函数、对象、数组
* 类型注解
* interface / type
* union / literal type
* enum 或替代方案
* class
* 泛型
* 类型收窄
* discriminated union
* utility types
* type guard
* async / await
* Promise
* error handling
* module import/export
* ESM / CommonJS 基础差异
* tsconfig
* npm scripts
* 编译、运行、调试

---

### 2. 从 C 到 TypeScript 的迁移理解

请把重点知识点和 C 语言做类比，例如：

* C 的 struct 与 TypeScript interface/type 的区别
* C 的 enum 与 TypeScript union literal 的区别
* C 的指针思维与 JavaScript 引用对象的区别
* C 的编译期类型检查与 TypeScript 类型检查的区别
* C 的同步流程与 JavaScript 异步事件循环的区别
* C 的头文件/源文件与 TypeScript module 的区别
* C 的函数指针与 TypeScript callback / higher-order function 的区别
* C 的错误码处理与 TypeScript exception / Result 风格的区别

---

### 3. Node.js 工程能力

因为目标是读懂 Claude Code / Agent CLI 类源码，请课程必须包含 Node.js 工程基础：

* package.json
* npm / pnpm 基本使用
* node_modules 结构
* CLI 程序入口
* shebang
* process.argv
* 环境变量
* 文件读写 fs
* 路径 path
* 子进程 child_process
* stream 基础
* readline / terminal interaction
* 配置文件读取
* JSON / YAML / Markdown 处理
* 日志
* 错误处理
* 项目目录结构

---

### 4. 源码阅读能力

课程必须专门训练源码阅读方法，而不是只写 demo。

请设计源码阅读训练，包括：

* 如何从 package.json 找入口
* 如何看 bin 字段
* 如何看 exports 字段
* 如何看 tsconfig
* 如何从 CLI 命令追踪调用链
* 如何搜索关键词
* 如何看类型定义
* 如何理解函数调用栈
* 如何画模块依赖图
* 如何画数据流图
* 如何识别核心抽象
* 如何识别边界层、业务层、工具层
* 如何记录源码阅读笔记
* 如何用 AI 辅助阅读源码但不盲信 AI

---

### 5. AI Agent / Claude Code 类项目理解

请加入 AI Agent CLI 类项目的架构理解，但不要求涉及模型底层训练。

重点讲：

* CLI 如何接收用户输入
* prompt / system prompt / context 的组织
* tool calling 的基本思想
* agent loop：接收任务 → 调用模型 → 选择工具 → 执行工具 → 观察结果 → 继续循环
* 文件编辑工具
* shell 执行工具
* 权限确认机制
* session / history 存储
* context compaction / 上下文压缩
* plugin / hook / MCP 类扩展机制的基础概念
* 安全边界：为什么不能随便执行命令
* 如何从源码中识别这些模块

---

## 五、课程阶段划分要求

请把 30 天拆成 4 个阶段：

## 第 1 阶段：TypeScript 语法与 JavaScript 心智模型

目标：从 C 程序员视角建立 JS/TS 基础心智模型。

重点包括：

* JS/TS 与 C 的关键差异
* 变量、函数、对象、数组
* 基础类型
* module
* npm 基础
* TypeScript 编译运行流程

---

## 第 2 阶段：TypeScript 类型系统与工程化

目标：能看懂真实项目中常见的类型、泛型、联合类型、工具类型、模块组织和 tsconfig。

重点包括：

* interface / type
* union / literal type
* discriminated union
* 泛型
* 类型收窄
* utility types
* tsconfig
* 项目结构
* 类型定义文件

---

## 第 3 阶段：Node.js CLI 与异步工程能力

目标：能写一个小型 CLI 工具，理解文件系统、命令行参数、子进程、异步、日志、配置。

重点包括：

* CLI 入口
* process.argv
* fs / path
* async / await
* Promise
* 子进程
* 配置文件
* 日志
* 错误处理
* 简单测试

---

## 第 4 阶段：AI Agent CLI 源码阅读实战

目标：能阅读一个 Claude Code / AI Agent CLI 类项目，理解入口、主循环、工具调用、权限、上下文、插件机制和核心模块关系。

重点包括：

* agent loop
* tool calling
* session
* context
* permission
* hooks
* plugin
* file edit tool
* shell tool
* 源码结构分析
* 模块依赖图
* 调用链图
* 最终源码阅读报告

---

## 六、项目实战要求

30 天课程中必须设计 3 个逐步升级的小项目。

---

### 项目 1：TypeScript 类型练习项目

目标：练习 interface、type、union、泛型、类型收窄。

要求包括：

* 定义任务数据结构
* 定义不同状态
* 使用 union type 表示状态
* 使用 type guard 判断类型
* 使用泛型函数处理列表
* 输出一个简单的任务统计结果

---

### 项目 2：Node.js CLI 工具

目标：写一个命令行工具，例如：

* 扫描目录
* 读取 Markdown
* 统计 TODO
* 生成报告
* 支持命令行参数
* 支持配置文件

要求包括：

* package.json
* bin 入口
* src 目录
* CLI 参数解析
* 文件读取
* 异步处理
* 错误处理
* 输出报告

---

### 项目 3：Mini Agent CLI

目标：写一个极简版 AI Agent CLI 框架，可以不真正调用大模型，但要模拟以下流程：

* 用户输入任务
* 系统解析任务
* 根据任务选择工具
* 执行工具
* 返回观察结果
* 记录 session
* 支持权限确认
* 支持简单 hook

这个项目的目的不是做出完整 AI 工具，而是帮助我理解 Claude Code 类项目的源码结构。

---

## 七、每天课程输出格式

请严格按照以下格式输出每天内容。

# 30 天 TypeScript 精品课程：从 C 程序员到读懂 Claude Code 类源码

## 课程总目标

## 适合人群

## 学习前置条件

## 30 天总体路线图

请用表格列出：

| 天数 | 阶段 | 主题 | 核心能力 | 当天产出 |
| -- | -- | -- | ---- | ---- |

---

## 阶段一：Day 1 - Day X

每天按照以下格式输出：

### Day 1：标题

**今日目标：**

**90 分钟安排：**

| 时间    | 任务     | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习   |    |
| 35 分钟 | 代码练习   |    |
| 25 分钟 | 源码阅读训练 |    |
| 15 分钟 | 复盘笔记   |    |

**必学知识点：**

最多列 1-3 个核心知识点。

**C 语言类比：**

用 C 语言帮助我理解当天知识点。

**代码练习：**

给出当天需要完成的小练习，要求小而完整，可以运行。

**源码阅读训练：**

给出当天需要阅读或分析的源码目标。

要求每天只追踪一个小目标，不要一次读太多。

**当天产出：**

明确写出当天结束后我应该留下什么产出物，例如：

* 一个 `.ts` 文件
* 一个小 CLI
* 一张调用链图
* 一篇源码阅读笔记
* 一个项目目录结构说明

**常见坑：**

列出 C 程序员或 TypeScript 初学者容易踩的坑。

**过关标准：**

明确我学到什么程度算过关。

**有余力再做：**

给出可选扩展，不计入 90 分钟必做内容。

---

后续每天同样格式。

---

## 八、三个实战项目说明

请详细说明每个项目的：

* 项目目标
* 项目目录结构
* 核心功能
* 关键 TypeScript 知识点
* 扩展任务
* 如何验收

---

## 九、每周复盘问题

请为每周设计复盘问题，例如：

* 我今天能不能看懂真实源码中的 import/export？
* 我能不能从 package.json 找到入口？
* 我能不能解释一个泛型函数的类型含义？
* 我能不能画出 CLI 的调用链？
* 我能不能解释 agent loop？
* 我能不能说清楚一个 TypeScript 项目的目录结构？
* 我能不能说清楚一个 CLI 命令从输入到执行的全过程？

---

## 十、重点难点清单

请列出这 30 天最难的 15 个知识点，并说明：

* 为什么难
* C 程序员容易误解在哪里
* 怎么突破
* 推荐练习方式

重点至少包含：

* JS 对象引用模型
* async / await
* Promise
* ESM / CommonJS
* 泛型
* 类型收窄
* discriminated union
* utility types
* tsconfig
* package.json
* CLI 入口
* 子进程
* agent loop
* tool calling
* permission / sandbox 思维

---

## 十一、源码阅读方法论

请给我一套固定流程，帮助我以后阅读 TypeScript 项目源码。流程至少包含：

1. 看 README
2. 看 package.json
3. 找 bin / main / exports
4. 看 tsconfig
5. 找入口文件
6. 跑起来
7. 打断点
8. 找核心数据结构
9. 找核心流程
10. 画调用链
11. 写阅读笔记
12. 用自己的话复述架构

请同时给出一个“源码阅读笔记模板”。

---

## 十二、最终验收任务

第 30 天结束时，请设计一个最终验收任务：

> 给定一个 TypeScript + Node.js CLI 项目，我需要在 2 小时内完成源码阅读，并输出一份源码阅读报告。

请给出源码阅读报告模板，模板必须包含：

* 项目用途
* 运行方式
* 入口文件
* 主要模块
* 核心类型
* 核心流程
* 关键调用链
* 异步流程
* 文件读写位置
* 子进程调用位置
* 权限/安全相关逻辑
* 我还没看懂的地方
* 下一步阅读计划

---

## 十三、学习建议

请给出适合我的学习建议：

* 每天如何安排 90 分钟
* 如何记笔记
* 如何用 AI 辅助学习
* 如何避免只看不练
* 如何从写 demo 过渡到读源码
* 如何判断自己真的懂了
* 如何安排复盘
* 如何处理当天没学完的情况

---

## 十四、生成要求

请不要只给空泛建议。每一天都要具体到可以执行。

请优先保证：

1. 路线清晰
2. 难度递进
3. 每天有产出
4. 和 C 语言形成对比
5. 强调源码阅读
6. 强调 Node.js CLI 工程能力
7. 最终服务于读懂 Claude Code / AI Agent CLI 类源码
8. 每天严格控制在 90 分钟内
9. 每天不要超过 3 个核心知识点
10. 不要把高级内容强行压缩到一天

请用中文输出。
