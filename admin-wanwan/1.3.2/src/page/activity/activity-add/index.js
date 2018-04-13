/*
 * @Author: admin
 * @Date:   2018-02-05 10:02:49
 * @Last Modified by:   John
 * @Last Modified time: 2018-04-13 11:45:46
 */
require('./index.css')
var config = require('service/config.js')
var _encode = require('service/errorcode.js')
var _utils = require('util/utils.js')
var isPushed = 1; //是否推送，推送为1，不推送为0
var notifyContent = ""; //推送内容
var notifyTime = ""; //推送时间
var roleList //角色列表
var roleList_temp
var roleConfig = new Array(); //单个角色配置
var roleSingle;
roleSingle = {

    'roleId'          : 0, //角色ID
    'enrolStartTime'  : '2018-12-20', //报名开始时间
    'enrolEndTime'    : '2018-12-20', //报名结束时间
    'carryNumber'     : 0, //可携带人数
    'enrolCurrency'   : 1, //支付方式
    'enrolCurrencyNum': 100,
    'enrolMaxPeople'  : 10, //报名最大人数
    'isPush'          : 0, //是否推送
    'pushContent'     : '推送推送推送他',
    'pushTime'        : '2018-12-20',
    'roleName'        : '随国林'
}
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
    // 查询商家
    selSellerList();

});

function selSellerList() {
    $.ajax({
        url: config.buildPath + 'api-amuse/v1.1/activity/issuer',
        type: 'GET',
        dataType: 'json',
        headers: { "token": config.token },
        success: function(res) {
            if (res.code !== _encode.REQUEST_SUCCESS) {
                alert(res.msg)
            } else {
                var message = res.result;
                $('.sellerUser').empty();
                $('.sellerUser').append(setSellerSelect(message));
            }
        },
        error: function(a, b, c) {
            alert(a.status)
        }
    })
}

function selRoleList() {
    $.ajax({
        url: config.buildPath + 'api-user/v1.0/role',
        type: 'GET',
        dataType: 'json',
        headers: { "token": config.token },
        success: function(res) {
            if (res.code !== _encode.REQUEST_SUCCESS) {
                alert(res.msg)
            } else {
                var message = res.result;
                $('.powerBox').empty();
                $('.powerBox').append(setRoleSelect(message));
            }
        },
        error: function(a, b, c) {
            alert(a.status)
        }
    })
}
// 为权限分组赋值

function setRoleSelect(param) {
    let res = `<li class="powerBlock"><label class="powerOn" data-role="-1"><span class="powerName" onclick="selectPowerUser(this)">全部</span><span class="powerSet" onclick="setPowerUser(this)">设置</span></label></li>`;
    for (var i = 0; i < param.length; i++) {

        res += addSelectToBox(param[i])

    }
    return res;
}

function addSelectToBox(param) {
    let res = `<li class="powerBlock"><label data-role="${param.roleId}"><span class="powerName" onclick="selectPowerUser(this)">${param.roleName}</span><span class="powerSet" onclick="setPowerUser(this)">设置</span></label></li>`
    return res;
}
// 为商家分组赋值

function setSellerSelect(param) {
    let res = `<option value="1" data-seller="-1">请选择活动发布者</option>`;
    for (var i = 0; i < param.length; i++) {

        res += addSelectToBoxSeller(param[i], i)

    }
    return res;
}

function addSelectToBoxSeller(param, num) {
    let val_num = num + 2;
    var res = `<option value="${val_num}" data-seller="${param.issuerId}">${param.issuerName}</option>`
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
    var activity_title         = $('#activity_title').val();
    var activity_introduce     = $('#activity_introduce').val();
    var activity_place         = $('#activity_place').val();
    var Issuer                 = $('.sellerUser').find('option:selected').attr('data-seller')
    var activity_maxnum_people = $('#activity_maxnum_people').val();
    var activity_start_time    = $('#activity_start_time').val();
    var activity_end_time      = $('#activity_end_time').val();
    var isonline               = $('input[name=isOnline]:checked').val();
    var activity_online_time   = $('#activity_online_time').val();
    var activity_content       = $('div#activity_content').froalaEditor('html.get');
    var s                      = activity_content.replace(/style\s*=(['\"\s]?)[^'\"]*?\1/gi, '');
    var s                      = s.replace(/width\s*:(['\"\s]?)[^'\"]*?\1/gi, '');

    var activity_CreateTime = getNowFormatDate();
    if (activity_title == "") {
        $("#Tip").html("活动名称必填");
    } else if (document.getElementById("titlePic").value == "") {
        $("#Tip").html("请上传正确格式的标题图片");
    } else if (document.getElementById("coverPic").value == "") {
        $("#Tip").html("请上传正确格式的封面图片");
    } else if (activity_introduce == "") {
        $('#activity_introduce').val('无');
    } else if (activity_place == "") {
        $("#Tip").html("活动地点必填");
    } else if (activity_number_people == "") {
        $("#Tip").html("总人数上限必填");
    } else if (activity_start_time == "" || activity_end_time == "") {
        $("#Tip").html("开始时间必填");
    } else if(Issuer == -1){   
        $("#Tip").html("发布商家必选");
    } else if(roleConfig.length < 1){   
        $("#Tip").html("权限分组未设置");
    } else {

        var formData = new FormData();
        formData.append("activityTitle", activity_title);//活动标题
        formData.append("activityIntroduce", activity_introduce);//活动简介
        formData.append("activityPlace", activity_place);//活动地点
        formData.append("activityContent", s);//活动内容
        formData.append("activityTitlePhoto", document.getElementById("titlePic").files[0]);//活动标题图片
        formData.append("activityCover", document.getElementById("coverPic").files[0]);//活动封面图片

        formData.append("activityMaxPeople", activity_maxnum_people);//活动最大人数限制
        formData.append("activityStartTime", activity_start_time);//活动开始时间
        formData.append("activityEndTime", activity_end_time);//活动结束时间
        
        if(activity_online_time == "")
        {
            formData.append("activityOnlineTime", activity_CreateTime);//活动上架时间
        }
        else
        {
            formData.append("activityOnlineTime", activity_online_time);//活动上架时间
        }
        
        formData.append("activityIssuer", Issuer)//活动发布者


        formData.append("isOnline", isonline);//活动是否上架
        //角色配置
        formData.append("roleConfig", JSON.stringify(roleConfig));//活动权限角色配置

        $.ajax({
            url: config.buildPath + "api-amuse/v1.1/activity",
            type: "POST",
            dataType: "json",
            processData: false,
            contentType: false,
            headers: { "token": config.token },
            data: formData,
            success: function(result) {
                console.log(result);
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

// 1.3.2
// 权限选择切换
window.selectPowerUser = (obj) => {
    let roleId = $(obj).parent('label').attr('data-role');
    if ($(obj).parent('label').hasClass('powerOn')) {
        if(PowerIsSet(roleId))
        {
            //清空该权限的设置

            _utils.modalalert('该权限设置已清空');
            $(obj).parent('label').removeClass('powerOn');
            $(obj).siblings('.powerSet').html('设置')
            return;
        }
        else
        {
            $(obj).parent('label').removeClass('powerOn');
            return;
        }
        
    }
    if (roleId == -1) {
        $('.powerBlock').find('label').removeClass('powerOn');
        $(obj).parent('label').addClass('powerOn');
    } else {
        $('.powerBlock').find('label').eq(0).removeClass('powerOn');
        $(obj).parent('label').addClass('powerOn');
    }

}
// 确定要清空
var PowerResetconfirm = (bool)=>
{
    if( bool == 1 )
    {
        return true;
    }
}
//判断权限设置切换选择时是否已在序列
var PowerIsSet = (id)=>
{
    for (var i = 0; i < roleConfig.length; i++) {
        if(id == roleConfig[i].roleId)
        {
            roleConfig.splice(i)
            return true;
        }
    }
}
//设置权限
window.setPowerUser = (obj) => {

    if (!$(obj).parent('label').hasClass('powerOn')) {
        _utils.modalalert('权限未选择无法设置', 1000)
        return;
    }
    roleSingleInit();
    let powerName = $(obj).siblings('.powerName').text();
    let powerId = $(obj).parent('label').attr('data-role');

    $('#addSetPower').modal('show');
    $('#addSetPower').find('#power-input-name').val(powerName);
    $('#addSetPower').find('#power-input-name').attr('data-roleid', powerId);


}
//设置权限存入暂存数列
window.setPowerSubmit = () => {
    if($('#addSetPower').find('#enrol_start_time').val() == '')
    {
        _utils.modalalert('报名时间未填写')
        return;
    }
    else if($('#addSetPower').find('#activity_carrynumber_people').val() == '')
    {
        _utils.modalalert('携带人数未填写')
        return;
    }
    else if($('#addSetPower').find('#enrol_currency').val() == -1)
    {
        _utils.modalalert('支付方式未选择')
        return;
    }
    else if($('#addSetPower').find('#money_number').val() == '')
    {
        _utils.modalalert('货币数量未填写')
        return;
    }
    else if($('#addSetPower').find('#activity_number_people').val() == '')
    {
        _utils.modalalert('人数上限未填写')
        return;
    }
    let roleId                  = $('#addSetPower').find('#power-input-name').attr('data-roleid');
    roleSingle.roleId           = $('#addSetPower').find('#power-input-name').attr('data-roleid');
    roleSingle.roleName         = $('#addSetPower').find('#power-input-name').val();
    roleSingle.enrolStartTime   = $('#addSetPower').find('#enrol_start_time').val();
    roleSingle.enrolEndTime     = $('#addSetPower').find('#enrol_end_time').val();
    roleSingle.carryNumber      = $('#addSetPower').find('#activity_carrynumber_people').val();
    roleSingle.enrolCurrency    = $('#addSetPower').find('#enrol_currency').val();
    roleSingle.enrolCurrencyNum = $('#addSetPower').find('#money_number').val();
    roleSingle.enrolMaxPeople   = $('#addSetPower').find('#activity_number_people').val();
    if (isPushed == 1) {
        notifyContent = $('#addSetPower').find("#notify_content").val();
        notifyTime = $('#addSetPower').find("#push_time").val();
    }
    roleSingle.isPush = isPushed;
    roleSingle.pushContent = notifyContent;
    roleSingle.pushTime = notifyTime;
    // let json = JSON.stringify(roleSingle)
    roleConfig.push(roleSingle);
    console.log(roleConfig)
    console.log(typeof roleConfig)
    _utils.modalalert('设置成功', 500)
    $('#addSetPower').modal('hide');
    tabSetState(roleId);

}
//切换权限已设置与未设置状态
var tabSetState = (id) => {
    let role = $('.powerBox').find('li')
    for (var i = 0; i < role.length; i++) {
        if ($(role[i]).find('label').attr('data-role') == id) {
            $(role[i]).find('.powerSet').text('已设置')
        }

    }

}
//初始化权限设置序列
var roleSingleInit = () => {
    roleSingle = {
        'roleId'          : 0, //角色ID
        'enrolStartTime'  : '2018-12-20', //报名开始时间
        'enrolEndTime'    : '2018-12-20', //报名结束时间
        'carryNumber'     : 0, //可携带人数
        'enrolCurrency'   : 1, //支付方式
        'enrolCurrencyNum': 100,
        'enrolMaxPeople'  : 10, //报名最大人数
        'isPush'          : 0, //是否推送
        'pushContent'     : '推送推送推送他',
        'pushTime'        : '2018-12-20',
        'roleName'        : '随国林'

    }
    $('#addSetPower').find('#power-input-name').val('');
    $('#addSetPower').find('#enrol_start_time').val('');
    $('#addSetPower').find('#enrol_end_time').val('');
    $('#addSetPower').find('#activity_carrynumber_people').val('');
    $('#addSetPower').find('#enrol_currency').val('');
    $('#addSetPower').find('#money_number').val('');
    $('#addSetPower').find('#activity_number_people').val('');
    $('#addSetPower').find("#notify_content").val('');
    $('#addSetPower').find("#push_time").val('');
}