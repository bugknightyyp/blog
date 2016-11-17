#位运算符

所有位为`1`的2进制数减去另一个2进制数结果等于该2进制数取反。eg:`1111 - 0010 = ~0010`。便于理解负数由补码表示的过程：

    -Y = 0000 - Y
     = (1111 + 1 ) - Y
     = (1111 - Y) + 1   将正整数 Y 的二进制先取反、再加一

##参考
[补码之美][1]

[ECMAScript 位运算符][2]

[位操作基础篇之位操作全面总结][3]

[1]: https://github.com/lifesinger/lifesinger.github.com/issues/187 "补码之美"
[2]: http://www.w3school.com.cn/js/pro_js_operators_bitwise.asp "ECMAScript 位运算符"
[3]: http://blog.csdn.net/morewindows/article/details/7354571 "位操作基础篇之位操作全面总结"
