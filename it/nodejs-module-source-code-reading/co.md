# co 模块源码解读
tags: [nodejs] [co] [promise] [generator-function]

date: [2016-08-09]

## co 作用

co 用于 Generator 函数的自动执行，co 函数库可以让你不用编写 Generator 函数的执行器。

## API

`co(fn*).then( val => )` 接受一个 *generator* / *generator function* / *any function that returns a generator*, 返回一个 *promise* 对象。

`var fn = co.wrap(fn*)` 把一个 *generator* / *generator function* / *any function that returns a generator* 转成一个普通函数，该函数返回一个 *promise* 对象。

## Yieldables

*yieldable* 对象目前支持以下情况：

- promises
- thunks (functions)
- array (parallel execution)
- objects (parallel execution)
- generators (delegation)
- generator functions (delegation)

*yieldable* 对象可以相互嵌套

## 参考
[github 地址][1]
[co 函数库的含义和用法][2]


[1]:https://github.com/tj/co 'github 地址'
[2]:http://www.ruanyifeng.com/blog/2015/05/co.html 'co 函数库的含义和用法'
