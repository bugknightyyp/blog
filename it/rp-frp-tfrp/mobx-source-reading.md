# mobx源码阅读

## 概述

- 可观察对象 observable, 可以理解成数据源。它是由普通数据经过mobx处理而成对象
- 派生物 derivation, 可以理解成可执行方法。它是有普通方法经过mobx处理而成的对象
- mobx的作用就是：当 observable 变化时，derivations 能够自动执行。

## mobx实现思路

mobx在处理数据上，采用类似虚拟DOM的技术，在数据上添加一个隐藏的$mobx的字段，来保存经过加工处理后的数据节点，并与原数据一一对应。

### 数据加工 （使得普通数据变成可观察对象-observable）

- Array
mobx将数组转成 `ObservableArray`, `ObservableArray` 有一个重要的隐藏属性 `$mobx`,
`$mobx` 是一个 `ObservableArrayAdministration` 对象。

ObservableArray




- Object
	ObservableObjectAdministration
- Primitives
	ObservableValue
### 方法加工（使得普通方法变成派生物-derivation）


### 几个工具类函数

`runReactions`: 遍历 `globalState.pendingReactions` 里所有的 derivation 对象执行 `runReaction`


## mobx实现细节
