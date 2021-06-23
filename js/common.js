// 声明一个共用的 url基础地址 
$(function () {
    // 封装公共的js模块：统一设置公共的请求基准路径
    // 当调用接口时，会先执行该方法，然后再发送请求给服务器
    const baseURL = 'http://api-breakingnews-web.itheima.net/'     // 发送请求时的基准url地址
    $.ajaxPrefilter(function (config) {
        /**
         *! 添加小进度条 在页面上 
         *! beforeSend 表示发送请求之前自动触发 jQuery提供的方法
         *! complete 表示请求响应完成之后自动触发 jQuery提供的方法
         *? start()  方法表示开启进度条 NProgress的用法
         *? done() 方法表示结束进度条 NProgress的用法
         *! */


        // 开始添加小进度条 config表示发送请求时的配置选项 
        config.beforeSend = function () { // 在请求开始时候 开启进度条
            // 判断页面 是否存在 NProgress插件 存在NProgress插件再执行代码
            // window全局设置 NProgress方法 status()进度条开始
            window.NProgress && window.NProgress.start()
        }

        // 判断 链接是否需要请求头(端口是 my开头的地址都需要) 进行my开头的地址判断 
        // config表示发送请求时的配置选项 
        if (config.url.indexOf('my') === 0) { // my在索引的第一位 所以为 == 0
            // 设置公共的 $.ajax headers 请求头 携带token值
            config.headers = {

                // 统一设置请求头 带有my的url地址 都会添加请求头 携带token值
                Authorization: sessionStorage.getItem('mykey')
            }

        }
        // config表示发送请求时的配置选项 
        // 发送请求之前，把请求url进行拼接，形成一个完整的地址 不能写成+=
        config.url = baseURL + config.url //获取$.ajax 里面的url

        // 监听请求完成动作 阻止用户修改 token访问登录界面
        // complete方法 在请求完成后自动触发 由jQ提供
        config.complete = function (e) {

            // 结束小进度条 config表示发送请求时的配置选项 
            // 在请求停止时候 结束进度条
            // window全局设置 NProgress方法 status()进度条结束
            window.NProgress && window.NProgress.done() // 进行判断是否存在


            // e.responseJSON是表示 后端返回的数据 由jQ提供
            if (e.responseJSON.status === 1 && e.responseJSON.message === '身份认证失败！') {

                // 如果这两个条件成立 说明是非法登录 token无效
                // 如果token无效 返回到登录界面 同时删除无效的 token
                sessionStorage.removeItem('mytoken')
                location.href = './getout.html'


            }

        }
    })
})
