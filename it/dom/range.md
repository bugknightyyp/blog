# range

Range是一种fragment（HTML片断），它包含了节点或文本节点的一部分。 可以通过document.createRange()或selection象的getRangeAt()方法获得。并且可以操作页面DOM



只记录我当时看文档时，容易误解的地方。

- `setStartBefore(referenceNode)`
- `setStartAfter(referenceNode)`
- `setEndBefore(referenceNode)`
- `setEndAfter(referenceNode)`

一开始我以为是 *referenceNode* 后一个或者前一个 *node*, 其实不是。它是指 *referenceNode* 的点位置，指的是 *referenceNode* 前边那一点的位置。
*before referenceNode* 其实就是 *referenceNode* 本身，*after referenceNode* 其实就是 *referenceNode* 的 *next Sibling node*。

演示基本用法：

```html
<p id="p1"><span>span</span><b id="b1">Hello</b><b id="b2">Hello</b> World</p>
```

```javascript
  var oP1 = document.getElementById('p1')
  var oB1 = document.getElementById('b1');
	var oB2 = document.getElementById('b2');
    var oRange = document.createRange();
    oRange.setStartAfter(oB1);       // 设置range的“起点”
    oRange.setEnd(oP1.lastChild, 3);  // 设置range的“结束点” 文本结点
	alert(oRange.toString()) //"Hello Wo"
  alert(oRange.startOffset);         // 2，
  alert(oRange.startContainer);     // oP1
```

在页面上简单选中内容的 [代码][2]：

```javascript
function selectText(containerid) {
  var range = document.createRange();
  range.selectNode(document.getElementById(containerid));
  window.getSelection().addRange(range);
	 }
```

Range.selectNode(referenceNode) 与 Range.selectNodeContents(referenceNode) 容易混淆

`selectNode`: range.startContainer = range.startContainer = referenceNode的parentNode

`selectNodeContents`: range.startContainer = range.endContainer = referenceNode;range.startOffset = 0; range.endOffset = referenceNode.children.length

`Range.selectNodeContents(referenceNode)` referenceNode里只包含一个文本结点，使用时容易出错,容易当作文本结点处理)：
    这时除了满足上面的range.startContainer = range.endContainer = referenceNode, 另外 range.startOffset = 0, range.endOffset = 1;

```html
<p id="p1">World</p>
```

```javascript
var range = document.createRange();
var b = document.getElementById("p1");
range.selectNodeContents(b);
range.toString()
```






## 参考

[mozilla range API][1]

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Range
[2]:https://developer.mozilla.org/en-US/docs/Web/API/Selection
[3]: https://stackoverflow.com/questions/31677451/how-to-select-div-text-on-button-click
