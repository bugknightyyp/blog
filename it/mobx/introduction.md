# mobx介绍

声明：基于mobx3.0源码分析，源码是typescript实现的。本文档基于本人看过源码后的理解所写，没有官网文档那么学术化，但是便于理解。这里是[我注释的源码副本][1]

## 概述
"程序 = 数据结构 + 算法"。这个等式大家应该很熟了, 在js里可以这么理解 "数据结构" == "数据"，"算法" == "方法"。毫不例外，mobx 就是从 "数据" 和 "方法" 这2块入手实现的，
mobx所实现的目标就是：被mobx处理后的数据和方法能够实现，当方法依赖的数据变化时，方法能够自动执行。

接下来就从数据和方法2方面出发讲解它背后实现的原理。

## 数据
在 mobx 里，被处理后的数据叫 `observable`(可观察对象)，下面看看它对数据是怎么处理的，以及处理后的样子。

既然是数据，就会涉及到种类，mobx 能接受的数据类型也都是 js 里数据类型。分别是：

不同数据类型处理的共性：处理后的结果都是对象。

- **primitives** 基本类型

- **references** 引用类型

- **plain objects** 普通对象

- **class instances** 类实例

- **arrays** 数组

- **maps** 映射



## 方法
在 mobx 里，被处理后的方法叫 `derivation`(推导对象)



## mobx实现思路
mobx在处理数据上，采用类似虚拟DOM的技术，在数据上添加一个隐藏的$mobx的字段，来保存经过加工处理后的数据节点，并与原数据一一对应。

### 加工数据 （使得普通数据变成可观察对象-observable）
- Array
mobx将数组转成 `ObservableArray`, 它重写了 `Array.prototype` 上的方法, 使得所有的操作全部在它的属性`$mobx`上完成。
`$mobx` 是一个 `ObservableArrayAdministration` 对象。`ObservableArrayAdministration` 负责完成对虚拟数据的操作，及通知依赖修改的 deviation。

- Object
mobx只是在Object上添加属性`$mobx`，该`$mobx` 是一个 `ObservableObjectAdministration` 对象

- Primitives
	ObservableValue

### 加工方法（使得普通方法变成派生物-derivation）



[1]:https://github.com/bugknightyyp/mobx "我注释的源码副本"
