# Day 14：tsconfig、声明文件与阶段二复盘

## 今日目标

理解 `tsconfig`、`.d.ts`、项目类型边界，并完成第 2 周复盘。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | `tsconfig`、`strict`、`.d.ts` |
| 35 分钟 | 代码练习 | 调整项目 1 配置 |
| 25 分钟 | 源码阅读训练 | 阅读一个 `tsconfig.json` |
| 15 分钟 | 复盘笔记 | 回答第 2 周问题 |

## 必学知识点

1. `strict` 决定类型检查严格程度。
2. `include`/`exclude` 决定项目包含哪些文件。
3. `.d.ts` 是类型声明，不是普通实现文件。

## C 语言类比

`.d.ts` 有点像头文件：它描述外部模块能提供什么类型和接口。但 C 头文件可能影响编译链接，TS 声明文件更多服务于类型检查和编辑器提示。

## 代码练习

为项目 1 创建或调整 `tsconfig.json`：

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

运行 `npx tsc --noEmit`，修复所有类型错误。

## 源码阅读训练

阅读一个真实项目的 `tsconfig.json`。只看：它包含哪些源码？是否开启 `strict`？模块系统是什么？

## 当天产出

- 项目 1 的 `tsconfig.json`。
- 第 2 周复盘笔记。

## 第 2 周复盘问题

- 我能不能解释一个泛型函数的类型含义？
- 我能不能看懂 `interface`、`type`、union 的区别？
- 我能不能解释 discriminated union 的判别字段？
- 我能不能把 `Pick`/`Omit` 翻译成自然语言？
- 我能不能从 `tsconfig` 看出项目编译边界？

## 常见坑

- 看到 `.d.ts` 就找函数实现。
- 忽略 `moduleResolution`，导致 import 行为难理解。
- 不开 `strict`，练习时少掉很多反馈。

## 过关标准

你能说清楚一个项目的 `tsconfig` 主要控制什么，并能解释 `.d.ts` 的作用。

## 有余力再做

找一个包的 `@types/*` 声明文件，阅读一个函数签名。

