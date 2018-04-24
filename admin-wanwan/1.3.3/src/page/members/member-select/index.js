/*
 * @Author: admin
 * @Date:   2018-02-01 14:07:25
 * @Last Modified by:   admin
 * @Last Modified time: 2018-03-26 16:07:58
 */
'use strict'
require('./index.css')
var config = require('service/config.js');
var _util = require('util/utils.js');
$('#stateEdit').click(function() {
    state_edit();
})

function state_edit() {
    $("#freezeTime").html($("#state").html());
    $("#editstate").modal("show");
}

window.selUserfun = function () {
    var selUserid = $("#selUserInput").val();
    $.ajax({
        type: 'post',
        url: config.basePath + 'user/selectUserMsg',
        datatype: 'json',
        data: {
            usermsg: selUserid
        },
        success: function(res) {
            res = JSON.parse(res)
            console.log(res);
            if (res.code != 0) {
                alert("no this users");
            } else {
                var message = res.resmsg;
                $("#uid").html(message.uid);
                $("#birthday").html(message.birthday);
                $("#greenMoney").html(message.greenMoney);
                $("#lastLoginDate").html(message.lastLoginDate);
                $("#nickname").html(message.nickname);
                $("#registDate").html(message.registDate);
                $("#sex").html(message.sex);
                $("#spreadNum").html(message.spreadNum);
                $("#state").html(message.state);
                $("#telephone").html(message.telephone);
                $("#userLevel").html(message.userLevel);
                $("#walletMoney").html(message.walletMoney);
            }
        },
        error: function(a, b, c) {
            alert(a.status);
        }

    })
}