# d3源码解读之过渡动画(transition)
tags: [d3]

## d3.timer
相当于一个timer时钟事件。

## selection.transition

`selection.transition` 是基于 `d3.timer` 实现的

这种方式的通常用法是这样：
```js
d3.select("body").transition().style("color", "red");
```
## d3.transition

`d3.transition` 是对 `selection.transiti` 简单封装
