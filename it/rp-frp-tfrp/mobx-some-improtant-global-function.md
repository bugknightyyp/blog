# mobx几个重要的全局状态



## 处理依赖关系
`reportObserved(observable)`: 负责收集 derivation 所依赖的 observable 读取数据的操作
`propagateChanged(observable)`: 负责收集 derivation 所依赖的 observable 修改数据的操作
```javascript
function propagateChanged(observable) {//当 observable 发生变化时，将依赖它的 deviation 的状态改成 STALE
    if (observable.lowestObserverState === IDerivationState.STALE)
        return;
    observable.lowestObserverState = IDerivationState.STALE;
    var observers = observable.observers;
    var i = observers.length;
    while (i--) {
        var d = observers[i];
        if (d.dependenciesState === IDerivationState.UP_TO_DATE)
            d.onBecomeStale();// 当 deviation 依赖的数据要发生变化了
        d.dependenciesState = IDerivationState.STALE;
    }
}
```

`bindDependencies(derivation)`: 负责将 derivation 这次执行所依赖的 observable 与上次执行所依赖的 observable 做比较, 做出处理，分3种情况处理：
- 对于不再依赖的该 derivation 的 observable 则从 observable.observers 中移除该derivation
- 对于新增且依赖的该 derivation 的 observable 则把该derivation 保存到  observable.observers 中
- 对于不变的，则不错任何处理

`addObserver(observable, derivation)`: 给 observable.observers 添加被依赖的 derivation
`removeObserver(observable, derivation)`: 从 observable.observers 移除 derivation


`autorun`:

`runReactions`: 遍历 `globalState.pendingReactions` 里所有的 derivation 对象执行 `runReaction`, 也就是执行 derivation

`startBatch` `endBatch`:
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
            if (observable_1.observers.length === 0) {// 如果 observable 没有 observer 依赖它，则触发onBecomeUnobserved事件
                observable_1.onBecomeUnobserved();
            }
        }
        globalState.pendingUnobservations = [];
    }
    globalState.inBatch--;
}
```

`transaction` `transactionStart` `transactionEnd`: 用来批处理数据变化，等批量的数据变化后，才通知 deviation 执行
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

`allowStateChangesStart` `allowStateChangesEnd`:
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

`untrackedStart` `untrackedEnd`:
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
