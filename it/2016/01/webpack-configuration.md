# webpack 配置
date: [02]
tags: [webpack]


## webpack配置
通常在项目的根目录有一个名叫`webpack.config.js`的配置文件，本质上是一个nodejs module。例如：



**配置字段说明：**
- `context`: 默认`process.cwd()`。基目录，用来解释 entry 选项
- `entry`:可以是以下几种类型
  * String:
  * Object:
  * Array:
- `output`: 配置打包结果，path定义了输出的文件夹，filename则定义了打包结果文件的名称，filename里面的[name]会由entry中的键（这里是entry1和entry2）替换。
可以有多个*entry*,配置一个*output*。

- `resolve`: 定义了解析模块路径时的配置，常用的就是extensions，可以用来指定模块的后缀，这样在引入模块时就不需要写后缀了，会自动补全
- `module`: 定义了对模块的处理逻辑，这里可以用loaders定义了一系列的加载器，以及一些正则。当需要加载的文件匹配test的正则时，就会调用后面的loader对文件进行处理，这正是webpack强大的原因。
比如这里定义了凡是.js结尾的文件都是用babel-loader做处理，而.jsx结尾的文件会先经过jsx-loader处理，
然后经过babel-loader处理。当然这些loader也需要通过npm install安装。
- `plugins`: 这里定义了需要使用的插件，比如commonsPlugin在打包多个入口文件时会提取出公用的部分，生成common.js


## examples

```js
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');// 抽取共用模块

module.exports = {
    entry: {
        entry1: './entry/entry1.js',
        entry2: './entry/entry2.js'
    },
    output: {
        path: __dirname,
        filename: '[name].entry.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/, // 配置.js / .jsx文件
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
              presets: ['react', 'es2015']
            }
       }]
    },
    plugins: [commonsPlugin]
};
```

## 参考：
[官方配置文档][1]
[loader.pitch到底是怎么用][2]



[1]:http://webpack.github.io/docs/configuration.html "官方配置文档"
[2]:https://github.com/webpack/webpack/issues/360 "Documentation for pitch vs normal loader isn't very clear"
