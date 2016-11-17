# promise
date: [10]
tags: [promise] [es2015] [es6]

## promise 有3中状态
- "has-resolution" - Fulfilled
resolve(成功)时。此时会调用 onFulfilled

- "has-rejection" - Rejected
reject(失败)时。此时会调用 onRejected

- "unresolved" - Pending
既不是resolve也不是reject的状态。也就是promise对象刚被创建后的初始化状态等


## 参考
[promises-book][1]


[1]:http://liubin.org/promises-book/
