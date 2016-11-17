# d3源码解读之选集(selection)与数据驱动(data-driven)
tags: [d3]



## selection
selection可以理解为选集，本质是个以node为元素的二维数组。它是通过浏览器内置的dom选择函数或者Sizzle来选择node之后，
将结果统一处理成二维数组，并通过原型继承(d3_selectionPrototype)，添加一些用来进行链式操作的方法。

selection对象上的方法和jquery里的方法类似，大都有多态性，最基本的规律是：如果无参，就是读取；否则就是设置。

- `enter`
- `update`
- `exit`

## data-driven
说到数据驱动，那就是按照数据(数组)的多寡来操作node。一般我们得到selection(是一个以结点为对象的二维数组)后，会通过`data`方法来绑定数据，data方法为我们做了什么呢？
data方法呈现多态性，根据传入的不同参数，会满足不同场景的需求。

1. 只传一个数组，也就是数据源。eg: data([...])
   每一个节点数组都是使用该数据源进行操作。数据源里的每个元素与selection里每个元素一一对应。
2. 只传一个函数。eg: data(fn)
　 每一个节点数组的数据源是fn返回的数据，fn会接收该组的`parentNode.__data__` 与组下标, 你可以对数据进行加工处理，然后返回，作为该组所要绑定的数据。
3. 第一个参数是以上情况任何一种，第二种参数是个函数。eg: data([...], fn) or data(fn, fn)
   目前只发现在生成坐标系统时用到这种情况了。

data方法会生成三个对象 enter update exit，这三个对象本质上是二维数组，与selection类似。区别是，enter继承是的`d3_selection_enterPrototype`, 后2者继承是`d3_selectionPrototype`，
`d3_selection_enterPrototype` 可以说是 `d3_selectionPrototype`的阉割版。`data`函数返回的是updata选集。代码组织关系是：

```javascript
// data 方法最后返回的结果
update.enter = function() { return enter; };
update.exit = function() { return exit; };
return update;
```


### 会产生数据绑定的方法：
- `data()`。已经在 *data-driven* 里介绍过
- `datum(value)`。把数据赋给node.__data__。`this.property("__data__", value)`
- `select()`, 会将父节点的__data__ 保存到子节点。code:

```javascript
if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
```
