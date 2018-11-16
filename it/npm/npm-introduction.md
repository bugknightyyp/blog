# npm 介绍

## 原理

npm 脚本的原理非常简单。每当执行npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。

## 传参

## 环境变量

`npm_lifecycle_event`
`npm_package_config_reporter`


## 参考

[阮一峰 npm 脚本使用指南][1]
[阮一峰 npm模块管理器][2]
[阮一峰 package.json文件][3]

[1]:http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html "npm scripts 使用指南"
[2]:http://javascript.ruanyifeng.com/nodejs/npm.html "npm模块管理器"
[3]:http://javascript.ruanyifeng.com/nodejs/packagejson.html "package.json文件"