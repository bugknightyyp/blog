
#为什么我们可以这样写express路由#

可能你经常看到下面这样类似的express路由写法：

```
app.get("/post/:year(\\d+)/:month(\\d+)/:day(\\d+)", function(req, res){
  // do something ...
});
app.get("/test/common*", function(req, res){
   // do something ...
});
app.get("/test/common?", function(req, res){
   // do something ...
});
```
更多实例参考[这里][0]

那我们为什么可以这样写，到底存在什么样的规则呢？

其实你设置的每个路由path，如果它是字符串，就会生成一个相应的RegExp对象;如果本身就是RegExp对象，则不再处理。当接受请求后，请求的url就与注册的路由RegExp对象匹配，如果吻合则执行回调。

那字符串Path到对应的RegExp对象是怎么样生成的呢？

下面是express转换的方法，相信了解其内部机制后，再看别人写的路由，再写自己的路由，就不再迷糊。

```
exports.pathRegexp = function(path, keys, sensitive, strict) {
  if (toString.call(path) == '[object RegExp]') return path;
  if (Array.isArray(path)) path = '(' + path.join('|') + ')';//如果是数组，先分成'或'的关系
  path = path
    .concat(strict ? '' : '/?') //决定最后的路径分隔符（/）是否有影响。
    .replace(/\/\(/g, '(?:/') //保证不要给整个占位符（例如：:param）分组，因为形如：:param,其实结果我只需要param，不需要前边那冒号(:)。
    .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?(\*)?/g, function(_, slash, format, key, capture, optional, star){//占位符和后缀名处理
    /*
      _：匹配的字符串，其实它要么匹配的是占位符，要么就是格式符，因为写的时候格式符是不可能写在占位符前边的。我们是经常这样写：package.json。
      slash: /；
      format：我把它看成是格式符（匹配后缀名）；表示的就是.符号
      key: 我把他看成是占位符（匹配文件名）；
      capture：对占位符或格式符的格式的限制；
      optional：可选是看后边有没有跟?（问号）；表示的就是?
      star：决定是否匹配子目录；
    */
      keys.push({ name: key, optional: !! optional });
      slash = slash || '';
      return ''
        + (optional ? '' : slash)
        + '(?:'
        + (optional ? slash : '')
        + (format || '') //如果有format就返回“.”
        + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' 
        /*没有format(格式符)，没有capture也就是你自己没定义格式限制,就返回最后边的：'([^/]+?)'；
          没有format(格式符)，有capture, 也就是你自己定义了格式限制，那么就用自己定义的capture；
          有format(格式符)，没有capture,也就是你自己没定义格式限制，就返回 '([^/.]+?)';
        */
        + (optional || '')
        + (star ? '(/*)?' : '');
    })
    .replace(/([\/.])/g, '\\$1')
    /*
      这里我犯了一个错误，一直以为[\/.]里的点还指的是除了换行和行结束符的单个字符，它只的就是“.”本身；
      这里是将 "/"和"."进行转义。在正则表达式里对"/"和"."进行转义,因为字符串里 本身"\"是有特殊含义的，所以本身要转义，故用"\\"替换
    */
    .replace(/\*/g, '(.*)');
  return new RegExp('^' + path + '$', sensitive ? '' : 'i');
}
```
这儿我写了路由测试，可以输入不同情况的路由path和请求url进行匹配测试，方便理解上边的源代码注释：

<iframe src="./test/router.html" style="border:none; width:500px; height: 200px;"></iframe>


[0]:http://www.csser.com/board/4f77e6f996ca600f78000936#/post/4f77e94896ca600f780009f8  "express 路由实例"