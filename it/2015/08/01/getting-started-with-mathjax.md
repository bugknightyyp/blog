# [译]MathJax入门
tags: [mathjax]

MathJax能够使你的页面包含数学表达式，无论使用LaTex,MathML还是AsciiMath表达式，数学表达式将被javascript生成HTML,SVG或者MathML方程供任何浏览器显示。

有2种方式来访问MathJax: 最简单的方式就是使用发布在`cnd.mathjax.org`上的副本，但是你也可以下载安装副本到你自己的服务器上，或者本地硬盘(不用通过网络访问)。
这三种方式将在后面详细介绍，配有链接来查看更详细的解释。这篇文章只会提供最便捷的方式来使用MathJax，但是你可能想了解更多的细节来自定义MathJax的启动。


## 使用CDN

使用CDN是最简单的方式。如果你使用这种方式，就不需要自己安装MathJax，你可以直接使用它。

CDN会自动从离读者最近的服务器上快速下载MathJax文件。只要有bug或者补丁可是使用，就会部署到CDN上，你页面就会使用到最新的版本的MathJax。

使用CDN上的MathJax，你需要做2件事情：

1. 在页面里引用MathJax文件;
2. 把数学表达式放在页面里，这样MathJax就能够显示它。

把以下引用放到你页面里，就完成了第一步:

```HTML
<script type="text/javascript"
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
```
这将加载最新的MathJax，并配置MathJax识别TeX和MathML语法写的数学表达式，要求它如果浏览器支持MathML，就输出MathML，否则就使用HTML和CSS来显示数学表达式。

**注意**：`TeX-AMS-MML_HTMLorMML`是一个最大众化的配置文件，因此也最大。我们在这使用它，是因为它能够使你快速开始使用Mathjax。
但是它对于你来说可能不是最有效率的配置，其他的配置文件也是可以使用的。你也可以根据你自己的需要提供额外的配置来裁减掉合并在一起的任何一个配置，
或者使用我们的开发的工具来生成你自己的配置文件。

更多的配置信息你可以在这里查找，[Loading and Configuring MathJax](http://docs.mathjax.org/en/latest/configuration.html#loading)。

关于使用`cdn.mathjax.org`的使用条款,请查看[terms of service](https://www.mathjax.org/mathjax-cdn-terms-of-service.html)。

在下面会介绍怎样在页面里使用数学表达式。

### 访问CDN的安全性

如果使用`http://cdn.mathjax.org`访问CDN，那么脚本下载是通过一个普通而不安全的HTTP链接。这样会冒着很大的风险，因为一个恶意的第三方能够劫持MathJax并替代它。
这就是著名的[第三方攻击][http://en.wikipedia.org/wiki/Man-in-the-middle_attack]。
为了避免这样的攻击，应该通过安全链接HTTPS链接来访问MathJax，正如之间例子演示那样。

如果用户希望是用非安全的HTTP下载MathJax脚本，当且仅当(if and only if)页面本身是通过非安全的HTTP下载，
那么可以使用协议相对地址(protocol-relative address )，它能够自动根据当前页面的使用来切换HTTP和HTTPS。

```HTML
<script type="text/javascript"
  src="//cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
```
**注意**：这种手段不会起作用，如果你使用`file://`访问本地，因为它会尝试从`file://cdn.mathjax.org`加载。

## 自己安装MathJax

我们推荐你使用CDN服务，但是你也可以自己安装MathJax到你自己的服务器或者本地硬盘。这样做，你需要做以下事情：

1. 获取MathJax的副本，使得它能够在服务器或者硬盘上访问。
2. 配置MathJax，满足你网站的需要。
3. 引用MathJax到你的页面。
4. 把数学表达式放到你的页面里。

### 下载安装 MathJax

MathJax的源码在[github][https://github.com/mathjax/MathJax/]上。
安装MathJax到你的服务器。例如，在你服务器的的顶层目录，创建一个MathJax的文件夹是一个很自然的方式。这就能通过`/MathJax/MathJax.js`来引用MathJax的主文件到的服务器上的任何页面里。

一旦你安装好MathJax，你可以通过在`MathJax/test`目录下的文件来测试它。如果你在浏览器里使用web地址访问，请使用`http//`而不是`file://`。当你查看`index.html`文件时，过一会你应该能
看到一个信息，表明MathJax开始正常工作。如果没有，检查文件是否从服务传输完毕，MathJax的文件和文件夹的权限是否正确。检查服务器的关于MathJax安装的日志文件，来查找有关权限或者路径的问题。

### 配置你的MathJax
当你把MathJax如下描述那样引用到页面里，它将会加载文件`config/TeX-AMS-MML_HTMLorMML.js`(MathJax/config/TeX-AMS-MML_HTMLorMML.js)。这个文件将会预加载所有常用的MathJax组件，
然后来处理用Tex，LaTex，MathML标识符写的数学表达式。它将会输出MathML如果浏览器支持，否则会输出HTML和css来渲染数学表达式。

你也可以从预创建的配置文件里选一个，或者是用`config/default.js`文件来自定义自己的设置。这些官方提供的所有配置文件全在[这里][1]有介绍，所有的配置选项在[这里][2]有介绍。

**注意：** MathJax v1.0与v1.1的配置过程有改变，因此如果你有使用v1.0的页面，你需要修改加载MathJax的标签，这样就能和新的配置保持一致。[这里][3]查看更多细节。

### 在页面里引用MathJax副本

你可以在页面里这样引用：

```html
<script type="text/javascript" src="path-to-MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
```
放在你文档里的`head`标签里。这里的`path-to-MathJax`应该换成MathJax的主目录，因此如果你的网站有顶级目录`MathJax`，你应该这样使用：
```html
<script type="text/javascript" src="/MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
```
在页面里，看起来应该是这样的：
```html
<html>
    <head>
        ...
        <script type="text/javascript" src="/MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
    </head>
    <body>
        ...
    </body>
</html>
```
如果MathJax所在的服务器和所在引用的页面的域名不一样，请阅读[这里][4]。如果是这样的话，我到是希望你考虑使用[MathJax的cdn]。

## 在页面里放数学表达式。
在页面是放数学表达式，你可以使用[Tex][6]、[LaTex][7]、[MathML][8]、[AscaiiMath][9]标识符，或者在同一页面里同时使用这任何三种。
MathJax的配置会告诉MathJax你想使用那种标识符，并且在你使用Tex标识符时，你打算这样显示数学表达式。在上面的例子，配置告诉MathJax在页面里寻找Tex和MathML标识符。
其他的配置文件告诉MathJax使用AsciiMath输入。这三种格式会在下面详细描述。

### Tex 和 LaTex输入

如果数学表达式是使用Tex或者Latex格式来写，那么表示使用数学界定符来包围数学表达式，告诉MathJax那部分是数学表达式那些是普通文本。
有这种类型的方程：一种写在行内的，另一种是比较大单独成行的。

默认的界定符是`$$...$$`和`\[...\]`,`\(...\)`是用于行内数学表达式。*注意：* 在特殊情况下`$...$`默认不用于行内界定符。那是因为美元符号经常出现在非数学表达式里，
这可能会导致一些文本会不按预期的当作数学表达式来处理。例如，有一个美元界定符，“... the cost is $2.50 for the first one, and $2.00 for each additional one ...”
会导致词组“2.50 for the first one, and”当作数学表达式来处理，因为它出现在美元符之间。因为这个原因，如果你想使用单个美元符表示行内模式，你必须在配置文件里明确配置。

```html
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
});
</script>
<script type="text/javascript" src="path-to-mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
```

查看`config/default.js`文件或者[tex2jax configuration options][10],来查看额外的配置参数，来设置`tex2jax 预处理器`，它是MathJax的组件，用来识别页面里的TeX标识符。
查看[TeX and LaTeX][11]页面，获取更多关于MathJax对Tex的支持，尤其是当时你使用单个美元符来标识行内模式时该怎样处理单个美元符。

这是个完整包含Tex的例子（也可以在这里查看[test/sample-tex.html][12]）:

```html
<!DOCTYPE html>
<html>
<head>
<title>MathJax TeX Test Page</title>
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});
</script>
<script type="text/javascript"
  src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
</head>
<body>
When $a \ne 0$, there are two solutions to \(ax^2 + bx + c = 0\) and they are
$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$
</body>
</html>
```
因为Tex标识符是页面文本的一部分，因此有些注意事项，你必须注意。尤其是在使用小于号的时候要小心，
因为这些是浏览器用来表示html标签的开始。在小于号的两边放空格是有效的，但还是需要看[ TeX and LaTeX support ][11]更多的细节。

如果你在博客、wiki、评论系统里使用MathJax，在系统里使用的标记语言可能会干扰被MathJax使用的Tex标识符。
例如，如果你博客使用markdown标识符来创作，`_`在Tex表示自脚本，在markdown里表示斜体，这2者可能会产生混淆，从而导致数学表达式不能正常显示。
关于如何解决此问题请查看[TeX and LaTeX support][11]。

有用于Tex输入处理器的几个扩展需要被`TeX-AMS-MML_HTMLorMML`配置来加载。它们是：

- TeX/AMSmath.js，它定义了`AMS`的数学环境和宏(macros)
- TeX/AMSsymbols.js，它定要来 *msam10* 和 *msbm10* 系统字体的宏
- TeX/noErrors.js，当处理Tex出现问题的时候，它显示Tex源码，而不是错误信息
- TeX/noUndefined.js，它阻止未定义宏产生错误信息，而是以红色来显示宏的名字

其他的扩展也可能被自动加载当需要的时候，关于其他可用插件的支持，请查看[TeX and LaTeX support][11]。

### MathML 输入

对于使用[MathML][8]来写数学表达式,你要使用标准的`<math>`标签来标记数学表达式，使用`<math display="block">`来显示数学表达式和`<math display="inline">`或`<math>`来表示行内表达式。

**注意：** MathML不仅可用在HTML文件中，也可用在XHTML文件中，并且网页不需要声明任何的MIME-type。除非你使用了XHTML而不是HTML，否则不需要包含命名空间的前缀给`<math>`标签。
例如，你不需要使用`<m:math>`,除了你把 MathML DTD` xmlns:m="http://www.w3.org/1998/Math/MathML" `作为m的命名空间添加到`<html>`标签的属性里。

尽管这是不需要的，但是推荐你把属性`xmlns="http://www.w3.org/1998/Math/MathML"`添加到所有的`<math>`标签上(这是使用命名空间前缀的首选方式，尽管这已经被HTML5弃用)，为了兼容更多的场景。

这是一个完整的包含MathML数学表达式例子（也可以在这里查看[test/sample-mml.html][13]）:

```html
<!DOCTYPE html>
<html>
<head>
<title>MathJax MathML Test Page</title>
<script type="text/javascript"
  src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
</head>
<body>

<p>
When
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mi>a</mi><mo>&#x2260;</mo><mn>0</mn>
</math>,
there are two solutions to
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mi>a</mi><msup><mi>x</mi><mn>2</mn></msup>
  <mo>+</mo> <mi>b</mi><mi>x</mi>
  <mo>+</mo> <mi>c</mi> <mo>=</mo> <mn>0</mn>
</math>
and they are
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <mi>x</mi> <mo>=</mo>
  <mrow>
    <mfrac>
      <mrow>
        <mo>&#x2212;</mo>
        <mi>b</mi>
        <mo>&#x00B1;</mo>
        <msqrt>
          <msup><mi>b</mi><mn>2</mn></msup>
          <mo>&#x2212;</mo>
          <mn>4</mn><mi>a</mi><mi>c</mi>
        </msqrt>
      </mrow>
      <mrow> <mn>2</mn><mi>a</mi> </mrow>
    </mfrac>
  </mrow>
  <mtext>.</mtext>
</math>
</p>

</body>
</html>
```

当你在HTML页面里（而不是XHTML页面）使用MathML，你不应该使自闭标签，但是你应该对你的所有数学元素明确打开和关闭标签。例如：
```html
<mspace width="5pt"></mspace>
```
而不是`<mspace width="5pt" />`。如果你使用自闭形式，一些浏览器不能正确的建立数学树，MathJax会得到一个毁坏的数学结构，就不能按照原来的表达式正确渲染。不幸的是，MathJax对这无能为力，
因为MathJax在使用他们工作之前，浏览器不能正确解析那些标签。

MathJax在识别页面里的MathML表达式时，使用的组件是 *mml2jax* 扩展，它仅有少量的配置项。请查看`config/default.js`或者[ mml2jax configuration options][14]获取更多的详细信息。
查看[MathML][15]页获取更多的对MathML的支持

### AsciiMath 输入

MathJax v2.0引入一个新的输入格式：[ AsciiMath notation][9]。如果你使用这种方式输入，你需要使用反引号（back-ticks）包围你的数学表达式。i.e., `` `...` ``.

这是一个包含AsciiMath表达式的完整例子（也可以在这里查看 [test/sample-asciimath.html][16] ）:

```html
<!DOCTYPE html>
<html>
<head>
<title>MathJax AsciiMath Test Page</title>
<script type="text/javascript"
  src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=AM_HTMLorMML-full"></script>
</head>
<body>

<p>When `a != 0`, there are two solutions to `ax^2 + bx + c = 0` and
they are</p>
<p style="text-align:center">
  `x = (-b +- sqrt(b^2-4ac))/(2a) .`
</p>

</body>
</html>
```
MathJax在识别页面里的MathML表达式时，使用的组件是 *asciimath2jax* 扩展，它仅有少量的配置项。请查看`config/default.js`或者[ asciimath2jax configuration options][17]获取更多的详细信息。
查看[asciimath2jax][18]页获取更多的对MathML的支持

## 接下来你需要干什么呢？

如果你已经跟着学完一面的步骤，你应该安装了MathJax并在服务器上配置好了，并且你应该能用它来处理页面上的数学表达式了。到此，你能能够开始创建包含数学表达式的页面了。

你也可以查看更多关于[自定义MathJax][19]的细节。

如果你要在博客或者wiki或者一些评论系统里使用MathJax，你可能对[在流行平台上使用MathJax][20]感兴趣。

如果你要在动态的页面里使用MathJax，你可能读关于[MathJax应用程序接口][21]，这样你就了解怎样在动态交互的页面里包含数学表达式。

如果你在使用MathJax过程中遇到困难，你可以阅读[安装MathJax][3]或[加载配置MathJax][19]。

最后，如果你有问题或者评论，或者支持MathJax，你可以访问[MathJax论坛][22]或[MathJax的bug跟踪器][23]

[原文][0]

[0]:http://docs.mathjax.org/en/latest/start.html
[1]:http://docs.mathjax.org/en/latest/config-files.html#common-configurations
[2]:http://docs.mathjax.org/en/latest/options/index.html#configuration
[3]:http://docs.mathjax.org/en/latest/installation.html#installation
[4]:http://docs.mathjax.org/en/latest/installation.html#cross-domain-linking
[5]:http://docs.mathjax.org/en/latest/start.html#mathjax-cdn
[6]:http://docs.mathjax.org/en/latest/glossary.html#term-tex
[7]:http://docs.mathjax.org/en/latest/glossary.html#term-latex
[8]:http://docs.mathjax.org/en/latest/glossary.html#term-mathml
[9]:http://docs.mathjax.org/en/latest/glossary.html#term-asciimath
[10]:http://docs.mathjax.org/en/latest/options/tex2jax.html#configure-tex2jax
[11]:http://docs.mathjax.org/en/latest/tex.html#tex-support
[12]:http://cdn.mathjax.org/mathjax/latest/test/sample-tex.html
[13]:http://cdn.mathjax.org/mathjax/latest/test/sample-mml.html
[14]:http://docs.mathjax.org/en/latest/options/mml2jax.html#configure-mml2jax
[15]:http://docs.mathjax.org/en/latest/mathml.html#mathml-support
[16]:http://cdn.mathjax.org/mathjax/latest/test/sample-asciimath.html
[17]:http://docs.mathjax.org/en/latest/options/asciimath2jax.html#configure-asciimath2jax
[18]:http://docs.mathjax.org/en/latest/asciimath.html#asciimath-support
[19]:http://docs.mathjax.org/en/latest/configuration.html#loading
[20]:http://docs.mathjax.org/en/latest/misc/platforms.html#platforms
[21]:http://docs.mathjax.org/en/latest/api/index.html#mathjax-api
[22]:http://docs.mathjax.org/en/latest/community.html#community-forums
[23]:http://docs.mathjax.org/en/latest/community.html#community-tracker
