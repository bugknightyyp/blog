# matchjax 介绍

对官方文档的关键点概述。

MathJax能够识别 Tex/LaTex, MathML, AsciiMath写的数序表达式, 然后以HTML, SVG, mathML 形式在浏览器里显示。

基本实现思路：Tex/LaTex, MathML, AsciiMath 会被对应的输入处理器加工成一种叫 jax 的中间语言, 然后被HTML, SVG, mathML相应的输出处理器加工成想要的结果。

MathJax基于 web-fonts/svg 输出高质量的排版，缩放不会失真。

Preprocessor 负责在页面上识别 数学 表达式
input Preprocessor 负责将数学表达式转成 MathJax’s internal format

## input Preprocessor 介绍

### TeX and LaTeX input(tex2jax Preprocessor)

AM - AsciiMath http://asciimath.org/
CHTML - CommonHTML
MML - mathML
HTML - HTML with CSS
SVG
TeX - TeX/latex
AMS - american mathematical society https://en.wikipedia.org/wiki/AMS-LaTeX  http://www.ams.org/publications/authors/tex/tex http://www.ams.org



TeX输入处理器有扩展，它们和名字包含TeX的配置文件合并加载。例如配置文件 TeX-AMS_CHTML 会加载下面几个插件(其他组件也会按需加载)：

- TeX/AMSmath.js，它定义了`AMS`的数学环境和宏(macros)
- TeX/AMSsymbols.js，它定要来 *msam10* 和 *msbm10* 系统字体的宏
- TeX/noErrors.js，当处理Tex出现问题的时候，它显示Tex源码，而不是错误信息
- TeX/noUndefined.js，它阻止未定义宏产生错误信息，而是以红色来显示宏的名字

### MathML input (mml2jax)

这个简单直接看官网文档

### AsciiMath input (asciimath2jax)
这个简单直接看官网文档


## 配置


## 参考

[1]:https://kerzol.github.io/markdown-mathjax/editor.html "online live editor for mathjax"

[2]:http://blog.kamidox.com/write-math-formula-with-mathjax.html

https://liam0205.me/2015/09/09/fix-conflict-between-mathjax-and-markdown/

https://yihui.name/cn/2017/04/mathjax-markdown/



http://www.onemathematicalcat.org/MathJaxDocumentation/TeXSyntax.htm "latex Commands available in MathJax"
