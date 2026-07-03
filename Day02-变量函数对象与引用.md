# Day 02：变量、函数、对象与引用

## 今日目标

理解 JavaScript/TypeScript 中变量绑定、函数、对象引用与 C 的差异，开始用类型注解描述数据。

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | `let`/`const`、函数参数、对象引用 |
| 35 分钟 | 代码练习 | 写任务对象和函数 |
| 25 分钟 | 源码阅读训练 | 在真实源码中找一个函数签名 |
| 15 分钟 | 复盘笔记 | 记录“值”和“引用”的区别 |

## 必学知识点

1. `const` 保护绑定，不保护对象内部字段。
2. 函数参数可加类型注解和返回值类型。
3. 对象默认按引用传递，修改对象会影响同一个对象。

## C 语言类比

C 中你会明确区分值、指针、结构体地址；JavaScript 中对象、数组、函数天然像“引用值”。`const task = {...}` 更像固定了一个指针变量，不能重新指向，但指向的对象内容仍可变。

## 代码练习

创建 `day02-task.ts`：

```ts
type Task = {
  id: number;
  title: string;
  done: boolean;
};

function markDone(task: Task): Task {
  task.done = true;
  return task;
}

const firstTask: Task = { id: 1, title: "read package.json", done: false };
console.log(markDone(firstTask));
console.log(firstTask);
```

运行后观察 `firstTask` 是否被修改。

## 源码阅读训练

在一个 npm 包或示例项目中搜索 `function` 或 `=>`。今天只看一个函数：它接收什么参数？返回什么？有没有修改传入对象？

## 当天产出

- 一个 `day02-task.ts` 文件。
- 一段笔记：`const`、对象引用、函数参数三者和 C 的差异。

## 常见坑

- 以为 `const` 等于 C 的深度不可变。
- 忘记给函数返回值加类型，导致阅读时不清楚函数边界。
- 修改入参对象后不知道副作用来自哪里。

## 过关标准

你能解释为什么 `markDone(firstTask)` 会影响原对象，并能在源码里识别一个函数的输入和输出。

## 有余力再做

把 `markDone` 改成不修改原对象：`return { ...task, done: true }`，比较两种写法。

