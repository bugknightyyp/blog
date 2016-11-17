# typescript 接口
data: [2016-11-10]
tags: [typescript] [interface]

## primitive type

描述基本类型
```typescript
interface LabelledValue {
  label: string;
}
```

## 可选属性

描述属性是否可选
```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}
```

## function

描述函数声明形式
```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```
## 可索引类型(Indexable Types)

- 只有数字

```typescript
interface StringArray {
    [index: number]: string;
}
```

- 既有数据又有字符串

这种情况下，数字索引返回的类型必须是字符串索引返回类型的子类。官网文档也有说明原因，但是不理解
```typescript
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// Error: indexing with a 'string' will sometimes get you a Dog!
interface NotOkay {
    [x: number]: Animal;
    [x: string]: Dog;
}
```

这种情况下会报错，因为违反 **数字索引返回的类型必须是字符串索引返回类型的子类**
```typescript
interface NumberDictionary {
    [index: string]: number;
    length: number;    // ok, length is a number
    name: string;      // error, the type of 'name' is not a subtype of the indexer
}
```

一下2种情况下会报错就正常：
```typescript
interface NumberDictionary {
    [index: number]: number | string;
    length: string;    // ok
    name: string;      // ok
}

//[index: string]: number; 声明字符串索引的值是 number，
//而下边的 length、name就是字符串索引，声明的返回值是：string，所以冲突了。
interface NumberDictionary {
    [index: string]: number;
    length: string;    // Property 'length' of type 'string' is not assignable to string index type 'number'.
    name: string;      // Property 'name' of type 'string' is not assignable to string index type 'number'.
}
```

- 只读修饰符(readonly)

用readonly修饰过，就不能再赋值了
```typescript
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
```

## 类类型(class type)

接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，
但并没有提供具体实现一样。 接口同样会继承到类的private和protected成员。
当一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。

下面这个例子是对上面那句话的解释，由于类 *Control* 具有 *private* 属性 *state*，
所以 *Control* 的子类 *SubControl* 才能实现 *SelectableControl*
```typescript
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class SubControl extends Control implements SelectableControl {
    select() {

    }
}
```

下面的例子，由于 *Control* 的属性都是 *public*，所以 *SubControl* 可以不通过继承 *Control*
直接实现 *SelectableControl* 所有的属性及方法即可。
```typescript
class Control {
    public age: number;
    public name: string;
}
interface SelectableControl extends Control {
    select(): void;
}

class SubControl implements SelectableControl {
    public name: string;
    public age: number;
    select() {
        alert(2)
    }
}
```

总之，接口继承类，会包含类所有的属性、方法及它们的访问修饰符，除了方法的实现。会有以下2种情况：

- 继承的类有 *private* *protected* 修饰的方法及属性

只能通过继承的类的子类来实现接口

```typescript
class SubClass extends Class implements SelectableControl {
  //...
}
```

- 继承的类没有 *private* *protected* 修饰的方法及属性，即：全是 *public*

可以通过继承的类的子类来实现接口，
```typescript
class SubClass extends Class implements SelectableControl {
  //...
}
```

也可以直接实现接口
```typescript
class SubClass implements SelectableControl {
  //但是这里要声明 继承的类里public 属性
  name: string;
}
```

总之你要保证接口、接口继承的类，这两者所声明属性及方法都能得到实现。由于 接口从类继承的 *private* *protected*
的属性是不能被实现，(接口的属性要声明称 *public* )所以你要曲线救国，通过子类来实现，
这样子类就简直继承了 那些 *private* *protected* 的属性。这是我自己理解的。

## 参考

[1]:https://www.typescriptlang.org/docs/handbook/interfaces.html '官方稳定-接口'
