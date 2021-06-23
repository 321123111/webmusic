// 动态上传更新图片
/**
 *! 需要插件 jQuery --> Cropper.js  Cropper.css --> jQuery-Cropper 
 *? 1. 实现页面的基本布局
 *? 2. 实现图片选区的初始化
 *? 3. 点击上传按钮打开选择文件的弹窗(需要添加一个隐藏文件域 ipnut上传)
 *? 4. 监听file标签的选中事件change
 *? 5. 基于原生JS的方法把文件对象转换为图片地址
 *? 6. 重新生成选区（销毁之前的选区；设置背景图片；重新生成选区）
 *? 7. 选区的大小依赖于图片的尺寸，应该先有图片，再有选区
 *? 8. 实现选区的裁切把选区生成一个base64格式的图片
 *? 9. 把图片上传到后端接口
 *? 10. 上传成功后，刷新头像即可 需要设置一个全局刷新方法
 */

// ------------- 在页面上打印上传图片的样式 调用.cropper()方法 ------------

// 在img标签上设置.cropper()方法 就是图片剪切的样式
// 需要声明变量储存 因为用户上传图片 就要刷新这个方法(初始化)
const options = {
    // 控制裁切区域的长宽比例
    aspectRatio: 1,
    // 指定裁切图片的预览区域
    preview: '.img-preview'
}
// 把储存的变量 添加到.cropper()方法 打印到页面上 显示图片上传内容
$('#iamge').cropper(options)

// -------------  点击上传按钮 ，可以选择图片打印到页面上  --------------------

// 需要在 html页面添加一个隐藏域的 input上传 每次点击按钮时候 模拟点击 input上传内容
$('#upload').click(function () {
    // 模拟上传的点击按钮 实现上传功能
    $('#file').click();
})
// 事件监听change 监听文件的上传
$('#file').change(function () {

    // 进行判断 如果用户没上传 就不执行转换打印代码
    if (this.files.length == 0) {
        return
    }
    // files 可以获取文件 files[下标] 可以获取指定下标文件
    // 获取用户上传的第一个图片
    let fristImg = this.files[0]
    // URL.createObjectURL 是原生的js方法 把图片转换成blob格式
    // blob格式是图像的一种格式 不上传到服务器 可以临时打印在页面上
    // 把用户上传的图片 转换成blob 临时打印在页面上
    let newImgURL = URL.createObjectURL(fristImg)

    // 当用户上传图片后 重新生成选区 执行:
    $('#iamge').cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)         // 重新设置图片路径
        .cropper(options)               // 重新初始化裁剪区域

})

// ----------------- 上传到服务器上 并且刷新页面更新头像 ------------------

// 把图片根据后端接口要求 进行裁剪并且上传 
// 点击确定按钮实现图片的裁切
$('#cropBtn').click(function () {
    // 生成裁剪图的图片数据
    const imgData = $('#iamge').cropper('getCroppedCanvas', {
        // 裁剪的图片的尺寸 后端需求数据
        width: 100,
        height: 100
    }).toDataURL('image/png') // 把图片转换为 64位baes64 上传到服务器
    // 调用接口提交数据
    $.ajax({
        type: 'post', // 根据接口文档 设置接口
        url: 'my/update/avatar', // 根据文档 设置注册url地址
        data: { // 比对内容 进行图片上传
            avatar: imgData
        },
        success: function (ret) {
            // 裁切成功，刷新用户头像信息
            if (ret.status === 0) {
                // parent属性返回当前窗口的父窗口
                // 父窗口调用 .Validation()是重新打印页面的全局方法
                parent.Validation()
            }
        }
    })
})