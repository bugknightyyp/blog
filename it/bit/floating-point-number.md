# 浮点数
js的


## 十进制小数分数与二进制的转换

对分子分母分别进行二进制带权分解；然后再进行幂运算。

`13 / 128 =（2^3 + 2^2 + 2^0）/ 2^7 = 2^-4 + 2^-5 + 2^-7 = 0.0001 + 0.00001 + 0.0000001 = 0.0001101`

`1 / 3 =2^0 / (2^0 + 2^1) =  `

|精度|符号位|位指数位|尾数
|---|---|---|---
|float(32)|1|8|23
|double(64)|1|11|52

## 参考
[浮点型数据存储方式浅析][1]

[javascript标准参考课程][2]

[1]:http://2ality.com/2012/04/number-encoding.html "How numbers are encoded in JavaScript"
[2]:https://www.w3schools.com/js/js_numbers.asp "JavaScript Numbers"
[3]:http://2ality.com/2012/07/large-integers.html "Working with large integers in JavaScript"
[4]:https://www.avioconsulting.com/blog/overcoming-javascript-numeric-precision-issues "Overcoming Javascript numeric precision issues"
[5]:https://docs.python.org/3/tutorial/floatingpoint.html "Floating Point Arithmetic: Issues and Limitations"


https://blog.csdn.net/shelldon/article/details/54411472
http://www.w3school.com.cn/js/pro_js_operators_bitwise.asp
https://www.quora.com/Why-does-1-10-0-1000000000000000055511151231257827021181583404541015625-in-C
https://en.wikipedia.org/wiki/Arbitrary-precision_arithmetic
https://tanin.nanakorn.com/blogs/294
http://www.exploringbinary.com/number-of-digits-required-for-round-trip-conversions/
http://www.exploringbinary.com/7-bits-are-not-enough-for-2-digit-accuracy/
https://dl.acm.org/citation.cfm?id=1311775
[1]:https://blog.csdn.net/GeckoLovesKeyboard/article/details/71437329 "浮点型数据存储方式浅析"
[2]:http://javascript.ruanyifeng.com/grammar/number.html "javascript标准参考课程-数值"
