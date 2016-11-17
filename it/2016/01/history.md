# history module
date: [21]
tags: [history]


## 创建history对象
- `createHistory` 返回浏览器支持的 *window.history* 对象
- `createHashHistory` 通过 *window.location.hash* 实现
- `createMemoryHistory` 用于测试

一旦你得到history对象，你就可以使用 `history.listen` 监听 *location* 的变化。

```javascript
import { createHistory } from 'history'

let history = createHistory()

// Listen for changes to the current location. The
// listener is called once immediately.
let unlisten = history.listen(function (location) {
  console.log(location.pathname)
})

// When you're finished, stop the listener.
unlisten()
```
## navigation 导航
你可以使用以下程序来控制 current location：
- push(location)
- replace(location)
- go(n)
- goBack(n)
- goFroward(n)

`push`、`replace`需要一个完整的 *URL path*，包括 *search string* 和 *location hash*,
或者使用一个JSON格式对象`{pathname, search, hash, state}`。

```javascript
// Push a new entry onto the history stack.
history.push('/home')

// Replace the current entry on the history stack.
history.replace('/profile')

// Push a new entry with state onto the history stack.
history.push({
  pathname: '/about',
  search: '?the=search',
  state: { some: 'state' }
})

// Change just the search on an existing location.
history.push({ ...location, search: '?the=other+search' })

// Go back to the previous history entry. The following
// two lines are synonymous.
history.go(-1)
history.goBack()
```
## create URLs

```javascript
let href = history.createHref('/the/path')
```
## Minimizing Your Build 优化编译
你可以根据环境所需来打包你所需的文件：
```javascript
// HTML5 history, recommended
import createHistory from 'history/lib/createBrowserHistory'

// Hash history
import createHistory from 'history/lib/createHashHistory'

// Memory history
import createHistory from 'history/lib/createMemoryHistory'
```
## location [官网location](https://github.com/rackt/history/blob/master/docs/Location.md)

location对象和 *window.location || document.location* 相似，不同时它还有其他一些有用的信息。location对象有以下属性：

```
pathname      The pathname portion of the URL, without query string
search        The query string portion of the URL, including the ?
state         An object of data tied to this location
action        One of PUSH, REPLACE, or POP
key           A unique identifier for this location
```
## location descriptors
*location descriptors* 可以是以下几种形式
```javascript
// Pushing a path string.
history.push('/the/path')

// Omitting location state when pushing a location descriptor.
history.push({ pathname: '/the/path', search: '?the=search' })

// Extending an existing location object.
history.push({ ...location, search: '?other=search' })
```
## 程序创建location
在 history 无状态情况下，比如none-dom环境（服务器环境），用于测试。这时，你可以直接使用`createLocation`：
```javascript
import { createLocation } from 'history'

const location = createLocation('/a/path?a=query', { the: 'state' })
```

## onbeforeunload vs onunload

onbeforeunload 先于 onunload发生

onbeforeunload 可以通过 e.preventDefault() 来阻止网页关闭。onunload则不可以，以为网页的资源已经卸载了。

## 参考
[MDN History API][1]

[History module官方文档][2]

[Difference between onbeforeunload and onunload][3]

[history对象][4]

[1]:https://developer.mozilla.org/en-US/docs/Web/API/History_API "MDN History API"
[2]:https://github.com/mjackson/history/tree/master/docs "History module官方文档"
[3]:http://stackoverflow.com/questions/6895564/difference-between-onbeforeunload-and-onunload "Difference between onbeforeunload and onunload"
[4]:http://javascript.ruanyifeng.com/bom/history.html "history对象"
