
// - 监听提交事件
// - 阻止表单默认提交行为
// - 获取表单数据
// - 通过ajax提交表单
// - 登录成功后跳转到主页


// ---------------------- 封装按钮方法

// 注册按钮封装
function Go() {

    $('.actionO ').on('click', function () {

        $(this).siblings().eq(2).hide()
        $(this).siblings().eq(4).hide()
        $(this).siblings().eq(5).show()
        $(this).siblings().eq(3).show()
        $(this).hide()
        $('.layui-input').val('')

    })

}
// 登录按钮封装
function Pa() {

    $('.actionL ').on('click', function () {

        $(this).siblings().eq(2).show()
        $(this).siblings().eq(5).show()
        $(this).siblings().eq(4).show()
        $(this).hide()
        $('.log').hide()
        $('.layui-input').val('')
    })


}

// ------------------------- Layui 框架 自定义input 表单验证

$(function () {
    // 目前没用 啥用
    layui.form.verify({
        // 数组的第一项表示验证的正则表达式规则
        // 数组的第二项表示如果验证不通过提示的信息
        uname: [/^[\S\u4e00-\u9fa5a-zA-Z]{2,20}$/, '用户名必须是2-8位'],

        password: [/^[A-Za-z0-9]{2,20}$/, '密码必须是数字英文'],

    })
    // 自定义校验规则 目前没用
    // layui.form.verify({
    //     // 验证确认密码必须和原有密码一致
    //     same: function (value) { // value 表示的是 该规则表单的值
    //         // 判断两次输入的密码是否一致
    //         // 获取原来的密码
    //         let oldPwd = $('#passwordS').val()
    //         // 原密码val() 对比 确认密码的 val()值 如果不等 return终止循环 并弹窗
    //         if (oldPwd !== value) {
    //             // 两者进行对比 如果不等 终止循环 并且 弹窗内容
    //             return '两次输入的密码不一致！'
    //         }
    //     }
    // })

})

// ------------------------- Layui 框架 提示弹出层

layui.use('layer', function () {


});


// ------------------------- Ajax -实现交互 post 登录界面

$(function () {
    // 给点击登录按钮设置事件监听
    $('.log').on('click', function (e) {
        // button按钮提交内容阻止刷新
        e.preventDefault()
        // 获取登录 form表单上 input输入框的所有val()值 必须带name 和服务器一致
        let UserInfo = $('#UserInfo').serialize()

        // 把密码ipnut val()值储存起来
        let passwordX = $('#passwordS').val()

        // 赋值给 密码验证的 ipnut val()值
        $('#exact').val(passwordX)

        // 设置ajax 获取数据1
        $.ajax({
            // 根据接口文档 设置登录post
            type: 'post',
            // 设置登录url地址
            url: 'api/login', // 声明了共用的 url基础地址 直接写端口就行
            // 和服务器的数据进行比对 用于提交
            data: UserInfo,
            // 设置服务器返回值
            success: function (res) {
                // 判断如果返回值登录正确
                if (res.status === 0) {
                    // 设置弹出层
                    layer.msg('登录成功');
                    // 判断如果返回值登录正确 就跳转到其他页面
                    // 可以跳转到链接 也可以跳转到本地文件上
                    location.href = 'file:///C:/wamp64/www/webmusic/dist/index.html'
                    // location.href = 'https://www.baidu.com/'

                    // 获取服务器 返回的token值(访问登录的秘钥)
                    //sessionStorage.setItem('声明名称用来储存的token',服务器返回的token)
                    sessionStorage.setItem('mykey', res.token)

                } else {
                    // 设置效验 layUI弹窗  当满足登录效验(条件)时 返回服务器效验错误
                    let inputNvalZ = /^[\S\u4e00-\u9fa5a-zA-Z]{2,20}$/
                    let inputPassLZ = /^[A-Za-z0-9]{2,20}$/
                    let inputNval = $('.inputN').val()
                    let inputNvalP = $('#passwordS').val()
                    // 当满足登录效验(条件)时 返回服务器效验错误
                    if (inputNvalZ.test(inputNval) && inputPassLZ.test(inputNvalP)) {
                        // 返回服务器效验错误 提示用户密码账号错误
                        layer.msg('账号密码错误');

                    }
                }

            }
        })

    })

})


// --------------------------- 两个链接登录注册切换

Pa()
Go()

// ------------------------- 点击注册界面

$(function () {

    // 点击注册按钮的事件监听
    $('.enroll').on('click', function (e) {

        // button按钮提交内容阻止刷新
        e.preventDefault()
        // 进行 密码确认效验 比较两次密码是否输入一致
        if ($('#passwordS').val() != $('#exact').val()) {
            layer.msg('两次输入的密码不一致!'); // 提示用户 输入不一致
            $('#exact').val('') // 重置 确认密码输入框
            return // 终止循环
        }

        // 获取注册 form表单上 input输入框的所有val()值 必须带name 和服务器一致
        let getNow = $('#UserInfo').serialize()

        // 设置ajax 获取数据
        $.ajax({
            // 根据接口文档 设置注册post
            type: 'post',
            // 设置注册url地址
            url: 'api/reguser',
            // 和服务器的数据进行比对 用于上传 
            data: getNow,
            // 设置服务器返回值
            success: function (ret) {
                // 判断如果返回值登录正确 
                if (ret.status === 0) {
                    layer.msg('注册成功     请登录');
                    // 自动点击 返回注册页面 登录信息
                    $('.actionO').click()
                } else {
                    // 设置效验 layUI弹窗  当满足注册效验(条件)时 返回服务器效验错误
                    let inputNvalZ = /^[\S\u4e00-\u9fa5a-zA-Z]{2,8}$/
                    let inputPassLZ = /^[A-Za-z0-9]{2,20}$/
                    let inputNval = $('.inputN').val()
                    let inputNvalP = $('#passwordS').val()
                    // 当满足注册效验(条件)时 返回服务器效验错误
                    if (inputNvalZ.test(inputNval) && inputPassLZ.test(inputNvalP)) {
                        // 当满足前面账号密码效验时候 如果密码不正确 弹出layUI弹窗提示
                        layer.msg(ret.message);
                        $('.inputN').val('')

                    }
                }

            }

        })

    })


})