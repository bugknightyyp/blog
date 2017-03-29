
一、概念定义

vendor 代码：
开发前端项目，我们往往会用到一些npm库或框架，如jquery, react，这些库和框架的代码我们称为vendor代码。

app 代码:
基于这些库和框架自己编写的项目代码，我们称为 app 代码。

二、背景分析

为了减少http请求数，我们被教导将所有代码打包进一个js包里（如bundle.js）。这样请求数是少了，可是也带来了bundle.js体积庞大的问题，这可能意味着更多的加载时间。而且，我们的项目代码是经常可能要更新的，有人说程序员的世界里，唯一不变的就是变化。如果所有代码都打进一个包，那么当 app 代码有更新，就不得不让用户重新下载整个bundle.js，这包含了并未改变的 vendor 代码。

基于以上原因，我们往往希望能够区分开 vendor 代码和 app 代码。由于vendor 代码很少变动，可以给其设置较长时间的浏览器缓存。当我们的项目有更新，用户只需要重新下载 app 代码就好了。

三、具体实现

webpack里实现 vendor 代码和 app 代码的区分，提供了大约三种机制，分别是DllPlugin, CommonsChunkPlugin, 设置externals。

webpack.DllPlugin 和 webpack.DllReferencePlugin
使用这两个插件的做法是，先用webpack打包好所有用到的 vendor 代码放入一个单独的文件，然后再用webpack打包 app 代码，在打包 app 代码时，需要告诉webpack 哪些 vendor 代码已经存在了，如果 app 代码 import 了它，无需放入app 的打包文件。

因此这种方法需要两个webpack配置文件，一个用于vendor代码打包，指定要打包哪些vendor，生成的文件名等信息。一个用于app代码打包，并在其中指定哪些vendor已存在了。

在打包vendor时，会生成一个json文件，这个json文件就是起到两次打包过程的胶水性粘合作用。app打包的配置文件中需要指定这个json文件，以便webpack不将vendor代码打包进来。

最后，需要手动将vendor的打包文件添加到html里，app的script标签之前。当然也可以借助 add-asset-html-webpack-plugin 这个插件自动添加。

除了能够分离 vendor 和 app 代码，这种方法的另外一个好处就是可以在开发时减少构建时间。因为 app 代码更改时， webpack 不再需要对 vendor 代码打包。

缺点：需要明确指定 vendor 是哪些，且需要分两次编译，需要两个 webpack 配置文件。


CommonsChunkPlugin
这个插件的使用场景是 webpack 最终会生成多个并列的打包文件。如果不使用这个插件，那么多个并列的打包文件中如果含有相同的依赖，那么这些依赖的代码将会同时存在于两个打包文件中。而 CommonsChunkPlugin 就是将这些相同依赖的代码提取出来，放到一个单独的包里，并在所有打包文件之前引入。而且，我们知道 webpack 生成打包文件时会产生一些 webpack bootstrap 代码（webpack 支持模块加载的实现代码），这些代码也会同时存在于并列的打包文件中，CommonsChunkPlugin也可以做到提取出 webpack bootstrap 代码。

如果最终只生成一个bundle.js，那么CommonsChunkPlugin的意义就不大了，因为这时候没有什么公共的依赖可以提取。为了区分 vendor 代码和 app 代码，我们可以故意在 entry 里为需要提取的 vendor 加一个打包项，这样就可以利用 CommonsChunkPlugin 提取了，因为此时列出的 vendor 至少在不同的打包文件里被导入了两次。

CommonsChunkPlugin的优点是可以自动地对相同依赖在不同打包文件里的多次引入进行提取，且不限于 vendor 依赖，甚至可以提取出 webpack bootstrap 代码。缺点是每次编译时webpack都要处理所有代码，如果vendor多且代码量大，那么开发时代码改动导致的编译构建的时间可能较长（相比 DllPlugin 的方式）。

Externals配置项
以 jquery 为例，
externals: {
          'jquery': 'jQuery'
},
该配置项的键是模块引入时的模块名称，值是全局变量名。
该配置项告诉webpack，一旦代码里出现 require(‘jquery’)，不把 jquery 打包进来，而全局变量 jQuery 的值即为 require 调用的返回结果。
所以，这个方法依赖于手动在 bundle.js 前引入 jquery 代码，以便全局空间里确实存在 jQuery 变量。当然也可以借助 html-webpack-plugin 的模板自动生成index.html。
这个方法区分 vendor 代码和 app 代码是最简单的。但此时 vendor 代码就不一定是 webpack 打包生成的了，可以来自 cdn，反正只要确保全局空间存在 jQuery 就行。

综上说述，如果项目依赖的 vendor 很多且代码量大，为了提高开发时的编译速度，可以选用 DllPlugin；如果项目最终会生成很多并列的打包文件，且直接的相同依赖很多，那么选用 CommonsChunkPlugin 是不错的；最后，别忘了最简单的区分 vendor 和 app 代码的方式——通过配置externals。



https://www.evernote.com/shard/s493/sh/7495ec53-b8fe-4a6f-8d74-08844ba498ee/641c4398e0df126f
