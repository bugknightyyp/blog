# hammer.js源码阅读笔记

date: [2016-06-06]

tags: [event] [touch-action] [gesture]

基于hammer.js 2.0.8源码解读

## 实现思路

从功能上划分这三个类组成：`Manager`,`Input`, `Recognizer`

### Manager
它的任务有：
- 负责手势的添加，移除，等管理任务。
- 手势识别的入口

### Input
抽象不同的输入事件模型(mouseEvent, touchEvent, pointerEvent等)或设备类型(mouse, pen, touch等)的 *event* 对象,
使得不同事件模型的事件对象产生的信息一致

*事件模型*

* mouseEvent
* touchEvent
* pointerEvent

```js
{
  pointers: [ev],
  changedPointers: [ev],
  pointerType: INPUT_TYPE_MOUSE,
  srcEvent: ev
}
```
### Recognizer
抽象各种手势。在子类中实现对各自识别。

大体识别过程：

- 事件触发，`Input` 对事件的所有信息处理好
- 进入`Manager.recognize()`, 遍历所有添加的 `recognizer`
- 逐一进入 `recognizer.recognize(inputData)` 开始识别
- 通过`recognizer.process(inputDataClone)` 获取 `recognizer.state`。首先， 验证是否满足该手势的基本条件(eg: pointer数量是否满足);
  其次, 根据 `eventType` 转成 `recognizer` 的7中状态
- 根据 `recognizer.state` 调用 `recognizer.tryEmit(inputDataClone)` 事件，
- `recognizer.tryEmit` 会判断 `recognizer.requireFail` 数组里的 `recognizer` 的状态是否全部是*STATE_FAILED*,
  若是, 开始执行手势监听函数， 否则不执行该`recognizer`的回调， 并设置`recognizer.state = STATE_FAILED`,
