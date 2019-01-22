# 修饰符说明

`static`: 类似java中的staitc，表示一个成员属于类而不是对象

`final`: 类似java中的final，必须初始化，初始化后值不可变，编译时不能确定值。

`const`: 编译时就确定，并且不能被修改

`static`: 修饰 `member`

`final`: 修饰 `variable` - 变量 - 运行时才确定

`const`: 修饰 `value` - 常量 - 编译时就确定了

**注意编译时和运行时这2个阶段的区分**

const和final定义的都是常量，值不能改变，并且在声明的时候就必须初始化。
但是也有细微差别，简单来说

- const定义的是编译时常量，只能用编译时常量来初始化
- final定义的常量可以用变量来初始化

类的每个字段都对应一个隐式的Getter和Setter，你可以使用get和set关键字扩展功能，如果字段为final或者const的话，那么它只有一个getter方法

类的定义使用class关键字，创建对象使用new关键字，创建不可变对象需要使用const关键字

用final修饰的变量，其值在初始化后不可改变；const用来定义常量。
它们的区别在于，const比final更加严格。final只是要求变量在初始化后值不变，但通过final，我们无法在编译时（运行之前）知道这个变量的值；而const所修饰的是编译时常量，我们在编译时就已经知道了它的值，显然，它的值也是不可改变的。

`Instance variables can be final but not const. Final instance variables must be initialized before the constructor body starts — at the variable declaration, by a constructor parameter, or in the constructor’s initializer list.`

实例变量可以是final但不可以是const. final修饰的实例变量必须在构造器方法体执行前初始化，初始化的时机包括: 

- 变量声明时。eg：`final x = 1`
- 构造器参数赋值。eg: `Point(this.x, this.y)`
- 构造器的初始化列表。eg: `Point(x, y): x = x, y = y;`

```dart
final time = new DateTime.now(); //Ok
const time = new DateTime.now(); //Error，new DateTime.now()不是const常量
```

[1]:https://stackoverflow.com/questions/50431055/what-is-the-difference-in-between-const-and-final-keyword-in-dart "what is the difference in between ''const'' and ''final'' keyword in Dart?"
[2]:https://dartpad.dartlang.org/ "dart在线工具"
[3]:https://jpryan.me/dartbyexample/ "dart基础教程"