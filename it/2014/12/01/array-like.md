#类数组（array-like）

tags: [array-like]

常见的类数组有：

- Arguments
- NodeList
- StyleSheetList
- HTMLCollection
- HTMLFormControlsCollection (继承HTMLCollection)
- HTMLOptionsCollection(继承HTMLCollection)
- HTMLAllCollection
- DOMTokenList

##将类数组转换成数组，方便使用数组的API:

```javascript
function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]
```

##参考：
  [Array.prototype.slice()][1]

[1]:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
