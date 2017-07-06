# pug 模板引擎

tag: [pug] [template]

date: [2017-02-27]

## bufferd and unbuffered code

**Unbuffered** code会执行，但是结果不保存到 output buffer

**buffered** code会执行，但是结果保存到 output buffer

```pug
.unbuffered
  - 'unbuffered vs buffered'

.buffered
  = 'unbuffered vs buffered'
```

```html
<div class="unbuffered"></div>
<div class="buffered">unbuffered vs buffered</div>
```
## Variable declaration & valid context

pug的变量声明如下：

```pug
- var varibleName = 'value'
```
只要是在在变量位置之后的地方都可以使用(通过extends/prepend/append处理后的模板位置)。也就是在变量所在位置后执行的代码都可以是用它.


## 参考

[缓存code与非缓存code 区别][1]

[1]:http://stackoverflow.com/questions/26932402/what-is-the-difference-between-buffered-and-unbuffered-code
