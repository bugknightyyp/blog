# typescript 泛型


## 在泛型中使用类类型 (Using Class Types in Generics)

在使用泛型创建工厂时，通过它们的构造器函数来引用类型是必须的。例如：
```typescript
function create<T>(c: {new(): T; }): T {
    return new c();
}
```
一般的泛型，参数声明：`(c: T)`, 这时 *c* 是 *T* 的实例。
使用泛型创建工厂，参数声明：`(c: {new(): T; })`,  这时 *c* 是 *T* 的引用（T类型的引用）。

```typescript
Greet: new() => Greet //表示 Greet构造器返回一个Greet实例 待测试
```

## extends 还可以这样用

```javascript
interface GenericIdentityFn {
    <A, R, T extends (a: A) => R>(arg: T): T;
}

function identity<A, T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn = identity;
```


## 参考

[官网generics introduction][1]

[1]:http://www.typescriptlang.org/docs/handbook/generics.html "官网generics introduction"
