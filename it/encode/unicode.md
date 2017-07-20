# unicode
tags: [unicode] [utf-8] [utf-16]

UTF-8是一种8位的unicode字符集，编码长度是可变的，并且是ASCII字符集的严格超集，也就是说ASCII中每个字符的编码在UTF-8中是完全一样的。UTF-8字符集中，一个字符可能是1个字节，2个字节，3个字节或者4个字节长。一般来说，欧洲的字母字符长度为1到2个字节，而亚洲的大部分字符则是3个字节，附加字符为4个字节长。


总结一下现在计算机系统通用的字符编码工作方式：

1.在计算机内存中，统一使用Unicode编码，当需要保存到硬盘或者需要传输的时候，就转换为UTF-8编码；
2.用记事本编辑的时候，从文件读取的UTF-8字符被转换为Unicode字符到内存里，编辑完成后，保存的时候再把Unicode转换为UTF-8保存到文件；
3.浏览网页的时候，服务器会把动态生成的Unicode内容转换为UTF-8再传输到浏览器。

[1]:http://my.oschina.net/goal/blog/201032?fromerr=jwG6hRgG "JavaScript: 详解Base64编码和解码"
[2]:http://www.cnblogs.com/kevin2chen/p/6424269.html "Unicode字符集和编码方式"
[3]:http://www.360doc.com/content/15/0807/12/14359545_490082126.shtml "Unicode字符编码标准"
