# react-motion

react-motion是利用模拟弹簧的特性，来模拟动画的。

## 这个库试图解决什么问题呢？
通常对95%的动画组件用例来说，我们必须使用硬编码的缓动曲线和动画时间来实现动画。
react-motion则是通过设置劲度度系数-stiffness和阻力-damping，让物理学逻辑来处理剩下的事。这样你就不用担心小概率情形，比如：动画被打断。
该library有更强大API，可以替代React's TransitionGroup。
