# react-router
date: [10]
tags: [react] [react-router]


## glossary(术语)

- Router 路由器。
- Route 路由。可以嵌套，对应的是url嵌套
- Link 链接。 用来当a标签使用

```JSX
// v1.0
// 由于具名路由被移除，链接改为完成路径，你不再需要获取每个参数的名称。同时，字符串插值新特性非常棒。
// 注意，query 并没有改变。
<Link to={`/users/${user.id}`}>Mateusz</Link>
```

Link 不会默认添加 “active” 类，你可以选择增加一个；如果没有 activeClassName 或者 activeStyle，即便被激活，也不会去检测 link。

```JSX
// v1.0
<Link to="/about" activeClassName="active">About</Link>
```

- IndexRoute 索引路由。是在当请求的 URL 匹配某个路由时，允许你制定一个类似index.html的入口文件，在这里是一般是指定一个component。
- Redirect 重定向路由。from 必须使用绝对路径。

```JSX
// v1.0
// 可以像上面一样正常工作，除了去掉 params 参数，将它们放到了路径当中
<Redirect from="/some/where/:id" to="/somewhere/else/2"/>
```

- history 历史对象
