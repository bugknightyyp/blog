#.gitmodules

该文件的作用是配置当前项目依赖的模块,也可叫子模块。该文件一般放在项目的根目录下，文件内容格式是`init`文件格式。

##子模块操作

**添加依赖模块命令:** `git submodule add [--name <name>] [url] [path]`

- --name <module name>:子模块起的名字，如果没有，则名字就是path值

- url: 模块的仓库地址，git 可以clone的地址。eg:`git://github.com/bugknightyyp/city-picker.git`

- path: 模块存放的目录（相对于项目根目录）。eg: `vendor/yuidoc-bootstrap`

执行添加命令后，依赖的模块就会下载到`path`目录里，同时也会将这些配置信息保存到`.gitmodules`文件里。eg:
```
[submodule "vendor/yuidoc-bootstrap"]
	path = vendor/yuidoc-bootstrap
	url = https://github.com/crossjs/yuidoc-bootstrap.git
[submodule "dependence/src"]
	path = dependence/src
	url = git://github.com/bugknightyyp/city-picker.git
```
我尝试手动修改.gitmodules文件增加子模块，然后，执行初始化，子模块就注册不了。必须通过add命令来增加。

**查看子模块状态命令:**`git submodule status`
列出子模块的信息（commitID/路径）。eg：


> 61aa8ac17dcd8bcabf9d3961969ebfe2ddeab3bf vendor/yuidoc-bootstrap

> 61aa8ac17dcd8bcabf9d3961969ebfe2ddeab3bf vendor/seajs

有没有前缀`-`的区别是，子模块有没有安装，如果有`-`表示没有安装，否则已安装。

**初始化子模块命令:**`git submodule init`

初始化本质是：将`.gitmodules`的子模块信息注册到`.git/config`里。

**更新子模块命令:**`git submodule update`

更新每一个注册的模块，没注册的，不会更新

##参考
- [git-submodule(1) Manual Page ][0]
- [余果-git子模块][1]
- [咖啡兔-Git Submodule使用完整教程][2]

[0]: https://www.kernel.org/pub/software/scm/git/docs/git-submodule.html  "git-submodule(1) Manual Page "
[1]: http://yuguo.us/weblog/git-submodule/  "余果-git子模块" 
[2]: http://www.kafeitu.me/git/2012/03/27/git-submodule.html "Git Submodule使用完整教程"
