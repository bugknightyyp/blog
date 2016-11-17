#express传参方式#

tags: [nodejs] [express]

as we all know， express的传递接受有3种方式：
1. 通过跟在url后边的query string。获取方式: `req.query.xxx`。eg:
 ```
 //请求代码
 $("#query").click(function(){
    $.ajax({
      url: "/test/express-pass-parameters/query",
      data: {type: "query"},//提交的数据
      dataType: "text"
    })
      .done(function(data){
        alert(data);
      })
      .fail(function(err){
        alert(err);
      });
  });
 //服务器端代码
  app.get('/test/express-pass-parameters/query*', function(req, res){

    var str = util.format('您请求的url是：%s;\n我得到的query数据是：%j', req.url, req.query);
    res.send(str);
  });
 ```
 <iframe src="./test/query.html" style="border: none; height: 50px;"></iframe>

2. 直接通过url。获取方式: `req.params.xxx`。

  ps:*这里的`req.params`是个数组，如果你的路由path是正则表达式的话，`req.params`是存放子表达式的匹配结果，如果是形如:xxx，这种格式化的形式，那么参数会作为`req.params`的静态属性保存，如：`req.params.type = 'params';`*

  eg:
 ```
 //请求代码
  $("#param").click(function(){
    $.ajax({

      url: "/test/express-pass-parameters/params/params",//提交的数据在url里
      dataType: "text"
    })
      .done(function(data){
        alert(data);
      })
      .fail(function(err){
        alert(err);
      });

  });
 //服务器端代码
  app.get('/test/express-pass-parameters/params/:type', function(req, res){
    var str = util.format('您请求的url是：%s;\n我得到的params数据是：%j', req.url, {type: req.params.type});

    res.send(str);
  });
 ```
 <iframe src="./test/params.html" style="border: none; height: 50px;"></iframe>
3. 通过请求体。获取方式: `req.body.xxx`。eg:
 ```
 //请求代码
  $("#query").click(function(){
    $.ajax({
      url: "/test/express-pass-parameters",
      data: {type: "query"},//提交的数据
      dataType: "text"
    })
      .done(function(data){
        alert(data);
      })
      .fail(function(err){
        alert(err);
      });

  });
 //服务器端代码
  app.post('/test/express-pass-parameters/post', function(req, res){
    var str = util.format('您请求的url是：%s;\n我得到的post数据是：%j', req.url, req.body);
    res.send(str);
  });
  ```
 <iframe src="./test/post.html" style="border: none; height: 50px;"></iframe>
