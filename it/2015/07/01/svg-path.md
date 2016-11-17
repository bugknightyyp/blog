# svg path

`<path>` element的绘画是通过指定`d`attribute来实现的，d包含了所要绘画的指令

命令字符如果是大写，则表示使用的是绝对坐标（相对坐标系的原点），小写表示使用的是相对坐标（相对当前点的坐标）。

如果你连续多次使用同一个命令，那么你可以去掉重复的命令字符，只是提供所需参数。

if you place multiple pairs of coordinates after a moveto, all the pairs after the first are presumed to be preceded by a lineto.

When you "pick up" the pen with another moveto, you are starting a new subpath.

## Path Commands

- **M**: moveto。`x` `y`。画笔移动到point(x, y)，不进行绘制。
- **L**: lineto。`x` `y`。画一条线从当前点到point(x, y)。
- **H**：horizontal lineto。`x`。画一条水平线从当前点到point(x, current point y)。
- **V**：vertical lineto。`y`。画一条x轴的垂直线从当前点到point(current point x,  y)。
- **A**: arc。`rx` `ry` `x-axis-rotation` `large-arc-flag` `sweep-flag` `x` `y`。
从当前点到point(x,y)画一个椭圆弧。rx 和 ry 分别是x、y轴方向上的半径。x-axis-rotation表示绕x旋转多少度，只有在rx和ry不相同的情况下才有影响。
large-arc-flag表示是否选择椭圆的大弧，值是0或1。sweep-flag表示弧的划动方向，1-顺时针，0-逆时针方向。
- **Q**:quadratic Bezier curveto。`x1` `y1` `x` `y`。画一条二次贝塞尔曲线，从当前点到point(x, y)。x1, y1是控制点，用来控制曲线怎样弯曲。
- **T**: smooth quadratic Bezier curveto。`x` `y`。画一条光滑的二次贝塞尔曲线，从当前点到point(x,y)。使用前面Q曲线命令的控制点的反射点作为其实控制点。
如果前面没有Q曲线命令，那么当前点作为控制点，就是说起始点和控制点重复，画出的是条直线。
- **C**:cubic Bézier curve。`x1` `y1` `x2` `y2` `x` `y`。画一条三次Bezier曲线，从当前点到point(x, y)。使用point(x1, y1)作为起始控制点，(x2, y2)作为终止控制点。
- **S**：smooth Bézier curve。 `x2` `y2` `x` `y`。画一条光滑的三次贝塞尔曲线，从当前点到point(x, y)。使用(x2, y2)作为终止控制点，
使用前面曲线命令的终止点的控制点的反射点作为其实控制点。如果之前不是曲线命令，使用当前点作为起始控制点。

<p data-height="268" data-theme-id="0" data-slug-hash="jbmbwa" data-default-tab="result" data-user="bugknightyyp" class='codepen'>See the Pen <a href='http://codepen.io/bugknightyyp/pen/jbmbwa/'>svg path demonstrate</a> by yongpeng yang (<a href='http://codepen.io/bugknightyyp'>@bugknightyyp</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

## 参考：

[mdn svg Paths][1]

[SVG Essentials/Paths][4]

[SVG 研究之路 (4) - Path 基礎篇][2]

[SVG研究之路(5) - Path进阶篇][5]

[svg tutorials - path][3]

[1]:https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
[2]:http://www.oxxostudio.tw/articles/201406/svg-04-path-1.html
[3]:http://tutorials.jenkov.com/svg/path-element.html
[4]:http://commons.oreilly.com/wiki/index.php/SVG_Essentials/Paths
[5]:http://www.oxxostudio.tw/articles/201406/svg-05-path-2.html
