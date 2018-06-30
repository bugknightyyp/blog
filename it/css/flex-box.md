# flex 布局

flex-basis的含义：flex items 在被放进一个flex容器之前的大小。也就是items理想或假设的大小。但是flex-basis不能保证其大小！一旦将items放入flex容器中，flex-basis的值就无法保证了。

width属性只是一个当flex-basis没有被设置时的回退选项。min-width和max-width则是flex-basis的下限和上限

content –> width –> flex-basis (limted by max|min-width),即：

- 如果没有设置flex-basis属性，那么flex-basis的大小就是项目的width属性的大小
- 如果没有设置width属性，那么flex-basis的大小就是项目内容(content)的大小

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。