# 属性描述符

属性描述符有2种情况，可任选一种，但是不能交叉使用。属性描述符对象有4个属性:

两种方式使用相同的2个属性是：
configurable：可配置性，控制着其描述的属性的修改，表示能否修改属性的特性，能否把属性修改为访问器属性，或者能否通过delete删除属性从而重新定义属性。默认值为true。
enumerable：可枚举性，表示能否通过for-in遍历得到属性。默认值为true。

剩下的2个分别是：

**第一种**:

value：数据属性，表示属性的值。默认值为undefined。
writable：可写性，表示能否修改属性的值。默认值为true。

**第二种**:
get：在读取属性时调用的函数。只指定get则表示属性为只读属性。默认值为undefined。
set：在写入属性时调用的函数。只指定set则表示属性为只写属性。默认值为undefined。
