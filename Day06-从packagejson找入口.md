# Day 06：从 package.json 找项目入口

## 今日目标

训练源码阅读的第一步：从 `package.json` 找到 CLI、库入口、构建脚本和模块暴露方式。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | `bin`、`main`、`exports`、`type` |
| 35 分钟 | 代码练习 | 写一个带 `bin` 的最小 CLI |
| 25 分钟 | 源码阅读训练 | 分析一个真实包的入口 |
| 15 分钟 | 复盘笔记 | 写入口追踪步骤 |

## 必学知识点

1. `bin` 通常是 CLI 命令入口。
2. `main`/`exports` 通常是库被导入时的入口。
3. `type: "module"` 会影响 ESM/CommonJS 行为。

## C 语言类比

C 程序习惯找 `main()`；Node.js 项目要先找 `package.json`，再顺着 `bin`、`main`、`exports` 找真正入口。CLI 项目的“main”不一定叫 `main.ts`。

## 代码练习

创建 `day06-cli/package.json`：

```json
{
  "name": "day06-cli",
  "type": "module",
  "bin": {
    "day06": "./src/index.ts"
  },
  "scripts": {
    "dev": "tsx src/index.ts"
  }
}
```

创建 `src/index.ts`：

```ts
#!/usr/bin/env node

console.log("hello cli");
console.log(process.argv.slice(2));
```

用 `npx tsx src/index.ts hello` 运行。

## 源码阅读训练

选一个命令行工具类 npm 包，只回答一个问题：如果用户敲这个命令，`package.json` 指向哪个文件？

## 当天产出

- 一个最小 CLI 入口。
- 一篇入口追踪笔记：`package.json -> bin -> src/index.ts`。

## 常见坑

- 把 `scripts` 当成发布后的用户命令。
- 忽略 `bin` 字段。
- 没注意 ESM 与 CommonJS 的配置差异。

## 过关标准

你能从 `package.json` 找到 CLI 入口，并解释 `process.argv.slice(2)` 得到什么。

## 有余力再做

用 `npm link` 在本机临时注册命令，但不作为今天必做。

