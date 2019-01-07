# windows查看端口占用以及关闭相应的进程

```shell
netstat -aon|findstr "port" #查看指定端口的占用情况,找到占用端口的pid
tasklist|findstr "pid" #查找pid对应的程序
taskkill /f /t /im processs.exe # 关闭程序
```