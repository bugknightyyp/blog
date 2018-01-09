# babel简介

`babel-polyfill`: babel 只是会装换语法，而版本对一些对象添加的新 API ，babel 则无能为力。通过向全局对象和内置对象的prototype上添加方法来实现，比如运行环境中不支持Array-prototype.find，引入polyfill，前端就可以放心的在代码里用es6的语法来写；但是这样会造成全局空间污染。比如像Array-prototype.find就不存在了，还会引起版本之前的冲突。不过即便是引入babel-polyfill，也不能全用，代码量比较大
`babel-register`:模块改写require命令，为它加上一个钩子。此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码。
`babel-core `: babel-core 的作用是把 js 代码分析成 ast ，方便各个插件分析语法进行相应的处理。有些新语法在低版本 js 中是不存在的，如箭头函数，rest 参数，函数默认值等，这种语言层面的不兼容只能通过将代码转为 ast，分析其语法后再转为低版本 js。
`babel-runtime`: 将es6编译成es5去运行，前端可以使用es6的语法来写，最终浏览器上运行的是es5.不会污染全局对象和内置的对象原型。比如当前运行环境不支持promise，可以通过引入babel-runtime/core-js/promise来获取promise，或者通过babel-plugin-transform-runtime自动重写你的promise。但是它不会模拟内置对象原型上的方法，比如Array-prototype.find，就没法支持了，如果运行环境不支持es6，代码里又使用了find方法，就会出错，因为es5并没有这个方法
`babel-helpers`:
`core-js`: Babel 用了优秀的 core-js 用作 polyfill



`babel-preset-latest`: latest是一个特殊的presets，包括了es2015，es2016，es2017的插件（目前为止，以后有es2018也会包括进去）。即总是包含最新的编译插件。

`babel-preset-env`: 当没有添加任何的配置选项时，babel-preset-env默认行为是和babel-preset-latest是一样的。
    `options`:
        `targets.node`: 支持到哪个版本的 node
        `targets.browsers `: 支持到哪个版本的浏览器
        `loose`:启动宽松模式，配合 webpack 的 loader 使用
        `modules`:  使用何种模块加载机制
        `debug`: 开启调试模式
        `include`: 包含哪些文件
        `exclude`: 排除哪些文件
        `useBuiltIns`: 是否对 babel-polyfill 进行分解，只引入所需的部分。可以根据之前的配置自行添加 polyfill，默认不开启。安装 babel-polyfill 后只要引入一次就行：


## 参考

[1]:http://www.ruanyifeng.com/blog/2016/01/babel.html "阮一峰-Babel 入门教程"
[2]:https://segmentfault.com/a/1190000008159877 "Babel的使用"