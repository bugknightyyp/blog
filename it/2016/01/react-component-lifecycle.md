# react组件的生命周期
date: [15]
tags: [react] [component]

## componentWillReceiveProps vs componentWillUpdate

### componentWillReceiveProps
```javascript
componentWillReceiveProps: function(nextProps) {
  this.setState({
    // set something
  });
}
```

`componentWillReceiveProps` 通常使用的场景是：将父组件的数据(`eg: this.state.name`)通过属性传递给子组件，子组件通过`this.props`来获取使用，子组件从父组件得到的属性不能修改。
只能有父组件来修改，子组件通过`componentWillReceiveProps`事件来获取改变的信息。

**要点**
- 该事件在组件初始化时不会触发
- 在该事件中使用`setState()`,不会触发render
- 直接在子组件里修改props,不会触发该事件
### componentWillUpdate
``` javascript
componentWillUpdate: function(
  object nextProps, object nextState
){
  // do something
}
```

`componentWillUpdate(nextProps, nextState)`

`nextProps`和`nextState`是执行render()时，最终的依据数据。

**要点**
- 该事件在组件初始化时不会触发
- 在该事件中不能使用`setState()`，如果需要state响应props的变化，请使用`componentWillReceiveProps`
- 如果在该事件中使用`setState()`, 可能是该事件陷入死循环中, [eg][4], 最后报错`Uncaught RangeError: Maximum call stack size exceeded`
当然你可以`nextState.property = ...`来修改，这样就不会引起`componentWillUpdate`事件的死循环。

]

### `props changes`的触发流程

- updating props
- componentWillReceiveProps
- shouldComponentaUpdate
- componentWillUpdate
- render
- componentDidUpdate


## 参考
[Component Specs and Lifecycle][2]

[Understanding the React Component Lifecycle][1]


[1]:http://busypeoples.github.io/post/react-component-lifecycle/ "Understanding the React Component Lifecycle"
[2]:https://facebook.github.io/react/docs/component-specs.html "Component Specs and Lifecycle"
[3]:https://segmentfault.com/a/1190000003691119 "React Component Lifecycle"
[4]:http://stackoverflow.com/questions/28945089/how-do-i-update-the-state-using-reactjs-if-i-should-not-call-setstate-in-compo
