# redux 介绍

redux是一个用于单页面应用，具有可预测性的状态容器

## 怎么理解“可预测性”

“可预测性”表示状态的改变是可预测的，因为什么时候更新和怎样更新都是可控的，这些都反应在redux的3大原则上。

## 三大原则

- 单一数据源
- state是只读的，要想改变状态必须通过触发一个action(一个描述发生了什么的对象)。
- 改变状态必须使用纯函数

调用createStore，reducer会接受一个type为ActionTypes.INIT的action，使reducer返回他们默认的state，这样可以快速的形成默认的state的结构

每次dispatch, 所有的reducer会从新执行一遍，生成新的总store。

## dispatch

## middleware vs enhancer

`middleware`和`enhancer` 处理模式类似洋葱模式，同样以下场景也是这种模式：

- express or koa 中间件
- es6 的多个装饰一起使用场景

共性：

- 函数嵌套调用的call stack
- 每个函数的形参是一样的

`middleware` 关注的是 `createStore` 创建实例 `store` 以后的过程, rootReducer可以理解为最后一个执行的中间件
`enhancer` 关注的是 `createStore` 创建实例 `store` 以前的过程, createStore可以理解为最后一个执行的enhancer

## compose 实现调用或者尾调用

- 调用(递归)
- 尾调用(尾递归)

`middleware`结构:

```js
store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}
```

`Middleware`

```typescript

type MiddlewareAPI = { dispatch: Dispatch, getState: () => State }
type Middleware = (api: MiddlewareAPI) => (next: Dispatch) => Dispatch

```

`StoreCreator`结构: `type StoreCreator = (reducer: Reducer, preloadedState: ?State) => Store`

`enhancer`结构: `type StoreEnhancer = (next: StoreCreator) => StoreCreator`

`enhancer 和 middlewear 异同`


```js
const round = number => Math.round(number * 100) / 100
​
const monitorReducerEnhancer = createStore => (
  reducer,
  initialState,
  enhancer
) => {
  const monitoredReducer = (state, action) => {
    const start = performance.now()
    const newState = reducer(state, action)
    const end = performance.now()
    const diff = round(end - start)
​
    console.log('reducer process time:', diff)
​
    return newState
  }
​
  return createStore(monitoredReducer, initialState, enhancer)
}
​
export default monitorReducerEnhancer



export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}

```

`root reducer function`
`applyMiddleware`: 可以将多个`middleware`转成一个`enhancer`;
`applyMiddleware`: 是唯一一个由`redux`提供的`enhancer`;

`middleware`形式： `(store) => (next) => (action) { }`;

`compose`: 可以将多个`enhancer`转成一个`enhancer`; `enhancer`形式：`(createStore) => ({reducer, initialState, enhancer}) => store`

## redux-thunk

```js
export default function thunkMiddleware({ dispatch, getState }) {// 此时的dispatch是 (action) => dispatch(action), dispatch = f(g(h()))
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  };
}
```

## applyMiddleware

`applyMiddleware` 将中间件数组处理成enhancer: (reducer, preloadedState) => (createStore) => {}

```js
// 定义一个代码组合的方法
// 传入一些function作为参数，返回其链式调用的形态。例如，
// compose(f, g, h) 最终返回 (...args) => f(g(h(...args)))
//[x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  } else {
    const last = funcs[funcs.length - 1]
    const rest = funcs.slice(0, -1)
    // 传进的args是： store.dispatch: (action) => dispatch(action)
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

[2]:https://blog.csdn.net/d1105260363/article/details/81979292 "js作用域 作用域链 闭包"