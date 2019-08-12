# react-redux 介绍

`react-redux`是把redux和react建立联系的`UI binding` 库，避免在UI里直接与`store`产生交互。

## 为什么使用 `UI binding libary`

它实现了ui与`store`的交互逻辑

- `connect`方法生成容器组件，抽取你需要的数据，负责处理与`store`的交互。
- 组了大量的性能优化工作

## connectAdvanced

它是`connect`的基础，但是它缺少关于`state`, `props`, `dispatch`合并到最终props的选项。
不保证默认值和缓存结果，它把这些工作丢给调用者(caller);

它没有修改`wrapped component`, 只是返回一个新的 `wrapper component`; (`ConnectedComponent` 是指 `connect` 方法返回的组件)

大部分应用不需要使用它，`connect` 的默认行为已经满足你需求。


```js

export default connectAdvanced((dispatch, options) => (state, props) => ({
    thing: state.things[props.thingId],
    saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
  }))(YourComponent)

```

## 实现机制

监听store，如果组件关联的数据发生变化，则重新渲染组件。

`wrapMapToPropsFunc`

- 检测正在调用的maptoprops函数是否依赖于props, 被selectorFactory用于决定是否重新执行当属性变化时
- 在第一次调用时，处理mapToProps是否返回另一个函数，然后把新函数当作真正的mapToProps供后续调用
- 在第一次调用时，检验mapToProps的结果是不是一个普通对象，如果不是警告开发者

```js
export function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, { displayName }) {
    const proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps
        ? proxy.mapToProps(stateOrDispatch, ownProps)
        : proxy.mapToProps(stateOrDispatch)
    }

    // allow detectFactoryAndVerify to get ownProps
    proxy.dependsOnOwnProps = true

    proxy.mapToProps = function detectFactoryAndVerify(
      stateOrDispatch,
      ownProps
    ) {
      proxy.mapToProps = mapToProps
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps)
      let props = proxy(stateOrDispatch, ownProps)

      if (typeof props === 'function') {
        proxy.mapToProps = props
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props)
        props = proxy(stateOrDispatch, ownProps)
      }

      if (process.env.NODE_ENV !== 'production')
        verifyPlainObject(props, displayName, methodName)

      return props
    }

    return proxy
  }
}
```

`wrapMapToPropsConstant`

```js
export function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    const constant = getConstant(dispatch, options)

    function constantSelector() {
      return constant
    }
    constantSelector.dependsOnOwnProps = false
    return constantSelector
  }
}
```

## 参考

[1]:https://blog.isquaredsoftware.com/2018/11/react-redux-history-implementation/ "react-redux-history-implementation"
