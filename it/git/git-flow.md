# git流式分支模型


## 分支模型

- `Master`: 存储正式发布的历史
- `Hotfix`:  基于 **Master** 分支创建。维护分支或说是热修复（hotfix）分支用于生成快速给产品发布版本（production releases）打补丁，这是唯一可以直接从master分支fork出来的分支。修复完成，修改应该马上合并回master分支和develop分支（当前的发布分支），master分支应该用新的版本号打好Tag。
- `Release`: 基于 **Develop** 分支创建用于发布。新建的分支用于开始发布循环，所以从这个时间点开始之后新的功能不能再加到这个分支上 —— 这个分支只应该做Bug修复、文档生成和其它面向发布任务。一旦对外发布的工作都完成了，发布分支合并到master分支并分配一个版本号打好Tag。另外，这些从新建发布分支以来的做的修改要合并回develop分支
- `Develop`: 作为功能的集成分支
- `Feature`: 基于 **Develop** 分支创建，开发完后，合并进 **Develop** 分支
- `Feature`:

## 参考
[Git工作流指南：Gitflow工作流][1]

[1]:http://blog.jobbole.com/76867/
