# 类

## 类的属性
- 在类中，只声明，没有初始化的属性，编译后的构造器方法里不会处理该属性，当然是可以使用的；如果有初始化，则编译后的构造器方法会处理该属性
- 在构造器里带有访问修饰符的显式声明的参数，构造器方法默认会添加该属性，否则，当参数处理
eg:
```typescript
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date; //在constructor里 不会赋值
		name: string = 'yyp'; // 在constructor里赋值
    constructor(private h: number, m: number) {// h 当做属性处理， m 当做参数处理

		}
    test() {
        this.currentTime = new Date();// 即便在constructor里没赋值，但是后来可以用
    }
}

//编译后的代码：
var Clock = (function () {
    function Clock(h, m) {
        this.h = h;
        this.name = 'yyp';
    }
    Clock.prototype.test = function () {
        this.currentTime = new Date();
    };
    return Clock;
}());
```
