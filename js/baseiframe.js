$(function () {

    $.ajax({

        type: 'GET',
        url: 'my/userinfo',

        success: function (ret) {

            console.log(ret);
            // 把服务器获取的值 打印在页面上 基础方法
            // $('#logname').val(ret.data.username)
            // $('#name').val(ret.data.nickname)
            // $('#email').val(ret.data.email)


            // 利用 layUI 获取服务器数据 打印在form表单上
            layui.form.val('myForm', ret.data) // 数据在 data里面
        }



    })
    // 设置点击修改按钮 提交数据的事件监听
    $('#modify').on('click', function (e) {
        // 阻止默认刷新
        e.preventDefault()

        // 获取input输入框 要修改的数值
        // 注意 要添加一个隐藏域的输入框 默认填写id值 用于后端比对
        let modifys = $('#form').serialize()

        // $.ajax 与服务进行交互
        $.ajax({
            type: 'post', // 设置post模式 根据文档设置
            url: 'my/userinfo', // 设置 修改的url地址 根据文档设置 
            data: modifys, // 比对服务器 提交要修改的数据
            success: function (res) { // 获取服务器的返回值
                if (res.status === 0) {
                    // 修改成功，提示一下即可
                    layer.msg(res.message)

                }
            }
        })

    })

})