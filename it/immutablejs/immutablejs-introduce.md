#[译]immutablejs介绍

tags: [immutablejs] [observerjs]

##Immutable collections for JavaScript

如果创建后的数据不可变，那么在开发一些应用时就方便好多，不防御性的复制，使用先进的记忆性和少量逻辑的变动侦探技术 。持久化数据表示一些变化的API，它不是更新数据，而是产生新的更新数据。

**Immutable **提供持久化的不可变性。对象包括：`List`、`Stack`、`Map`、`OrderedMap`、`Set`、`OrderedSet`、`Record`。他们借助*Clojure*、*Scala*中流行的*hash maps tries*、*vector tries*使用结构化共享,在现代*JavaScript*虚拟机里很高效,能实现最小化要复制和缓存数据的需求。

**Immutable **也提供了序列延迟，允许集合方法链，比如`map`、`filter`不需要创建中间表现层。使用`Range`、`Repeat`来创建序列。

##Getting started
使用npm来安装immutable
```javascript
npm install immutable
```
然后在任何module里依赖它：

```jvascript
var Immutable = require('immutable');
var map1 = Immutable.Map({a:1, b:2, c:3});
var map2 = map1.set('b', 50);
map1.get('b'); // 2
map2.get('b'); // 50
```

##browser

如果在浏览器里使用，下载*dist/immutable.min.js*或使用CDN，比如*CDNJS*、*jsDelivr*。

然后使用一个*script*标签引用到页面里：

```HTML
<script src="immutable.min.js"></script>
<script>
    var map1 = Immutable.Map({a:1, b:2, c:3});
    var map2 = map1.set('b', 50);
    map1.get('b'); // 2
    map2.get('b'); // 50
</script>
```
或者使用*AMD loader*，例如*Requirejs*:

```javascript
require(['./immutable.min.js'], function (Immutable) {
    var map1 = Immutable.Map({a:1, b:2, c:3});
    var map2 = map1.set('b', 50);
    map1.get('b'); // 2
    map2.get('b'); // 50
});
```

如果你使用*browserfy*，*immutable*的npm 模块也能在浏览器里使用。

##TypeScript

使用TypeScript编程时，使用*immutable*的集合或者序列就和你在本地使用一样，仍然能够使用类型参数化，错误侦探，还有在你编辑器里代码自动补全。

在声明类型的顶级文件添加相对路径的引用，就能使用。

```TypeScript
///<reference path='./node_modules/immutable/dist/Immutable.d.ts'/>
import Immutable = require('immutable');
var map1: Immutable.Map<string, number>;
map1 = Immutable.Map({a:1, b:2, c:3});
var map2 = map1.set('b', 50);
map1.get('b'); // 2
map2.get('b'); // 50
```

##The case for Immutability 不变性的情况

开发应用的很多难点是在跟踪状态的变化和维持状态。使用不可变的数据开发，鼓励你差异化地思考应用里的数据怎样流通。

使用`Object.observe`订阅事件,或者其他的机制，创建巨大的事件系统，这会损害性能。有时，因为程序报错，导致程序模块之间不同步。因为不变的数据永远不会变，通过模型订阅变动事件是死路一条，新数据只能从上层传递。

这种数据流模型和`React`能很好的结合起来，尤其是使用`Flux`设计的应用。

当数据是从上层传递，而不是订阅，当数据改变时，你可以使用对比来做你感兴趣的事。当在同一个集合里的改变结果，允许使用`===`来决定是否有变化，这时**Immutable**总是返回它自己。

```javascript
var map1 = Immutable.Map({a:1, b:2, c:3});
var map2 = map1.set('b', 2);
assert(map1 === map2); // no change
var map3 = map1.set('b', 50);
assert(map1 !== map3); // change
```

如果一个对象是不可变的，你简单的复制他的引用，而不是复制整个对象。因为一个引用更小比对象本身，这种结果保存在内存里，能够增强复制引用的程序执行性能（例如撤销栈）。

```javascript
var map1 = Immutable.Map({a:1, b:2, c:3});
var clone = map1;

```

##JavaScript-fist API

虽然**immutable**的灵感是来自*Clojure*、*Scala*、*Haskell*等其他的编程环境，但是这种设计确实赋予*javascript*更强大的力量。因此有些面向对象的API很接近*ES6 Array*,*Map*,*Set*。

与不可变的集合不同的是，那些方法能够改变集合，比如`push`,`set`,`unshift`,`splice`没有返回新的不可变集合。而`slice`,`concat`是返回一个新的数组而不是新的不可变集合。

```javascript
var list1 = Immutable.List.of(1, 2);
var list2 = list1.push(3, 4, 5);
var list3 = list2.unshift(0);
var list4 = list1.concat(list2, list3);
assert(list1.size === 2);
assert(list2.size === 5);
assert(list3.size === 6);
assert(list4.size === 13);
assert(list4.get(0) === 1);
```

几乎所有`Array`里的方法能够在`Immutalbe.List`里发现，`Map`对应`Immutable.Map`,`Set`对应`Immutable.Set`,包括集合操作的`forEach`,`map`。

##Accepts raw JavaScript objects.

设计与js的互操，**immutable**接受普通的数组或对象，并且期望有个遍历的方法，不考虑性能问题。

```javascript
var map1 = Immutable.Map({a:1, b:2, c:3, d:4});
var map2 = Immutable.Map({c:10, a:20, t:30});
var obj = {d:100, o:200, g:300};
var map3 = map1.merge(map2, obj);
// Map { a: 20, b: 2, c: 10, d: 100, t: 30, o: 200, g: 300 }
```

这可能是因为**immutable**能够把任何`javascript`的数组或对象当作是可遍历的。你可以利用这一点在`javascript`对相爱那个上获取比较复杂的集合方法，否则它自带的API可是非常少。因为序列的延迟性，没有缓存中间结果，这样的操作可能是最有效的。

```javascript

var myObject = {a:1,b:2,c:3};
Seq(myObject).map(x => x * x).toObject();
// { a: 1, b: 4, c: 9 }

```

##Converts back to raw JavaScript objects.

任何不变的可遍历对象都能够转成普通的js数组或者对象，浅转化使用`toArray`,`toObject`.深转换：`toJS()`。何不变的可遍历对象都能够借助`JSON.stringify`实现`toJSON()`。

```javascript

var deep = Immutable.Map({ a: 1, b: 2, c: Immutable.List.of(3, 4, 5) });
deep.toObject() // { a: 1, b: 2, c: List [ 3, 4, 5 ] }
deep.toArray() // [ 1, 2, List [ 3, 4, 5 ] ]
deep.toJS() // { a: 1, b: 2, c: [ 3, 4, 5 ] }
JSON.stringify(deep) // '{"a":1,"b":2,"c":[3,4,5]}'

```

##Embraces ES6

**Immutable**利用ES6的特性，包括*iterate*,*Array Functions*,*Classes*,*Moduels*，并也受到ES6的*Map*，*Set*的激发。为了使得支持现代浏览器，该库被转译成ES3了。

所有的例子都是以ES6展示的。为了运行到所有的浏览器里，他们需要转译成ES3。

```javascript

// ES6
foo.map(x => x * x);
// ES3
foo.map(function (x) { return x * x; });

```

##Nested Structures

在**immutable**里的集合通常是嵌套的，允许使用比较深的树形结构，与JSON相似。

```javascript
var nested = Immutable.fromJS({a:{b:{c:[3,4,5]}}});
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ] } } }
```

有少量的工具能够读取和操作嵌套的数据。最有用的是`mergeDeep`,`getIn`,`setIn`,`updateIn`,在*List*,*Map*,*orderMap*上可以找到。

```javascript
var nested2 = nested.mergeDeep({a:{b:{d:6}}});
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 6 } } }
nested2.getIn(['a', 'b', 'd']); // 6

var nested3 = nested2.updateIn(['a', 'b', 'd'], value => value + 1);
// Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 7 } } }

var nested4 = nested3.updateIn(['a', 'b', 'c'], list => list.push(6));
// Map { a: Map { b: Map { c: List [ 3, 4, 5, 6 ], d: 7 } } }

```

##Lazy Seq

*seq*描述了一套延迟操作，允许它们链式使用它们的遍历方法。（如 `map`,`filter`）

**Seq is immutable**：一旦*sql*被创建，它就不能被改变，追加，重排，或者修改。任何*seq*的*mutative method*被调用都会返回一个新的*seq*。

*Seq is lazy*：*seq*只需要做少量的必要的工作返回给任何方法调用。

例如，下面的例子没有任何作用，因为返回的*seq*一直没被使用：

```javascript
var oddSquares = Immutable.Seq.of(1,2,3,4,5,6,7,8)
  .filter(x => x % 2).map(x => x * x);

```

一旦*seq*被使用，他只会运行必要的任务。在这个例子里，没有中间数组创建，*filter*被调用三次，地图只调用了2次：
console.log(oddSquares.get(1)); // 9

任何*collection*能够被转成*lazy Seq*通过`.toSweq()`

```javascript
var seq = Immutable.Map({a:1, b:1, c:1}).toSeq();
```
*Seq*允许高效的链式操作，尤其是当转成不同的概念类型（例如 js object）：

```javascript
seq.flip().map(key => key.toUpperCase()).flip().toObject();
// Map { A: 1, B: 1, C: 1 }
```

逻辑表达式要看内存限制:

```javascript
Immutable.Range(1, Infinity)
  .skip(1000)
  .map(n => -n)
  .filter(n => n % 2 === 0)
  .take(2)
  .reduce((r, n) => r * n, 1);
// 1006008
```
注意：*literable*总是按同样的顺序去遍历，然后顺序通常定义不好，就像*Map*的情况。

##Equality treats Collections as Data（把集合与数据同等对待）

*Immutable*提供比较，它把"immutable data structures"当作是“pure data”，检查是否需要更深入的比较。

```javascript
var map1 = Immutable.Map({a:1, b:1, c:1});
var map2 = Immutable.Map({a:1, b:1, c:1});
assert(map1 !== map2);
assert(Immutable.is(map1, map2) === true);

```

`Immutable.is() `的用法和`Object.is`相同，包括两者都是*immutable*，所有的*key*和*value*使用相同的比较方式都是相等的。

##Batching Mutations

> If a tree falls in the woods, does it make a sound?

> If a pure function mutates some local data in order to produce an immutable return value, is that ok?

> > — Rich Hickey, Clojure

应用*mutation*来创建一个新的*immutable*对象，会导致一些性能上的开销。如果你需要在返回之前需要一系列改变，*Immutable*能够让你创建一个暂时的一个*collections*的*mutable*副本，并且通过使用`withMutations`做一些行为上的改变。事实上，这就是*immutable*怎样对自己应用复杂的改变。

下面的例子，创建*list2*结果是创建了1个而不是3个*new immutable Lists*。

```javascript
var list1 = Immutable.List.of(1,2,3);
var list2 = list1.withMutations(function (list) {
  list.push(4).push(5).push(6);
});
assert(list1.size === 3);
assert(list2.size === 6);

```

注意：*immutable*也提供了`asmutable`和`asImmutable`，但是提倡在`withMutations`不够用的情况下再使用它们。使用时注意不要返回*mutable copy*，他可能导致不期望的结果。

[原文][0]

[0]:http://facebook.github.io/immutable-js/ "immutable官网"
