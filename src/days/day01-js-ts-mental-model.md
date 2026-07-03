# Day 01：JS/TS 心智模型

## 今日目标

今天只建立一个核心判断：**TypeScript 不是一门会在运行时保护你的新语言，它是 JavaScript 之上的静态类型层。**

你从 C 语言过来，最容易带着“类型决定内存布局、编译产物就是最终程序”的直觉看 TypeScript。这个直觉有一半有用，一半会误导你。TypeScript 会在开发阶段帮你检查类型，但最终交给 Node.js 运行的是 JavaScript。很多 TypeScript 类型，比如 `interface`、`type`，运行时根本不存在。

今天结束时，你不需要掌握很多语法，只需要能回答三个问题：

1. TypeScript 和 JavaScript 到底是什么关系？
2. 为什么 TypeScript 类型检查通过，不等于运行时一定安全？
3. 阅读一个 Node.js 项目时，为什么第一站通常是 `package.json`？

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | 建立 JS/TS/C 的运行模型差异 |
| 35 分钟 | 代码练习 | 写一个最小 `.ts` 文件，观察类型检查与运行输出 |
| 25 分钟 | 源码阅读训练 | 阅读一个 `package.json` 样例，识别入口字段 |
| 15 分钟 | 复盘笔记 | 写下 3 个你真的能解释的结论 |

## 必学知识点

1. TypeScript 类型检查发生在运行前，运行时仍是 JavaScript。
2. JavaScript 的对象、数组、函数是高频核心值，读源码要重点看数据形状。
3. `package.json` 是 Node.js 项目的入口地图，读源码不要先凭文件名猜。

## 先讲清楚：TypeScript 到底加了什么？

可以把 TypeScript 暂时理解成两层：

```text
你写的 .ts 源码
  = JavaScript 运行时代码
  + TypeScript 类型信息
```

例如：

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

里面真正会留到运行时的主要是：

```js
function add(a, b) {
  return a + b;
}
```

`a: number`、`b: number`、`: number` 这些类型标注，主要用于开发阶段检查。它们很重要，但不是运行时防护栏。

这件事对源码阅读特别关键。你以后读 AI Agent CLI 项目时，会同时看到两种信息：

- **运行时流程**：函数怎么调用、文件怎么读写、命令怎么执行。
- **类型设计**：作者如何定义任务、工具、消息、权限、上下文。

读 TypeScript 源码时，不要只看类型，也不要只看函数体。二者要合起来看。

## C 语言类比

| C 语言直觉 | TypeScript/JavaScript 中的对应理解 |
| -- | -- |
| 编译器检查类型，并生成机器码 | TypeScript 检查类型，通常生成 JavaScript |
| `struct` 影响内存布局 | `interface` 只描述对象形状，运行时不存在 |
| `main()` 常是入口 | Node.js 项目入口通常从 `package.json` 找 |
| 类型错误多在编译期暴露 | TS 能提前发现一部分错误，但运行时仍可能出错 |
| 头文件/源文件配合构建 | TS 用 module、`package.json`、`tsconfig` 组织项目 |

特别记住：**不要把 `interface` 当作 C 的 `struct`。**  
`interface` 更像一张“开发时检查清单”，不是内存布局说明书。

## 代码练习：一步步写第一个 TS 文件

### 第 1 步：创建文件

创建 `day01-hello.ts`：

```ts
const language: string = "TypeScript";
const days: number = 30;

function describeCourse(name: string, totalDays: number): string {
  return `${name} course: ${totalDays} days`;
}

console.log(describeCourse(language, days));
```

### 第 2 步：运行它

任选一种方式：

```bash
npx tsx day01-hello.ts
```

或者：

```bash
npx tsc day01-hello.ts
node day01-hello.js
```

预期输出：

```text
TypeScript course: 30 days
```

### 第 3 步：故意制造一个类型错误

把最后一行改成：

```ts
console.log(describeCourse(language, "30"));
```

你应该看到 TypeScript 报错：第二个参数需要 `number`，但你传了 `string`。

这里要观察的不是“怎么修”，而是这个事实：

```text
TypeScript 在运行前提醒你：这个调用不符合函数签名。
```

这就是它对源码阅读的价值。函数签名会告诉你作者期待什么输入和输出。

### 第 4 步：理解运行时代码

如果你用 `tsc` 编译，会得到 `day01-hello.js`。打开它，你会发现类型标注消失了。这说明：

```text
类型帮助你理解和检查源码，但 Node.js 运行的是 JavaScript。
```

## 源码阅读训练：从 package.json 找入口

今天先不读复杂源码，只读一个入口地图。看这个简化版 `package.json`：

```json
{
  "name": "example-cli",
  "type": "module",
  "bin": {
    "example": "./dist/cli.js"
  },
  "main": "./dist/index.js",
  "exports": {
    ".": "./dist/index.js"
  },
  "scripts": {
    "dev": "tsx src/cli.ts",
    "build": "tsc"
  }
}
```

按顺序回答：

1. 如果用户在终端输入 `example`，入口文件可能是哪个？
2. 如果别的项目 `import "example-cli"`，入口文件可能是哪个？
3. 开发时运行 `npm run dev`，实际执行什么命令？
4. `"type": "module"` 暗示这个项目更偏 ESM 还是 CommonJS？

参考答案：

1. CLI 命令入口是 `./dist/cli.js`，来自 `bin.example`。
2. 库入口是 `./dist/index.js`，来自 `main` 或 `exports["."]`。
3. `npm run dev` 执行 `tsx src/cli.ts`。
4. `"type": "module"` 表示 `.js` 默认按 ESM 模块理解。

## 今天的源码阅读方法

以后读 TypeScript/Node.js 项目，先按这个顺序看：

```text
README -> package.json -> scripts/bin/main/exports -> tsconfig -> 入口文件
```

今天只练 `package.json`。不要急着读 `src` 目录。会找入口，比盲目打开一堆文件重要。

## 当天产出

- 一个 `day01-hello.ts` 文件。
- 一段 10 行以内的笔记：TypeScript 和 C 的 3 个关键不同。
- 一个 `package.json` 入口字段分析，至少写出 `bin`、`main`、`scripts` 的作用。

## 参考笔记示例

```md
# Day 01 笔记

1. TypeScript 是 JavaScript 的类型层，运行时主要还是 JavaScript。
2. `interface/type` 这类类型信息不会像 C struct 一样存在于运行时。
3. Node.js CLI 项目要先看 package.json，尤其是 bin 和 scripts。

我今天看懂了：函数签名能告诉我调用方应该传什么。
我还没看懂：ESM 和 CommonJS 的区别。
明天继续追踪：对象引用和 const 的含义。
```

## 常见坑

- 以为 TypeScript 类型会在运行时自动保护你。
- 看到 `interface` 就当作 C 的 `struct`。
- 忽略 `package.json`，直接从 `src/index.ts` 猜入口。
- 只看代码能不能跑，不看编译出来的 JavaScript 长什么样。

## 过关标准

今天算过关，不是因为你记住了很多语法，而是因为你能清楚说出：

1. TypeScript 检查源码，Node.js 运行 JavaScript。
2. 类型信息能帮助读源码，但多数类型运行时不存在。
3. `package.json` 里的 `bin`、`main`、`scripts` 分别指向不同使用场景。

## 有余力再做

打开一个真实项目的 `package.json`，只做一件事：把 `scripts`、`bin`、`main`、`exports` 复制到笔记里，并用中文逐行解释。

