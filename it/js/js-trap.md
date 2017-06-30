# js陷阱

- **Uncaught RangeError: Maximum call stack size exceeded**
```javascript
var test = {}
Object.defineProperty(test, 'bar', {
	set: function(v) {
 		this.bar = v //这里会导致 setter 自递归自己，从而出现调用栈超额
	}
})
test.bar = 2;

//你可以这样写
var test = {}
Object.defineProperty(test, 'bar', {
	set: function(v) {
 		this._bar = v //这里
	}
})
test.bar = 2;


```
