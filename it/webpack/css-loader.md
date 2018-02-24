## css-loader

css-loader会像import / require（）一样解释@import和url（），并解析它们。

eg：会这样解析
```js
url(image.png) => require('./image.png')
url(~module/image.png) => require('module/image.png')
```

`alias`配置用法：

**file.css**
```css
@charset "UTF-8";
@import "bootstrap";
```

**webpack.config.js**
```js
{
  test: /\.scss$/,
  use: [
    {
      loader: "style-loader"
    },
    {
      loader: "css-loader",
      options: {
        alias: {
          "../fonts/bootstrap": "bootstrap-sass/assets/fonts/bootstrap"
        }
      }
    },
    {
      loader: "sass-loader",
      options: {
        includePaths: [
          path.resolve("./node_modules/bootstrap-sass/assets/stylesheets")
        ]
      }
    }
  ]
}
```
该配置基于 bootstrap-sass v3.3.7配置，目前bootstrap已经不内置 fonts 文件。
此时的alias是配置 font文件路径的，给编译bootstrap-sass时使用。
bootstrap-sass里的代码是：

```css
$icon-font-path: if($bootstrap-sass-asset-helper, "bootstrap/", "../fonts/bootstrap/") !default;
```