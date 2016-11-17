#[译]在AngularJS 应用中为你的数据和状态建模

`data`和`state`是应用的，这两者应该受到重视。当你浏览`angularjs`文档时，这两者通常是保存在`controller`。这运行的很好，但是当你`app`增长的超出你预料之中时，这变的很糟糕。`controller`之间需要共享他们包含的`data`、`state`，这时就需要统一的规范来方便组合。

针对这个问题我在这篇文章里写过，它是关于`ActionScript3`的`context`在`Robotlegs framework`的实现。这种方法对`javascript`来说很有效，但是需要一些转换来使得这些东西对`angularjs`有用。

**什么是`model`**

model需要通知与它相关的`views`和`controllers`，当它内部的`state`发生改变时。`notifications`让`views`产生更新输出，让`controllers`改变可用的命令集。一个弱爆了的`MVC`的实现会忽略这些`notifications`，因为应用不需要或者软件平台不支持它们`frome wikipedia`。

关于`MVC`中的`M`,`model`封装了应用的`data`,并且提供一个`API`来访问和操作相关的`data`。其他`class`可能会通过这个`API`发送`models`请求。当`model`的数据发生了改变，该`model`分发事件来通知其他`class`。`models`适合存放主要逻辑功能，比如计算或其他的操作。

一个常见的例子就是购物车。当有一项添加到`shopping cart model`,购物车里所有项要重新计算总价。然后新的总价会保存到`shopping cart model`，那么其他的`classes`就可以来访问新总价。把这个逻辑放在`models`里，可以确保它在应用里不会散乱存在，你就能够精确的知道去哪找，它怎样或者什么时候被操作。

其他控制访问的应用`data`，`models`会维护他。现在有一个对象列表。你想知道那个对象被选择了，因此`data model`有一个`selected`的属性，它保存被选中项的选中状态。其他区域能够访问这个属性来判断该项是否选中并且表现和它保持一致。

正如你所看到的，`data`和`state`密切的相关。**State is data, data is state**。

`models`使用起来很方便。那些常用的数据集能够在应用里流通使用。现在假象有个例子，`UserLoginModel`或者一个`ShoppingCartModel`。可一致性`Portability`需要多点的思考和精力，就不需要为每个项目相同的代码重新写一遍。很明显并不是每个`model`都需要这样做，但是一些需要特殊考虑的就必须这样做。

`model`是应用的核心。可视化组件全力以赴`The visual components get all the ooos and aaahs`，但是作为一个开发者，你应该知道`data`才是真正幕后男人。我们的工作就是管理`data`并且把它精确的传到美丽的界面上呈现出来。这就是为什么隔离核心逻辑的重要性。通过隔离它，你可使得它容易定位、更新和维护。

让我们深挖一下什么是`model`,如果你喜欢我，且急不可耐的想知道`angularjs`的`model`是怎样的，那么让我们窥探一下。

**Exploring the code**

<iframe width="100%" height="300"
src="http://jsfiddle.net/joelhooks/jWmck/embedded/js,result,html/"
allowfullscreen="allowfullscreen" frameborder="0"></iframe>

这是一个简单的例子，它有一个对象列表，每个对象有一个关键的`quote`属性。如果你浏览过该例子，你很快就注意到所有的`data`和`state`都塞进`controller`里。当然对与不重要的的`demo`来讲是这样是可以的，而且那些更复杂的或重要的例子在博客里这样表现有点难。 复杂的demo需要介绍更多的概念来更好的理解怎样使用`model`能减少复杂程序的认知负担。

这种**什么都塞进controller**的方法是可以运行的。但是我们做的更好。

注意：我这好似用`jsFiddle`，它对怎样组织你的代码有所限制。在未来的博客里我将增加一些思考关于组织代码，一个庞大的js文件确实不能很好扩展。

如果你想看关于怎样在大型的angularjs app里怎么组织文件结构，我的一个好朋友[Cliff Meyers][1] 关于这个主题写了篇好文章。

介绍存储数据的`model`

在上边的例子里，所有的数组都是存在`controller`的`$scope`里。那个属于硬编码，我们将会探讨一下`service`的集成使用。现在的任务是完成`data`和`presentation`的分离。这不是说我们不会使用`$scope`，会使用的。`angularjs`把`$scope`当作一个`Presentation Model`使用。这很好，但是我们仍能提供更好的分离，通过使用一个属性对象` a “proper” model`。

<iframe width="100%" height="300" src="http://jsfiddle.net/joelhooks/jWmck/7/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

从上面看，代码已经开始变的清晰一点。控制器的`$scope`基本功能是仍然提供`view`需要的数据，而真实的数据是寄宿在另外一个`model`。这个`model`是通过`angularjs service`定义的一个单例`singleton`。

一开始，我对`angularjs`的`service`定义有点疑惑。它没有那么直接去按照我自己想的服务那些来做，但是这确实一个定义依赖注入的好方法。

<iframe width="100%" height="300" src="http://jsfiddle.net/joelhooks/jWmck/9/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

这个看起来和前边的很像。现在我们是有了一个瘦身过的`controller`，所有的`data`和`state`移到了`autherListModle`。我们把`setSelectedAuthor`添加到`model`里，它派发一个事件。`controller`监听该事件，以便`$scope`能够正确更新,`view`能按期望来显示正确的信息。

这样清晰的分离，随着应用的增长，我将会受益更多。我们能够很容易地分离`textarea`,它用来保存列表里可用`authors`的`quote`。

**反模式警告：**你可能冒险在`model`上添加一个事件监听器。请不要这样做，这会使得他们很难测试并且会违反`model`的单一指责的原则。因为一个`model`有了一个事件派发功能，它也能够来监听事件，问题就在这。如果你想坚持，请忽略此警告。

<iframe width="100%" height="300" src="http://jsfiddle.net/joelhooks/jWmck/10/embedded/js,result,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

这看起来有点傻，但是展现了这种方式的可扩展性。现在`textarea`被自己的`controller`驱动。该`controller`也监听`model`分发的更新事件。取代检查`model`的方式，它使用事件传来的参数来更新`$scope.quote`，剩下的绑定逻辑
有`angularjs`来完成。

你真的以为需要像那样来使用时间吗？

大部分的定义是不需要的。不实用上面的使用事件，你可以简单地绑定`model`，`angularjs`最强大的能力之一就是碉堡的双向绑定。

<iframe width="100%" height="300" src="http://jsfiddle.net/joelhooks/jWmck/12/embedded/js,html,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

这样看起来非常漂亮，比事件方式更干净。在大多数情况下，这种方式最优的。

结论：
`models`提供了一种非常优秀的分离数据和显示的方式。把数据和状态迁移到`model`里，关于数据怎样展示，就有跟容易的可扩展性。`models`也是单元测试的主要候选者，通常他们有一个必须依赖的服务，该服务包含了可测试的主要逻辑。有事可能是时间触发器的形式，如果是这种情况，那么`$rootScope`将包含更多的测试逻辑。

[原文][0]


[0]:http://joelhooks.com/blog/2013/04/24/modeling-data-and-state-in-your-angularjs-application/ "在AngularJS 应用中为你的数据和状态建模"
[1]:http://cliffmeyers.com/blog/2013/4/21/code-organization-angularjs-javascript "Cliff Meyers"