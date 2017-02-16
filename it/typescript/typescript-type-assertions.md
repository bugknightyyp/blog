# typescript 类型断言

data: [2016-11-10]

tags: [typescript]

通常你会遇到这种情况，你自己知道的信息比typescript要更多，比如：你知道比变量本身更精确的类型信息，这时就可以使用类型断言。

## "angle-bracket" syntax
```typescript
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

## "as" syntax
```typescript
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;

```

## 参考

[1]:https://www.typescriptlang.org/docs/handbook/basic-types.html "基本类型"
