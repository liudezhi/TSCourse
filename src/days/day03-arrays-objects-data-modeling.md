# Day 03：数组、对象与数据建模

## 今日目标

今天开始进入 TypeScript 项目里最常见的数据形态：**对象数组**。

很多真实源码并不是复杂算法，而是在做这类事：

```text
拿到一组对象 -> 过滤 -> 转换 -> 分组/统计 -> 输出给下一层
```

你以后读 CLI、Agent、插件系统源码时，会反复遇到 `map`、`filter`、`reduce`。今天不追求炫技，只要能看懂一个链式调用中每一步的数据形状变化。

今天结束时，你应该能回答：

1. `Task[]` 表示什么？
2. `filter` 和 `map` 分别改变了什么？
3. 读源码时如何把链式调用画成数据流？

## 90 分钟安排

| 时间 | 任务 | 说明 |
| ----- | ------ | -- |
| 15 分钟 | 概念学习 | 数组方法、对象字段、回调函数 |
| 35 分钟 | 代码练习 | 统计任务数量并输出标题列表 |
| 25 分钟 | 源码阅读训练 | 阅读一个 `.filter().map()` 链式调用 |
| 15 分钟 | 复盘笔记 | 写下每一步的数据流 |

## 必学知识点

1. `Task[]` 表示元素类型为 `Task` 的数组。
2. `filter` 用来筛选元素，返回数组。
3. `map` 用来转换元素，返回新数组。

## 先讲清楚：对象数组为什么重要

真实项目里，很多核心数据都会长这样：

```ts
type Tool = {
  name: string;
  description: string;
  enabled: boolean;
};

const tools: Tool[] = [
  { name: "readFile", description: "read a file", enabled: true },
  { name: "shell", description: "run command", enabled: false },
];
```

Agent CLI 项目里的工具列表、消息历史、插件列表、配置项、权限请求，很多都可以理解为“某种对象的数组”。

所以你要训练的不是背语法，而是看到 `Something[]` 时立刻问：

```text
每个元素是什么形状？
这组元素从哪里来？
后面被过滤、转换、统计成了什么？
```

## C 语言类比

| C 语言写法 | TypeScript 常见写法 |
| -- | -- |
| `Task tasks[10]` | `const tasks: Task[] = [...]` |
| `for` 循环筛选 | `tasks.filter(...)` |
| `for` 循环生成新数组 | `tasks.map(...)` |
| 函数指针/回调较少见 | 回调函数非常常见 |
| 手动维护计数器 | `filter(...).length` 或 `reduce(...)` |

`filter` 和 `map` 本质上不是魔法，它们只是把常见循环模式变成了函数调用。

## 代码练习：任务数组统计

### 第 1 步：创建文件

创建 `day03-tasks-basic.ts`：

```ts
type Task = {
  id: number;
  title: string;
  done: boolean;
};

const tasks: Task[] = [
  { id: 1, title: "read README", done: true },
  { id: 2, title: "find entry", done: false },
  { id: 3, title: "draw call chain", done: false },
];

const unfinished = tasks.filter((task) => !task.done);
const titles = unfinished.map((task) => task.title);

console.log({
  total: tasks.length,
  unfinished: unfinished.length,
  titles,
});
```

### 第 2 步：运行

```bash
npx tsx day03-tasks-basic.ts
```

预期输出：

```text
{
  total: 3,
  unfinished: 2,
  titles: [ 'find entry', 'draw call chain' ]
}
```

### 第 3 步：把每一步的数据形状写出来

不要只看输出。把数据流写成这样：

```text
tasks: Task[]
  -> filter((task) => !task.done)
unfinished: Task[]
  -> map((task) => task.title)
titles: string[]
```

这就是今天最重要的训练。

## 逐行解释

```ts
const unfinished = tasks.filter((task) => !task.done);
```

翻译：

```text
从 tasks 里筛选出 done 为 false 的任务。
输入是 Task[]。
输出仍然是 Task[]，只是元素少了。
```

再看：

```ts
const titles = unfinished.map((task) => task.title);
```

翻译：

```text
把每个 Task 转换成它的 title。
输入是 Task[]。
输出是 string[]。
```

读源码时，`filter` 和 `map` 的区别要非常敏感：

- `filter`：元素类型通常不变，数量可能变少。
- `map`：数量通常不变，元素类型可能改变。

## 第 4 步：增加 reduce 统计

在文件末尾加：

```ts
const summary = tasks.reduce(
  (acc, task) => {
    if (task.done) {
      acc.done += 1;
    } else {
      acc.todo += 1;
    }
    return acc;
  },
  { done: 0, todo: 0 }
);

console.log(summary);
```

这段比 `filter` 和 `map` 难一点。今天只需要理解：

```text
reduce 会把一组元素累计成一个结果。
```

这里结果是：

```ts
{ done: number; todo: number }
```

## 源码阅读训练：看懂链式调用

阅读这个小片段：

```ts
type Tool = {
  name: string;
  enabled: boolean;
  danger: "safe" | "needs-confirmation";
};

const visibleToolNames = tools
  .filter((tool) => tool.enabled)
  .filter((tool) => tool.danger === "safe")
  .map((tool) => tool.name);
```

只追踪一个问题：`visibleToolNames` 是怎么来的？

参考数据流：

```text
tools: Tool[]
  -> filter enabled
Tool[]
  -> filter danger === "safe"
Tool[]
  -> map name
string[]
```

自然语言解释：

```text
先从所有工具中选出启用的工具，再选出安全工具，最后只保留工具名。
```

这类代码在 Agent CLI 里非常常见：工具列表经过过滤后，展示给模型或用户。

## 当天产出

- 一个 `day03-tasks-basic.ts` 文件。
- 一张数据流笔记：`tasks -> filter -> map -> titles`。
- 一个链式调用阅读记录，写清楚每一步输入输出类型。

## 参考笔记示例

```md
# Day 03 笔记

今天我看懂了对象数组的处理方式。

数据流：
tasks: Task[]
  -> filter 未完成任务
unfinished: Task[]
  -> map 提取 title
titles: string[]

filter 改变数量，不改变元素类型。
map 通常改变元素形状，例如 Task 变成 string。

我还没完全掌握 reduce，但知道它用于把数组累计成一个结果。
```

## 常见坑

- 把 `.map` 当成普通循环，却忽略它会返回新数组。
- 看到长链式调用就从中间开始读，导致不知道输入是什么。
- 不写每一步的数据形状，只靠脑子硬记。
- 没有给数组元素定义类型，导致后面读不清楚字段。

## 过关标准

今天算过关，要求你能做到：

1. 解释 `Task[]` 表示“一组 Task 对象”。
2. 说明 `filter` 后仍是 `Task[]`，`map(task => task.title)` 后是 `string[]`。
3. 把一个 `.filter().map()` 链式调用画成数据流。

## 有余力再做

把任务状态从 `done: boolean` 改成：

```ts
status: "todo" | "doing" | "done";
```

然后统计每种状态的数量。这个练习会为 Day 09 的 union type 预热。

