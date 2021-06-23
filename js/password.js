$(function () {
    // // 表单验证
    // // 自定义表单验证规则
    // layui.form.verify({
    //     // 两次密码不能相同
    //     diff: function (newPwd) {
    //         // value表示应用当前验证规则的输入域的值
    //         let oldPwd = $('#pwdForm input[name=oldPwd]').val()
    //         if (newPwd === oldPwd) {
    //             return '新密码不可以和旧密码相同！'
    //         }
    //     },
    //     // 两次密码必须相同
    //     same: function (value) {
    //         let newPwd = $('#pwdForm input[name=newPwd]').val()
    //         if (newPwd !== value) {
    //             return '两次输入的新密码不一致！'
    //         }
    //     }
    // })

    // 声明一个修改密码的事件监听
    $('#modify').on('click', function (e) {
        // 阻止默认点击刷新界面
        e.preventDefault()

        // 开始进行 效验弹窗
        // 输入框不能为空
        if (!$('#newP').val() && !$('#YesP').val() && !$('#oldP').val()) {

            layer.msg('啥也没写 你点你妈呢')
            return
        }
        // 输入框不能为空
        if (!$('#newP').val() && !$('#YesP').val()) {

            layer.msg('就写了一行 你点你妈呢')
            return
        }
        // 原密码和现在密码一致
        if ($('#oldP').val() == $('#newP').val()) {

            layer.msg('原密码 和 新密码一致')
            return
        }
        // 确认密码 和 更改密码不一致
        if ($('#newP').val() != $('#YesP').val()) {

            layer.msg('两次输入的新密码不一致！')
            return
        }
        // 进行更改密码的正则效验 不符合弹窗
        let inputPassLZ = /^[A-Za-z0-9]{3,20}$/
        let newP = $('#newP').val()
        if (inputPassLZ.test(newP) == false) {
            // 返回服务器效验错误 提示用户密码账号错误
            layer.msg('密码必须是三位以上数字英文');
            return

        }
        // 效验结束

        // 保存修改的 ipnut带有name属性的数值 上传服务器
        let removeP = $('#form').serialize()
        // 设置$.ajax 访问接口
        $.ajax({
            // 设置访问方式
            type: 'post',
            // 设置修改密码url地址
            url: 'my/updatepwd',
            // 对比数据 进行修改
            data: removeP,
            success: function (res) { // 获取返回值

                layer.msg(res.message)


            }


        })

    })

})