# 移动端响应式开发
date: [5]
tags: [mobile] [responsive] [rem]

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```
This means that the browser will (probably) render the width of the page at the width of its own screen.
So if that screen is 320px wide, the browser window will be 320px wide, rather than way zoomed out and showing 960px
(or whatever that device does by default, in lieu of a responsive meta tag). see [here][100]

## 参考
[移动端高清、多屏适配方案][1]

[rem自适应方案][2]

[移动端前端开发设计稿及工作流的探索和思考][3]

[iPhone 6 / 6 Plus 出现后，如何改进工作流以实现一份设计稿支持多个尺寸？][4]

[LESS media query mixins][5]

[移动Web页面，为什么都喜欢width=device-width，并且关闭系统缩放功能？][6]

[Are u ok？---记一次H5项目的安卓适配][7]

[1]:http://div.io/topic/1092#devtoutiao.com/16 "移动端高清、多屏适配方案"
[2]:https://github.com/imweb/mobile/issues/3  "rem自适应方案"
[3]:http://www.haorooms.com/post/ydd_qd_workflow "移动端前端开发设计稿及工作流的探索和思考"
[4]:https://www.zhihu.com/question/25308946 "iPhone 6 / 6 Plus 出现后，如何改进工作流以实现一份设计稿支持多个尺寸？"
[5]:http://simbo.github.io/2014/03/less-media-query-mixins.html "LESS media query mixins"
[6]:https://segmentfault.com/q/1010000000305316 "移动Web页面，为什么都喜欢width=device-width，并且关闭系统缩放功能？"
[7]:http://taobaofed.org/blog/2015/10/28/auto-layout-in-h5-project/ "Are u ok？---记一次H5项目的安卓适配"

[100]:https://css-tricks.com/snippets/html/responsive-meta-tag/
