# 移动端自适应方案

## viewport

```js
const scale = window.screen.width / 750
document.write(`<meta name="viewport" content="initial-scale=${scale}">`)
```
这种方案主要通过缩放 visual viewport来实现自适应。 使得 visual viewport 和 layout viewport 宽度都为 设计稿宽度750，visual viewport 缩放比例为 `window.screen.width / 750`.

优点：
- 可以直接使用设计稿上的参数，不用工具转译单位；
- 1px像素的问题轻松解决；

缺点：
- 缩放了页面,导致使用第三方组件时，使其缩小了，显示模糊。例如使用了百度地图；

## rem 方案


## vw 方案

## rpx 方案

优点：
- 可以直接使用设计稿上的参数，不用工具转译单位，只需px换成rpx；
- 无法解决1px像素的问题轻松解决；

缺点：
- 样式加载时，需要将rpx换算成px;
