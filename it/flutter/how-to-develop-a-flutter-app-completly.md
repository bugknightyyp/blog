# 怎样开发一个完整的flutter app

## 布局

## 状态管理

bloc状态管理方案[参考][6]

## 路由

## 网络

## 打包

[打包apk][7]

[参考][1]

keytool 在这个目录下 ` C:\Program Files\Android\Android Studio\jre\bin`

`.\keytool.exe -genkey -v -keystore /C:/Users/yyp/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key`

安装到对应的deviceID设备上：`flutter install -d XEGNW18424002557`

## 下拉刷新

## 打包


[参考][2]


[1]:https://www.jianshu.com/p/f91b4e84cec8 "flutter笔记5：官方资料搬运-安卓客户端打包"
[2]:https://www.jianshu.com/p/1ccbb1c898ba "flutter实战4：新闻列表的懒加载和下拉手势刷新"
[3]:https://www.jianshu.com/p/bb69f81f6236 "flutter基础-看完这篇就可以撸app了"
[4]:https://juejin.im/post/5b97fa0d5188255c5546dcf8 "Flutter | 状态管理探索篇——Scoped Model（一）"
[5]:https://github.com/brianegan/scoped_model "scoped_model github"
[6]:https://juejin.im/post/5bcea438e51d4536c65d2232 "Flutter | 状态管理拓展篇——RxDart(四)"
[7]:https://flutter.io/docs/deployment/android#review-the-app-manifest "打包apk"