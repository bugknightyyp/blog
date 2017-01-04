# mobx源码阅读

## 概述

- 可观察对象 observable, 可以理解成数据源。它是由普通数据经过mobx处理而成对象
- 派生物 derivation, 可以理解成可执行方法。它是有普通方法经过mobx处理而成的对象
- mobx的作用就是：当 observable 变化时，derivations 能够自动执行。

## mobx实现思路

mobx在处理数据上，采用类似虚拟DOM的技术，在数据上添加一个隐藏的$mobx的字段，来保存经过加工处理后的数据节点，并与原数据一一对应。

### 数据加工 （使得普通数据变成可观察对象-observable）

- Array
mobx将数组转成 `ObservableArray`, 它重写了 `Array.prototype` 上的方法, 使得所有的操作全部在它的属性`$mobx`上完成。
`$mobx` 是一个 `ObservableArrayAdministration` 对象。`ObservableArrayAdministration` 负责完成对虚拟数据的操作，及通知依赖修改的 deviation。

- Object
mobx只是在Object上添加属性`$mobx`，该`$mobx` 是一个 `ObservableObjectAdministration` 对象
- Primitives
	ObservableValue
### 方法加工（使得普通方法变成派生物-derivation）

### 几个重要的类及其职责：
1. `BaseAtom`:
`ObservableArrayAdministration` 通过 `this.atom.reportObserved();` 来通知操作
`ObservableValue` 通过 `this.atom.reportObserved();` 来通知操作

### 几个工具类函数

`runReactions`: 遍历 `globalState.pendingReactions` 里所有的 derivation 对象执行 `runReaction`, 也就是执行 derivation

`reportObserved`:

`reportChanged`:


`startBatch`:

`endBatch`:
```javascript
function startBatch() {
    globalState.inBatch++;
}
function endBatch() {
    if (globalState.inBatch === 1) {
        var list = globalState.pendingUnobservations;
        for (var i = 0; i < list.length; i++) {
            var observable_1 = list[i];
            observable_1.isPendingUnobservation = false;// 挂起不被依赖
            if (observable_1.observers.length === 0) {// 如果 observable 没有 observer 依赖，则触发onBecomeUnobserved事件
                observable_1.onBecomeUnobserved();
            }
        }
        globalState.pendingUnobservations = [];
    }
    globalState.inBatch--;
}
```

`transactionStart`:

`transactionEnd`:
```javascript
function transaction(action, thisArg, report) {
    if (thisArg === void 0) { thisArg = undefined; }
    if (report === void 0) { report = true; }
    transactionStart((action.name) || "anonymous transaction", thisArg, report);
    try {
        return action.call(thisArg);
    }
    finally {
        transactionEnd(report);
    }
}
exports.transaction = transaction;
function transactionStart(name, thisArg, report) {// 开始事务
    if (thisArg === void 0) { thisArg = undefined; }
    if (report === void 0) { report = true; }
    startBatch();
    globalState.inTransaction += 1;
    if (report && isSpyEnabled()) {
        spyReportStart({
            type: "transaction",
            target: thisArg,
            name: name
        });
    }
}
function transactionEnd(report) {
    if (report === void 0) { report = true; }
    if (--globalState.inTransaction === 0) {
        runReactions();
    }
    if (report && isSpyEnabled())
        spyReportEnd();
    endBatch();
}
```

`allowStateChangesStart`:

`allowStateChangesEnd`:
```javascript
function allowStateChanges(allowStateChanges, func) {
    var prev = allowStateChangesStart(allowStateChanges);
    var res = func();
    allowStateChangesEnd(prev);
    return res;
}
function allowStateChangesStart(allowStateChanges) {
    var prev = globalState.allowStateChanges;
    globalState.allowStateChanges = allowStateChanges;
    return prev;
}
function allowStateChangesEnd(prev) {
    globalState.allowStateChanges = prev;
}
```

`untrackedStart`:

`untrackedEnd`:
```javascript
function untracked(action) {
    var prev = untrackedStart();
    var res = action();
    untrackedEnd(prev);
    return res;
}
exports.untracked = untracked;
function untrackedStart() {
    var prev = globalState.trackingDerivation;
    globalState.trackingDerivation = null;
    return prev;
}
function untrackedEnd(prev) {
    globalState.trackingDerivation = prev;
}
```

## mobx实现细节
