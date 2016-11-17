# d3-array

date: [2016-07-07]

tags: [d3] [array] [quantile]

## 统计

### API

`d3.min` 计算数组中最小的值

`d3.max` 计算数组中最大的值

`d3.extent` 计算数组中最小的值和最大的值, 相当于元素值得范围

`d3.sum` 计算数组中所有数字的总和

`d3.mean` 计算数组中所有数字的算术平均数

`d3.median` 计算数组中所有数字的中位数

`d3.quantile` 计算排序后的数组中数字的分位数

`d3.variance` 计算数组中数字的方差(样本方差)

`d3.deviation` 计算数组中数字的标准差

### 涉及的数学知识点-概率论和数理统计

#### 分位数

[论四分位数的计算][1]

#### 样本方差、无偏估计、无偏方差

样本方差可以理解成是对所给总体方差的一个无偏估计。这是知乎上的一个[解释][24]

[无偏是指的样本均值的期望][25]


[0]:https://github.com/d3/d3-array 'd3-array官方文档'
[1]:http://wenku.baidu.com/link?url=qQVpOqqLs6QB1X6BzopvwrqB2fy1lTnXCQ-2dm0U4VoIRp12hHooDNLzObzjfZHlYVuy9Zb7WoJhmjxvqchd6R_S-iLnGNRlk80WCAXA6oq "论四分位数的计算"


[2]:http://signal.spitzland.com/2011/04/23/%E6%A0%B7%E6%9C%AC%E6%96%B9%E5%B7%AE%E4%B8%BA%E4%BD%95%E9%99%A4%E4%BB%A5n-1-%EF%BC%88%E5%8F%82%E8%80%83%E6%B5%99%E5%A4%A7%E5%9B%9B%E7%89%88%E3%80%8A%E6%A6%82%E7%8E%87%E8%AE%BA%E4%B8%8E%E6%95%B0/ "样本方差为何除以n-1?"
[21]:http://blog.csdn.net/feliciafay/article/details/5878036 "为什么样本方差要除以n-1"
[22]:http://blog.sina.com.cn/s/blog_4bdb170b0101oddi.html "样本方差与总体方差的区别"
[23]:http://open.163.com/movie/2011/6/6/N/M82IC6GQU_M83JA826N.html "统计：样本方差-网易公开课"
[24]:https://www.zhihu.com/question/20099757/answer/27502526 "我来说个我们这种文科生都能看得懂的-知乎"
[25]:https://www.zhihu.com/question/22983179 "什么是无偏估计-知乎"
[26]:http://jonisalonen.com/2013/deriving-welfords-method-for-computing-variance/ "The Mindful Programmer
Welford’s method for computing variance"
[27]:https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance "Algorithms for calculating variance-wikipedia"

[3]:http://blog.csdn.net/popy007/article/category/208696 "向量几何在游戏编程中的使用"
