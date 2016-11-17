# ES7异步解决方案: async/await
date: [2016-10-28]
tags: [ES7] [async] [await]

## 要点
- async 函数就是 Generator 函数的语法糖。
- await 只能用在普通函数之中，forEach的参数方法里都不行
- async 函数的 await 命令后面，可以跟 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）

## async 函数的实现原理

async 函数的实现，就是将 Generator 函数和自动执行器，包装在一个函数里。

```js
async function fn(args){
  // ...
}
// 等同于
function fn(args){
  return spawn(function*() {
    // ...
  });
}
```

**spawn函数的实现**
```js
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    var gen = genF();
    function step(nextF) {
      try {
        var next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });      
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```

## 参考

[1]:http://www.ruanyifeng.com/blog/2015/05/async.html "async 函数的含义和用法"
