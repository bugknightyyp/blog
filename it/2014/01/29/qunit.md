#qunit

基本用法请参看[api doc][0]

##自定义断言（custom assertions）
自定义断言是通过接口`QUnit.push( result, actual, expected, message )`实现的，QUnit通过该接口侦测断言的发生和断言的结果。自定义断言封装的主要内容就是对actual数据的处理，然后和expected的比较，eg:
```
QUnit.assert.subOne = function( foo, bar, message ) {
  var rslt = foo - 1;
  QUnit.push(rslt == bar, foo, bar, message);
};
test("retrieving object keys", function( assert ) {
  assert.subOne(3, 2, "3-1=2");
  assert.subOne(1, 0, "1-1=0");
});
```

##细节说明
- 页面里`id`为`qunit-fixture`的div是用来进行dom操作测试的。如果有test改变该div的内容，那么当该test结束后，会恢复该div的原始内容；

- expect，是用来确保一个test里的断言全部执行过；

- module里的`setup`和`teardown`都算是`test`里的一部分，所以`test`里的`expect`期望的断言数量是包括`setup`和`teardown`里的断言的, 当然作用域也共享；

##特性（feature）
- 只要有`test`失败，QUnit将会把它的名字保存在`sessionStorage`里。下次重新测试，那些失败的test将优先其他test执行。
但是不影响输出的顺序，只是在执行顺序上有调整。配合“Hide passed tests”多选框，你就可以只看到失败的test，如果test还是失败，那么它就会尽可能的提前（执行顺序）。所以QUnit默认是会自动重新排序的，表明你的测试需要细粒度。如果测试失败，看到是随机的不确定的错误。不让QUnit重新排序是个明智的选择。如果着急，那么你可以通过设置：`QUnit.config.reorder = false`;

- 可以通过url的query string传参来选择执行test。`testNumber`是个数值，表示只执行第几个test。`module`是个编码后的模块名字，表示只执行该名字的模块。2者如果一起使用，只有testNumber参数有效，eg:
```
http://localhost/qunit/index.html?testNumber=2  
http://localhost/qunit/index.html?module=util
```


##参考

[qunit API 官网][0]

[qunit cookbook][3]

[CommonJS Unit Testing specification"][2]

[边译边学-QUnit下的JavaScript自动化单元测试][1]


[0]:http://api.qunitjs.com/ "qunit API 官网"
[1]:http://www.zhangxinxu.com/wordpress/2013/04/qunit-javascript-unit-test-%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95/ "边译边学-QUnit下的JavaScript自动化单元测试"
[2]:http://wiki.commonjs.org/wiki/Unit_Testing/1.0 "CommonJS Unit Testing specification"
[3]:http://qunitjs.com/cookbook "qunit cookbook"