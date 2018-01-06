# webpack入门
date: [02]
tags: [webpack]

webpack 一个前端静态文件打包工具。

## 术语
- `entry`: 入口文件，也就是起始执行文件。
- `loader`: loader可以将不用的语言转换成js，比如CoffeeScript，或者将行内图片转成data URLs，甚至允许你在js文件里`require()` css文件。
多个loader可以通过 **!** 分割一起链式使用。`require("style-loader!css-loader!less-loader!./my-styles.less");`。loader从左向右，以管道的形式来转换内容。
在上面这个例子中，*my-styles.less* 会一次通过 *less-loader* (转成css)、 *css-loader* (url, font及其他资源被处理)、 *style-loader*(转到<style>标签里)。
默认使用npm管理loader，当然也可以把它当成文件使用。
- `plugin`:
- `module`: 可以简单理解为源码里的单个文件。
- `bundle`: 表示最终合成的文件, 入口文件 entry point，把入口文件成为bundle。
- `chunk`: webpack最后打包后的文件成为chunk, 入口文件、code split拆分的文件等，都称为chunk。chunk由多个module组成，bundle是特殊的chunk。

- `output.filename vs output.chunkFilename` filename是主入口的文件名, chunkFilename是非主入口的文件名, 出自[这里][7]
http://www.cnblogs.com/ihardcoder/p/5623411.html
## 模块规范
- ES6 模块

```javascript
import MyModule from './MyModule.js';
```

- CommonJS

```javascript
var MyModule = require('./MyModule.js');
```

- AMD

```javascript
define(['./MyModule.js'], function (MyModule) {

});
```

## 文件路径规则

相对路径是相对当前目录。绝对路径是相对入口文件。

## 指定多个块(Specifying chunks)

- **生成多个bundle**

```javascript
var config = {
  entry: {
    app: ['./app/main.js'],
    vendors: ['react']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ],
  output: {
    path: './build',
    filename: 'bundle.js'//The filename template 命名模板，只是的那个只有一个输出文件时，可以直接写死。
  }
}
```

## 优化公共chunks

`CommonsChunkPlugin` 第一个参数：指定放共享code的`entry point`,默认`entry point name`叫 *main*。[commonschunkplugin官方文档][5]

关键词 minChunks

- **这里是官方配置的[例子][4]**:

可以看出参数依次是：生成的公共文件名字；由 *entry名字*、*文件名字*、*前面CommonsChunkPlugin生成的文件名字* 组成的数组；minChunks

```javascript
var path = require("path");
var CommonsChunkPlugin = require("../../lib/optimize/CommonsChunkPlugin");
module.exports = {
    entry: {
        pageA: "./pageA",
        pageB: "./pageB",
        pageC: "./pageC",
        adminPageA: "./adminPageA",
        adminPageB: "./adminPageB",
        adminPageC: "./adminPageC",
    },
    output: {
        path: path.join(__dirname, "js"),
        filename: "[name].js"
    },
    plugins: [
        new CommonsChunkPlugin("admin-commons.js", ["adminPageA", "adminPageB"]),
        new CommonsChunkPlugin("commons.js", ["pageA", "pageB", "admin-commons.js"], 2),
        new CommonsChunkPlugin("c-commons.js", ["pageC", "adminPageC"]),
    ]
}
```

- **这个[例子][6]里有一句说 *The name must match with the key in the entry object* 不知都对不对**

```javascript
var CommonsPlugin = new require("webpack/lib/optimize/CommonsChunkPlugin")

// ...

module.exports = {  
  entry: {
    common: ["jquery"]
  },
  plugins: [
    new CommonsPlugin({
      minChunks: 3,
      name: "common"
    });
  ]
};
```


## 异步加载(eg: 根据router加载不同的模块)。[demo](/demo/webpack/webpack-lazy-loaded-entries)

## uglify

```javascript
// webpack.config.js
var webpack = require('webpack');

module.exports = {
    entry: {
        home: './home.js',
        about: './about.js'
    },
    output: {
        path: './dist',
        filename: '[name].js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map'
        })
    ]
};
```

## tricks(技巧)-plugins/loader

- 对第三方lib依赖的处理

```javascript
var config = {
  addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(path);
  }
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('app', null, false)
  ]
};

config.addVendor('react', path.resolve(bower_dir, 'react/react.min.js'));



/*********another way**********/


var bower_dir = __dirname + '/bower_components';
var config = {
  resolve: {
    alias: {// 使用key,来代替整个路径
      'react': bower_dir + '/react/react.min.js'
    }
  },
  module: {
    noParse: [bower_dir + '/react/react.min.js'],
  }
}
```

## 参考
[react-webpack-cookbook][0]

[Webpack and React tutorial - Taking the next steps][1]

[基于gulp+webpack的"约定大于配置"的构建方案探讨 2][3]

[Long-term caching of static assets with Webpack][8]

[官网文档翻译][9]

[0]:https://christianalfoni.github.io/react-webpack-cookbook/ "react-webpack-cookbook"
[1]:http://www.christianalfoni.com/articles/2015_10_01_Taking-the-next-step-with-react-and-webpack "Webpack and React tutorial - Taking the next steps"
[2]:http://jonathancreamer.com/advanced-webpack-part-2-code-splitting/ "Advanced WebPack Part 2 - Code Splitting"
[3]:https://segmentfault.com/a/1190000003952477 "基于gulp+webpack的"约定大于配置"的构建方案探讨 2"
[4]:https://github.com/webpack/webpack/tree/master/examples/multiple-commons-chunks
[5]:https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin "commonschunkplugin官方文档"
[6]:http://jonathancreamer.com/advanced-webpack-part-1-the-commonschunk-plugin/
[7]:http://react-china.org/t/webpack-output-filename-output-chunkfilename/2256
[8]:https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95 "Long-term caching of static assets with Webpack"
[9]:https://github.com/liunian/webpack-doc "官网文档翻译"
