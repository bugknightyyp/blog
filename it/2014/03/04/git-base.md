#git基础
##常用操作
`git add -A` #stages All

`git add .` #stages new and modified, without deleted

`git add -u` #stages modified and deleted, without new

**`git add -A` is equivalent to `git add .; git add -u`**


##基础思想

所有的`commit`,`branch`都只是保存变化量，所以不会有额外的开销。

##基础命令基本用法依次晋级

`commit`:一次改动提交。

`branch`:创建分支。

`checkout`:切换分支。

`merge`:合并分支。会产生一次commit,这个commit结点产生分别指向这2个分支的引用。
*如果合并的分支已经是其祖先结点，则git不做任何事情，只是将其指向要合并分子的尾结点*。

`rebase`:合并分支。它会把自身与要rebase分支的不同结点（其实就是一次次的commit）复制并接在要rebase分支的尾结点。
*如果合并的分支已经是其祖先结点，则git不做任何事情，只是将其指向要合并分子的尾结点*。


##关于HEAD

.git下的HEAD文件，通常情况下是一个指向你当前所在分支的引用标识符，例如内容类似这样:`refs/heads/test`。
当使用`git checkout commitID`时，HEAD文件内容就会变成 commitID值（commit hash）。

HEAD标识所以本质就是指向一个commitID。通常情况下，它指向一个分支引用(分支引用里保存该分支最新的一次commitID)，当HEAD直接指向一个commitID时，
这种情况被称为'Detaching HEAD'（脱离态），

由于commitID(commit hash)不便记忆，所以有其他的方法来定位commit。例如`Relative Refs`(相对commit) `^`表示上一个；`~<num>`表示前几个。
eg:
```
git checkout HEAD^ #可以多次使用
git checkout HEAD^^ ##退后2步
git checkout HEAD~3
```

##改变分支引用(.git/refs/heads/master)里保存的commitID 
如果使用`git branch -f branchName HEAD~2`来使某分支指向某个commit, 如果指定commitID时，使用相对HEAD引用的方式，
那么相对的是HEAD保存的commitID，而不是该分支保存的commitID，当然这2者是有可能是一样的。所以要把HEAD理解成是全局且唯一的。
怎么样来理解这句话呢？比如：
我使用`git checkout 11111`(假设11111是某commitID)，
使得HEAD指向`11111`,处于`detaching state`,假如我现在有个分支`bugFix`，指向的commit结点ID是`44444`,如果使用`git branch -f bugFix HEAD^`，
那么`bugFix`分支就会指向`11111`的前一个commit结点，而不是`44444`的前一个结点。如果你就在`bugFix`分支，使用`git branch -f bugFix HEAD^`，
那么此时HEAD指向的是分支`bugFix`的引用，所以这时commitID是一样的，都是指的同一个commitID。


##撤销改变的方式
`git reset`:

`git revert`:

##对一定的commit结点重新组装
`git cherry-pick`
`git rebase -i`

##tag
tag是对某commit结点的永久性标记。
tag分为`annotated tags`（注解tag）和`lightweight tag`（轻量tag）
`git tag <tagName> [commitID]`: 如果不写commitID,则是当前的commitID（HEAD所指向的commitID）。

##参考

[git可视化基础使用教程][0]

[GIT基本概念和用法总结][1]


[0]:http://pcottle.github.io/learnGitBranching/ "git可视化基础使用教程"
[1]:http://guibin.iteye.com/blog/1014369 "GIT基本概念和用法总结"