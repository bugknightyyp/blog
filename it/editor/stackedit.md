# stackedit 源码解读

stackedit是一个在线 markdown 编辑器，出支持基本的markdown语法后，还支持额外的语法，比如 table/latex/序列图/文件可以直接保存到等其他额外的功能，体验很爽，因此研究一番，自己打算实现类似的一个编辑器。

本文基于4.3.14版本解读

## 代码架构

stackeidt 基本上是各种开源模块的组装。代码组织使用 **requiresjs** lib. 先介绍其使用的主要第三方功能lib:

- 工具类: `jquery` `underscore`
- markdown to html: [pagedown][3](stack overflow 使用的 markdow 编辑器)
- latex: `mathjax`
- 文件合并: `google-diff-match-patch-js`

## 代码执行顺序

利用jquery的ready事件执行初始化工作
页面布局layout初始化，主要是界面初始化工作
编辑器editor初始化
执行eventMgr.onReady事件

##实现思路

根据h{1,2,3,4,5,6}标题标签来划分区域，h标签之间的内容为以一个section

## 参考

[1]:https://stackedit.io/ "官网"
[2]:https://github.com/benweet/stackedit "github托管地址"
[3]:https://github.com/StackExchange/pagedown "stack overflow 使用的 markdow 编辑器"
