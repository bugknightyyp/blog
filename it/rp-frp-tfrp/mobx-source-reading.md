# mobx源码阅读

## 概述

- 可观察对象 observable, 可以理解成数据。
- 派生物 derivations, 可以理解成依赖数据成功的结果。
- mobx的作用就是：当 observable 变化时，derivations 也能实时更新。

## mobx实现思路
- observable怎样监听变化，从而触发derivations

mobx在处理数据上，采用类似虚拟DOM的技术，在数据上添加一个隐藏的$mobx的字段，来保存经过加工处理后的数据节点，并与原数据一一对应。


- derivations怎样从observable收集依赖




## mobx实现细节
