#在应用angularjs应用里模拟服务端请求的依赖

大多数的但应用程序是`HTML`和`JavaScript`通过`XMLHttpRequest`与服务端交互实现的。在开发阶段能够实现使用模拟的数据来脱离后端服务的依赖是很方便的。如果服务端很复杂，那么这样做就非常有用，你不用去启动一个本地服务或者如果共享的开发服务器组件突然下线。你不用再手动调整服务返回的数据来确保`UI`在指定的场景下表现良好。那么就必须提早把真实服务端的代码集成到单页应用里，但是由`server mock`手段提供的可扩展性是必不可少的。

**注意：** 虽然这篇文章是演示在`angularjs`应用中怎么使用`mock services`,但是这种模式也适用于人任何`UI`技术中（`javascript`或其他）。关键点是完成关注点分离(`Separation of Concerns`)，这使得真实服务和模拟服务能够轻易的转换。

一些人就开始疑问，为什么我在这篇博客中不用`RESTangular`，我认为`RESTangular`是一个很好的框架，它的可扩展性要比`angularjs`的`$resource`抽象性好。然而对于简单的代码来说，使用`$http`更有用，因为多数的人都非常熟悉它。这个问题忽略了这篇文章的主要观点，那就是使用一种模式，数据访问层是抽象的，因此简化控制器的代码。如果随着应用的增长，需要实现自定义缓存和请求的逻辑，那么`Respository`将是最佳的放置地。你可以将这种模式应用到`$http`、`$resource`、`Restangular`或其他的数据访问库。总而言之：**通过抽象数据访问层，控制器不需要关心数据怎样获取，它只希望返回一个promise对象，在适当的时候决定是处理还是拒绝。**

让我们开始看看怎么回事吧！

**旧的方式：直接使用`$http`**

angular提供`$http`、`$resource`服务来通过HTTP请求加载数据。在教程里，简单应用的通常是直接注入到UI的控制器里：

```js
function DonutController($scope, $http) {
  // get the data
  $http.get('/api/donut/listAll')
  .then(function(response) {
    // no fry cakes here
    $scope.donuts = response.data.fritters;
  });
}
```
这里控制器直接调用`$invoke`去取数据。`$resource`也可以用同样的方式实现。虽然这种方式很简单，但限制了可扩展性，当数据访问在正式环境的时候，开始使得控制器变的复杂。

假设你有一些挂件，用来控制甜甜圈的类型，并按照我们的意愿去加载。当我们调用后台的服务是，需要传一些参数去过滤数据，比如甜甜圈的大小、填料、光滑度、洞的形状：

```js
function DonutController2($scope, $http) {
  // called from the partial on button click
  $scope.fetchDonuts = function() {
    // construct url based on values bound to form elements
    var url = '/api/donuts/list?size=' + $scope.size +
      '&filling=' + $scope.filling +
      '&glaze=' + $scope.glaze +
      '&hole=' + $scope.hasHole ? 1 : 0;
    // feed me
    $http.get(url)
      .then(function(response) {
        $scope.donuts = response.data.results;
      });
  }
}
```
构造URL的代码变得复杂起来，是控制器变得比较混乱。如果有其他views需要那些甜甜圈，那么这些代码需要重新复制。很明显我们能够改善设计，通过重构和设计模式。

**新方式：使用一个库（Uus a Repository）**

这个手段需要添加一个中间层在控制器与用`$http`封住的数据访问层之间，简化控制器里的代码。这是一个使用angular module实现的简单例子：

```js

var donutModule = angular.module('donuts', []);
 
donutModule.service('donutRepository', ['$http', function($http) {
  this.$http = $http;
  /**
   * Retrieves tasty donuts based on user requirements
   */
  this.fetchDonuts = function(size, filling, glaze, hasHole) {
    // construct url based on values bound to form elements
   var url = '/api/donuts/list?size=' + size +
     '&filling=' + filling +
     '&glaze=' + glaze +
     '&hole=' + hasHole ? 1 : 0;
   // feed me
   return this.$http.get(url)
    .then(function(response) {
      return response.data.results;
    });
  };
}]);
 
donutModule.controller('donutController',
  ['$scope', 'donutRepository', function($scope, donutRepository) {
  // get in my belly
  donutRepository.fetchDonuts($scope.size, $scope.filling, $scope.glaze, $scope.hasHole)
    .then(function(donuts) {
      $scope.donuts = donuts;
    });
}]);

```

**注意：**我称呼的中间层为“Repository”,尽管其他的基于你引用的术语也是可以的。请参看下面关于命名的提示说明。

Repository提供一个简单的API，正如`$http`返回一个promise对象，在将来某个时候决定是处理还是拒绝。它暴露一些方法，提供一个清晰的API给控制器能连接字符串建立给`$http`使用的URL。

**使用Repsository来交换模拟服务和真实服务**

现在我们使用另外一个angularjs 模块来展示这两者怎么交换：

```js

var donutModule = angular.module('donuts', []);
 
window.DonutRepository = function($http) {
  this.$http = $http;
  
  this.fetchDonuts = function(size, filling, glaze, hasHole) {
   var url = '/api/donuts/list?size=' + size +
     '&filling=' + filling +
     '&glaze=' + glaze +
     '&hole=' + hasHole ? 1 : 0;
   // invoke real service
   return this.$http.get(url)
    .then(function(response) {
      return response.data.results;
    });
  };
}
 
window.DonutRepositoryMock = function($http) {
  this.$http = $http;
  
  this.fetchDonuts = function(size, filling, glaze, hasHole) {
    // just get data from a flat JSON file
    return this.$http.get('/mockdata/donut/fetch.json')
    .then(function(response) {
      return response.data.results;
    });
  };
}
 
donutModule.factory('donutRepository',
  ['$http', 'configModel', function($http, configModel) {
  if (configModel.mocksEnabled) {
    return new DonutRepositoryMock($http);
  } else {
    return new DonutRepository($http);
  }
}]);

```
现在我们实现了一个新的“mock”实现了从本地服务器加载JSON文件。我们使用一个angularjs的工厂方法来精确控制那个对象作为“donutRepository ”来注入到控制器中。同是模拟的实现可以简单创建一个自己的功能代码，使用`$q`与`deferred`API返回一个promise对象。
```js
var donutModule = angular.module('donuts', []);
 
donutModule.service('donutRepository', ['$q', '$timeout', function($q, $timeout) {
  // get some donuts based on user requirements
  this.fetchDonuts(size, filling, glaze, hasHole) {
    var deferred = $q.defer();
    // return abitrary data after 500ms delay to simulate server call
    $timeout(function() {
      // sorry bro, we're sold out
      deferred.resolve([]);
    }, 500);
    
    return deferred.promise;
  };
}]);

```

被工厂方法引用的"configModel"是一个简单的对象，它含有配置信息。下面的实现允许我们通过URL传参给应用的启动来控制配置的选项：

```js
var appModule = angular.module('myApp', []);
 
appModule.service('configModel', ['$location', function($location) {
  this.initialize = function() {
    this.$location = $location;
    this.useMocks = false;
  };
 
  // read the parameters passed to app, looking for 'useMocks'
  this.configure = function() {
    var params = $location.search();
    
    if (params.useMocks) {
      this.useMocks = true;
      console.log('mocks enabled');
    }
  };
 
  this.initialize();
}]);
 
appModule.run(['configModel', function(configModel) {
  // extract the config before any route changes happen
  configModel.configure();
}])
```

通过“http://some.url/index.html#?useMocks=true”来访问应用，将会只用模拟模式。

一旦把所有的数据访问代码放到它各自的不连续的层里，我们也能获得其他好处。我们能轻易地的把横向关注点，比如日志或缓存等实现集中放到repository层。 如果你需要实现离线模式，每个repository能够协同为一个服务，以队列的形式组成请求，把它们放到`$http`，同时也适用于在线模式。这是很好地管理复杂控制器的方法。

**简单的例子**

我创建了一个简单的“Reddit Browser”的angularjs应用，它提供了使用这些技术的例子。
源码在这："blog-examples" repository[0]

复制仓库，启动一个node服务器，使用脚本： ./scripts/web-server.js

app就能访问：http://localhost:8000/ng-repository/src/index.html

如果使用mock模式，你可以使用dev.html替换。

我鼓励大家反馈，留下你的评论，或者是使用我的联系方式以及在twitter上联系我。

**关于命名的提示**

我把这块放在最后是想解释下语义问题。我悬在"Repository"作为数据访问层的术语，但是有好多语义也是有意义的。名字很重要，这也是应用的模式真正在意的东西。下面是我的一些观点：

- Proxy：因为中间层是在客户端控制器与后端的服务之间。虽然“proxy”是一个非常普遍的模式，但是它没有告诉我作为代理做了什么。
- Service：因为面向结构的服务的流行而受欢迎，服务端的组件在http响应是返回数据经常成为“service”。因此我们也可以称中间层为“service”。但是在angularjs应用里有点混淆，因为“service”在angularjs的上下文中通常是只虚拟的任何对象被用于依赖注入。
- Repository：[Eric Evans的书 Domain-Driven Design: Tackling Complexity in the Heart of Software][1]使它很流行,Repository在服务器端是用来封装查询和持久化的功能，最后返回一个或者多个域对象（domain object）。这很接近在angularjs 应用里做的事情，所以我决定使用它。
- Data Access Object（DAO）:这个在java领域里很流行，它至少和Repository相似，或许是因为它没有域对象的意思。

**[原文][2]**

[0]:https://github.com/cliffmeyers/blog-examples
[1]:http://www.amazon.com/gp/product/0321125215/ref=as_li_tf_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=0321125215&linkCode=as2&tag=clifmeyedotco-20
[2]: http://cliffmeyers.com/blog/2013/8/27/mocking-server-dependencies-in-javascript-and-angularjs-applications
