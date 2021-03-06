$(function () {

     $("#link_reg").on("click", function () {
          $(".reg-box").show()
          $(".login-box").hide()
     })

     $("#link_login").on("click", function () {
          $(".login-box").show()
          $(".reg-box").hide()
     })

     // 自定义校验规则  从layui中获取form对象
     var form = layui.form
     var layer = layui.layer
     // 通过form.verify
     form.verify({
          pwd: [
               // 自定义了一个叫做 pwd 校验规则
               /^[\S]{6,12}$/
               , '密码必须6到12位，且不能出现空格'
          ],
          /* 
          pwd:function(value){
          const reg=/^[\S]{6,12}$/
          if(!reg.test(value))return'密码必须6到12位，且不能出现空格'
          }
           */
          // 校验两次密码是否一致的规则
          repwd: function (value) {
               // 通过形参拿到的是确认密码框中的内容
               // 还需要拿到密码框中的内容
               // 然后进行一次等于的判断
               // 如果判断失败,则return一个提示消息即可
               var pwd = $('.reg-box [name=password]').val()
               if (pwd !== value) {
                    return "两次密码不一致"
               }
          }
     })

     // 监听注册表单的提交事件
     $("#form_reg").on("submit", function (e) {
          // 1. 阻止默认的提交行为
          e.preventDefault()
          // 2. 发起Ajax的POST请求
          var inputParams = {
               username: $("#form_reg [name=username]").val(),
               password: $("#form_reg [name=password]").val()
          }
          $.post("/api/reguser", inputParams, function (res) {
               if (res.status !== 0) {
                    return layer.msg(res.message)
               }
               layer.msg("注册成功，请登录")
               //模拟人的点击对象
               $("#link_login").click()
          })
     })


     // 监听登录表单的提交事件
     $('#form_login').submit(function (e) {
          //箭头函数的this指向，指向上一级
          // 阻止默认提交行为  
          e.preventDefault()
          $.ajax({
               url: '/api/login',
               method: 'POST',
               // 快速获取表单中的数据
               data: $(this).serialize(),
               success: function (res) {
                    if (res.status !== 0) {
                         return layer.msg('登录失败！')
                    }
                    layer.msg('登录成功！')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                    localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                    location.href = '/index.html'
               }
          })
     })
})