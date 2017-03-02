# mobx-react


## 关于 shouldComponentUpdate
通常是可以设置shouldComponentUpdate，但是你完全可以不用设置，因为Mobx-react已经设置了默认的shouldComponentUpdate，它是基于PureRenderMixin实现的。如果有提供shouldComponentUpdate的话，当 props 和 state 变化时，会调用它。但是如果是 被render方法直接使用的observable 发生变化时，component 将会不调用shouldComponent ，而重新渲染(使用的是forceUpdate)。





1:https://github.com/mobxjs/mobx-react "github 官网"
