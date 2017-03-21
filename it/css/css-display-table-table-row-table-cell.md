#css display: table,table-row,table-cell

>举例来说，如果某个元素已经被设置为“display:table-cell;”，而它的父节点（包含它的容器）没有被设置为“display:table-row;”属性，那么浏览器将会创建一个被设置为“display:table-row;”的匿名盒对象来嵌套它。并且与之相邻的属性为“display: table-cell;”的兄弟节点也都会被这个匿名盒对象所包含，直到碰到一个没有被设置为“display: table-cell;”的元素而结束这一行。

如果某个元素被设置为“display:table-row;”，而它的父节点没有被设置为“display:table;”（或者“display:table-row-group;”），浏览器将会创建一个被设置为“display:table;”的匿名盒对象来嵌套它，与之相邻的属性为“display: table-row;”的兄弟节点也都会被包含其中。同样，如果某个元素被设置为“display:table-row;”，但它的内部却缺少“display:table-cell;”的元素，那么一个匿名的table-cell将会被创建，用来包含该table-row中的所有元素。

##参考

[div 属性display：table-cell（转）][1]


[1]:(http://kangzye.blog.163.com/blog/static/368192232009814114111435/ "div 属性display：table-cell（转）")
