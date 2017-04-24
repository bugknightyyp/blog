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

d3的样本方差的算法使用的是[Welford’s method][]

`d3.deviation` 计算数组中数字的标准差

\begin{align}
&(N-1)s_N^2 – (N-2)s_{N-1}^2 \\
&= \sum_{i=1}^N (x_i-\bar{x}_N)^2-\sum_{i=1}^{N-1} (x_i-\bar{x}_{N-1})^2 \\
&= (x_N-\bar{x}_N)^2 + \sum_{i=1}^{N-1}\left((x_i-\bar{x}_N)^2-(x_i-\bar{x}_{N-1})^2\right) \\
&= (x_N-\bar{x}_N)^2 + \sum_{i=1}^{N-1}(x_i-\bar{x}_N + x_i-\bar{x}_{N-1})(\bar{x}_{N-1} – \bar{x}_{N}) \\
&= (x_N-\bar{x}_N)^2 + (\bar{x}_N – x_N)(\bar{x}_{N-1} – \bar{x}_{N}) \\
&= (x_N-\bar{x}_N)(x_N-\bar{x}_N – \bar{x}_{N-1} + \bar{x}_{N}) \\
&= (x_N-\bar{x}_N)(x_N – \bar{x}_{N-1}) \\
\end{align}


### 涉及的数学知识点-概率论和数理统计

#### 分位数

[论四分位数的计算][1]

#### 样本方差、无偏估计、无偏方差

样本方差可以理解成是对所给总体方差的一个无偏估计。这是知乎上的一个[解释][24]

[无偏是指的样本均值的期望][25]

标准差(Standard Deviation)是方差的算术平方根

期望：随机变量的期望是以概率为权重的加和。

平均值：是认为各个随机变量的概率都是相等的（等权的），所以就是算术平均值的算法。

由于我得到的样本有限，故认为随机变量的概率是等权的，所以用平均值估计期望。

[0]:https://github.com/d3/d3-array "d3-array官方文档"

[1]:http://wenku.baidu.com/link?url=qQVpOqqLs6QB1X6BzopvwrqB2fy1lTnXCQ-2dm0U4VoIRp12hHooDNLzObzjfZHlYVuy9Zb7WoJhmjxvqchd6R_S-iLnGNRlk80WCAXA6oq "论四分位数的计算"

[21]:http://blog.csdn.net/feliciafay/article/details/5878036 "为什么样本方差要除以n-1"
[22]:http://blog.sina.com.cn/s/blog_4bdb170b0101oddi.html "样本方差与总体方差的区别"
[23]:http://open.163.com/movie/2011/6/6/N/M82IC6GQU_M83JA826N.html "统计：样本方差-网易公开课"
[24]:https://www.zhihu.com/question/20099757/answer/27502526 "我来说个我们这种文科生都能看得懂的-知乎"
[25]:https://www.zhihu.com/question/22983179 "什么是无偏估计-知乎"
[26]:http://jonisalonen.com/2013/deriving-welfords-method-for-computing-variance/ "The Mindful Programmer Welford’s method for computing variance"
[27]:https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance "Algorithms for calculating variance-wikipedia"

[3]:http://blog.csdn.net/popy007/article/category/208696 "向量几何在游戏编程中的使用"
