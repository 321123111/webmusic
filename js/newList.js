$(function () {
    function getArticleList() {
        let select = "";
        $.ajax({
            type: "get",
            url: "my/article/cates",
            success: function (result) {
                // console.log(result);
                $.each(result.data, function (index, item) {
                    select = $(`
                      <option value="${item.Id}">${item.name}</option>
                    `)
                    $("#cate").append(select)
                    // layui要求动态的表单数据必须手动调用render方法
                    layui.form.render('select')
                });

            }
        })
    }
    getArticleList();


    // 获取文章列表数据
    // ---------------------------
    function loadArticleList(data) {
        $.ajax({
            type: 'get',
            url: 'my/article/list',
            data: data,
            success: function (ret) {
                if (ret.status === 0) {
                    // 获取文章列表数据
                    const list = ret.data
                    // 动态渲染列表内容
                    let trTags = ''
                    list.forEach(function (item) {
                        trTags += `
            <tr>
              <td>${item.title}</td>
              <td>${item.cate_name}</td>
              <td>${window.formatDate(item.pub_date)}</td>
              <td>${item.state}</td>
              <td>
                <a href="./edit.html?id=${item.Id}" target="contentArea">
                  <button type="button" class="layui-btn layui-btn-xs edit" data-id="${item.Id}">编辑</button>
                </a>
                <button type="button" class="layui-btn layui-btn-danger layui-btn-xs del" data-id="${item.Id}">删除</button>
              </td>
            </tr>
            `
                    })
                    $('.layui-table tbody').html(trTags)
                }
            }
        })
    }
    // 可以往方法里面传对象 不光是数组
    loadArticleList({
        // 表示页码（表示第几页数据）
        pagenum: 1,
        // 每页展示的条数
        pagesize: 10
    })

    // --------------------------
    // 搜索功能
    $('.layui-form').submit(function (e) {
        e.preventDefault()
        // 获取搜索条件数据
        const fd = $(this).serializeArray()
        const data = {
            // 表示页码（表示第几页数据）
            pagenum: 1,
            // 每页展示的条数
            pagesize: 10
        }
        // 把fd中两项筛选条件的数据添加到data对象中作为请求参数
        fd.forEach(function (item) {
            if (item.value) {
                // 如果下拉选项有值，就添加参数
                data[item.name] = item.value
                // data['cate_id'] = 1
                // data['state'] = '已发布'
            }
        })
        // 根据选泽的参数重新调用接口
        loadArticleList(data)
    })


    // // 删除文章
    // $('.layui-table').on('click', '.delete', function (e) {

    //     console.log(1);
    //     // 获取要删除的文章的id
    //     var id = $(this).data('id')
    //     layer.confirm('确认要退出吗?', { icon: 3, title: '提示' }, function (index) {
    //         $.ajax({
    //             type: 'get',
    //             url: 'my/article/delete/' + id,
    //             data: {
    //                 id: id
    //             },
    //             success: function (res) {
    //                 if (res.status === 0) {
    //                     // 删除成功，关闭窗口，刷新列表
    //                     layer.close(index)
    //                     loadArticleList({
    //                         pagenum: 1,
    //                         pagesize: 10
    //                     })
    //                 }
    //             }
    //         })
    //     })
    // })
})