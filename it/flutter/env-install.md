# 环境安装(windows)

## 安装java jdk

- 打开[官网][1]下载jdk

- 安装jdk, 安装向导会执行2次,一次是安装jdk, 一次是jre, 这2者安装同一目录下即可。

    我的安装目录是：

    ```text
    C:\PROGRAM FILES\JAVA
    ├─jdk1.8.0_191
    └─jre1.8.0_191
    ```

- 测试是否安装成功：`java -version`, 能正确输出表示安装成功

## 安装 android studio

- 打开[官网][2]下载android studio, 会一起安装android sdk
- 安装flutter插件 `File - setting - plugin - Browse repositories`

## 安装 flutter sdk(免安装)

- 打开[官网][3]下载sdk
- 解压安装包到想要安装flutter sdk的目录下， eg: `C:\flutter`, 双击 flutter目录下的`flutter_console.bat`, 可是执行`flutter`命令了, 如果想全局执行`flutter`命令, 请将 `自己的安装目录\flutter\bin` 加入 环境变量 `Path`
- 执行 `flutter doctor`,诊断flutter开发所需环境是否就绪
    ```text
    Doctor summary (to see all details, run flutter doctor -v):
    [right] Flutter (Channel beta, v1.0.0, on Microsoft Windows [Version 10.0.17134.441], locale zh-CN)
    [right] Android toolchain - develop for Android devices (Android SDK 28.0.3)
    [right] Android Studio (version 3.2)
    [!] VS Code (version 1.29.1)
    [right] Connected device (1 available)
    ```

[1]:https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html "jdk下载"
[2]:https://developer.android.google.cn/studio/ "android studio下载"
[3]:https://flutter.io/docs/development/tools/sdk/archive?tab=windows "下载flutter sdk"
