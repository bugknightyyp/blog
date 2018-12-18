# nginx安装

## centos yum源安装

- 设置yum源

    Pre-Built Packages for Stable version
    To set up the yum repository for RHEL/CentOS, create the file named /etc/yum.repos.d/nginx.repo with the following contents:

    ```ini
    [nginx]
    name=nginx repo
    baseurl=http://nginx.org/packages/OS/OSRELEASE/$basearch/
    gpgcheck=0
    enabled=1
    ```

    Replace “OS” with “rhel” or “centos”, depending on the distribution used, and “OSRELEASE” with “6” or “7”, for 6.x or 7.x versions, respectively.

- 安装：`yum install -y nginx`

    以下是Nginx的默认路径：

    (1) Nginx配置路径：/etc/nginx/

    (2) PID目录：/var/run/nginx.pid

    (3) 错误日志：/var/log/nginx/error.log

    (4) 访问日志：/var/log/nginx/access.log

    (5) 默认站点目录：/usr/share/nginx/html

    事实上，只需知道Nginx配置路径，其他路径均可在/etc/nginx/nginx.conf 以及/etc/nginx/conf.d/default.conf 中查询到

    nginx相关的验证命令及启动命令

## 其他

`nginx`   启动

`nginx -t`  测试命令

`nginx -s relaod` 修改nginx.conf之后，可以重载

## 参考

[1]:http://nginx.org/en/linux_packages.html "官方说明"