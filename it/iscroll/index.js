# iscroll 库解读

滑动主要分2种效果，一种是模块随着手指动，另一种是当手指松开时，模块能继续向前减速活动。

第一种 很比较简单，就是直接设置手指的偏移量即可。

第二种 减速活动， iscroll实现思路是：

当手指滑动时，每隔大约300ms去利用滑动偏移量除以时间计算速度，一直重复，直到手指松开，最后一次计算的速度就只最终速度。

模拟一个减速度 `a`, 利用 `v^2 = 2as` 求出 `s`, 利用 `v = at` 在求出时间，这样知道 `s` `t`， 利用 `easing` 函数就能实现缓动效果。

但是在计算 速度 `v` 与 `s` `t` 关系时，有几个关键点注意, 参看源码注释：

```javascript
me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {//动量
  var distance = current - start,
    speed = Math.abs(distance) / time,
    destination,
    duration;

  deceleration = deceleration === undefined ? 0.0006 : deceleration;//减速度

  destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 ); //根据公式 v^2 = 2as 计算 位移
  duration = speed / deceleration; //根据公式 v = at 计算停下来所需时间
  //滚动范围是[-xxx, 0]
  if ( destination < lowerMargin ) {//超左界
    /*
      为什么重新调整destination？ 如果不调整，按正常计算的话，destination可能会超出临界的很多，所以通过第一次正常计算，如果destination超出临界值，
      则重新调整计算，但是要保证2个条件，第一：保证destination还是超出临界值的，但是不要太过；第二：保证计算出的destination与speed成正比关系（忽略方向，也就是正负）；

      可能有人说既然你怕超过太多，那你为什么不把deceleration大点来控制呢？
    */
    destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
    distance = Math.abs(destination - current);// 要滚动的偏移量
    duration = distance / speed; //所用时间
  } else if ( destination > 0 ) {//超右界
    destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
    distance = Math.abs(current) + destination;
    duration = distance / speed;
  }

  return {
    destination: Math.round(destination),
    duration: duration
  };
};
```
