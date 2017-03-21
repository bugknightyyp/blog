#[译] 加载配置MathJax

页面加载Mathjax比较简单，就不翻译了，如果想看，请查看[原文][1]，着重翻译下配置。

## 配置MathJax

MathJax有2种配置方式：使用配置文件，或者在页面里使用配置命令。他们可以单独使用，或者结合使用。例如，可以加载一个预定义配置文件，
但是也可以根据你的需求使用页面配置命令。

**注意** 你必须至少使用这2种其中的任何一种。除了v1.0以外，v1.1以上的版本不再需要加载默认的配置文件。
如果你使用1.0的配置文件`config/MathJax.js`来配置，你需要通过`config`参数明确加载配置文件，像下面描述那样。

## 使用配置文件

第一种方式是使用配置文件来配置MathJax。MathJax内置有一些预定义的配置文件，他们保存在`MathJax/config`目录里。他们分别是：

- default.js

它几乎包含了所有的配置选项，并且都有详细的注释，你可以编辑它们来满足你的需求。

- TeX-AMS-MML_HTMLorMML.js

允许使用 Tex，LaTex，MathML标识符。通过加载 *AMSmath* 和 *AMSsymbol* 文件包，如果浏览器支持MathML，就输出MathML，否则就输出HTML-with-CSS。

- TeX-AMS_HTML.js

允许使用 Tex，LaTex标识符。通过加载 *AMSmath* 和 *AMSsymbol* 文件包，使用`HTML-CSS output processor`输出HTML-CSS。

- MML_HTMLorMML.js

允许使用MathML标识符。如果浏览器支持MathML，就输出MathML，否则就输出HTML-CSS。

- AM_HTMLorMML.js

允许使用AsciiMath标识符。如果浏览器支持MathML，就输出MathML，否则就输出HTML-with-CSS。

- TeX-AMS-MML_SVG.js

允许使用 Tex，LaTex，MathML标识符。通过加载 *AMSmath* 和 *AMSsymbol* 文件包，输出SVG。

- TeX-MML-AM_HTMLorMML.js

允许使用 Tex，LaTex，MathML,AsciiMath标识符。通过加载 *AMSmath* 和 *AMSsymbol* 文件包，如果浏览器支持MathML，就输出MathML，否则就输出HTML-with-CSS。

首先这些都是一个个文件，你可以修改来满足你的需求。他们几乎包含了所有的MathJax的配置选项，并且注释里对它们进行了解释。
其他所谓的合并配置文件(combined configuration files)，不但能配置MathJax，而且能根据配置的需求来加载不同的文件。（这些文件内容的详细解释在[通用配置部分][2]）。

通常，mathjax只会按需加载组件，但是每个组件需要加载一个单独的文件，因此在数学表达式显示之前，会引起延迟。合并的配置文件能够把所需的大多数文件作为一个打文件一起加载，
减少网络请求。这就意味着获取MathJax所需的组件要比没有合并的文件快多了，但是你可能会加载都不需要的组件。这就是权衡。

每种组合的配置文件有2中形式：一种就是上面列举的，它只负责配置输出处理器，但是不包含主要的功能代码。另一种是全版本(full version)的，它包含所有的输出处理器。
例如：`TeX-AMS_HTML.js`和`TeX-AMS_HTML-full.js`，后者包含所有的 HTML-CSS 输出处理器。"full"的配置文件本质上很大的（大概有70KB），因此你需要决定是否值得加载所有的配置。

如果你大多数页面包含数学表达式，那么加载全版本是有优势的，但是如果你只是在一个博客的主题或者wiki里偶尔使用，或许加载标准的配置是最好的，这样它只按需加载，
就能节省不必要的70KB。当然，如果你的服务器配置了压缩文件，这2者差别就不大了。当然大多数浏览器会缓存javascript，因此它只第一个页面加载，这样或许使用全版本是最好的。
然而，大多数移动浏览器是对缓存文件的大小是有限制的，以此它们可能强制每一个页面加载配置文件。你需要在决定使用配置文件时，注意这个问题。

加载配置文件，请使用`config=filename`(filename是个文件名，没有`.js`)作为`MathJax.js`的URL参数。例如：
```html
<script type="text/javascript"
   src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
```

从CDN上加载`config/TeX-AMS-MML_HTMLorMML.js`配置文件。

你可以包含多个配置文件通过逗号分割它们。例如，如果你本地定义了一个名叫`MathJax/config/local/local.js`的文件，它修改了`TeX-AMS_HML`的设置，定义了新的TeX宏等等，
你可以使用：
```html
<script type="text/javascript"
   src="path-to-MathJax/MathJax.js?config=TeX-AMS_HTML,local/local">
</script>
```
来先加载住配置文件，然后加载本地文件修改的文件。

## 通过CDN来使用本地配置文件

你可以通过CDN使用MathJax，但是使用你本地服务器上的配置文件。例如,假如你有个名叫`local.js`的配置文件放在自己的服务器上，在一个名叫`MathJax/config/local`的目录里。
这是你仍然可是使用CDN上的MathJax，并且使用自己的配置文件，向下面这样：
```html
<script type="text/javascript"
   src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML,http://myserver.com/MathJax/config/local/local.js">
</script>
```
因为`local.js`不在CDN服务器上，你必须给出完整的URL地址。注意你也可以编辑放在配置文件底部的`loadComplete()`方法，
使得`[MathJax]/config/local/local.js`变成如你在`config`参数里给出的完整URL。在上面的例子里，它可能是：
```javascript
MathJax.Ajax.loadComplete("http://myserver.com/MathJax/config/local/local.js");
```
那是因为原URL的`[MathJax]`指的是加载`MathJax.js`的根目录，它在CDN上，不是你自己的服务器，你需要告诉MathJax你自己的配置文件所在的地址。

## 使用行内配置选项

第2种配置MathJax的方式是通过 *in-line configuration*，它把配置选项放在页面里。这种配置需要两个`script`标签：一个是指明配置设置，另一个是加载MathJax。
因为MathJax一旦加载完，就开始处理配置过程。配置的`script`标签要在MathJax所在的`script`标签之前。你应该使用一个包含`type="text/x-mathjax-config"`属性的`script`标签，
当MathJax处理配置时，将执行里面的内容。通常，这个脚本包含一个`MathJax.Hub.Config()`方法调用来执行配置，但是它也柏涵其他的MathJax命令，比如注册信号动作，
还有其他任何javascript命令。你可以使用多个`script`标签，MathJax将会依次执行。例如：

```javascript
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    extensions: ["tex2jax.js"],
    jax: ["input/TeX", "output/HTML-CSS"],
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
      processEscapes: true
    },
    "HTML-CSS": { availableFonts: ["TeX"] }
  });
</script>
<script type="text/javascript" src="path-to-MathJax/MathJax.js">
</script>
```
这个例子中包含了 *tex2jax preprocessor* 并且配置它使用标准的Tex和LaTex的数学界定符。使用 *Tex* 输入处理器和*HTML-CSS*输出处理器，
强制 *HTML-CSS* 处理器使用Tex fonts而不是本地安装的字体(e.g：[STIX][3] fonts)。查看configuration option部分
(或者文件`config/default.js`内的注释)来获取更多关于`MathJax.Hub.Config()`调用的配置内容。这个配置没有加载任何预定义的配置文件。

**注意** 你可是混合使用行内配置和基于文件的配置。想上面那样包含`text/x-mathjax-config`脚本，也可以包含`config=filename`在加载文件`MathJax.js`的时候。
例如：*tex2jax preprocessor* 默认并有使用 *TeX single-dollar* 作为数学界定符。你可以使用预定义配置里任何一个包含 *TeX preprocessor* 的文件，
并且使用行内配置块来实现使用单美元符号( single-dollar signs),就像下面那样：
```html
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      processEscapes: true
    }
  });
</script>
<script type="text/javascript" src="path-to-MathJax/MathJax.js?config=TeX-AMS_HTML">
</script>
```
## 使用普通javascript

从v2.3开始，你可以在MathJax启动之前，使用javascript代码来设置`window.MathJax`对象。MathJax将会使用该对象来进行初始化设置。例如之前的例子就变成这样：
```html
<script type="text/javascript">
  window.MathJax = {
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      processEscapes: true
    }
  };
</script>
<script type="text/javascript" src="path-to-MathJax/MathJax.js?config=TeX-AMS_HTML">
</script>
```
通过一个自定义类型的scripts，你可以是输入任何的代码，它将在配置阶段执行。你就把代码放在`AuthorInit`里就行：
```html
<script type="text/javascript">
  window.MathJax = {
    AuthorInit: function () {
      ... initialization code ...
    }
  };
</script>
```
**注意** 这个初始化代码在`MathJax.Hub.queue`启动之前执行，因此如果你想在`AuthorInit`方法内排队其他的动作，请使用：
```html
<script type="text/javascript">
  window.MathJax = {
    AuthorInit: function () {
      MathJax.Hub.Register.StartupHook("Begin",function () {
        MathJax.Hub.Queue(
          ... your actions here ...
        )
      });
    }
  };
</script>
```

## MathJax加载后再配置
因为MathJax在加载后就立即进行配置处理(这样它就能尽可能快得开始加载文件)，所以配置块必须放在`MathJax.js`之前，
这样MathJax在启动前就能使用他们，然而，你可能想把MathJax的配置放在页面靠后的位置。

当你的网站把MathJax是作为主题或者模板的一部分加载时，希望能够修改某些页面的配置。这时，你需要要求MathJax延迟启动配置。MathJax使用 `delayStartupUntil` 参数来控制启动顺序的时间。
默认它的值是`none`,意思是MathJax立即启动配置而没有延时。

你可以设置`delayStartupUntil=onload`,阻止MathJax启动处理直到触发页面onload事件。这就允许MathJax能找到页面所有的`text/x-mathjax-config`配置块，而不仅是出现在`MathJax.js`之前的配置块。
这也意味着MathJax不会立即加载其他任何文件，这可能会延迟数学表达式的显示，因为onload事件是等到页面所有的图片等其他媒体资源加载完才触发的。
(如果那你使用一个合并的配置文件，它已经包含了所有MathJax所需的文件，这样就不会有太多的延迟)。

你可以设置`delayStartupUntil=configured`延迟配置的处理直到你调用`MathJax.Hub.Configured()`。但是你要尽可能快的重启MathJax的配置处理而不是等到整个页面加载完。例如：把下面的代码
```html
<script type="text/javascript"
   src="path-to-MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML&delayStartupUntil=configured">
</script>
```
放在头文件里。并且将：
```html
<script type="text/javascript">
  MathJax.Hub.Configured()
</script>
```
放在尾文件里，这样MathJax会延迟启动直到到达尾文件，但是不会等到所有的媒体文件加载完。通过这种方式，在文档体里的`text/x-mathjax-config`脚本，MathJax能够读取并且在启动前处理它们。
用这种方式，就可以修改每个页的默认配置。

**注意**`MathJax.Hub.Configured()`不会被MathJax调用。你必须在页面的某个地方调用它。如果你不执行这个方法，那么MathJax将不会处理任何的数学表达式。

## MathJax处理配置的细节

因为有好多种方式来配置MathJax，那么它们的相互作用是非常重要的。配置行为如下：

1. 执行`MathJax = {...}`里的`AuthorInit()`
2. 处理通过URL参数config=指定的任何配置文件
3. 执行行内MathJax = {...}的自定义配置
4. 处理行内脚本(不赞成使用)
5. 如果有延迟启动请求，就等待指示信号
6. 处理任何的配置文件里提早配置的队列

**注意** `text/x-mathjax-config`的脚本块要前于`MathJax.js`的脚本元素，否则你必须请求延迟启动。
不然，在`MathJax.js`的脚本元素之后的配置块或许当MathJax运行时不可用，会导致基于浏览器的反常行为会发生。
`window.MathJax`必须在`MathJax.js`加载之前就创建。如果你其之后创建，将会使的整个MathJax不可用。


[原文][1]

[1]:http://docs.mathjax.org/en/latest/configuration.html
[2]:http://docs.mathjax.org/en/latest/config-files.html#common-configurations
[3]:http://docs.mathjax.org/en/latest/glossary.html#term-stix
[4]:http://docs.mathjax.org/en/latest/options/index.html#configuration
