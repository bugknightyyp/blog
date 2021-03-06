# uml-类图

tags: [uml]

六种关系的耦合度大小是: 泛化 = 实现 > 组合 > 聚合 > 关联 > 依赖

泛化和实现是 is a 的关系
组合、聚合、关联是 has a 的关系
依赖是 use a 的关系

部门 组合 公司
码农 聚合 部门
码农 关联 领导
码农 依赖 自行车

方向：源指向对象

## 依赖(dependency)

可以简单的理解，就是一个类A使用到了另一个类B，而这种使用关系是具有偶然性的、临时性的、非常弱的，如果一个类改变其接口，任何发送给该类的消息可能都不再有效；

依赖的存在有各种原因：

-  一个类发送消息给另一个类；
-  一个类拥有另一个类作为其数据的一部分；
-  一个类把另一个类当成是操作的参数；

无论何时，如果你要展示一个元素中的改变会如何改变其他元素，你都可以使用依赖。

## 关联(association)

**例如：**

- 比如某人要过河，需要借用一条船，此时人与船之间的关系就是依赖
- 我用锤子修了一下桌子，我和锤子之间就是一种依赖

他体现的是两个类、或者类与接口之间语义级别的一种强依赖关系，比如我和我的朋友；这种关系比依赖更强、不存在依赖关系的偶然性、关系也不是临时性的，一般是长期性的，而且双方的关系一般是平等的、关联可以是单向、双向的；表现在代码层面，为被关联类B以类属性的形式出现在关联类A中，也可能是关联类A引用了一个类型为被关联类B的全局变量；

**例如：**

- 老师教学生
- 老公和老婆
- 公司与雇员

##聚合(Aggregation)

聚合是关联关系的一种特例，他体现的是整体与部分、拥有的关系，即has-a的关系，此时整体与部分之间是可分离的，他们可以具有各自的生命周期，部分可以属于多个整体对象，也可以为多个整体对象共享。

**例如：**

- 计算机与CPU
- 公司与员工
- 家庭和孩子
- 雁群和大雁

##组合(Aggregation)

组合也是关联关系的一种特例，他体现的是一种contains-a的关系，这种关系比聚合更强，也称为强聚合；他同样体现整体与部分间的关系，但此时整体与部分是不可分的，整体的生命周期结束也就意味着部分的生命周期结束

**无分享**规则是组合的关键。

**例如：**

- 你和你的大脑
- 大雁和翅膀

##依赖与关联的区别

偶然性


##聚合与组合的区别

生命周期

##参考：
  [uml 类图依赖与关联的区别][1]

  [UML中几种类间关系：继承、实现、依赖、关联、聚合、组合的联系与区别][2]

  [UML类图关系（泛化 、继承、实现、依赖、关联、聚合、组合）][3]



[1]: http://www.cnblogs.com/liuzhang/archive/2013/03/17/2964095.html "uml 类图依赖与关联的区别"
[2]: http://blog.csdn.net/sfdev/article/details/3906243 "UML中几种类间关系：继承、实现、依赖、关联、聚合、组合的联系与区别"
[3]: http://chriszeng87.iteye.com/blog/1904016 "UML类图关系（泛化 、继承、实现、依赖、关联、聚合、组合）"
