# 坐标系
date: [2016-6-4]
tags: [math] [coordinate-system]

向量 坐标空间 矩阵 变换 欧拉角 齐次坐标空间  几何图元 相交性检测 三角网格 四元数

## 世界坐标系

世界坐标系是一个特殊的坐标系，它简历了描述其他坐标系所徐哟呵的参考框架。从另一方面说，能够用世界坐标系描述其他坐标系的位置，
而不能用更大的、外部的坐标系来描述世界坐标系。

## 物体坐标系
物体坐标系是和特定物体相关联的坐标系。每个物体都有它们独立的坐标系。当物体移动或改变方向时，和该物体相关联的坐标系将随之移动或改变方向。

## 摄像机坐标系
摄像机坐标系是和观察者密切相关的坐标系。摄像机坐标系和屏幕坐标系相似，差别在于摄像机坐标系处于3D空间中而屏幕坐标系在
2D空间平面里。摄像机坐标系被看作是一种特殊的 *物体* 坐标系，该 *物体* 坐标系就定义在摄像机的屏幕可视区域。
摄像机坐标系中，摄像机在原点，x轴向右，z轴向前(朝向屏幕内或摄像机方向)，y轴向上(不是世界的上方而是摄像机本身的上方)。

关于屏幕坐标系的典型问题是那些物体应该在屏幕上绘制出来。如：
- 3D空间中的给定点在摄像机前方吗？
- 3D空空间中的给定点是在屏幕上，还是超出了摄像机平截椎体的左、右、上、下边界?(平截椎体就是摄像机能观察到的金字塔区域)
- 某个物体是否在屏幕上？它的部分在，或全部不在？
- 两个物体，谁在前面？(该问题称作是可见性检测)
- 3D摄像机坐标系是怎样通过一种称作为投影的过程转换到2D屏幕上的。

## 惯性坐标系

有时候，好的术语是引领人们正确认识主题的钥匙。为了简化世界坐标系到物体坐标系的转换，人呢们引入了一种性能的坐标系，称作为惯性坐标系，
意思是在世界坐标系到物体坐标系的"半途"。惯性坐标系的远点和物体坐标系的原点重合，但惯性坐标系的轴平行于世界坐标轴。

为什么要引入惯性坐标系呢？因为从物体坐标系转换到


研究自然数和整数的领域称作为 **离散数学**，研究实数的领域称作为 **连续数学**。

计算机图形学第一准则：近似原则如果它看上去是对的，它就是对的。

传统的计算机图形学使用左手坐标系，而线性代数则倾向于使用右手坐标系。



## 向量计算

负向量：将向量的每个分量变负即可。几何解释：向量变负，将得到一个和原向量大小相等，方向相反的向量。

向量的大小（长度或模）

标准化向量：对于许多向量，我们只关心它的方向而不关心其大小。如：“我面向的是什么方向？”，在这样的情况下，使用单位向量讲非常方便。单位向量就是大小为1的向量，单位向量经常被称作为标准化向量或更简单地称为“法线”。

向量标准化：就是计算和某一向量方向相同，大小为1的向量。计算过程，向量各个分量除以向量的模。

数学中专门研究向量的分支称作为：线性代数。

向量点乘就是对应分量乘积的和，其结果是一个标量。几何解释：点称结果描述了两个向量的“相似”程度，点称结果越大，两向量越相近。
向量点乘等于向量大小与向量夹角的cos 值的积。

点乘对零向量的解释是，零向量和任意其他向量都垂直。

向量叉乘结果是一个向量。几何解释：叉乘得到的向量垂直于原来的两个向量。a x b 的长度等于向量的大小与向量角sin值的积，也等于以a 和 b 为两边的平行四边形的面积。

叉乘最重要的应用就是创建垂直于平面、三角形或多边形的向量。

## 矩阵

向量是标量的数组，矩阵是向量的数组。

行数和列数相同的矩阵称作为方阵。

如果所有非对角线元素都为0，那么这种矩阵为对角矩阵。

单位矩阵是一种特殊的对角矩阵。对角线元素为1。

旋转、缩放、投影、镜像、放射

基向量

变换物体与变换坐标系。将物体变换一个量等价于将坐标系变换一个相反的量。

