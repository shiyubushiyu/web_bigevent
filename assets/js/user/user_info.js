$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6个字符之间！'
            }
        }
    })
    initUserInfo()
        //初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                //调用form.val为form表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    //重置按钮事件
    $("#btnReset").on('click', function(e) {
        // e.preventDefault()
        initUserInfo()
        return false
    })




    //更新用户信息
    $('.layui-form').on('submit', function(e) {
        //阻止表单默认行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.msg('更新用户信息失败！')
                }
                layui.mag('更新用户信息成功！')
                    //调用父页面中的方法，重新熏染用户的头像和用户
                window.parent.getUserInfo()
                    // $('.layui-form')[0].reset()
            }
        })
    })
})