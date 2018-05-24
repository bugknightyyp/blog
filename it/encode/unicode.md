# unicode
tags: [unicode] [utf-8] [utf-16]

## 码点（code point）

一个字符在字符集中的唯一编码叫码点。

## 编码字符集 （coded character set）

对一个字符集中的所有字符进行编号，这种编号后的字符集叫做编码字符集。常见的编码字符集有ASCII、Unicode、GBK等


对于一个字符集来说，要正确编码解码一个字符需要三个关键元素：

字符集（character set）本身
编码字符集（coded character set）
字符编码（character encoding form）
其中字符集规定了计算机能处理哪些字符；编码字符集，即用一个代码点来表示一个字符在字符表中的位置；字符编码，建立一种映射关系：代码点和实际存储数值之间的关系。

需要注意的是：一个字符集可能对应着多种不同的编码方式。比如:unicode字符集,可使用UTF-8/UTF-16/UTF-32编码。

## 编码单元

UTF-8: 采用1~4个8比特的编码单元;
UTF-16: 采用1~2个16比特的编码单元;
UTF-32: 采用1个32比特的编码单元;

前两个属于变长编码，后一个属于等长编码

UTF-8是一种8位的unicode字符集，编码长度是可变的，并且是ASCII字符集的严格超集，也就是说ASCII中每个字符的编码在UTF-8中是完全一样的。UTF-8字符集中，一个字符可能是1个字节，2个字节，3个字节或者4个字节长。一般来说，欧洲的字母字符长度为1到2个字节，而亚洲的大部分字符则是3个字节，附加字符为4个字节长。


总结一下现在计算机系统通用的字符编码工作方式：

1.在计算机内存中，统一使用Unicode编码，当需要保存到硬盘或者需要传输的时候，就转换为UTF-8编码；
2.用记事本编辑的时候，从文件读取的UTF-8字符被转换为Unicode字符到内存里，编辑完成后，保存的时候再把Unicode转换为UTF-8保存到文件；
3.浏览网页的时候，服务器会把动态生成的Unicode内容转换为UTF-8再传输到浏览器。

[1]:http://my.oschina.net/goal/blog/201032?fromerr=jwG6hRgG "JavaScript: 详解Base64编码和解码"
[2]:http://www.cnblogs.com/kevin2chen/p/6424269.html "Unicode字符集和编码方式"
[3]:http://www.360doc.com/content/15/0807/12/14359545_490082126.shtml "Unicode字符编码标准"
[4]:https://blog.csdn.net/longintchar/article/details/51079340 "字符编码的故事：ASCII，GB2312，Unicode，UTF-8，UTF-16"
