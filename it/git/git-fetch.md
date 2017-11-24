# 获取远程代码

**.git/FETCH_HEAD**: 是一个版本链接，记录在本地的一个文件中，指向着目前已经从远程仓库取下来的分支的末端版本。内容形式是这样的：

```
204ce6492038798c6bc212cb7fca562580545f15		branch 'dev' of 192.168.74.87:root/lotto-front-pc
9ff68db1f4848999ffb79dd248c2978a7fef47ec	not-for-merge	branch 'master' of 192.168.74.87:root/lotto-front-pc
42402af076ef9bbc176557755092fffd032739c1	not-for-merge	branch 'optimization' of 192.168.74.87:root/lotto-front-pc
2dd5be7671b730fe4ca18630fbbbfd35c989ce1d	not-for-merge	branch 'sit' of 192.168.74.87:root/lotto-front-pc
d44044bb8261f053d75a7955aa3b6dcd83acf445	not-for-merge	branch 'sitbake11021936' of 192.168.74.87:root/lotto-front-pc
b9c1b36edd938294e9ce6da93544b4ac63901f28	not-for-merge	branch 'uat' of 192.168.74.87:root/lotto-front-pc
5fcf81ca7db269e66726253e9c8fdc5d7206d3cf	not-for-merge	branch 'uatold' of 192.168.74.87:root/lotto-front-pc
f5ae67c95ead08ea88c451eeb28930ecbda1eec5	not-for-merge	branch 'v2.0' of 192.168.74.87:root/lotto-front-pc
```

1. `git fetch`   这将更新git remote 中所有的远程repo 所包含分支的最新commit-id, 将其记录到.git/FETCH_HEAD文件中

2. `git fetch remote_repo`  这将更新名称为remote_repo 的远程repo上的所有branch的最新commit-id，将其记录。 

3. `git fetch remote_repo remote_branch_name`  这将这将更新名称为remote_repo 的远程repo上的分支： remote_branch_name

4. `git fetch remote_repo remote_branch_name:local_branch_name`  这将这将更新名称为remote_repo 的远程repo上的分支： remote_branch_name ，并在本地创建local_branch_name 本地分支保存远端分支的所有数据