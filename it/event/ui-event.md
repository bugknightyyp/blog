# UIEvent
date: [2016-04-03]
tags: [event] [ui-event]

## `UIEvent.sourceCapabilities`

它是[InputDeviceCapabilities][1]接口的事例，它保存了关于物理设备对触摸事件响应的信息。
`UIEvent.sourceCapabilities.iresTouchEvents`, 用布尔值来表示设备是否派发了touch event。


Dom event抽象了设备输入，但是没有办法知悉什么设备或者设备触发的事件类型。这就会导致同样动作的实例触发多次事件处理。
`InputDeviceCapabilities`通过抽象输入设备的能力，来解决该问题。
比如，我们能确保如果 *touchstart event* 被触发了，就说明用户的设备是支持 *touch* 功能。
当 *mousedown event*触发时会怎么样呢？如果我们知道 *touchstart event* 已经被触发了，那么相同的动作就不用触发两次了。
通过检查`UIEvent.sourceCapabilities`属性，就可以做到这一点。


```js
myButton.addEventListener('mousedown', function(e) {
  // Touch event case handled above, don't change the style again on tap.
  if (!e.sourceCapabilities.firesTouchEvents)
    myButton.classList.add("pressed");
});
```

## 参考

[mdn-UIEvent][2]
[mdn-InputDeviceCapabilities][1]


[1]:https://developer.mozilla.org/en-US/docs/Web/API/InputDeviceCapabilities
[2]:https://developer.mozilla.org/en-US/docs/Web/API/UIEvent
