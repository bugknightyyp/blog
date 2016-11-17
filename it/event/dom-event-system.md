# dom event system

date: [2016-05-01]

tags: [dom-event]

## inherie relactionship

[使用思维导图画的继承关系图][3]

## handleEvent 玄机

`addEventListener()` 的第二个参数，可以传入一个对象，该对象要包含一个名叫 *handleEvent* 的方法，系统会把它作为事件处理函数。

## 参考
[webplatform event specifications][1]

[w3c uievents specifications][4]

[w3c DOM-Level-3-Events specifications][2]

[addEventListener 传入带 handleEvent 的对象][5]


[1]:https://docs.webplatform.org/wiki/dom/Event
[2]:https://www.w3.org/TR/DOM-Level-3-Events/
[3]:http://naotu.baidu.com/file/af34ca823e60ee40e813f372836e252a?token=72a5aff000b4b52b
[4]:https://www.w3.org/TR/uievents/
[5]:http://www.cnblogs.com/dindog/archive/2012/01/13/2322100.html
