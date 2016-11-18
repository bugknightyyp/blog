# mobx
date: [2016-11-10]
tags: [mobx] [react]

## 基本概念

- 可观察对象(Observable state)

任何可以改变，并且可作为计算的数据源的值都可乘坐状态。**mobX** 可以使得常见数据类型可透明地被监听变化，
如：*primitives* *arrays* *classes* *objects*，甚至潜在的循环引用。

- 计算值(Computed values) derivations

计算值就是通过方法来操作其他可监听值计算所得的值。计算值可以由几个字符串拼接而成，
也可以是派生的复杂对象。因为计算值自身可被监听，所以可以渲染完整的用户界面。它也可以懒执行或者响应状态变化。

- 响应(Reactions)

*reaction* 与 *computed value* 有点像。不过 *reaction* 不会产生新的值，而是会产生副作用。
*reaction* 负责响应程序命令，如：控制台打印输出，网络请求，渐进更新 *React component tree* 修补 *DOM*, 等等。

- 行为动作(Actions)

*Actions* 的基本用户的就是修改 *state*。它不是用来响应 *state* 的变化，而是变化的来源，比如 用户事件，websocket 链接，改变可观察状态

## 参考
[Becoming fully reactive: an in-depth explanation of MobX][1]


[1]:https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.bsh9h0hod "Becoming fully reactive: an in-depth explanation of MobX"
