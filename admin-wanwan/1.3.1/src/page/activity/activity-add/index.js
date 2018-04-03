/*
 * @Author: admin
 * @Date:   2018-02-05 10:02:49
 * @Last Modified by:   admin
 * @Last Modified time: 2018-03-29 17:38:16
 */
var config = require('service/config.js')
var _encode = require('service/errorcode.js')
var _utils = require('util/utils.js')
var isPushed = 1;//是否推送，推送为1，不推送为0
var notifyContent = "";//推送内容
var notifyTime = "";//推送时间
$(function() {
    $('#activity_content').froalaEditor({
        theme: 'dark',
        imageUploadURL: config.basePath + "uploadImgEditor",
        language: 'zh_cn',
        height: 200
        /*  toolbarButtons: [  
                           'bold', 'italic', 'underline', 'paragraphFormat', 'align','color','fontSize','insertImage','insertTable','undo', 'redo'  
                         ] */
    })
    // 查询权限分组
    selRoleList();

});

function selRoleList()
{
    $.ajax({
        url:config.buildPath+'api-user/v1.0/role',
        type:'GET',
        dataType:'json',
        headers:{"token":config.token},
        success:function(res)
        {
            if(res.code!==_encode.REQUEST_SUCCESS)
            {
                alert(res.msg)
            }
            else
            {
                var message = res.result;
                $('#powerUser').empty();
                $('#powerUser').append(setRoleSelect(message));
            }
        },
        error:function(a,b,c)
        {
            alert(a.status)
        }
    })
}
// 为权限分组赋值

function setRoleSelect(param)
{
    let res = `<option value="1">全部</option>`;
    for (var i = 0; i < param.length; i++) {

        res+=addSelectToBox(param[i],i)
    }
    return res;
}
function addSelectToBox(param,num)
{
    let val_num = num+2;
    var res = `<option value="${val_num}" data-role="${param.roleId}">${param.roleName}</option>`
    return res;
}

/*消息弹出框*/

function modalalert(msg) {
    $.Huimodalalert(msg, 3000);
}

/**
 * 是否推动的checkbox点击事件处理
 */
window.onClickHander = function(obj) {
    if (obj.checked) {
        $("#notify_content").show();
        $("#push_time_div").show();

        isPushed = 1;
    } else {
        $("#notify_content").hide();
        $("#push_time_div").hide();
        notifyContent = "";
        notifyTime = "";
        isPushed = 0;
    }
}

/*格式化时间*/

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var second = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (second >= 0 && second <= 9) {
        second = "0" + second;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + hours + seperator2 + minutes +
        seperator2 + second;
    return currentdate;
}

$('#addSubmit').click(function() { addActivitySubmit(); })

function addActivitySubmit() {
    var activity_title = $('#activity_title').val();
    var activity_introduce = $('#activity_introduce').val();
    var activity_place = $('#activity_place').val();
    var enrol_currency = $('#enrol_currency').val();
    var money_number = $('#money_number').val();
    var activity_number_people = $('#activity_number_people').val();
    var activity_start_time = $('#activity_start_time').val();
    var activity_end_time = $('#activity_end_time').val();
    var enrol_start_time = $('#enrol_start_time').val();
    var enrol_end_time = $('#enrol_end_time').val();
    var activity_content = $('div#activity_content').froalaEditor('html.get');
    var s = activity_content.replace(/style\s*=(['\"\s]?)[^'\"]*?\1/gi, '');
    var s = s.replace(/width\s*:(['\"\s]?)[^'\"]*?\1/gi, '');

    var activity_CreateTime = getNowFormatDate();
    if (activity_title == "") {
        $("#Tip").html("活动标题必填");
    } else if (document.getElementById("titlePic").value == "") {
        $("#Tip").html("请上传正确格式的标题图片");
    } else if (document.getElementById("coverPic").value == "") {
        $("#Tip").html("请上传正确格式的封面图片");
    } else if (activity_introduce == "") {
        $('#activity_introduce').val('无');
    } else if (activity_place == "") {
        $("#Tip").html("活动地点必填");
    } else if (enrol_currency == "") {
        $("#Tip").html("获取类型必填");
    } else if (activity_number_people == "") {
        $("#Tip").html("人数上限必填");
    } else if (activity_start_time == "" || activity_end_time == "") {
        $("#Tip").html("开始时间必填");
    } else if (enrol_start_time == "" || enrol_end_time == "") {
        $("#Tip").html("报名时间必填");
    } else {
        var list = '{"activityTitle":' + activity_title + ',"activityPlace":' + '"' + activity_place + '"' + ',"enrolCurrency":' + '"' + enrol_currency + '"' + ',"activityNumberPeople":' + activity_number_people +
            ',"activityStartTime":' + '"' + activity_start_time + '"' +
            ',"activityEndTime":' + '"' + activity_end_time + '"' + ',"enrolStartTime":' + '"' + enrol_start_time + '"' + ',"enrolEndTime":' + '"' + enrol_end_time + '"' + ',"activityContent":' + '"' + activity_content + '"' + '}';

        if(isPushed ==1){
                 notifyContent = $("#notify_content").val();
                 notifyTime = $("#push_time").val();
            }
        var formData = new FormData();
        formData.append("activityTitle", activity_title);
        formData.append("activityIntroduce", activity_introduce);
        formData.append("activityPlace", activity_place);
        formData.append("enrolCurrency", enrol_currency);
        formData.append("enrolCurrencySum", money_number);
        formData.append("activityNumberPeople", activity_number_people);
        formData.append("activityStartTime", activity_start_time);
        formData.append("activityEndTime", activity_end_time);
        formData.append("enrolStartTime", enrol_start_time);
        formData.append("enrolEndTime", enrol_end_time);
        formData.append("activityContent", s);
        formData.append("activityCreateTime", activity_CreateTime);
        formData.append("sponsorName", _utils.sponserName);
        formData.append("title", document.getElementById("titlePic").files[0]);
        formData.append("cover", document.getElementById("coverPic").files[0]);

        //活动推送的参数
        formData.append("isPushed", isPushed);
        formData.append("notifyContent", notifyContent);
        formData.append("notifyTime", notifyTime);
        $.ajax({
            url: config.basePath + "activity/add",
            type: "POST",
            dataType: "json",
            processData: false,
            contentType: false,
            data: formData,
            success: function(result) {
                if (result.code == _encode.REQUEST_SUCCESS) {
                    modalalert("已成功添加活动");
                    //$("#addActivityDia").modal("hide");
                    setTimeout(backToList, 1000);

                } else {
                    alert("添加失败，请联系服务器");

                }
            },
            error: function(a, b, c) {
                alert(a.status);
            }
        });

    }
}

/**
 * 做延迟1s返回列表
 */
function backToList() {
    window.history.back();
}