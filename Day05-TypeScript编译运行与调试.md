# Day 05：TypeScript 编译、运行与调试

## 今日目标

理解 TypeScript 从源码到运行的基本链路：类型检查、编译、执行、调试。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | `tsc`、`tsx`、`node`、source map |
| 35 分钟 | 代码练习 | 建立最小 TS 项目 |
| 25 分钟 | 源码阅读训练 | 阅读一个 `tsconfig.json` 的 3 个字段 |
| 15 分钟 | 复盘笔记 | 写出编译运行链路 |

## 必学知识点

1. `tsc` 做类型检查和编译。
2. `tsx` 适合开发期直接运行 TS。
3. `tsconfig.json` 决定 TypeScript 如何理解项目。

## C 语言类比

C 的编译器把源码变成目标文件和可执行文件；TypeScript 编译器通常把 `.ts` 变成 `.js`，类型信息大多被擦除。`tsconfig` 类似一份项目级编译配置。

## 代码练习

创建最小项目结构：

```text
day05-project/
  package.json
  tsconfig.json
  src/index.ts
```

`src/index.ts`：

```ts
function main(): void {
  console.log("compile and run TypeScript");
}

main();
```

练习命令：

```bash
npx tsc --init
npx tsc --noEmit
npx tsx src/index.ts
```

## 源码阅读训练

阅读一个项目的 `tsconfig.json`，今天只看 `target`、`module`、`strict`。记录它们分别影响什么。

## 当天产出

- 一个最小 TS 项目。
- 一条链路笔记：`.ts -> 类型检查 -> .js -> node 执行`。
- `tsconfig` 三字段说明。

## 常见坑

- 以为 `tsc` 一定会运行代码。
- 没开 `strict`，导致很多类型问题被放过。
- 不知道项目实际运行的是编译后的 JS 还是开发期 TS。

## 过关标准

你能说清楚 `npx tsc --noEmit` 和 `npx tsx src/index.ts` 的区别。

## 有余力再做

在 VS Code 里给 `main()` 打断点，尝试调试运行。

