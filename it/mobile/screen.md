# 说说屏幕那些事
tags: [screen] [pixel] [device-pixel] [resolution] [ppi] [dpi] [dip] [css-pixel]

## 设备像素(device pixel)
设备像素是物理概念，指的是设备的物理像素。

## 分辨率(resolution)
显示分辨率（屏幕分辨率）是屏幕图像的精密度，是指显示器所能显示的像素有多少。
通常，“分辨率”被表示成每一个方向上的像素数量，比如640X480等。某些情况下也可以同时表示成“每英寸像素”（ppi）以及图形的长度和宽度。比如72ppi(ps创建新画板)，和8X6英寸。

## 每英寸像素数(pixels per inch) ppi
ppi = Math.sqrt(x*x + y*y, 0.5), (X：长度像素数；Y：宽度像素数；Z：屏幕尺寸即对角线长度)。

## 每英寸点数(dots per inch) dpi
 这里的D（dot）就是像素（pixel）， DPI常用于打印或印刷领域，PPi常用于电子设备显示领域

## 设备独立像素(device independent pixels) dip

## css像素
css像素是逻辑像素， css像素指的就是设备独立像素 dip/dips，

## 设备像素比(device pixel ratio) dpr
window.devicePixelRatio = 物理像素 / dips

## Bitmap Pixels（位图像素）
一个位图像素是栅格图像（也就是位图，png、jpg、gif等等）最小的数据单元。每一个位图像素都包含着该如何显示自己的信息，例如显示位置、颜色值等。一些图片格式还包含额外的数据，例如透明度。

除了自身的分辨率外，图片在网页上还有一个抽象的尺寸，通过CSS pixels来定义。浏览器在渲染的过程中，会根据图片的CSS高度和宽度来压缩或是拉伸图片。

当一个位图以原尺寸展示在标准密度显示器上时，一位图像素对应一个物理像素，就是无失真显示。而在Retina显示器上，为了保证同样的物理尺寸，需要用四倍的像素来展示，但由于单个位图像素已经无法再进一步分割，只能就近取色，导致图片变虚。



## 其他
devicePixelRatio在大多数浏览器是值得信赖的。

在iOS设备，screen.width乘以devicePixelRatio得到的是物理像素值。

在Android以及Windows Phone设备，screen.width除以devicePixelRatio得到的是设备独立像素(dips)值。

```js
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
//  
```

## 参考

[主流设备的屏幕信息][1]

[设备像素比devicePixelRatio简单介绍][2]

[移动前端开发之viewport的深入理解][3]

[Towards A Retina Web][4]

[1]:http://screensiz.es/phone "主流设备的屏幕信息"
[2]:http://www.zhangxinxu.com/wordpress/2012/08/window-devicepixelratio/ "设备像素比devicePixelRatio简单介绍"
[3]:http://www.cnblogs.com/2050/p/3877280.html "移动前端开发之viewport的深入理解"
[4]:https://www.smashingmagazine.com/2012/08/towards-retina-web/ "Towards A Retina Web"
