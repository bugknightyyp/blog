# webpack-dev-server
date: [02]
tags: [webpack] [webpack-dev-server]

webpack-dev-server是一个基于express的静态文件服务器。

## content Base
webpack-dev-server默认的服务目录是当前目录，但是你也可以设置：` webpack-dev-server --content-base build/`

webpack-dev-server会监控源文件的改变，从而自动编译所依赖的bundle。这些编译好的bundle会保存在内从中，目录是相对于 *publicPath*，但不会写到配置的输出目录里。

## 自动刷新
webpack-dev-serve支持多种自动刷新页面模型：
- Iframe mode(页面是嵌在iframe里，当源码有变动的时，页面会自动重新加载)
- Inline mode(一个很精小的 *webpack-dev-server client entry* *eg:`webpack-dev-server/client?http://localhost:8080`* 会被加到 *bundle* 里，当源码有变动的时,用来重新刷新页面，)  

每种mode都支持 Hot Module Replacement，通过HMR，只通知发生改变的bundle，
而不要加载整个页面。* Hot Module Replacement runtime * 能够加载更新的模块，
然后把他们插入正在运行的app。

## Inline mode with node.js API
 webpack-dev-server 没有 `inline: true`的配置，因为webpack-dev-server不能访问webpack的配置。当然，你可以手动添加 *webpack-dev-server client entry point* 到webpack的配置中。

 具体操作是把`webpack-dev-server/client?http://<path>:<port>`添加到所有的 *entry point* 里。



 ```javascript
 // webpack configuration
var path = require("path");
module.exports = {
  entry: {
    app: ["./app/main.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "bundle.js"
  }
};


// node API模式
var config = require("./webpack.config.js");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080");//webpack-dev-server client script
var compiler = webpack(config);
var server = new webpackDevServer(compiler, {...});
server.listen(8080);
 ```

## 模块热替换(Hot Module Replacement)
在 *webpack-dev-server* 的命令行里指定 `--hot`，就开启开启了HMR。这一步是把 *HotModuleReplacementPlugin* 加到了webpack的配置里了。

```HTML
<script src="http://localhost:8080/webpack-dev-server.js"></script>
```
等于
```javascript
 config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080")
```


## (--inline --hot) command line

以下代码摘自webpack-dev-server/bin/webpack-dev-server.js

```javascript
if(options.inline) {
	var devClient = [require.resolve("../client/") + "?" + protocol + "://" + options.host + ":" + options.port];

	if(options.hot)
		devClient.push("webpack/hot/dev-server");
	[].concat(wpOpt).forEach(function(wpOpt) {
		if(typeof wpOpt.entry === "object" && !Array.isArray(wpOpt.entry)) {
			Object.keys(wpOpt.entry).forEach(function(key) {
				wpOpt.entry[key] = devClient.concat(wpOpt.entry[key]);
			});
		} else {
			wpOpt.entry = devClient.concat(wpOpt.entry);
		}
	});
}
```

以下代码摘自webpack/bin/convert-argv.js

```javascript
ifBooleanArg("hot", function() {
  ensureArray(options, "plugins");
  var HotModuleReplacementPlugin = require("../lib/HotModuleReplacementPlugin");
  options.plugins.push(new HotModuleReplacementPlugin());
});
```

参考这里[Difference between `new webpack.HotModuleReplacementPlugin()` and `--hot`? ][4]

## 参考
[WEBPACK DEV SERVER][1]

[webpack-dev-server官方文档][2]

[1]:http://www.jianshu.com/p/941bfaf13be1 "WEBPACK DEV SERVER"
[2]:http://webpack.github.io/docs/webpack-dev-server.html "webpack-dev-server官方文档"
[3]:http://segmentfault.com/a/1190000003499526 "基于webpack搭建前端工程解决方案探索"
[4]:https://github.com/webpack/webpack-dev-server/issues/97 "Difference between `new webpack.HotModuleReplacementPlugin()` and `--hot`? "
