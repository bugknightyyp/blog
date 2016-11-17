#基于html5 postMessage实现跨域的库：JSChannel

##Channel提供的静态接口:

``build``: 使用 Channel.build({options})，生成通道对象;

- `options.window`:与之通信的window对象
- `options.origin`:
- `options.scope`:
- `options.debugOutput`:
- `options.postMessageObserver`:
- `options.gotMessageObserver`:
- `options.onReady`:

##Channel对象提供的静态接口:

1 ``unbind``: channelInstance.unbind(method),
2 ``bind``: channelInstance.unbind(method),
3 ``call``: channelInstance.unbind(method),
4 ``notify``: channelInstance.unbind(method),
5 ``destroy``: channelInstance.unbind(method),

##流程

我请求，对方接受请求后，处理逻辑，逻辑处理完，再告诉我处理结果；

##Transactions
对于异步的处理，需要借助Transactions实例来完成，需要把该实例改变成异步状态，且异步处理完后激活其完成方法，来返回处理结果

```
chan.bind("twiddleThumbs", function(trans, params) {
  setTimeout(function() { 
    trans.complete("thumbs twiddled!"); 
    /*手动激活complete方法，告诉对方处理结果。
    (chen.call方法传的success方法会执行，并且complete方法的参数传给success方法)
    */
  }, 50);
  trans.delayReturn(true);//手动将trans设置成异步状态
});
```
