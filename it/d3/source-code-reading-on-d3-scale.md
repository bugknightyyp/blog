# d3源码解读之比例尺函数(scale)

d3的比例尺函数分两种：
- 定量比例尺函数(Quantitative)
  定量，顾名思义，一定的数量，那么定量比例尺函数就是按照数量多寡的映射关系，定义域是连续的。
- 序列比例尺函数(Ordinal)
  序列，顾名思义，顺序排列，那么序列比例尺函数就是依据顺序排列的映射关系，定义域是散列的。

## 定量比例尺函数

- identity-构建一个线性恒等比例尺
- linear-构建一个线性定量比例尺
- log-构建一个对数比例尺
- pow-构建一个指数比例尺
- quantile-构建一个分位数比例尺
- quantize-构建一个量化比例尺（值域离散）
- sqrt-构建一个平方根比例尺
- threshold-构建一个临界值比例尺（值域离散）

## 序列比例尺函数




###  identity
恒等比例尺函数很简单，在函数y = f(x)中, y == x。

### linear

#### 线性插值法
计算时会用到[线性插值法][3]的原理，必须搞懂。

#### 刻度值的计算

#### 刻度值格式化


明天覆盖任务：

基本是要覆盖除了geo地理以外的功能

主要的scale
主要的svg
主要的layout
transition
interpolate  down
format
geom




[1]:https://github.com/mbostock/d3/wiki/API--%E4%B8%AD%E6%96%87%E6%89%8B%E5%86%8C#user-content-d3scale-%E6%AF%94%E4%BE%8B%E5%B0%BA "官方API--中文手册"
[3]:http://baike.baidu.com/view/4685624.htm "线性插值法(Linear interpolation)"
