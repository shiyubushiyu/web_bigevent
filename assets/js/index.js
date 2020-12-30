$(function() {
    //调用geiUserInfo获取用户基本信息
    geiUserInfo()
    $('#btnLogout').on('click', function() {
        // 调用访问框
        layer.confirm('是否退出？', { icon: 3, title: '提示' }, function(index) {
            //do something
            //1 清除内存里的token
            localStorage.removeItem('token')
                // 2 跳转到登录页面
            location.href = '/login.html'

            layer.close(index);
        });
    })
})


// 获取用户基本信息
function geiUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        success: function(res) {
            // console.log(res);

            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用 renderAvatar 渲染用户头像
            renderAvatar(res.data)
        },
        //不论成功还是失败都调用complete
        // complete: function(res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }

    })
}

function renderAvatar(user) {
    // 获取用户名
    var name = user.nickname || user.username
        // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 按需要渲染用户的头像
    if (user.user_pic !== null) {

        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()

    }
}