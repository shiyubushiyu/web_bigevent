//注意：每次调用$.git()或$.poat()或者$.ajax()的时候
//会先调用 ajaxPrefilter 这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
        // console.log(options.url)
        // 统一为有权限的接口，设置headers请求头
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function(res) {
        console.log(res)
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }

})