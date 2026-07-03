# Day 06：从 package.json 找项目入口

## 今日目标

今天专门训练源码阅读第一步：**不要猜入口，先读 `package.json`。**

你以后读 CLI 项目，尤其是 Agent CLI 项目，入口可能藏在 `bin`、`exports`、`scripts` 或构建产物里。今天只练一件事：从 `package.json` 追到入口文件。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | `bin`、`main`、`exports`、`type` |
| 35 分钟 | 代码练习 | 写一个带 `bin` 的最小 CLI |
| 25 分钟 | 源码阅读训练 | 分析一个真实或样例包的入口 |
| 15 分钟 | 复盘笔记 | 写入口追踪步骤 |

## 必学知识点

1. `bin` 通常指向 CLI 命令入口。
2. `main`/`exports` 通常指向库入口。
3. `type: "module"` 会影响 `.js` 文件的模块解释方式。

## 先讲清楚：入口不止一种

同一个包可能有多种入口：

```json
{
  "bin": {
    "tool": "./dist/cli.js"
  },
  "main": "./dist/index.js",
  "exports": {
    ".": "./dist/index.js"
  },
  "scripts": {
    "dev": "tsx src/cli.ts"
  }
}
```

翻译成人话：

```text
用户敲 tool -> dist/cli.js
其他代码 import 这个包 -> dist/index.js
开发者 npm run dev -> src/cli.ts
```

读源码时，先明确你追的是哪种场景。

## C 语言类比

C 程序通常找 `main()`。Node.js 项目不能直接这样找，因为：

- CLI 入口由 `bin` 决定。
- 库入口由 `main`/`exports` 决定。
- 开发入口由 `scripts` 决定。

所以 TypeScript/Node.js 源码阅读的“找 main”动作，变成了“找 package.json 入口字段”。

## 代码练习：写一个最小 CLI

### 第 1 步：创建目录

```text
day06-cli/
  package.json
  src/
    cli.ts
```

`package.json`：

```json
{
  "name": "day06-cli",
  "type": "module",
  "bin": {
    "day06": "./src/cli.ts"
  },
  "scripts": {
    "dev": "tsx src/cli.ts"
  }
}
```

### 第 2 步：写入口

`src/cli.ts`：

```ts
#!/usr/bin/env node

function main(argv: string[]): void {
  console.log("raw user args:", argv);
}

main(process.argv.slice(2));
```

`process.argv.slice(2)` 对应用户真正输入的参数。

### 第 3 步：运行

```bash
npm run dev -- hello world
```

预期输出：

```text
raw user args: [ 'hello', 'world' ]
```

如果直接用：

```bash
npx tsx src/cli.ts hello world
```

输出也应该类似。

## 源码阅读训练：入口字段翻译

阅读：

```json
{
  "name": "sample",
  "type": "module",
  "bin": {
    "sample": "dist/cli.js"
  },
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "dev": "tsx src/cli.ts",
    "build": "tsc"
  }
}
```

回答：

1. CLI 命令入口在哪里？
2. 开发期入口在哪里？
3. 类型声明在哪里？
4. 构建命令是什么？

参考答案：

1. `dist/cli.js`。
2. `src/cli.ts`。
3. `dist/index.d.ts`。
4. `tsc`。

## 当天产出

- 一个最小 CLI 入口。
- 一篇入口追踪笔记。
- 一张链路图：

```text
shell command -> package.json bin/scripts -> src/cli.ts -> main(argv)
```

## 参考笔记示例

```md
# Day 06 笔记

CLI 入口看 bin，开发命令看 scripts，库入口看 exports/main。

process.argv:
- 第 0 项：node 或运行器路径
- 第 1 项：脚本路径
- slice(2)：用户参数
```

## 常见坑

- 把 `scripts` 当成用户安装后的命令。
- 忽略 `bin` 字段。
- 看到 `dist` 就以为源码也在那里，忘了对应源码可能在 `src`。
- 不区分 CLI 入口和库入口。

## 过关标准

你能从一个 `package.json` 中分别指出：

1. CLI 命令入口。
2. 开发运行入口。
3. 库导入入口。
4. 用户参数进入代码的位置。

## 有余力再做

尝试给 CLI 支持 `--help`：

```ts
if (argv.includes("--help")) {
  console.log("Usage: day06 [args]");
}
```

