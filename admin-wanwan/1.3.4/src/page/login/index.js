/*
 * @Author: admin
 * @Date:   2018-01-29 13:44:23
 * @Last Modified by:   admin
 * @Last Modified time: 2018-03-20 20:12:42
 */

'use strict'
require('./index.css')
var config = require('service/config.js')
var _util = require('util/utils.js')

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
    _util.request({
        method: 'get',
        url: config.basePath + 'manageruser/login',
        type: 'json',
        data: $("#loginForm").serialize(),
        success: function(res) {
            console.log(res)
            window.location.href = _util.getUrlParam('redirect') || 'index.html';
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