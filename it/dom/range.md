# range

Range是一种fragment（HTML片断），它包含了节点或文本节点的一部分。 可以通过document.createRange()或selection象的getRangeAt()方法获得。并且可以操作页面DOM

只记录我当时看文档时，容易误解的地方。

- `setStartBefore(referenceNode)`
- `setStartAfter(referenceNode)`
- `setEndBefore(referenceNode)`
- `setEndAfter(referenceNode)`

一开始我以为是 *referenceNode* 后一个或者前一个 *node*, 其实不是。它是指 *referenceNode* 的点位置，
*before referenceNode* 其实就是 *referenceNode* 本身，*after referenceNode* 其实就是 *referenceNode* 的 *next Sibling node*。


在页面上简单选中内容的 [代码][2]：

```javascript
function selectText(containerid) {
			 if (document.selection) {
					 var range = document.body.createTextRange();
					 range.moveToElementText(document.getElementById(containerid));
					 range.select();
			 } else if (window.getSelection) {
					 var range = document.createRange();
					 range.selectNode(document.getElementById(containerid));
					 window.getSelection().addRange(range);
			 }
	 }
```

## 参考

[mozilla range API][1]

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Range
[2]: https://stackoverflow.com/questions/31677451/how-to-select-div-text-on-button-click
