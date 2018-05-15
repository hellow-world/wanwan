/*
 * @Author: admin
 * @Date:   2018-01-29 13:44:23
 * @Last Modified by:   admin
 * @Last Modified time: 2018-04-23 22:20:57
 */
 $('#login').click(function(){
    submitLogin();
})
function submitLogin() {
    var adminName = $.trim($("#account").val());
    var adminPass = $.trim($("#password").val());
    if (adminName == null || adminName == "") {
        $("#errorMessage").html("账号不能为空");
        return;
    }
    if (adminPass == null || adminPass == "") {
        $("#errorMessage").html("密码不能为空");
        return;
    }
    $.ajax({
        type: 'get',
        url: 'https://wanwan.citygreen-china.com:8445/manageruser/login',
        //url: 'https://wanwan.citygreen-china.cn:8445/manageruser/login',//外网
        dataType: 'json',
        data: $("#loginForm").serialize(),
        success: function(res) {
            console.log(res);
            $.cookie('token',res.result)
            $.cookie('sponsorName',adminName)
            // document.cookie = "token="+res.result;
            if(res.code!=200)
            {
                alert('错误')
            }
            else
            {
                //内网时为./view/index.html || 外网时为./dist/view/index.html
                window.location.href = getUrlParam('redirect') || './view/index.html';
            }
            

        },
        error: function(res) {
            $("#account").val('');
            $("#password").val('');
            $("#errorMessage").html("账号或密码错误");
        }

    })
}
document.onkeydown=function(e) {
            if (e.keyCode == 13) {
                submitLogin();
            }
        }
function getUrlParam(name)
{
	var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
}
var _token=$.cookie('token')
if(_token===undefined)
{
    console.log('_token')
    console.log('登录')
    
}
else
{
    window.location.href = getUrlParam('redirect') || './view/index.html';
}