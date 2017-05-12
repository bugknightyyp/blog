# matchjax 介绍

对官方文档的关键点概述。

MathJax能够识别 Tex/LaTex, MathML, AsciiMath写的数序表达式, 然后以HTML, SVG, mathML 形式在浏览器里显示。
基本实现思路：Tex/LaTex, MathML, AsciiMath 会被对应的输入处理器加工成一种叫 jax 的中间语言, 然后被HTML, SVG, mathML相应的输出处理器加工成想要的结果。

## tex2jax Preprocessor(TeX/LaTeX 输入处理器)

AM
CHTML
MML
HTML
SVG
TeX
AMS


- TeX/AMSmath.js，它定义了`AMS`的数学环境和宏(macros)
- TeX/AMSsymbols.js，它定要来 *msam10* 和 *msbm10* 系统字体的宏
- TeX/noErrors.js，当处理Tex出现问题的时候，它显示Tex源码，而不是错误信息
- TeX/noUndefined.js，它阻止未定义宏产生错误信息，而是以红色来显示宏的名字

### 配置




http://www.onemathematicalcat.org/MathJaxDocumentation/TeXSyntax.htm "latex Commands available in MathJax"
