# 核心类的理解


[`StreamBuilder<T> class`][1]

[`FutureBuilder<T> class`][3]

[`BuildContext class`][2]
`BuildContext`是父组件`build`方法返回的结果，wedget 的build方法或者 new Builder方法才能产生新的BuildContext。[参考][4]
`BuildContext`本质上是`element object`, `BuildContext`的接口不鼓励直接操作`element object`

[`InheritedWidget class`][6]
[Flutter源码分析系列（二）：Widget数据共享之InheritedWidget][7]
[从 Flutter 源码看 InheritedWidget 内部实现原理][8]


[1]:https://docs.flutter.io/flutter/widgets/StreamBuilder-class.html
[2]:https://docs.flutter.io/flutter/widgets/BuildContext-class.html
[3]:https://docs.flutter.io/flutter/widgets/FutureBuilder-class.html
[4]:https://flutterbyexample.com/build-context-class
[5]:https://www.jianshu.com/p/9e5f4c81cc7d "中文基本语法讲解"
[6]:https://docs.flutter.io/flutter/widgets/InheritedWidget-class.html
[7]:https://www.jianshu.com/p/02f69153ad86
[8]:https://loveky.github.io/2018/07/18/how-flutter-inheritedwidget-works/