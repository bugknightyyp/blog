# linux文件结构介绍
tags: [linux, file-system]
date: [2016-12-19]

`/`: 根目录

`/boot`: 系统启动和内核

`/bin`: 系统基本命令 (bin是binary的缩写)

`/lib`: 系统库(不能直接运行的代码)(lib是libary的缩写)

`/dev`: 设备驱动 (dev是device的缩写)

以上是linux系统5个基本目录

`/usr`: universal software resource的缩写。 类似Windows里面的Program Files, /bin 和 /usr/bin的区别，就是 /bin里面的程序更加核心,
/usr里的文件一般都是只读文件，数据文件和配置文件不放在上面

`/etc`: editable text configuration的缩写。例如：/etc/mysql就是放mysql的配置文件; /ect/apache2/就是apache2的配置文件

`/var`: 在历史上“var" 是 “variable"，中文意为“变动”，现在主要用来存放log,lock等文件。
例如 /var/mysql就是用来存放mysql的log，数据库文件放在/var/lib/mysql下

## 参考

[以最简单方式学习Linux](https://mp.weixin.qq.com/s/_gfJ06qQO7j2ysYKWo6QZA)
