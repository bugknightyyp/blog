## git push/pull 的默认行为

git不同的默认值对应不同的默认行为。

通过`git config --global push.default 'option'`改变`push.default`的默认行为（或者也可直接编辑`~/.gitconfig`文件）。

push.default 有以下几个可选值：

- `nothing`: push操作无效，除非显式指定远程分支，例如git push origin develop（我觉得。。。可以给那些不愿学git的同事配上此项）。
- `current`: push当前分支到远程同名分支，如果远程同名分支不存在则自动创建同名分支。
- `upstream`： push当前分支到它的upstream分支上（这一项其实用于经常从本地分支push/pull到同一远程仓库的情景，这种模式叫做central workflow）。
- `simple`： simple和upstream是相似的，只有一点不同，simple必须保证本地分支和它的远程
- `upstream`：分支同名，否则会拒绝push操作。
- `matching`： push所有本地和远程两端都存在的同名分支。