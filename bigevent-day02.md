# 大事件项目

## 项目介绍

- [线上演示项目地址](http://www.liulongbin.top:8086/)

- [线上项目的API 接口地址](https://www.showdoc.cc/escook?page_id=3707158761215217)

> 项目的业务场景：新闻文章相关信息的后台系统管理（一般是给运营人员使用）
>
> 技术栈：jQuery + Ajax + Layui(类似于bootstrap)



## 项目初始化

- 初始化项目结构
  - assets  需要的资源
  - index.html  主页面
  - login.html 登录页
- 基于git进行代码管理
  - git init 初始化本地仓库
  - git add . 把项目中所有文件添加到暂存区
  - git commit -m '初始化版本'  把暂存区所有的文件提交一个初始化版本
  - 创建远程仓库 myevent-128
  - git remote add origin https://gitee.com/wzj1031/myevent-128.git
  - git push -u origin master



## LayUI介绍

- [Layui](https://www.layui.com/)
- Layui既提供了样式类，也提供了js功能，不依赖jQuery。

### LayUI基本用法

- 导入css文件

```html
<link rel="stylesheet" type="text/css" href="./assets/lib/layui/css/layui.css">
```

- 使用UI组件

```html
<button type="button" class="layui-btn layui-btn-primary">原始按钮</button>
```

- 导入js文件

```html
<script src="./assets/lib/layui/layui.all.js"></script>
```



### LayUI常用组件

- 按钮
- 字体图标
- 栅格
- 。。。。。。



## 登录-注册模块

### 登录模块介绍

- 页面基本布局
- 输入用户名和密码
- 点击提交按钮然后调用接口验证登录信息
- 如果登录成功就跳转到主页
- 如果失败就给一个提示

### 基本布局

- 登录页面基本结构

```html
  <!-- 左上角的图标 -->
  <div class="login-logo layui-container">
    <img src="./assets/images/logo.png" alt="">
  </div>
  <!-- 登录表单盒子 -->
  <div class="login-box">
    <!-- 标题 -->
    <div class="title"></div>
    <!-- 表单 -->
    <form class="layui-form" action="">
      <div class="layui-form-item">
        <i class="layui-icon layui-icon-username"></i>
        <input type="text" name="title" required lay-verify="required" placeholder="请输入标题" autocomplete="off"
          class="layui-input">
      </div>
      <div class="layui-form-item">
        <i class="layui-icon layui-icon-password"></i>
        <input type="text" name="title" required lay-verify="required" placeholder="请输入标题" autocomplete="off"
          class="layui-input">
      </div>
      <div class="layui-form-item">
        <button class="layui-btn layui-btn-normal layui-btn-fluid" lay-submit lay-filter="formDemo">立即提交</button>
      </div>
      <!-- 切换文本 -->
      <div class="action">
        <a href="javascript:;">去注册账号</a>
      </div>
    </form>
  </div>
```

- 登录框布局样式

```css
body {
  background: url(../images/login_bg.jpg);
  background-size: cover;
  overflow: hidden;
  height: 100%;
}

.login-logo {
  margin-top: 20px;
}

.login-box {
  width: 400px;
  height: 310px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

.login-box .layui-form-item {
  position: relative;
}

.login-box .layui-form-item .layui-icon-username, .layui-icon-password {
  position: absolute;
  top: 10px;
  left: 10px;
}

.login-box .layui-form-item .layui-input {
  padding-left: 30px;
}

.login-box .title {
  background: url(../images/login_title.png) no-repeat;
  height: 60px;
  background-position: center;
}

.login-box .layui-form {
  padding: 0 30px;
}

.login-box .action {
  text-align: right;
}

```

> 总结：
>
> 1. 页面主体结构自己写
> 2. 通用的结果基于Layui进行定制

### 实现登录功能

- 监听提交事件
- 阻止表单默认提交行为
- 获取表单数据
- 通过ajax提交表单
- 登录成功后跳转到主页

```js
  // 加密的DOM元素加载完成后触发
  // 1、绑定提交表单的事件
  $('.login-form').submit(function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault()
    // 2、获取表单数据
    const fd = $(this).serialize()
    // 3、调用接口实现登录
    $.ajax({
      type: 'post',
      url: 'http://api-breakingnews-web.itheima.net/api/login',
      data: fd,
      success: function (ret) {
        if (ret.status === 0) {
          // 4、登录成功，跳转到主页面
          location.href = './index.html'
        } else {
          alert(ret.message)
        }
      }
    })
  })
```

> 总结
>
> 1. 登录的接口基准路径不要看线上文档
> 2. ret.status状态码值由后端规定

### 表单验证

> 表单验证：判断输入域是否有值，或者值是否符合特定规则，如果符合运行提交，否则不允许。

- 基于Layui的表单验证规则进行表单验证
  - 必须引入layui.all.js库文件
  - 输入域添加属性 lay-verify=‘内置规则’
    - required（必填项）
    - phone（手机号）
    - email（邮箱）
    - url（网址）
    - number（数字）
    - date（日期）
    - identity（身份证）
  - 要想触发表单验证，必须在提交按钮上添加一个属性 `lay-submit`

```html
<input type="text" name="username" lay-verify="required" placeholder="请输入用户名" autocomplete="off" class="layui-input">
<button lay-submit class="layui-btn layui-btn-normal layui-btn-fluid">登录</button>
```

- 基于LayUI自定义验证规则

```js
// layui是全局对象，通过它可以得到form对象
var form = layui.form
// 基于LayUI自定义表单验证规则
form.verify({
  // 必须是6-8位字符,不包括空格
  uname: [/^[\S]{6,8}$/, '用户名必须是6-8位字符']
})
```

```html
<input type="text" name="username" lay-verify="required|uname" placeholder="请输入用户名" autocomplete="off" class="layui-input">
```

- 自定义验证规则-基于函数

```js
// layui是全局对象，通过它可以得到form对象
var form = layui.form
form.verify({
  uname: function (value) {
    // value表示当前表单输入域的值
    // 要求：用户名需要是6-8位的字符串
    if (!/^[\S]{6,8}$/.test(value)) {
      return '用户名需要是6-8位的字符串'
    }
  },
  pwd: function (value) {
    if (!/^[\d]{6}$/.test(value)) {
      return '密码必须是6位数字'
    }
  }
})
```

> 总结：可以通过函数的方式，灵活设置各种自定义验证规则
>

### 回顾

- 熟悉项目的业务场景：后台管理系统
- 初始化项目：创建项目的结构；基于git进行管理
- 熟悉Layui的基本用法：类似于Bootstrap
- 登录模块
  - 页面的基本布局：熟悉基于第三方UI组件库做布局的方式
  - 实现基本的登录功能
  - 处理表单验证
    - 内置表单验证功能：表单输入域添加属性 lay-verify='required|number'
      - 提交按钮上必须添加lay-submit属性
      - 必须引入layui.all.js库文件
      - 表单的layui提供的类名不可以顺便修改
    - 自定义表单验证规则
      - 验证规则的值是一个数组
      - 验证规则的值是一个函数，在函数中可以随意定制特定的验证规则。



### 注册表单

- 基于Layui的表单组件实现注册表单

```html
<!-- 注册表单 -->
    <form class="layui-form reg-form" action="">
      <div class="layui-form-item">
        <i class="layui-icon layui-icon-username"></i>
        <input type="text" name="username" lay-verify="required|uname" placeholder="请输入用户名" autocomplete="off"
          class="layui-input">
      </div>
      <div class="layui-form-item">
        <i class="layui-icon layui-icon-password"></i>
        <input type="password" lay-verify="required|pwd" placeholder="请输入密码" autocomplete="off" class="layui-input">
      </div>
      <div class="layui-form-item">
        <i class="layui-icon layui-icon-password"></i>
        <input type="password" name="password" lay-verify="required|pwd" placeholder="请确认密码" autocomplete="off"
          class="layui-input">
      </div>
      <div class="layui-form-item">
        <button class="layui-btn layui-btn-normal layui-btn-fluid" lay-submit lay-filter="formDemo">立即提交</button>
      </div>
      <!-- 切换文本 -->
      <div class="action">
        <a href="javascript:;">去登录账号</a>
      </div>
    </form>
```

> 注意：第一次输入的密码和确认密码的name不可以添加两个一样的（密码仅仅可以有一个name）
>

### 控制登录和注册表单切换

- 如何控制两个表单之间的切换
  - 本质上就是显示和隐藏的切换操作

```js
  // 控制登录表单和注册表单的切换操作
  // 给登录表单按钮注册时间
  $('.login-form .action').click(function () {
    // 隐藏登录表单，显示注册表单
    $('.login-form').hide()
    $('.reg-form').show()
  })
  // 给注册表单按钮注册时间
  $('.reg-form .action').click(function () {
    // 隐藏注册表单，显示登录表单
    $('.login-form').show()
    $('.reg-form').hide()
  })
```

> 注意，默认需要通过类名隐藏注册表单

### 实现注册功能

- 监听注册提交事件 
- 阻止默认提交行为
- 调用接口提交表单
- 注册成功后显示登陆表单

```js
  // 1、绑定表单提交事件
  $('.reg-form').submit(function (e) {
    // 2、获取表单数据并且调用接口实现注册
    e.preventDefault()
    const fd = $(this).serialize()
    $.ajax({
      type: 'post',
      url: 'http://api-breakingnews-web.itheima.net/api/reguser',
      data: fd,
      success: function (ret) {
        // 3、判断服务器返回的结果
        if (ret.status === 0) {
          // 注册成功，显示登录表单
          $('.reg-form .action').trigger('click')
        } else {
          // 注册失败
          alert(ret.message)
        }
      }
    })
  })
```

> 总结：通过程序触发按钮的事件 

### 注册表单验证处理

- 验证两次密码是否一致

```js
// 自定义校验规则
form.verify({
  // 验证确认密码必须和原有密码一致
  same: function (value) {
      // 判断两次输入的密码是否一致
      // 获取原来的密码
      var oldPwd = $('#reg-form input[name=password]').val()
      if (oldPwd !== value) {
          return '两次输入的密码不一致！'
      }
  }
})
```

```html
<input type="password" lay-verify="required|pwd|same" placeholder="请确认密码" autocomplete="off" class="layui-input">
```

> 总结：先定义，再使用
>
> 补充：弹层组件的用法：直接使用layer对象调用方法即可（弹层模块是独立的，全局暴露了一个对象layer）

### 发送请求统一设置

- 基于jQuery的相关方法统一设置请求头信息
  - $.ajaxPrefilter


```js
// 封装一个独立的模块 common.js , 然后需要在界面HTML中导入该模块
// 统一配置请求的接口地址
var baseURL = 'http://ajax.frontend.itheima.net/'
// 如下的方法会在实际的请求发出之前调用
$.ajaxPrefilter(function (option) {
  // option 表示请求配置选项，$.ajax方法的参数
  option.url = baseURL + option.url
})
```

![image-20210506101350743](imgs/image-20210506101350743.png)

> 总结：$.ajaxPrefilter方法会在Ajax发送请求之前调用，通过形参config可以设置请求相关的参数。



### 控制页面的访问权限

- 用户登录成功后需要客户端缓存token，借助这个token可以判断用户是否已经登录

```js
// 登录成功后，缓存token
sessionStorage.setItem('mytoken', res.token)
```

```js
// 在主页面中判断token是否存在
// 判断用户是否已经登录，如果没有登录，需要跳转到登录页面
var token = sessionStorage.getItem('mytoken')
if (!token) {
  // token不存在，跳转到登录页面
  location.href = './login.html'
}
```

> 总结：token是判断登录与否的标志（首次登录成功后，后端会返回一个token，前端需要进行缓存）
>

### 关于本地缓存的操作

> 缓存的应用场景：跨页面数据共享（登录页存入缓存的数据，主页可以获取）

- sessionStorage 页面关闭后，缓存数据就消失了

- localStorage 页面关闭后，数据依然存在

> 总结：
>
> 1. 设置缓存数据：setItem(key, value)
> 2. 获取缓存数据：getItem(key)
> 3. 删除单个缓存数据：remoteItem(key)
> 4. 清除所有的换成数据：clear()



### token认证模式的交互流程

![image-20210506115012178](imgs/image-20210506115012178.png)

- 客户端输入用户名和密码
- 发送请求传递用户名和密码给服务器
- 服务器进行账号的合法性验证，如果验证通过就给该用户生成一个唯一的token
- 把token返回给客户端
- 客户端需要把token缓存起来
- 后续的接口调用需要携带缓存的token
- 服务器接收到请求后，验证token是否有效，如果有效就返回正常数据，否则返回错误提示



## 后台管理主页模块

### 基本布局

> 文档->页面元素->布局->后台布局

- 拷贝代码并修改样式文件和js文件的路径
- 分析布局结构
  - 顶部的导航栏
  - 左侧的菜单区
  - 右侧的内容区

> 总结：基于Layui提供现成的主页布局进行定制
>

### 顶部导航栏布局

- 左侧logo处理
- 右侧菜单处理

```html
    <!-- 顶部导航 -->
    <div class="layui-header">
      <div class="layui-logo">
        <img src="./assets/images/logo.png" alt="">
      </div>
      <ul class="layui-nav layui-layout-right">
        <li class="layui-nav-item">
          <a href="javascript:;">
            <!-- <img src="./assets/images/logo.png" alt=""> -->
            用户名称
          </a>
          <dl class="layui-nav-child">
            <dd><a href="">基本资料</a></dd>
            <dd><a href="">更新头像</a></dd>
            <dd><a href="">重置密码</a></dd>
          </dl>
        </li>
        <li class="layui-nav-item"><a href=""><i class="layui-icon layui-icon-logout"></i>退出</a></li>
      </ul>
    </div>
```

> 总结：下拉效果需要依赖layui的js库。

### 侧边栏布局

- 菜单标题处理
- 控制菜单高亮
  - `li`标签的`layui-this`类
- 控制菜单手风琴效果(排他效果)
  - `ul`标签的`lay-shrink`属性

```html
<ul class="layui-nav layui-nav-tree" lay-shrink='all'  lay-filter="test">
  <li class="layui-nav-item layui-this"><a href="">首页</a></li>
  <li class="layui-nav-item layui-nav-itemed">
    <a class="" href="javascript:;">文章管理</a>
    <dl class="layui-nav-child">
      <dd><a href="javascript:;">文章类别</a></dd>
      <dd><a href="javascript:;">文章列表</a></dd>
      <dd><a href="javascript:;">发表文章</a></dd>
    </dl>
  </li>
  <li class="layui-nav-item">
    <a href="javascript:;">个人中心</a>
    <dl class="layui-nav-child">
      <dd><a href="javascript:;">基本资料</a></dd>
      <dd><a href="javascript:;">更换头像</a></dd>
      <dd><a href="javascript:;">修改密码</a></dd>
    </dl>
  </li>
</ul>
```

> 总结：
>
> 1. 左侧菜单的高亮效果由类名  lay-this 设置
> 2. 控制左侧菜单只能展开一个  lay-shrink='all'

### 导航设置字体图标

- a标签中添加字体图标(Layui内置图标用法)

```html
<a href=""><i class="layui-icon layui-icon-face-smile"></i>退出</a>
```

- 使用第三方图标

```html
<!--导入图标样式文件-->
<link rel="stylesheet" type="text/css" href="./assets/fonts/iconfont.css">
```

```html
<span class="iconfont icon-tuichu"></span>
```

> 总结
>
> 1. 使用layui内置提供的图标
> 2. 导入第三方图标并使用

### 头像处理

- 左侧顶部头像
- 导航栏右侧头像类似

```html
<!--左侧菜单：用户信息-->
<div class="userinfo">
  <div class="avatar">L</div>
  <div class="msg">欢迎XXX</div>
</div>
<!-- 右上角：用户信息 -->
<a href="javascript:;">
   <div class="userinfo">
     <!-- 如果有头像就显示头像信息，否则显示默认的填充位 -->
     <div class="avatar">L</div>
     <div class="msg">欢迎XXX</div>
   </div>
</a>
```

```css
.userinfo {
  height: 50px;
  line-height: 50px;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
}
.userinfo .avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: green;
  text-align: center;
  line-height: 40px;
  margin-left: 20px;
}
.userinfo .msg {
  flex: 1;
  margin-left: 10px;
  line-height: 40px;
}
```

> 注意：下拉列表的小箭头依赖a标签
>

### 关于子窗口用法

> 熟悉iframe标签的基本使用

```html
 <!-- 父窗口 -->
  <h1>测试iframe子窗口</h1>
  <a href="http://www.liulongbin.top:8086/index.html" target='itcast'>测试</a>
  <hr>
  <iframe name='baidu' width="400" height="300" src="http://baidu.com" frameborder="0"></iframe>
  <iframe name='itcast' width="400" height="300" src="http://itcast.cn" frameborder="0"></iframe>
```

> 总结：
>
> 1. iframe标签通过name熟悉区分是哪个子窗口
> 2. a链接通过target属性可以指定把链接渲染的结果放到指定的子窗口中

### 右侧内容区布局

- iframe标签用法（作为页面的子窗口来使用）
  - 子窗口的内容由src指向的URL地址来决定

```html
<iframe frameborder="0" width="500" height="400" src="http://itcast.cn"></ifram>
```

- 右侧内容区页面嵌入

```html
<div class="layui-body">
  <iframe name='contentArea' src="./home/dashboard.html"></iframe>
</div>
```

- iframe样式处理

```css
.layui-body iframe {
  width: 100%;
  height: 100%;
  /* 防止出现滚动条 */
  border: 0;
  display: block;
}
```

> 总结：
>
> 1. 右侧iframe高度100%出现滚动条问题（通过display:block解决）

### 获取用户信息

- 调用接口获取用户信息
- 填充用户头像等信息

```js
  // 获取用户基本信息
  function loadUserInfo () {
    $.ajax({
      type: 'get',
      url: 'my/userinfo',
      // 请求头
      headers: {
        // 用于携带token信息
        Authorization: sessionStorage.getItem('mytoken')
      },
      success: function (ret) {
        // 把返回的用户信息渲染到左侧和右上角
        if (ret.data.user_pic) {
          // 有头像
          let infoTag = `
            <div class="avatar">
              <img src="${ret.data.user_pic}"/>
            </div>
            <div class="msg">欢迎${ret.data.nickname}</div>
          `
          $('.userinfo').html(infoTag)
        } else {
          // 没有头像
          let infoTag = `
            <div class="avatar">${ret.data.nickname.charAt(0)}</div>
            <div class="msg">欢迎${ret.data.nickname}</div>
          `
          $('.userinfo').html(infoTag)
        }
      }
    })
  }
  loadUserInfo()
```

> 总结：
>
> 1. 调用接口；获取数据；填充页面
> 2. 用户数据的接口需要权限（携带请求头：token）

### 退出功能

- 弹层确认框用法

- 实现退出

```js
  // 实现退出功能
  // 1、绑定退出点击事件
  $('#logout').click(function () {
    // 2、弹窗提示
    layer.confirm('确认要退出吗?', { icon: 3, title: '提示' }, function (index) {
      // 参数index表示当前的窗口
      // 删除token，跳转到登录页面
      sessionStorage.removeItem('mytoken')
      // 关闭弹层
      layer.close(index)
      // 跳转到登录页面
      location.href = './login.html'
    })
  })
```

> 总结：
>
> 1. 退出时基于Layui提供碳层进行提示
> 2. 需要删除token
> 3. 跳转回登录页面



### 发送请求统一设置

- 接口调用流程分析

- 基于jQuery的相关方法统一设置请求头信息

  - $.ajax

    - beforeSend

    - complete

  - [NProgress](https://github.com/rstacruz/nprogress)插件用法

  - $.ajaxPrefilter

```js
$(function () {
  // 封装公共的js模块：统一设置公共的请求基准路径
  // 当调用接口时，会先执行该方法，然后再发送请求给服务器
  // 发送请求时的基准路径
  const baseURL = 'http://api-breakingnews-web.itheima.net/'
  $.ajaxPrefilter(function (config) {
    // 请求开始的时候，开启进度条
    // 请求发送之前自动触发
    config.beforeSend = function () {
      window.NProgress.start()
    }
    // config表示发送请求时的配置选项
    if (config.url.indexOf('my') === 0) {
      // 请求地址以my开头
      // 统一设置请求头
      config.headers = {
        Authorization: sessionStorage.getItem('mytoken')
      }
    }

    // 发送请求之前，把请求url进行拼接，形成一个完整的地址
    config.url = baseURL + config.url

    // 监听请求完成的动作(complete方法在请求完成后自动触发，由jQuery提供的方法)
    config.complete = function (e) {
      // 请求完成后，结束进度条
      window.NProgress.done()
      // e.responseJSON表示后端返回的数据
      if (e.responseJSON.status === 1 && e.responseJSON.message === '身份认证失败！') {
        // 如果这两个条件同时成立，表示token无效
        // 如果token无效，那么需要跳转到登录页面，同时删除无效token
        sessionStorage.removeItem('mytoken')
        location.href = './login.html'
      }
    }
  })
})
```

> 总结：
>
> 1. 配置基准请求路径
> 2. 统一设置请求头
> 3. 统一处理token失效的情况
> 4. 提示页面加载的进度
>
> ---------------------
>
> 知识点：
>
> 1. jQuery提供的新方法
>    1. beforeSend 表示发送请求之前自动触发
>    2. complete表示请求响应完成之后自动触发
> 2. NProgress的用法
>    1. start方法表示开始进度条
>    2. done方法表示结束进度条