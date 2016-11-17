# 颜色空间

tags: [color]

看了好多关于颜色文章，感觉还是似懂非懂，只能边积累，边理解了。

## 人类视觉系统
> 人类对光的感知是依靠视网膜(retina)细胞。cones(视锥细胞)负责感知光度(较强光)和色彩, rods(视杆细胞)仅能感知光度，不能感知颜色，但其对光的敏感度是cones的一万倍。
在微弱光环境下rods起主要作用，因此我们不能在暗环境中分辨颜色。一些数码相机的夜光拍摄模式也模拟了这一特性。

----[百度百科-人类视觉系统][12]

## 色彩

> 色彩并不存在于外部世界，就像重力和质子那样，相反，颜色产生在我们的脑海中，我们的大脑将一定范围的电磁波光谱转化成颜色，
我能够测量出辐射波的波长，但我不能测量或者观察到你大脑对颜色的感受。

----[你看到的红色和我看到的是一样的吗？](http://v.youku.com/v_show/id_XNTQ5NzAxMTQ0.html)

## 颜色度量

亮度、色调和饱和度称为颜色视觉三特性。

**亮度** 亮度是光作用于人眼所引起的明亮程度的感觉，它与被观察物体的发光程度有关。主要表现为光的强和弱。  
**色调** 是由波长决定的色别，如700nm光的色调是红色，579nm光的色调是黄色，510nm光的色调是绿色等等；
**饱和度** 就是纯度，表示掺入白光的程度。没有混入白色的窄带单色，在视觉上就是高饱和度的颜色。光谱所有的光都是最纯的颜色光，加入白色越多，混合后的颜色就越不纯，看起来也就越不饱和。

## 常识
- 完全不饱和的颜色根本没有色调，如黑白之间的各种灰色；
- HSV 中 Saturation == 100% 就叫纯色。HSL 中 Saturation == 50% 就叫纯色。
- 饱和色：只有一种基色，或只有两种基色组成的颜色，叫饱和色；非饱和色：由三种基色共同组合而成的颜色叫非饱和色；

## 颜色分类

- 依赖设备

- 不依赖设备

## RGB

## HSB又称HSV
HSB: Hue(色相) Saturation(饱和度) Brightness(明度)

HSV: Hue(色相) Saturation(饱和度) Value(明度)

S: 表示 H、100%S、100%B组合成的颜色 与 白色的混合，前者所占的比例

B: 它表示H和S组合成的颜色 与 黑色混合，前者所占的比例。

这两句具体怎么理解请参看我的[csdn博客的解释](http://blog.csdn.net/bugknightyyp/article/details/13504873 " 颜色值");

## HSL
HSL: Hue(色相) Saturation(饱和度) Lightness(亮度)或亮度 (Intensity)
H：指物体传导或反射的波长。更常见的是以颜色如红色，橘色或绿色来辨识，取 0 到 360 度的数值来衡量。
S: 又称色度，是指色彩的强度或纯度。饱和度代表灰色与色调的比例，并以 0% (灰色) 到 100% (完全饱和) 来衡量。
L: 是指颜色的相对明暗度，通常以 0% (黑色) 到 100% (白色) 的百分比来衡量。

## CIEXYZ

## CIELAB

## other
**关于明度和亮度的关系**：
> 因为HSL和HSV是设备依赖的RGB的简单变换，(h, s, l)或 (h, s, v)三元组定义的颜色依赖于所使用的特定红色、绿色和蓝色“加法原色”。
每个独特的RGB设备都伴随着一个独特的HSL和HSV空间。但是 (h, s, l)或 (h, s, v)三元组在被约束于特定RGB空间比如sRGB的时候就变成明确的了。

----[wikipeida-HSL和HSV色彩空间][13]
> 明度其实是颜色的三属性之一.
明度的定义是 是眼睛对光源和物体表面的明暗程度的感觉
亮度是光度学单位 单位投影面积上的发光强度.亮度的单位是坎德拉/平方米（cd/m2）
PS中明度和亮度的概念,不吹毛求疵的话,就理解为一样的.
其实明度是颜色固有的属性.例如黄色就比蓝色的明度高,明度具有客观性
而亮度是可以调节的,对应发光强度.而亮度就具有主观性了.
对于电脑而言,同一色相的颜色,要反映出不同的明度,只能通过控制亮度来改变了,就是发光体的光强,32位电脑2的8次方共256级

----[PS中图像的明度和亮度指的是什么,区别是什么?](http://www.zybang.com/question/0c9a9bef52218defcde95d53fdd4f548.html)

## hcl(Hue-Chroma-Luminance)

The Hue-Chroma-Luminance (HCL) color space is based on how the human perception works. When using HCL, you can directly control the color (hue), the colorness (chroma)
 and the luminance (brightness).




## 参考：

[Colour Spaces][5]

[wikipeida-HSL_and_HSV][14]

[hclwizard][1]

[How to Make Effective Use of Colors in Meteorological Visualizations][2]

[Mastering Multi-hued Color Scales with Chroma.js][4]

[hcl-picker][6]

[colorbrewer2][3]

[Color theory][7]

[Lab and HCL Color Spaces][8]

[Color_difference][9]

[Basic color schemes][10]

[i want hue][11]



[1]:http://hclwizard.org/ "hclwizard"
[2]:http://journals.ametsoc.org/doi/full/10.1175/BAMS-D-13-00155.1  "How to Make Effective Use of Colors in Meteorological Visualizations"
[3]:http://colorbrewer2.org/ "colorbrewer2"
[4]:https://vis4.net/blog/posts/mastering-multi-hued-color-scales/ "Mastering Multi-hued Color Scales with Chroma.js"
[5]:http://www.s-anand.net/blog/colour-spaces/ "Colour Spaces"
[6]:http://tristen.ca/hcl-picker/ "hcl-picker"
[7]:http://zzolo.org/colortools/ "Color theory"
[8]:https://gist.github.com/mbostock/3014589 "Lab and HCL Color Spaces"
[9]:https://en.wikipedia.org/wiki/Color_difference "Color_difference"
[10]:http://www.tigercolor.com/color-lab/color-theory/color-theory-intro.htm "Basic color schemes"
[11]:http://tools.medialab.sciences-po.fr/iwanthue/index.php "i want hue"
[12]:http://baike.baidu.com/view/1027876.htm "百度百科-人类视觉系统"
[13]:https://zh.wikipedia.org/wiki/HSL%E5%92%8CHSV%E8%89%B2%E5%BD%A9%E7%A9%BA%E9%97%B4 "wikipeida-HSL和HSV色彩空间"
[14]:https://en.wikipedia.org/wiki/HSL_and_HSV
