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
this.pendingReactions = [];
this.allowStateChanges = true;
this.strictMode = false;
this.resetId = 0;
this.spyListeners = [];
```

## 其他几种标识状体（以枚举形式存在）

### IDerivationState

```javascript
IDerivationState[IDerivationState["NOT_TRACKING"] = -1] = "NOT_TRACKING";
IDerivationState[IDerivationState["UP_TO_DATE"] = 0] = "UP_TO_DATE";
IDerivationState[IDerivationState["POSSIBLY_STALE"] = 1] = "POSSIBLY_STALE";
IDerivationState[IDerivationState["STALE"] = 2] = "STALE";
```


### valueMode/mobxModifier
```javascript
ValueMode[ValueMode["Recursive"] = 0] = "Recursive";
ValueMode[ValueMode["Reference"] = 1] = "Reference";
ValueMode[ValueMode["Structure"] = 2] = "Structure";
ValueMode[ValueMode["Flat"] = 3] = "Flat";

function withModifier(modifier, value) {
    assertUnwrapped(value, "Modifiers are not allowed to be nested");
    return {
        mobxModifier: modifier,
        value: value
    };
}
function getModifier(value) {
    if (value) {
        return value.mobxModifier || null;
    }
    return null;
}

function asReference(value) {
    return withModifier(ValueMode.Reference, value);
}
asReference.mobxModifier = ValueMode.Reference;


function asStructure(value) {
    return withModifier(ValueMode.Structure, value);
}
asStructure.mobxModifier = ValueMode.Structure;


function asFlat(value) {
    return withModifier(ValueMode.Flat, value);
}
asFlat.mobxModifier = ValueMode.Flat;


function asMap(data, modifierFunc) {
    return map(data, modifierFunc);
}
```

### valueType

```javascript
ValueType[ValueType["Reference"] = 0] = "Reference";
ValueType[ValueType["PlainObject"] = 1] = "PlainObject";
ValueType[ValueType["ComplexObject"] = 2] = "ComplexObject";
ValueType[ValueType["Array"] = 3] = "Array";
ValueType[ValueType["ViewFunction"] = 4] = "ViewFunction";
ValueType[ValueType["ComplexFunction"] = 5] = "ComplexFunction";

function getTypeOfValue(value) {
    if (value === null || value === undefined)
        return ValueType.Reference;
    if (typeof value === "function")
        return value.length ? ValueType.ComplexFunction : ValueType.ViewFunction;
    if (isArrayLike(value))
        return ValueType.Array;
    if (typeof value === "object")
        return isPlainObject(value) ? ValueType.PlainObject : ValueType.ComplexObject;
    return ValueType.Reference;
}
```
