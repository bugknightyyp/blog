# mobx几个重要的类

## 几个重要的类的职责：
- `BaseAtom`:
在mobx里，只要能被用来存储state就可以被称为atom, 它有2个重要的作用:

	1. 侦探它什么时候被使用，通过 `reportObserved` 来报告。这就能使的运行的 function 与 其使用的数据建立连接
	2. 它应该通知 mobx 它什么时候发生变化，通过 `reportChanged` 来报告。这就能使的mobx重新运行以来该atom的方法
- `ComputedValue`:


- `ObservableArrayAdministration` 通过 `this.atom.reportObserved();` 来通知读取操作，deviation根据该通知来获取依赖的数据
- `ObservableValue` 通过 `this.atom.reportChanged();` 来通知修改操作，

- `Reaction` :
`new Reaction(name, onInvalidate)`,在生成 Reaction对象时，onInvalidate 就是当依赖的数据变化时，要执行的回调函数。

```javascript
Reaction.prototype.runReaction = function () {// 主要就是执行 onInvalidate
		if (!this.isDisposed) {
				this._isScheduled = false;
				if (shouldCompute(this)) {
						this._isTrackPending = true;
						this.onInvalidate();
						if (this._isTrackPending && isSpyEnabled()) {
								spyReport({
										object: this,
										type: "scheduled-reaction"
								});
						}
				}
		}
};
```

## 几个重要的接口的规范
- `IDerivation`:
