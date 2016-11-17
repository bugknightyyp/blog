# react
date: [9]
tags: [react]

## JSX
- JSX里 inline style 写法
React [组件样式][2]是一个对象，所以第一重大括号表示这是 JavaScript 语法，第二重大括号表示样式对象。

```JSX
render: function () {
    return (
      <div style={{opacity: this.state.opacity}}>
        Hello {this.props.name}
      </div>
    );
  }
```


- 注释

```JSX
var content = (
  <Nav>
    {/* 一般注释, 用 {} 包围 */}
    <Person
      /*
      多行注释
      */
      name={window.isLoggedIn ? window.name : ''} // 行尾注释
    />
  </Nav>
);
```

## setState()
`setState()` 将总是触发一次重绘, 除非在 shouldComponentUpdate() 中实现了条件渲染逻辑。

 setState API expects an object literal and will merge it (Object.assign) with the previous state.
 [here](https://github.com/facebook/immutable-js/wiki/Immutable-as-React-state)

 1. 在react可感知的方法里使用 setState，state不会立即改变，而是当setState语句所在函数返回后state才改变，所谓的batchedUpdate。
 2. 在react不可感知的方法里使用setState，setState执行完后state已经改变，这时setState是同步的。

比如通过addEventListener添加的事件，Ajax调用的回调函数，setTimeout的执行函数，这些函数的执行是 react 框架不可感知的。

在组件上通过 onXXX 添加的事件回调，react组件的生命周期方法，这些都是 react 可感知的函数。

## class

class 属性需要写成 className ，for 属性需要写成 htmlFor，这是因为 class 和 for 是 JavaScript 的保留字。

## ajax
page init ajax data 通常放在 componentDidMount 事件里


## autobinding

使用`React.createClass`创建组件时，react会帮你自动把所有的方法绑定到 *this*。但是使用ES6语法创建时，则不会自动绑定。

- 一种解决办法[出处][5]：

```JavaScript
class Counter extends React.Component {
  constructor() {
    super();
    this.tick = this.tick.bind(this);
    //或者
    this.tick = () => this.tick();
  }
  tick() {
  }
  // 或者
  tick = () => {

  }
}
```

- 另一种办法[出处][6]：通过Fat Arrow Functions 利用es7.classProperties。
ES6 doesn't allow for property initialisers (so no foo = 'bar'; inside class definitions)

```JavaScript
import React from 'react';  
let {Component, PropTypes} = React;

export default class MyComponent extends Component {  
  // lifecycle methods and statics
  static propTypes = {
    foo: PropTypes.bool.isRequired
  }

  handler = (e) => { ... }

  // render actual DOM output
  render() {
    return <div onClick={this.handler}></div>;
  }
}
```
## defaultProps & propTypes
ES6声明defaultProps，通过`className.defaultProps = {}`
```JavaScript
MyComponent.defaultProps = {
  name: 'MyComponent'
}
```
## React.cloneElement
`React.cloneElement` is almost equivalent to:
```jsx
<element.type {...element.props} {...props}>{children}</element.type>
```
from [here](https://facebook.github.io/react/blog/2015/03/03/react-v0.13-rc2.html)

## 参考
[阮一峰 react入门教程][1]
[菜鸟中的牛叉-React(基础篇)][4]
[极客学院react中文文档][3]


[1]:http://www.ruanyifeng.com/blog/2015/03/react.html "阮一峰 react入门教程"
[2]:https://facebook.github.io/react/tips/inline-styles.html
[3]:http://wiki.jikexueyuan.com/project/react/component-api.html "极客学院react中文文档"
[4]:http://rongl.github.io/blog/docs/reactjs.html "菜鸟中的牛叉-React(基础篇)"
[5]:https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#autobinding
[6]:http://www.ian-thomas.net/autobinding-react-and-es6-classes/
