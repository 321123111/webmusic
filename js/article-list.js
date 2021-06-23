$(function () {

    // ------------------------------- 刷新页面 重新打印页面 实时刷新 -------------------------------

    // 添加 删除 修改 都要重新获取列表 刷新列表 所以要封装起来 进行调用
    function Refresh() {

        $.ajax({

            tyoe: 'get',
            url: 'my/article/cates',

            success: function (ret) {

                if (ret.status == 0) {

                    let speak = ''

                    $.each(ret.data, function (index, item) {

                        speak += ` <tbody>
                                    <td>${item.name}</td >
                                    <td>${item.alias}</td>
                                    <td>
                                    <button type="button" class="layui-btn layui-btn-xs btnEdit" data-id="${item.Id}" id="Editor">编辑</button>
                                    <button type="button" class="layui-btn layui-btn-xs layui-btn-danger btnDelete" data-id="${item.Id}" id="Delete">删除</button>
                                  </td>
                                </tbody > --> `
                        // layer.msg('列表获取成功');

                    })
                    $('.layui-table').html(speak)
                } else {
                    layer.msg('获取列表失败');

                }

            }


        })
    }

    Refresh()

    // -------------------- 添加文章 --------------------------------

    $('#addCate').on('click', function (e) {

        // 显示弹出层效果 
        // 声明一个变量 调用删除
        let close = layer.open({
            // 弹出层样式
            type: 1,
            // 弹出层标题
            title: '添加文章分类',
            // 弹出层中的内容 
            content: $('#add-tpl').html(), // 把html 文本内容打印在弹出层中
            // 弹出层的宽度和高度
            area: ['500px', '250px']
        })

        $('#add-form').on('click', function (e) {


            e.preventDefault()

            let addN = $('#add-form').serialize()
            $.ajax({
                type: 'post',
                url: 'my/article/addcates',
                data: addN,
                success: function (res) {
                    if (res.status === 0) {
                        // 添加成功，自动关闭弹窗，刷新列表
                        layer.close(close)
                        // 调用刷新方法 刷新页面
                        Refresh()
                    } else { // 没成功进行提示
                        layer.msg(res.message);

                    }
                }
            })

        })

    })


    // ------------------ 删除按钮的写法 -----------------------

    // 事件委托绑定删除按钮 必须用事件委托 循环遍历打印的内容 只能用 事件委托绑定内容里按钮     

    function Delete() {
        $('.layui-table').on('click', '#Delete', function (e) {
            // 阻止默认事件
            e.preventDefault()

            // 获取要删除的的id值 与服务器匹配
            // 循环遍历打印的按钮 绑定了数据id 自定义属性 data-id 直接获取即可
            let del = $(this).attr('data-id')

            // layUI 提供的 确认弹出框 提高用户体验
            layer.confirm('确认要退出吗?', { icon: 3, title: '提示' }, function (index) {

                // 如果用户点击取消 那么关闭询问框 保持在原网页
                layer.close(index)
                // 进入服务器 删除内容
                $.ajax({
                    type: 'get',
                    // 如果文档中的 url参数是:id这种格式 直接拼接数据即可
                    url: 'my/article/deletecate/' + del, // :id 的意思是 url地址拼接id +对应的id
                    data: del,
                    success: function (res) {

                        //打印删除的提示内容 layUI提供
                        layer.msg(res.message);

                        // 如果删除成功 重新刷新内容 实现实时更新
                        if (res.status === 0) {
                            // 刷新页面 重新打印的封装方法
                            Refresh()


                        } else {// 没成功进行提示

                            layer.msg(res.message);

                        }
                    }
                })


            })



        })
    }
    Delete()


    // ------------------ 编辑按钮的写法 -----------------------

    // 声明事件委托 因为内容是循环遍历打印出来 循环遍历打印按钮功能 需要用事件委托

    function Editor() {

        $('.layui-table').on('click', '#Editor', function () {

            // 获取循环遍历 打印自定义属性的服务器id值 
            let EditorId = $(this).attr('data-id')

            // 显示弹出层输入效果 layUI方法提供 layer.open()
            // 声明一个变量 调用删除
            let close = layer.open({
                // 弹出层样式
                type: 1,
                // 弹出层标题
                title: '添加文章分类',
                // 弹出层中的内容 
                content: $('#add-tpl').html(), // 把html 文本内容打印在弹出层中
                // 弹出层的宽度和高度
                area: ['500px', '250px']
            })
            // 声明一个方法 储存选中的服务器里面内容
            function getContent() {
                // 获取选中服务器内容
                $.ajax({
                    tyoe: 'get',
                    url: 'my/article/cates/' + EditorId, // 文档为 :id 需要 +id 拼接
                    // 获取返回值
                    success: function (ret) {
                        // 获取到内容 并且打印在页面上
                        $('#classN').val(ret.data.name)
                        $('#classL').val(ret.data.alias)
                        $('#classI').val(ret.data.Id) // 隐藏域的id值 用于修改上传的id比对
                    }
                })
            }
            getContent() // 调用方法
            // 声明事件监听 用于检测上传按钮
            $('#Submit').on('click', function (e) {
                // 取消默认刷新属性
                e.preventDefault()
                // 保存输入框的内容 用于修改后上传服务器
                let change = $('#add-form').serialize()
                // 调用上传内容的服务器接口
                $.ajax({
                    type: 'post',
                    url: 'my/article/updatecate',
                    data: change,
                    // 设置返回值
                    success: function (res) {
                        // 如果成功 关闭 layUI弹窗 并且重新刷新内容区域
                        if (res.status === 0) {
                            // 刷新页面 重新打印的封装方法
                            Refresh()
                            // 关闭 layUI弹窗
                            layer.close(close)
                        } else { // 没成功进行提示
                            layer.msg(res.message);

                        }
                    }

                })

            })

        })

    }

    Editor()
})
