# Date对象

## 创建时间对象
`new Date();`

`new Date(value);` //Integer value representing the number of milliseconds since 1 January 1970 00:00:00 UTC (Unix Epoch).
```js
var ONE_DAY = 24 * 60 * 60 * 1000
var foo = new Date(2016, 4, 18).getTime() // 1463500800000
var bar = new Date(foo) //Wed May 18 2016 00:00:00 GMT+0800 (中国标准时间)
var baz = new Date(2016, 4, 18) //Wed May 18 2016 00:00:00 GMT+0800 (中国标准时间)
```

`new Date(dateString);`
*2015-06-17*：这种格式虽然能够解析，单不是标准格式

`new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);`

`Date.UTC(year, month[, day[, hour[, minute[, second[, millisecond]]]]])`
```js
ONE_DAY = 24 * 60 * 60 * 1000
Date.UTC(2016,4,19) % ONE_DAY  // 0
```

## 获取毫秒值得几个函数区别

`UTC()`: 参考的0时区，也就是参数时间指的是所在时区的时间，而midnight of January 1, 1970参考的是0时区

请看下面例子：

为什么结果会出现16个小时，而差8个小时呢？
 当UTC 时间为midnight of January 1, 1970时,咱中国时间(东八)是January 1, 1970 早上八点, 再过16个小时就是midnight of January 2, 1970
```js
Date.UTC(1970,0,2) // 86400000 = 24 hours
Date.parse('Jan 2 1970') // 57600000 = 16 hours
new Date('Jan 2 1970').getTime() // 57600000 = 16 hours
new Date('Jan 2 1970').valueOf() // 57600000 = 16 hours


ONE_DAY = 24 * 60 * 60 * 1000
new Date(new Date(2016, 4, 18).getTime()) //Wed May 18 2016 00:00:00 GMT+0800 (中国标准时间)

//下面是我在写程序时，曾经犯过的错误，我认为得出的结果是某天的开始，其实不然。
//有上面的解析，可以思考下为什么会计算出以下结果，明明参数都是整天，最后得出结果中有个8点？
new Date(Math.floor(new Date(2016, 4, 18).getTime() / ONE_DAY) * ONE_DAY) //Tue May 17 2016 08:00:00 GMT+0800 (中国标准时间)
```

## setUTCXxxx method

`setUTCFullYear`
```js
dateObj.setUTCFullYear(yearValue[, monthValue[, dayValue]])
```
如果你不传 monthValue 和 dayValue，那么它会使用 `getUTCMonth()` `getUTCDate()` 返回的值

`setUTCHours`
```js
dateObj.setUTCHours(hoursValue[, minutesValue[, secondsValue[, msValue]]])

var theBigDay = new Date(); // theBigDay = Thu May 19 2016 16:10:33 GMT+0800 (中国标准时间)
theBigDay.setUTCHours(2); // theBigDay = Thu May 19 2016 10:10:33 GMT+0800 (中国标准时间)

```
如果你不传 minutesValue, secondsValue 和 msValue `getUTCMinutes()` `getUTCSeconds()` ` getUTCMilliseconds()` 返回的值
