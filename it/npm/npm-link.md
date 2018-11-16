# npm link

在本地开发npm模块的时候，我们可以使用npm link命令，将npm 模块链接到对应的运行项目中去，方便地对模块进行调试和测试

## 使用场景

### 条件准备

1. 一个名叫 common-component 的 npm module

2. 一个依赖 common-component 的项目: admin-project

### 场景

admin-project项目依赖common-component模块, 这是你需要对 common-component 模块进行调试开发。

具体操作过程：

1. 进入 common-component 模块根目录

2. 执行: `npm link`。 会在全局 `node_modules` 创建一个软连接指向当前模块  

3. 进入 admin-project 项目根目录

4. 执行: `npm link common-component`, 会在 admin-project 项目的 `node_modules` 创建一个软连接指向全局 `node_modules` 创建的common-component模块的链接

### 结果

你在 common-component 模块里的改动会反应到 admin-project项目里