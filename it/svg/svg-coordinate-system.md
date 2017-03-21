# svg坐标系统
tags: [svg] [viewport] [viewBox] [preserveAspectRatio]
## svg canvas

**canvas** 是svg内容被画在的区域或者空间。从概念上讲，canvas的纬度是无穷大的。但是内容在屏幕上渲染是与一个有限区域有关，它就是所谓的 `viewport`。
超出viewport的其他区域就被剪切掉而不可见。


## viewport

viewport是指svg的可视区域。你可以把它认为是能看见特殊场景的窗口，这个场景可能占满整个或是部分窗口。

viewport和浏览器的viewport相似，你通过它浏览页面。一个web页面可以是任何大小，它的宽度可以大于viewport的宽度，通常情况下它的长度是大于viewport的长度。
所以，每次通过viewport只能看到页面的一部分。

你可以在最外层的`svg`元素上使用`width`和`height`属性来指定viewport的大小。

在svg元素上设置的长和宽的单位只会影响svg元素的 viewport。在svg元素里的形状元素必须有自己的单位，如果没有指定单位，默认就是pixels。[参考][2]。

一旦你在最外层的svg元素上设置了`width`和`height`，浏览器就会建立一个初始视窗坐标系统(initial viewport coordinate system)
和一个初始用户坐标系统(initial user coordinate system)

```html
<!-- the viewport will be 800px by 600px -->
<svg width="800" height="600">
    <!-- SVG content drawn onto the SVG canvas -->
</svg>
```

## 初始视窗坐标系统
初始视窗坐标系统基于 **viewport** 建立，原点在viewport的左上角顶点，正x轴指向右边，正Y轴指向下边。

初始用户坐标系统在初始化后与初始视窗坐标系统相同，它也叫当前坐标系统(the current coordinate system)或者用户空间(user space in use)。
使用 **viewBox** 可以改变用户坐标系统。

## viewBox(min-x, min-y, width, height)
一但你使用`width` `height`创建视窗坐标系统，浏览器也会创建一个与其相同的用户坐标系统。

**viewBox与viewport的门道和canvas2D的[drawImage()][6]方法的门道类似。`context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);`
它意思是将img(source)的特定区域绘制到canvas(target)的特定的区域。在svg这，可以认为source和target都是最外层的svg元素,指的是同一个东西，
这里的意思是将viewBox指定的source区域(通过这四个参数min-x, min-y, width, height形成的区域)绘制到viewport指定的target区域(svg元素属性width, height形成的区域)。**

毕竟viewbox和viewport指定的区域可能大小不一，显示效果可能还不满意。如果你还想调整显示效果，就得使用`preserveAspectRatio`属性了。

## preserveAspectRatio ( align [meetOrSlice] )
preserveAspectRatio 用来设置对齐方式、自动填满还是剪掉行为的属性。

*align参数：*

参数  | 意义
------------- | -------------
xMin  | viewport 和viewBox 水平靠左对齐
xMid  | viewport 和viewBox 水平置中
xMax  | viewport 和viewBox 水平靠右对齐
YMin  | viewport 和viewBox 垂直靠上对齐
YMid  | viewport 和viewBox 垂直置中
YMax  | viewpor t和viewBox 垂直靠下对齐


可以有9种组合情况。例如：`xMidYMid`表示水平居中垂直居中，也就是中心重合。

*meetOrSlice:*

可以认为矩形有水平和垂直方向各有一对边。meet:只要一对边铺满就行。slice：两对边都铺满后，把多余的剪切吊。

## 参考

[理解viewport与viewbox][5]

[svg-coordinate-systems-viewport,viewBox,preserveAspectRatio][1]

[0]:http://www.w3cplus.com/html5/svg-coordinate-systems.html "[1]的中文翻译"
[1]:http://sarasoueidan.com/blog/svg-coordinate-systems/ "viewport,viewBox,preserveAspectRatio"
[2]:http://tutorials.jenkov.com/svg/svg-coordinate-system.html "SVG Coordinate System"
[3]:http://jonibologna.com/svg-viewbox-and-viewport/ "A Look At SVG viewBox and viewport"
[4]:http://www.w3.org/TR/SVG/ "w3c svg drafts"
[5]:http://www.oxxostudio.tw/articles/201409/svg-23-viewpoint-viewBox.html
[6]:http://www.w3school.com.cn/tags/canvas_drawimage.asp "HTML5 canvas drawImage() 方法"
