# tc39怎样定义ecmascript规范

首先明白一点：ecmascript 并不等同于 JavaScript, 前者是定义语言的一套规范，后者是对该规范的实现。


一个特性从产生到加入规范需要5个阶段：

- Stage 0: strawman(原型)
  可以自由开放地提交关于ECMAScript的想法，提案人必须是来自TC39成员或者注册为TC39贡献者的非TC39成员
- Stage 1: proposal(提议)
- Stage 2: draft(草案)
- Stage 3: candidate(候选) 
- Stage 4: finished(完成)

## esnext/ECMAScript Proposals

`esnext`是一个动态的名字，它决定下一个版本要添加的东西。

新特性能够进入提案，必须由委员会的至少一个成员支持(或共同支持),一旦提案在委员会会议生成，那么它将进入 Stage 0,开始按上面阶段进行。

## 参考

[1]:https://en.wikipedia.org/wiki/ECMAScript "ECMAScript版本号以及发布时间"
[2]:https://benmccormick.org/2015/09/14/es5-es6-es2016-es-next-whats-going-on-with-javascript-versioning/ "ES5, ES6, ES2016, ES.Next: What's going on with JavaScript versioning?"
[3]:https://github.com/tc39/proposals "Tracking ECMAScript Proposals"
[4]:https://tc39.github.io/process-document/ "成为规范的5个过程"
[5]:http://exploringjs.com/es2016-es2017/ch_tc39-process.html  "成为规范的5个过程的解析"
[6]:https://kangax.github.io/ "浏览器标准兼容表"
[7]:https://tc39.github.io/ecma262/ "ecma262"
