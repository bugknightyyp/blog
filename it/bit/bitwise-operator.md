# 位运算符

在所有现代CPU体系结构中，二进制都以二补数的形式来表示。

计算机的cpu处理算术逻辑的部分ALU(Arithmetic Logic Unit 算上逻辑单元)本质一个加法器，一个移位器组成，全部计算通过补码转成了加法。

最基本的运算是加法运算，减法可以等同于加法； 乘法运算也可以转化为加法运算，相当于做若干次法；



所有位为`1`的2进制数减去另一个2进制数结果等于该2进制数取反。eg:`1111 - 0010 = ~0010`。便于理解负数由补码表示的过程：

    -Y = 0000 - Y
     = (1111 + 1 ) - Y
     = (1111 - Y) + 1   将正整数 Y 的二进制先取反、再加一

所有整数字面量都默认存储为有符号整数。只有 ECMAScript 的位运算符才能创建无符号整数（通过移位实现）。

## 位运算（~）

位运算 NOT 是三步的处理过程：

- 把运算数转换成 32 位数字
- 把二进制数转换成它的二进制反码
- 把二进制数转换成浮点数

## 移位

右/左移，本质上就是对数 乘/除以`2^n`。eg:(js表达式) `3 << 5 === 3 * Math.pow(2, 5)`

## 参考

[补码之美][1]

[ECMAScript 位运算符][2]

[位操作基础篇之位操作全面总结][3]

[1]: https://github.com/lifesinger/lifesinger.github.com/issues/187 "补码之美"
[2]: http://www.w3school.com.cn/js/pro_js_operators_bitwise.asp "ECMAScript 位运算符"
[3]: http://blog.csdn.net/morewindows/article/details/7354571 "位操作基础篇之位操作全面总结"
[4]: https://blog.csdn.net/ojshilu/article/details/11179911 "
只用位运算来实现整数的加减乘除四则运算"
[5]:http://javascript.ruanyifeng.com/grammar/number.html "javascript标准参考课程-数值"
