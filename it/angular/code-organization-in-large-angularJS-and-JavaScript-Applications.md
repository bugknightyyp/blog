#[译]使用angularjs或js构建大型应用时，怎样组织你代码

当程序包增长的比较大时，一些开发者经常会为怎样组织代码而狂抓。最近我发现这种情况经常出现angularjs/js领域，从历史上看，这个问题一直横亘在科技界，包括我过去曾开发过的java/flex 应用。

现在趋势是对按照类型来组织文件比较困惑。这和人们整理衣物的方式非常类似。

##堆地板上

让我们看下`angularjs-seed`，`angularjs apps`的起步。`app`目录包含以下结构：

    * css/
    * img/
    * js/
      - app.js
      - controllers.js
      - directives.js
      - filters.js
      - services.js
    * lib/
    * partials/

`js`的目录包含了我们需要的所有类型文件。这非常像在你整理衣服的时候，把衣服放在地板上不同的堆。袜子、内衣、衬衫、裤子等各成一堆。假如你知道你的黑色的羊毛袜堆在墙角，但是需要花些时间才能挖出他们。

这有点混乱。人们不应该这样生活，开发者不应该这样编码。一旦你的`controllers`或`services`文件超过半打，那么寻找这些文件就变的困难起来，文件的变化集在源码控制里就会不透明，等等。

##袜子抽屉

接来的组织`javascript`文件的逻辑是创建一个目录为其中一些结构类型，把对象拆开放到各自的文件中去。继续衣物的比喻，我们希望一位好的化妆师来把袜子放在一个抽屉里，内衣放在另一个，然后把裤子、衬衫整齐地叠好各自放到其他抽屉里。

假想我们要建立一个简单的电子商务网站，有登录流程、产品目录和购物车。我们给`model`(购物逻辑和状态)和服务（代理到`HTTP/JSON`后台）定义了新的类型结构，而不是把他们塞进`angularjs`的单个`service`类型结构里。那我们现在`javascript`结构目录看起来是这样的：

    * controllers/
          o LoginController.js
          o RegistrationController.js
          o ProductDetailController.js
          o SearchResultsController.js
    * directives.js
    * filters.js
    * models/
          o CartModel.js
          o ProductModel.js
          o SearchResultsModel.js
          o UserModel.js
    * services/
          o CartService.js
          o UserService.js
          o ProductService.js


很好，对象能够轻易地被定位到通过浏览文件树或者通过IDE的快捷方式，在源码控制里的变化集能清晰的表现出来我们改了那些东西，等等。这是个重大改进，但是仍然有些局限性。

假设你在办公室，突然想起你需要一套干洗过的衣服来参加明天早上的商旅。打电话回去，要求你的另一半把你的黑色木炭和蓝色细条纹西装交给清洁工，别忘了灰色衬衫与黑色领带和白衬衫与固体黄色领带。想想一些，你的另一半完全不熟悉你的梳妆台和衣柜，当她拉开放领带的抽屉，看到三条黄色领带，那该选择那一个呢？

如果你的衣服是按照成套西装准备，难道这样不好吗？虽然在现实世界中，当实际操作中时有花费和空间的实际限制，但是同样的方式，在编码时确实零成本。

##模块化

希望这老套的比喻不会让你干到太烦闷，下面我简要总结下：

*假设你的另一半是一位团队里的新成员，她被要求去修`app`里的某一个`bug`

*这位开发者打开你的目录结构，看见所有的`controllers`、`models`、`services`井然有条。不行的是，他/她没有被告诉是应该改那个对象或者有其他对象依赖它。

*如果针对某一点，开发者希望重用一些代码，他需要从其他分支的不同文件夹里收集文件，这使得经常忘记其他文件夹里的代码。

不管你信不信，你很少能够在新的报道`app`里重用电子商务`app`的所有`controllers`。你可能需要重用一些验证的逻辑。它们都放在一个地方，难道不好吗？让我们基于功能块来组织`app`：

    * cart/
          o CartModel.js
          o CartService.js
    * common/
          o directives.js
          o filters.js
    * product/
          o search/
                + SearchResultsController.js
                + SearchResultsModel.js
          o ProductDetailController.js
          o ProductModel.js
          o ProductService.js
    * user/
          o LoginController.js
          o RegistrationController.js
          o UserModel.js
          o UserService.js


任意的开发者打开低级的文件夹立刻就知道这个`app`做了什么。在同一个文件夹里的对象都是相关联的并且有依赖关系。理解怎么登录和注册处理任务就像你浏览文件夹里的文件一样简单。通过`copy/paste`的基本重用可以通过复制文件夹到另一个项目里完成。

使用`angularjs`，我们可以更进一步，给相关的代码创建一个`module`：

如果我们这时把`UserModule.js`放进`user`目录里，它将变成一个在`module`里使用的`"manifest"object`。这将是一个合适的位置来给`requirejs`或`browserify`加载命令使用。

##公用代码的提示

每个应用程序都有公用代码，给其他`modules`使用。我们仅仅需要个名叫`common`、`shared`或者任何你喜欢的名字的文件夹，来占个位置。在真正的大项目里，常常会有大量的功能性的重叠和交叉，这点必须考虑。但使用一些小技术可以管起来方便些：

1:如果你有`moduels`需要直接访问几个`common`对象，那么给他们写一个`Facades`。这能够帮助减少对象之间协作的数量，因为有太多的协作是典型的`a code smell`
2:如果你的`common moduels`太多，就把它们按照特定的功能块或所处理的问题拆分放到不同的子目录里。确保你的应用只是用他需要的`common modules`。这就是`DOLID`里的接口隔离原则。
3:把你的工具性函数放到`$rootScope`,那么他们就能够被字作用域访问到。这能够帮助防止写更多的相同的依赖。注意做的时候要非常小心，不要把全局作用域给混乱了，是的依赖不够清晰。
4:使用事件去解耦组件，这样就不用显式的知名依赖。`angularjs`通过作用域对象上的`$emit`、`$broadcast`和`$on`的方法来实现。一个`controller`能够触发事件来启动活动然后获得活动完成时的通知。

##关于资源和测试的速记

我认为关于组织`HTML`、`CSS`、`images`的可扩展性有很多空间。找一个容易管理封装的依赖又不把事搞的复杂化的模块，把放有这些静态资源的`assets`的目录放到该模块里。
但是我认为一个单独的顶级文件夹内容包含一个文件夹结构,且该结构反映了应用程序的包结构是合理的。我认为这同样适用于测试。

##[原文][0]

[0]:http://cliffmeyers.com/blog/2013/4/21/code-organization-angularjs-javascript
