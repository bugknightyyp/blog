# lerna 介绍


## 公共 `devDependencies`

公共 `devDependencies` 会提升至项目的根目录。
注意如果依赖的包提供的二进制可执行命令被 npm scripts 使用到，那么需要直接安装在对应模块的下。
eg:

```js
{
  "scripts": {
    "nsp": "nsp"
  },
  "devDependencies": {
    "nsp": "^2.3.3"
  }
}
```

## 参考

[github 地址][1]



[1]:https://github.com/lerna/lerna "github 地址"