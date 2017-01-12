# mobx几个重要的类

### 几个重要的类及其职责：
-  `BaseAtom`:
`ObservableArrayAdministration` 通过 `this.atom.reportObserved();` 来通知读取操作，deviation根据该通知来获取依赖的数据
`ObservableValue` 通过 `this.atom.reportChanged();` 来通知修改操作，

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
