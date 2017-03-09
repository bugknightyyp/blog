# 跟踪分支

如果本地的分支设置了自动跟踪远程某分支，那么该本地分支就称为跟踪分支。
当你clone repository时，git会自动创建master分支，来跟踪远程分支：origin/master。
如实是跟踪分支，那么你操作 git fetch, git pull, git push, git就会知道你你操作的对象是什么。
```shell
// 这2条命令都是新建跟踪分支
git checkout -b [branch] [remotename]/[branch]
git checkout --track origin/serverfix

// 将普通分支转为跟踪分支或者修改跟踪分支的跟踪源分支
git branch -u origin/serverfix //Branch serverfix set up to track remote branch serverfix from origin.
git branch --set-upstream-to origin/serverfix

//列出所有分支的跟踪信息
git branch -vv
```


## 参考

[1]:https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches#Tracking-Branches "git官网-chacking branches"
