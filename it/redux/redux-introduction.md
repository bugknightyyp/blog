# redux 介绍


调用createStore，reducer会接受一个type为ActionTypes.INIT的action，使reducer返回他们默认的state，这样可以快速的形成默认的state的结构

每次dispatch, 所有的reducer会从新执行一遍，生成新的总store。

## redux-thunk

```js
export default function thunkMiddleware({ dispatch, getState }) {// 此时的dispatch是 (action) => dispatch(action) dispatch = f(g(h()))
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  };
}
```

## applyMiddleware

```js
// 定义一个代码组合的方法
// 传入一些function作为参数，返回其链式调用的形态。例如，
// compose(f, g, h) 最终返回 (...args) => f(g(h(...args)))
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  } else {
    const last = funcs[funcs.length - 1]
    const rest = funcs.slice(0, -1)
    // 传进的args是： store.dispatch
    return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args)) //这一步加工： [f, g, h] => f(g(h()))  初始的dispatch最后执行
  }
}

export default function applyMiddleware(...middlewares) {
  // 最终返回一个以createStore为参数的匿名函数
  // 这个函数返回另一个以reducer, initialState, enhancer为参数的匿名函数
  return (createStore) => (reducer, initialState, enhancer) => {
    var store = createStore(reducer, initialState, enhancer)
    var dispatch
    var chain = []

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    // 每个 middleware 都以 middlewareAPI 作为参数进行注入，返回一个新的链。此时的返回值相当于调用 thunkMiddleware 返回的函数： (next) => (action) => {} ，接收一个next作为其参数
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 并将链代入进 compose 组成一个函数的调用链
    // compose(...chain) 返回形如(...args) => f(g(h(...args)))，f/g/h都是chain中的函数对象。
    // 在目前只有 thunkMiddleware 作为 middlewares 参数的情况下，将返回 (next) => (action) => {}
    // 之后以 store.dispatch 作为参数进行注入
    dispatch = compose(...chain)(store.dispatch) // store.dispatch 初始的dispatch

    return { // 执行createStore 返回
      ...store,
      dispatch //重写dispatch
    }
  }
}
```

## 参考

[1]:https://github.com/ecmadao/Coding-Guide/blob/master/Notes/React/Redux/Redux%E5%85%A5%E5%9D%91%E8%BF%9B%E9%98%B6-%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90.md "Redux入坑进阶-源码解析.md'