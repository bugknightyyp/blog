# babel简介-v7.0.0

`babel-cli`:
`babel-code-frame`:
`babel-core`:
`babel-generator`:
`babel-helper-x`:
`babel-helpers`:
`babel-hightlight`:
`babel-node`:
`babel-parser`:
`babel-plugin-external-helpers`:
`babel-plugin-proposal-x`:
`babel-plugin-syntax-x`:
`babel-plugin-transform-x`:
`babel-plugin-transform-runtime`:
`babel-polyfill`:
`babel-preset-env`:
`babel-preset-env-standalone`:
`babel-preset-flow`:
`babel-preset-react`:
`babel-preset-typescript`:
`babel-register`:
`babel-runtime`:
`babel-runtime-corejs2`:
`babel-standalone`:
`babel-template`:
`babel-traverse`:
`babel-types`:
`babylon`:



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

## `@babel/runtime` vs `runtime-corejs2`

## `@babel/plugin-transform-runtime` vs `@babel/runtime`

- 前者一般使用在开发环境，后者一般

## 怎样阅读babel源码

从测试用例开始。跑测试用例的脚本放在 `/scripts/test.sh`。内容是：

```shell
    #!/bin/bash
    set -e

    node="node"
    jestArgs=()

    if [ "$TEST_DEBUG" ]; then # 开启调试
    node="node --inspect-brk"
    jestArgs+=("--runInBand")
    fi

    if [ -n "$CI" ]; then # 开启CI环境测试
    jestArgs+=("--maxWorkers=4")
    jestArgs+=("--ci")
    fi

    if [ -n "$TEST_GREP" ]; then # 按测试用例名字测试
    jestArgs+=("-t")
    jestArgs+=("$TEST_GREP")
    fi

    if [ -n "$TEST_ONLY" ]; then # 按package名字测试
    jestArgs+=("(packages|codemods)/.*$TEST_ONLY.*/test")
    fi

    $node node_modules/jest/bin/jest.js "${jestArgs[@]}"
```

跑某个package的测试用例的命令是：
`babel-parser`: `node --inspect-brk node_modules/jest/bin/jest.js --runInBand "(packages|codemods)/.*babel-parser.*/test"`
`babel-helpers`: `node --inspect-brk node_modules/jest/bin/jest.js --runInBand "(packages|codemods)/.*babel-helpers.*/test"`

####  @babel/plugin-x 的测试用例

plugins的测试用例通常有2种。第一就是由babel自己生产 输入 或者 输出的测试。第二种就是手动创建 `input.js` 或者 `output.js`。

- 如果你期望得到一个错误，就不用创建output.js文件，只需要在`options.json`里设置 `throws` 字段, 该字段包含字符串错误信息。
- 第二种也是首选的类型是：执行生成的代码并断言某些属性为真或假的测试。我们通过创建一个Exc.js文件来实现这一点。

#### @babel/parser 的测试用例

- 创建一个 `input.js` 文件，它包含了要解释的的源码
- 添加一个 `output.json` 文件，它包含了解释后的代码。为了方便，如果没有发现 `output.json` 文件，测试运行器将自动生成。

### 调试代码

### babel-parser

```js
// babel-parser 默认选项
var defaultOptions = {
  sourceType: "script",
  sourceFilename: undefined,
  startLine: 1,
  allowAwaitOutsideFunction: false,
  allowReturnOutsideFunction: false,
  allowImportExportEverywhere: false,
  allowSuperOutsideMethod: false,
  plugins: [],
  strictMode: null,
  ranges: false,
  tokens: false
}

```

继承链条：

- BaseParser
- CommentsParser
- LocationParser
- Tokenizer
    - 实例化：初始化状态
- UtilParser
- NodeUtils
- LValParser
- ExpressionParser
- StatementParser
- Parser

1. 初始化以上实例
2. Parser.parse() 入口函数开始解释
3. 

### babel-cli


## 参考

[0]:https://www.jianshu.com/p/e9b94b2d52e2 "【JavaScript】深入理解Babel原理及其使用"
[1]:http://www.ruanyifeng.com/blog/2016/01/babel.html "阮一峰-Babel 入门教程"
[2]:https://segmentfault.com/a/1190000008159877 "Babel的使用"