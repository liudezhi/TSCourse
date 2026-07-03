# Day 14：tsconfig、声明文件与阶段二复盘

## 今日目标

今天补上 TypeScript 工程化的两个基础概念：`tsconfig.json` 和 `.d.ts` 声明文件。然后复盘第二阶段前半段类型系统内容。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | `tsconfig`、`strict`、`.d.ts` |
| 35 分钟 | 代码练习 | 给项目 1 加严格配置 |
| 25 分钟 | 源码阅读训练 | 阅读一个 `tsconfig.json` |
| 15 分钟 | 复盘笔记 | 回答第 2 周问题 |

## 必学知识点

1. `strict` 决定类型检查严格程度。
2. `include`/`exclude` 决定哪些文件进入项目。
3. `.d.ts` 是类型声明文件，不是实现文件。

## 先讲清楚：tsconfig 是项目边界

TypeScript 项目不是“所有文件都自动检查”。`tsconfig.json` 会告诉编译器：

```text
看哪些文件？
按什么 JS 版本理解？
用哪种模块系统？
检查严格到什么程度？
要不要输出 JS？
```

源码阅读时，`tsconfig` 能帮你判断项目工程环境。

## C 语言类比

`.d.ts` 有点像头文件：它描述外部模块有哪些类型和函数。但不要完全等同。`.d.ts` 主要给 TypeScript 类型检查和编辑器提示使用，并不包含真实实现。

## 代码练习：给项目 1 加 tsconfig

`tsconfig.json`：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

运行：

```bash
npx tsc --noEmit
```

如果出现错误，不要急着绕过。先读错误信息：

```text
哪个文件？
哪一行？
哪个类型不匹配？
```

## 源码阅读训练：读配置

阅读：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "strict": true,
    "declaration": true,
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"]
}
```

回答：

1. 输出目录在哪里？
2. 是否生成 `.d.ts`？
3. 模块系统是什么？
4. 源码范围是什么？

参考答案：

输出到 `dist`；`declaration: true` 表示生成声明文件；模块系统是 CommonJS；源码范围是 `src/**/*.ts`。

## 第 2 周复盘问题

- 我能不能解释一个泛型函数的类型含义？
- 我能不能看懂 `interface`、`type`、union 的区别？
- 我能不能解释 discriminated union 的判别字段？
- 我能不能把 `Pick`/`Omit` 翻译成自然语言？
- 我能不能从 `tsconfig` 看出项目编译边界？

## 当天产出

- 项目 1 的 `tsconfig.json`。
- 一篇 `tsconfig` 阅读笔记。
- 第 2 周复盘笔记。

## 参考笔记示例

```md
# Day 14 笔记

strict: true 让类型检查更严格。
include: ["src"] 表示只检查 src。
.d.ts 是类型声明，不是函数实现。

我现在能读懂：Task union、泛型函数、Omit/Partial。
我还薄弱：复杂 tsconfig 和 module 配置。
```

## 常见坑

- 看到 `.d.ts` 就找函数实现。
- 不看 `include`，误以为所有文件都被检查。
- 不开 `strict`，练习时少掉重要反馈。
- 忽略 `module`/`moduleResolution`。

## 过关标准

你能说清楚一个 `tsconfig` 至少控制：源码范围、模块系统、目标版本、严格模式。

## 有余力再做

找一个包的 `dist/*.d.ts`，阅读一个函数声明，尝试找到对应实现文件。

