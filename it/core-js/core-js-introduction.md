# core-js 介绍

## core-js v3

前端的情况是，开发者想使用最新语法特性或者标准库写代码，提升开发效率，但浏览器对新标准的实现滞后，或者不同浏览器，或者版本一样的同一浏览器实现标准程度有差异,导致兼容性问题。业界普遍做法是开发者使用最新语法特性或标准库写代码，解决效率问题，然后交由转译器(babel)来转成低版本的语法(es3/es5)，解决兼容性问题。

一门语言主要由2部分构成，即：

- 语法。定义结构正确的JavaScript程序的规则集。比如在js里语法特性包括：变量的解构赋值, 箭头函数, 函数默认值, 装饰器等。
- 标准库。就是**类**和**方法**的集合,也可以理解为基础设施。比如在js里标准库包括：`String`, `Regexp`, `Math`, `Date`, `Array`, `Map`, `Set`, `Symbol`, `Reflect`,`Object`, `JSON` `Promise`, `Error`, 全局方法等。

`core-js` 就是使用ES3语法实现新标准库规范的一个优秀开源项目, 通常实现标准库的模块又称作 `polyfill`。

`core-js` 实现pollyfill的要求和标准是：

- polyfill实现应该只使用ES3的语法和标准库。某一个polyfill 不应该从全局环境中使用另一个polyfill
- 在单元测试中应该使用现代语法和极简的babel配置。pure版的单元测试不应该使用任何现代标准库
- 运行在nodejs上的构建工具和测试，应该只使用 nodejs4 的语法和标准库

### core-js 项目的目录及文件组成

 core-js 项目组织形式是 monorepo。

#### package: core-js

- es: 属于ECMAScript标准的polyfill
- features: 所有的polyfill
- internals: 辅助功能模块
- modules: 存放所有polyfill的基本实现, 其他规范目录调用的时候，再做微调
- proposals: 所有stage 0 - 4的polyfill
- stage: 
  - 0.js: stage 0 - 4的polyfill
  - 1.js: stage 1 - 4的polyfill
  - 2.js: stage 2 - 4的polyfill
  - 3.js: stage 3 - 4的polyfill
  - 4.js: stage 4的polyfill
  - pre.js: pre + stage 0 - 4的polyfill
- web: BOM或者DOM增加的polyfill



#### package: core-js-pure

- override: 如果pure版本的实现和全局版本不一样，那么polyfill的实现应该放在该目录下,core-js-pure 其他的文件将从 core-js 包里拷贝过来。
  - internals: 
  - modules: 


## 参考

[3]:https://en.wikipedia.org/wiki/ECMAScript  "ECMAScript版本号以及发布时间"