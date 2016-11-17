# 触屏事件以及手势
date: [2016-04-15]
tags: [touch] [touch-event] [gesture]

## touch-action
这个属性可以告诉浏览器怎样处理element上的元素。它能够增强侦测和体验手势，因为它能够在不执行js的情况下，阻止页面得滚动。
`Hammer`通过js，向后兼容了不支持该属性的浏览器，当然体验上没有native-supported好。
[more][2]

## touch-event

事件名字，顾名思义，很好理解它们什么时候触发。

`touchstart`:

`touchmove`:

`touchend`:

`touchenter`:

`touchleave`:

`touchcancel`: 当手指移动出浏览器界面，就回触发该事件。

## event(touch event对象)的几个重要属性
`identifier`: 识别码，从按下手指到收起手指期间所产生的事件对象里的identifier都是一样的。相当于pointerEvent 里的pointerId。

`touches[]`: 表示所有触点信息的列表，不管是在哪个元素上。

`changedTouches[]`: 表示与该事件直接相关的触点信息列表。

`targetTouches[]`:表示所有触点信息的列表，触点的起始元素要与事件的target一样。

关于`targetTouches`举个例子。比如：我绑定一个`touchstart`事件给一个`DIV`,然后放2个手指在屏幕上。`targetTouches`只包含放在该`DIV`之内的手指触点信息，不包含之外的。


关于`touches`与`targetTouches`的不同，看[stackoverflow上的解释][5]:



## 参考
[Touch And Mouse][0]

[ Introduction to Touch events in JavaScript][4]

[Variation of e.touches, e.targetTouches and e.changedTouches][5]

[移动页面点击穿透问题解决方案][1]

[The Touch-action property][2]

[测试浏览器是否支持touch-action][3]

[对touch event测试事件之间的不同的demo][6]

[0]:http://www.html5rocks.com/en/mobile/touchandmouse/
[1]:http://www.ayqy.net/blog/%E7%A7%BB%E5%8A%A8%E9%A1%B5%E9%9D%A2%E7%82%B9%E5%87%BB%E7%A9%BF%E9%80%8F%E9%97%AE%E9%A2%98%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88/
[2]:http://hammerjs.github.io/touch-action/
[3]:https://cdn.rawgit.com/hammerjs/hammer.js/master/tests/manual/touchaction.html
[4]:http://www.javascriptkit.com/javatutors/touchevents.shtml
[5]:http://stackoverflow.com/questions/7056026/variation-of-e-touches-e-targettouches-and-e-changedtouches
[6]:https://patrickhlauke.github.io/touch/touchlist-objects/
