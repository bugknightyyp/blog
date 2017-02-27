# pug 模板引擎

tag: [pug] [template]

date: [2017-02-27]

## bufferd and unbuffered code

**Unbuffered** code会执行，但是结果不保存到 output buffer

**buffered** code会执行，但是结果保存到 output buffer

```jade
.unbuffered
  - 'unbuffered vs buffered'

.buffered
  = 'unbuffered vs buffered'
```

```html
<div class="unbuffered"></div>
<div class="buffered">unbuffered vs buffered</div>
```
## 参考

[缓存code与非缓存code 区别][1]

[1]:http://stackoverflow.com/questions/26932402/what-is-the-difference-between-buffered-and-unbuffered-code
