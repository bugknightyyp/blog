# mobx介绍

声明：基于mobx3.0源码分析，源码是typescript实现的。本文档基于本人看过源码后的理解所写，没有官网文档那么学术化，但是便于理解。这里是[我注释的源码副本][1]

## 概述
"程序 = 数据结构 + 算法"。这个等式大家应该很熟了, 在js里可以这么理解 "数据结构" == "数据"，"算法" == "方法"。毫不例外，mobx 就是从 "数据" 和 "方法" 这2块入手实现的，
mobx所实现的目标就是：被mobx处理后的数据和方法能够实现，当方法依赖的数据变化时，方法能够自动执行。

接下来就从数据和方法2方面出发讲解它背后实现的原理。

**声明**: 在本文档中，被mobx处理后的数据称为 `observable`， 被 mobx 处理后的方法称为 `derivation`, 这2者都是对象

## 数据

`Atom` 有2个重要的方法：

- `reportObserved` 负责告知 derivation 依赖该 observable。
- `reportChanged` 负责告知 依赖自己的derivation,自己的值变动了。




既然是数据，就会涉及到种类，mobx 能接受的数据类型也都是 js 里数据类型。分别是：

- **primitives** 基本类型

 该种数据类型 由`ObservableValue`类负责处理，它继承 `Atom`。


```javascript

var cityName = mobx.observable("sz");
/*
cityName的数据结构：
ObservableValue<T> extends BaseAtom implements IObservableValue<T>, IInterceptable<IValueWillChange<T>>, IListenable
{
  value: "sz",
  __proto__: {
    get: function(){
      this.reportObserved();
      return this.value;
    },
    set: function(v){
      ...
      this.reportChanged();
    }
  }
  ...
}
*/
```

- **plain objects** 普通对象

该种数据类型 由`ObservableObject`类负责处理。

```javascript
var person = mobx.observable({
    nickname: "yyp"
})
/*
person数据结构：
ObservableObjectAdministration implements IInterceptable<IObjectWillChange>, IListenable
{
  [[$mobx]]: ObservableObjectAdministration
    values: Object
      nickname: ObservableValue
        value: "yyp"
        __proto__: BaseAtom
          get: ()
          set: ()
  nickname: () // invoke property getter
  [[get nickname]]:(){
    return this.$mobx.values[propName].get();
  }
  [[set nickname]]:(v){
    this.reportChanged();
  }
}
*/


```

- **class instances** 类实例

- **arrays** 数组
该种数据类型 由`ObservableArray`类负责处理。它重写了 `Array.prototype` 上的方法, 使得所有的操作的作用域为`this.$mobx.values`。
感觉 ObservableArray 只是一个代理，真正的操作全在ObservableArrayAdministration实现

```javascript
var todos = mobx.observable([
    { title: "Spoil tea", completed: true }
]);
/*
person数据结构：
ObservableArrayAdministration<T> implements IInterceptable<IArrayWillChange<T> | IArrayWillSplice<T>>, IListenable
ObservableArray<T> extends StubArray
ObservableArray
  0: () // invoke property getter
  [[$mobx]]: ObservableArrayAdministration
    array: ObservableArray
    atom: BaseAtom
    values: Array
      0: Object
        [[$mobx]]: ObservableObjectAdministration
          target: Object
          values: Object
            completed: ObservableValue
            title: ObservableValue
*/
```
- **maps** 映射

- **references** 引用类型


## 方法
在 mobx 里，被处理后的方法叫 `derivation`(推导对象)


## 数据驱动方法自动执行







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
