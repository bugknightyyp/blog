# mobx源码阅读

## 概述
- 可观察对象 observable, 可以理解成数据源。它是由普通数据经过mobx处理而成对象
- 派生物 derivation, 可以理解成可执行方法。它是有普通方法经过mobx处理而成的对象
- mobx的作用就是：当 observable 变化时，derivations 能够自动执行，产生你想要的东西

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
