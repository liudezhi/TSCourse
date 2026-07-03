# Day 05：TypeScript 编译、运行与调试

## 今日目标

今天把“能运行 TypeScript”这件事拆清楚。很多初学者会混淆 `tsc`、`tsx`、`node`：有的负责类型检查，有的负责开发期运行，有的只能运行 JavaScript。

今天结束时，你要能说清楚：

1. `tsc --noEmit` 在检查什么？
2. `tsx src/index.ts` 为什么能直接跑 TS？
3. Node.js 最终运行的是什么？

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | `tsc`、`tsx`、`node`、`tsconfig` |
| 35 分钟 | 代码练习 | 建立最小 TS 项目并执行检查 |
| 25 分钟 | 源码阅读训练 | 阅读一个 `tsconfig.json` 的 3 个字段 |
| 15 分钟 | 复盘笔记 | 写出编译运行链路 |

## 必学知识点

1. `tsc` 是 TypeScript 编译器，可做类型检查和编译。
2. `tsx` 常用于开发期直接运行 `.ts` 文件。
3. `tsconfig.json` 是项目级 TypeScript 配置。

## 先讲清楚：三个命令的分工

```text
tsc --noEmit
  只检查类型，不输出 JS。

tsx src/index.ts
  开发期直接运行 TS。

node dist/index.js
  运行已经生成的 JS。
```

真实项目常见流程是：

```text
写 .ts
  -> tsc 检查类型
  -> 构建产物 .js
  -> node 运行 .js
```

开发时为了省事，会用 `tsx` 直接跑 `.ts`。

## C 语言类比

| C 语言 | TypeScript/Node.js |
| -- | -- |
| 编译器检查并生成二进制 | `tsc` 检查并生成 JS |
| 编译配置影响整个项目 | `tsconfig.json` 影响类型检查和输出 |
| 可执行文件才真正运行 | Node.js 运行 JS 文件 |
| 调试时从入口设置断点 | TS 项目也从入口文件开始调试 |

TypeScript 的“编译”不是生成机器码，而是把 TS 变成 JS。

## 代码练习：建立最小 TS 项目

### 第 1 步：创建目录

```text
day05-compile/
  package.json
  tsconfig.json
  src/
    index.ts
```

`package.json`：

```json
{
  "type": "module",
  "scripts": {
    "check": "tsc --noEmit",
    "dev": "tsx src/index.ts"
  },
  "devDependencies": {
    "typescript": "latest",
    "tsx": "latest"
  }
}
```

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

### 第 2 步：写入口文件

`src/index.ts`：

```ts
function main(): void {
  const message: string = "compile and run TypeScript";
  console.log(message);
}

main();
```

### 第 3 步：运行检查和开发命令

```bash
npm run check
npm run dev
```

预期：

```text
npm run check 没有错误输出
npm run dev 打印 compile and run TypeScript
```

### 第 4 步：故意制造错误

改成：

```ts
const message: number = "compile and run TypeScript";
```

再运行：

```bash
npm run check
```

你会看到类型错误。这个练习的重点是：**类型检查命令能在运行前阻止明显错误。**

## 源码阅读训练：读 tsconfig 的三个字段

阅读：

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "strict": true
  },
  "include": ["src"]
}
```

回答：

1. `target` 大概控制什么？
2. `module` 大概控制什么？
3. `strict` 开启后意味着什么？
4. `include` 表示项目主要源码在哪里？

参考答案：

- `target` 控制输出 JS 面向哪个 ECMAScript 版本。
- `module` 控制模块系统。
- `strict` 开启更严格的类型检查。
- `include` 表示 TypeScript 只把 `src` 纳入项目检查范围。

## 当天产出

- 一个最小 TS 项目。
- 一段命令解释：`check`、`dev` 分别做什么。
- 一个 `tsconfig` 三字段说明。

## 参考笔记示例

```md
# Day 05 笔记

tsc --noEmit：只做类型检查，不生成 JS。
tsx src/index.ts：开发期直接运行 TS。
node：通常运行编译后的 JS。

tsconfig:
- target: JS 版本
- module: 模块系统
- strict: 类型检查严格程度
```

## 常见坑

- 以为 `tsc` 一定会运行代码。
- 没开 `strict`，导致很多类型问题被放过。
- 不知道项目实际运行的是编译后的 JS 还是开发期 TS。
- 把 `tsconfig` 当作可有可无的文件。

## 过关标准

你能解释：

1. `npm run check` 为什么不打印业务输出。
2. `npm run dev` 为什么能运行 `.ts`。
3. `tsconfig.json` 至少三个字段的含义。

## 有余力再做

把 `noEmit` 改为 `false`，设置 `outDir: "dist"`，运行 `npx tsc`，观察生成的 JS 文件。

