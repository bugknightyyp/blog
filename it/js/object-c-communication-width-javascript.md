# oc与JavaScript通信
date: [1]
tags: [WebViewJavascriptBridge] [webview]

js不可以直接调用oc的方法，oc可以直接调用js的方法。
本质还是用uiwebview的代理方法进行字段拦截（判断url的scheme），实现js间接调用native的method。

```JavaScript
window.onerror = function(err) {
		log('window.onerror: ' + err)
	}
    function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
    setupWebViewJavascriptBridge(function(bridge) {
		var uniqueId = 1
		function log(message, data) {
			var log = document.getElementById('log')
			var el = document.createElement('div')
			el.className = 'logLine'
			el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
			if (log.children.length) { log.insertBefore(el, log.children[0]) }
			else { log.appendChild(el) }
		}
		bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {
			log('ObjC called testJavascriptHandler with', data)
			var responseData = { 'Javascript Says':'Right back atcha!' }
			log('JS responding with', responseData)
			responseCallback(responseData)
		})
		document.body.appendChild(document.createElement('br'))
		var callbackButton = document.getElementById('buttons').appendChild(document.createElement('button'))
		callbackButton.innerHTML = 'Fire testObjcCallback'
		callbackButton.onclick = function(e) {
			e.preventDefault()
			log('JS calling handler "testObjcCallback"')
			bridge.callHandler('testObjcCallback', {'foo': 'bar'}, function(response) {//responseCallback
				log('JS got response', response)
			})
		}
	})
```


## 参考

[1]:https://github.com/marcuswestin/WebViewJavascriptBridge "WebViewJavascriptBridge官方"
[2]:http://blog.csdn.net/folish_audi/article/details/44591733 "WebViewJavascriptBridge 原理分析"
[3]:http://www.jianshu.com/p/8bd6aeb719ff "WebViewJavascriptBridge机制解析"
