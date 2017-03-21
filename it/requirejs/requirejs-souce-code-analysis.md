#requirejs原码分析

##注意项

+   `requirejs`加载所有的代码都是相对于 `baseUrl`，
    `baseUrl`的值正常来说就是页面里顶级`scritp`文件的`data-main`属性的值，
    你也可以显式指定他的值，如果没有指定那么它的就是`requirejs`所在页面的路径

+   如果`moduleID`里包含以下的字符，那么将会当作是正常的`URL`，而不再经过 "base + paths"的配置：
  
    + 以“.js”结尾；
    + 以“/”开头；
    + 包含URL协议，如“http”,“https”；
    
##requirejs作用域层次结构
    
  requirejs的顶级作用域(闭包) > 模块所属作用域（`newContext`） > 模块本身作用域(`module`)。
  就像常见的配置文件分层一样  系统级配置 > 用户级配置 > 应用级配置。有继承的味道，不知道你嗅到了没。
  分层或者分级管理好处就是可以方便管理不同程度的权限。当然这里主要还是方便重用。
    
+ 部分关键的·requirejs·顶级作用域缓存变量：

  + contexts
  + globalDefQueue  保存模块信息

+ 模块所属作用域（`newContext`）下的顶级缓存变量/属性：

  + defQueue: 保存由define方法分析得从的模块信息（如果没有context则是保存的globalDefQueue里），信息包括模块的 name、依赖、回调方法，形如[name, deps, callback], deps包括了关键字require, exports, module 和 其他依赖的模块名字，eg: ["require", "exports", "module", jquery],当然如果该模块不输出结果, exports, module没必要依赖。
  + registry = {}, 缓存module化的模块
  + enabledRegistry = {}, 将模块依赖的“模块name”module化后，绑定defined事件后的  就被缓存到 enabledRegistry里
  + undefEvents = {}, 缓存模块预绑定的事件，模块初始化时还是会加到 this.events上
  + defined = {}, 缓存每个模块的输出结果
  + urlFetched = {}, 缓存已经去请求加载的模块url
  + bundlesMap = {},
  + requireCounter = 1,
  + unnormalizedCounter = 1;
  
## 可配置参数

+ `baseUrl`: 'js/lib',
+ `waitSeconds`: 15
+ `paths`: 
      {
        app: '../app'
      }
+ `shim`:
      {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        }
      }