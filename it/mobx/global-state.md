# mobx的几种状态

## 全局状态

`globalState`:
```javascript
this.version = 4;
this.trackingDerivation = null; // 正在追踪的 derivation 始终是一个
this.runId = 0;
this.mobxGuid = 0;
this.inTransaction = 0;
this.isRunningReactions = false;
this.inBatch = 0;
this.pendingUnobservations = [];
this.pendingReactions = [];// 缓存所有的 deviation
this.allowStateChanges = true;
this.strictMode = false;
this.resetId = 0;
this.spyListeners = [];
```
