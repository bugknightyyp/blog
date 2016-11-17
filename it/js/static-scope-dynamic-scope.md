# 静态作用域 vs 动态作用域

date: [2016-10-26]

tags: [static-scope] [dynamic-scope]

静态作用域、动态作用域决定引擎如何查询变量和变量在何处能被找到的规则。

静态作用域对应词法作用域，它在写代码时就被确定了。

动态作用域基于调用栈的，所以在代码执行时才能确定。

```js
function foo() {
    console.log( a );
}

function bar() {
    var a = 3;
    foo();
}

var a = 2;

bar();

//静态作用域下 输出 2
//动态作用域下 输出 3
```

## 参考
["你不懂JS：作用域与闭包 附录A：动态作用域"][1]

[1]:http://www.jianshu.com/p/afd3b095722c "你不懂JS：作用域与闭包 附录A：动态作用域"
