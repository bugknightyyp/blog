# redux
date: [20]
tags: [redux]

redux遵循3个基本原则：
- 单一数据源。 *整个数据源只存在一个store, store由state组成。*
- state 是只读的。 *唯一改变state的方法就是action，action是一个描述已发生事件的普通对象。*
- 使用纯函数来执行修改。 *为了描述 action 如何改变 state tree ，你需要编写 reducers。*

Redux 不允许程序直接修改数据，而是用一个叫作 “action” 的普通对象来对更改进行描述。

## Pure functions vs Impure functions

Pure function always return the same result and no side effect.

Impure function, has side effect or return new function.

```javascript
// Pure functions
function square(x) {
  return x * x;
}
function squareAll(items) {
  return items.map(square);
}

// Impure functions
function square(x) {
  updateXInDatabase(x);
  return x * x;
}
function squareAll(items) {
  for (let i = 0; i < items.length; i++) {
    items[i] = square(items[i]);
  }
}
```
## action

Action 本质上是 JavaScript 普通对象。我们约定，action 内使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。当应用规模越来越大时，建议使用单独的模块或文件来存放 action。


## 参考
[官方文档][1]

[1]:http://redux.js.org/index.html "官方文档"
[2]:http://camsong.github.io/redux-in-chinese/docs/advanced/AsyncActions.html "官方文档中文版"
[3]:http://div.io/topic/1309 "深入到源码：解读 redux 的设计思路与用法"
[4]:http://www.alloyteam.com/2015/09/react-redux/ "TAT.joeyguoReact 数据流管理架构之 Redux 介绍"
[5]:https://leozdgao.me/reacthe-reduxde-qiao-jie-react-redux/ "React和Redux的连接react-redux"
