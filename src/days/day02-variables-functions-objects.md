# Day 02：变量、函数、对象与引用

## 今日目标

今天解决一个 C 程序员学 JavaScript/TypeScript 时非常容易误判的问题：**`const` 不等于对象不可变，对象变量保存的是引用。**

你今天要真正看见这个现象，而不是只记一句话。我们会写一个任务对象，把它传进函数，在函数里修改它，然后观察外面的对象是否也变了。

今天结束时，你应该能回答：

1. `const task = {...}` 到底固定了什么？
2. 函数参数传入对象时，为什么函数内部修改会影响外部？
3. 读源码时，如何判断一个函数有没有副作用？

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | `let`/`const`、函数参数、对象引用 |
| 35 分钟 | 代码练习 | 写任务对象，观察修改入参的副作用 |
| 25 分钟 | 源码阅读训练 | 阅读一个函数签名和函数体，判断是否修改入参 |
| 15 分钟 | 复盘笔记 | 记录“绑定不变”和“对象内容可变”的区别 |

## 必学知识点

1. `const` 保护变量绑定，不保护对象内部字段。
2. 函数参数可加类型注解和返回值类型，它们是阅读函数边界的第一线索。
3. 对象默认按引用传递，修改对象字段会影响同一个对象。

## 先讲清楚：变量绑定和对象内容不是一回事

看这段代码：

```ts
const task = {
  id: 1,
  title: "read package.json",
  done: false,
};
```

`const` 的意思是：变量名 `task` 不能重新绑定到另一个值。

下面这样不允许：

```ts
task = { id: 2, title: "new task", done: false };
```

但下面这样允许：

```ts
task.done = true;
```

因为 `task` 还是指向原来的对象，只是对象内部字段变了。

这个区别很重要。你以后读源码时，看到函数接收一个对象，就要问：

```text
这个函数只是读取对象，还是会修改对象？
```

如果会修改，它就有副作用。副作用会让调用链更难追踪。

## C 语言类比

| C 语言思维 | TypeScript/JavaScript 对应理解 |
| -- | -- |
| 普通结构体变量可能是值拷贝 | JS 对象变量通常保存引用 |
| 指针可以让函数修改外部数据 | 对象引用传入函数后，也可能被函数修改 |
| `const int*`、`int* const` 要区分 | JS 的 `const` 更像“绑定不可改”，不是“对象深度不可改” |
| 函数签名帮助理解输入输出 | TS 函数签名也帮助你读边界 |

你可以粗略理解为：`const task = {...}` 像“一个不能重新指向别处的指针”，但它指向的对象内容仍能改。

## 代码练习：观察对象被函数修改

### 第 1 步：创建文件

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

const firstTask: Task = {
  id: 1,
  title: "read package.json",
  done: false,
};

console.log("before:", firstTask);
const returnedTask = markDone(firstTask);
console.log("returned:", returnedTask);
console.log("after:", firstTask);
console.log("same object:", returnedTask === firstTask);
```

### 第 2 步：运行

```bash
npx tsx day02-task.ts
```

预期你会看到类似输出：

```text
before: { id: 1, title: 'read package.json', done: false }
returned: { id: 1, title: 'read package.json', done: true }
after: { id: 1, title: 'read package.json', done: true }
same object: true
```

关键观察：

```text
firstTask 在 markDone 调用后变了。
returnedTask === firstTask 是 true。
```

这说明它们指向同一个对象。

### 第 3 步：写一个无副作用版本

把函数改成：

```ts
function markDoneWithoutMutation(task: Task): Task {
  return {
    ...task,
    done: true,
  };
}
```

再写：

```ts
const secondTask: Task = {
  id: 2,
  title: "draw call chain",
  done: false,
};

const changedTask = markDoneWithoutMutation(secondTask);
console.log("second original:", secondTask);
console.log("second changed:", changedTask);
console.log("same object:", changedTask === secondTask);
```

这次你应该看到：

```text
second original 的 done 仍是 false
second changed 的 done 是 true
same object: false
```

### 第 4 步：给函数边界加注释

在笔记里写：

```text
markDone(task) 会修改入参对象。
markDoneWithoutMutation(task) 不修改入参，而是返回新对象。
```

这就是源码阅读里的“副作用标注”。

## 函数签名怎么读

这段函数：

```ts
function markDone(task: Task): Task
```

可以翻译成：

```text
输入：一个 Task 对象。
输出：一个 Task 对象。
风险：只看签名看不出是否修改入参，需要读函数体。
```

这段函数：

```ts
function formatTask(task: Task): string
```

可以翻译成：

```text
输入：一个 Task 对象。
输出：一个字符串。
大概率只是格式化，但仍要看函数体确认有没有副作用。
```

源码阅读时，不要只看函数名，要把函数签名翻译成自然语言。

## 源码阅读训练：判断函数是否有副作用

阅读这个小片段：

```ts
type Config = {
  debug: boolean;
  retries: number;
};

function enableDebug(config: Config): Config {
  config.debug = true;
  return config;
}

function withRetries(config: Config, retries: number): Config {
  return {
    ...config,
    retries,
  };
}
```

回答：

1. 哪个函数修改了传入对象？
2. 哪个函数返回了新对象？
3. 如果这两个函数出现在真实源码中，你会如何在笔记里标注？

参考答案：

1. `enableDebug` 修改了传入对象，因为它写了 `config.debug = true`。
2. `withRetries` 返回了新对象，因为它使用 `{ ...config, retries }`。
3. 可以写：`enableDebug` 有入参副作用；`withRetries` 是复制并覆盖字段。

## 当天产出

- 一个 `day02-task.ts` 文件。
- 一段副作用观察笔记。
- 一个函数阅读记录：输入是什么、输出是什么、是否修改入参。

## 参考笔记示例

```md
# Day 02 笔记

今天我看懂了：const 只是不允许变量重新绑定，不代表对象字段不能改。

markDone(firstTask) 会修改 firstTask，因为对象是引用传递。
markDoneWithoutMutation(secondTask) 返回新对象，不改变原对象。

以后读源码时，我要重点找这种语句：
- obj.field = ...
- array.push(...)
- map.set(...)

这些通常意味着函数有副作用。
```

## 常见坑

- 以为 `const` 等于 C 里的深度不可变。
- 忘记给函数返回值加类型，导致阅读时不清楚函数边界。
- 只看函数名，不看函数体是否修改入参。
- 看到 `{ ...task }` 不知道这是浅拷贝。

## 过关标准

今天算过关，要求你能做到：

1. 解释为什么 `markDone(firstTask)` 会影响原对象。
2. 解释 `returnedTask === firstTask` 为什么是 `true`。
3. 在一个函数体中找出是否存在修改入参的副作用。

## 有余力再做

把 `Task` 增加一个嵌套对象：

```ts
meta: {
  priority: "low" | "high";
}
```

然后试试 `{ ...task }` 是否会复制嵌套对象。记录“浅拷贝”和“深拷贝”的区别，不要求今天完全掌握。

