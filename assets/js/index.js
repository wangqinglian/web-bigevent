$(function () {
     // 调用获取用户的基本信息
     getUserInfo()
})

// 获取用户的基本信息
function getUserInfo() {
     // $.ajax发送请求
     $.ajax({
          method: "GET",
          url: "/my/userinfo",
          //请求头在baseAPI中设置了
          // headers: {
          //      Authorization: localStorage.getItem('token') || ''
          // },
          success: function (res) {
               if (res.status !== 0) {
                    return layui.layer.msg("获取用户信息失败")
               }
               //调用renderAvatar渲染用户的头像
               renderAvatar(res.data)
          }
     })
}

function renderAvatar(user) {
     //获取用户的名称
     var name = user.nickname || user.username
     //2.设置欢迎的文本
     $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
     //3.按需渲染用户的头像
     if (user.user_pic !== null) {
          //3.1渲染图片头像
          $('.layui-nav-img')
               .attr('src', user.user_pic)
               .show()
          $('.text-avatar').hide()
     } else {
          //3.2渲染文本头像
          var first = name[0].toUpperCase()
          $(".text-avater").html(first).show()
          $(".layui-nav-img").hide()
     }
}
//推出功能
var layer = layui.layer
// 点击按钮，实现退出功能
$("#btnLogout").on("click", function () {
     // 提示用户是否确认退出
     layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
          //do something
          // 1. 清空本地存储中的 token
          localStorage.removeItem('token')
          // 2. 重新跳转到登录页面
          location.href = "/login.html"
          // 关闭 confirm 询问框
          layer.close(index);
     }, function () {
          //点击取消按钮的反应
          console.log("cancle");
     }
     );
})