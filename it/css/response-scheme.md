# 移动端自适应方案

## viewport

```js
const scale = window.screen.width / 750
document.write(`<meta name="viewport" content="initial-scale=${scale}">`)
```