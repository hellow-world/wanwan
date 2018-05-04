/*
 * @Author: admin
 * @Date:   2018-02-05 10:02:49
 * @Last Modified by:   admin
 * @Last Modified time: 2018-05-04 15:51:50
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
var roleSingleEdit;
var editInformationId;
var roleConfigId; //暂存权限设置ID
var roleConfigIndex; //暂存权限OF大数据的索引
var isEdit = false;
roleSingle = {

    'roleId': 0, //角色ID
    'publishStartTime': '', //报名开始时间
    'isPush': 0, //是否推送
    'pushContent': '',
    'pushTime': '',
    'roleName': ''
}
$(function() {
    $('#information_content').froalaEditor({
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
    //selSellerList();
    let infoId = _utils.getUrlParam('infoId')
    editInformationId = infoId;
    if (infoId !== null) {
        $('#addSubmit').hide();
        $('#editSubmit').show();
        selActivityDetail(infoId);
        isEdit = true;
    } else {

        $('#editSubmit').hide();
        $('#addSubmit').show();
        isEdit = false;
    }

});
// 编辑-查询活动详情
var selActivityDetail = (id) => {
    $.ajax({
        url: config.buildPath + 'api-amuse/v1.1/activity/detail',
        type: 'GET',
        dataType: 'json',
        headers: { 'token': config.token },
        data: {
            activityId: editActivityId
        },
        success: (res) => {
            console.log(res)
            if (res.code !== _encode.REQUEST_SUCCESS) {
                alert(res.msg)
            } else {
                let message = res.result;
                setValueToInput(message);
            }
        },
        error: (a, b, c) => {
            alert(a.status)
        }
    })
}
//编辑-给编辑框赋值
var setValueToInput = (param) => {
    $('#activity_title').val(param.activityTitle);
    selectSellerValue(param.activityIssuer);
    setRoleConfig(param.roleConfig);
    $('#activity_start_time').val(StartTime);
    $('#activity_end_time').val(EndTime);
    $('#activity_online_time').val(onlinTime);
    if (param.isOnline == 1) {
        $('input[name=isOnline].addOn').attr('checked', true)
    } else {
        $('input[name=isOnline].addOff').attr('checked', true)
    }
    $('#titlePicForm').find('#titlePicContainer').html(`<img src="${param.activityTitlePhoto}">`)
    $('#coverPicContainer').html(`<img src="${param.activityCover}">`)
    $('#activity_content').froalaEditor('html.set', param.activityContent);
}
//编辑-权限分组赋值
var setRoleConfig = (arr) => {
    roleConfig = [];
    roleConfig = arr;
    let label = $('.powerBlock');
    $(label).find('label').removeClass('powerOn');
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < label.length; j++) {
            let id = $(label[j]).find('label').attr('data-role');

            if (arr[i].roleId == id) {
                console.log($(label[j]).find('label'))
                $(label[j]).find('label').addClass('powerOn');
                roleConfig[i].roleName = $(label[j]).find('label .powerName').text();
                $(label[j]).find('label .powerSet').html('已设置')
                $(label[j]).find('label .powerSet').removeAttr('onclick')
                $(label[j]).find('label .powerEdit').show();
            }
        }
    }
}
//发布商家赋值
var selectSellerValue = (param) => {
    //活动发布者---------------------------------------------------------------待代码方法优化
    let arr = $('.sellerUser').find('option')
    let sellerId = new Array();
    for (var i = 0; i < arr.length; i++) {
        sellerId.push($(arr[i]).attr('data-seller'))
    }
    var index = sellerId.indexOf(String(param))
    $('.sellerUser').find('option').eq(index).attr('selected', 'selected')
}

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
    let res = `<li class="powerBlock"><label class="powerOn" data-role="-1"><span class="powerName" onclick="selectPowerUser(this)">全部</span><span class="powerSet" onclick="setPowerUser(this)">设置</span><span class="powerEdit" onclick="editPowerUser(this)">编辑</span></label></li>`;
    for (var i = 0; i < param.length; i++) {

        res += addSelectToBox(param[i])

    }
    return res;
}

function addSelectToBox(param) {
    let res = `<li class="powerBlock"><label data-role="${param.roleId}"><span class="powerName" onclick="selectPowerUser(this)">${param.roleName}</span><span class="powerSet" onclick="setPowerUser(this)">设置</span><span class="powerEdit" onclick="editPowerUser(this)">编辑</span></label></li>`
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

//添加资讯提交
$('#addSubmit').click(function() { addInfoSubmit(); })
// 编辑资讯提交
$('#editSubmit').click(function() { editInfoSubmit(); })

//添加资讯数据传送
function addInfoSubmit() {

    var information_title = $('#information_title').val();
    var Issuer = $('.sellerUser').find('option:selected').attr('data-seller')
    var information_content = $('div#information_content').froalaEditor('html.get');
    var s = information_content.replace(/style\s*=(['\"\s]?)[^'\"]*?\1/gi, '');
    var s = s.replace(/width\s*:(['\"\s]?)[^'\"]*?\1/gi, '');

    if (information_title == "") {
        $("#Tip").html("活动名称必填");
    } else if (document.getElementById("titlePic").value == "") {
        $("#Tip").html("请上传正确格式的标题图片");
    } else if (document.getElementById("coverPic").value == "") {
        $("#Tip").html("请上传正确格式的封面图片");
    } else if (Issuer == -1) {
        $("#Tip").html("资讯发布者必选");
    } else if (roleConfig.length < 1) {
        $("#Tip").html("权限分组未设置");
    } else {

        var formData = new FormData();
        formData.append("title", information_title); //资讯标题
        formData.append("content", s); //资讯内容
        formData.append("titleImage", document.getElementById("titlePic").files[0]); //资讯标题图片
        formData.append("contentImage", document.getElementById("coverPic").files[0]); //资讯封面图
        // formData.append("publisher", config.sponsorName) //资讯发布者
        //角色配置
        formData.append("roleConfig", JSON.stringify(roleConfig)); //资讯权限角色配置

        $.ajax({
            url: config.buildPath + "api-integral/v1.0/information",
            type: "POST",
            dataType: "json",
            processData: false,
            contentType: false,
            headers: { "token": config.token },
            data: formData,
            success: function(res) {
                console.log(res);
                if (res.code == _encode.REQUEST_SUCCESS) {
                    modalalert("已成功添加资讯");
                    setTimeout(backToList, 1000);

                } else {
                    alert(res.msg);

                }
            },
            error: function(a, b, c) {
                alert(a.status);
            }
        });
    }

}
//编辑活动数据传送
var editActivitySubmit = () => {
    var activity_title = $('#activity_title').val();
    var activity_introduce = $('#activity_introduce').val();
    var activity_place = $('#activity_place').val();
    var Issuer = $('.sellerUser').find('option:selected').attr('data-seller')
    var activity_maxnum_people = $('#activity_maxnum_people').val();
    var activity_start_time = $('#activity_start_time').val();
    var activity_end_time = $('#activity_end_time').val();
    var isonline = $('input[name=isOnline]:checked').val();
    var activity_online_time = $('#activity_online_time').val();
    var activity_content = $('div#activity_content').froalaEditor('html.get');
    var s = activity_content.replace(/style\s*=(['\"\s]?)[^'\"]*?\1/gi, '');
    var s = s.replace(/width\s*:(['\"\s]?)[^'\"]*?\1/gi, '');
    var activity_CreateTime = _utils.getNowFormatDate();
    if (activity_title == "") {
        $("#Tip").html("活动名称必填");
    } else if (activity_introduce == "") {
        $('#activity_introduce').val('无');
    } else if (activity_place == "") {
        $("#Tip").html("活动地点必填");
    } else if (activity_number_people == "") {
        $("#Tip").html("总人数上限必填");
    } else if (activity_start_time == "" || activity_end_time == "") {
        $("#Tip").html("开始时间必填");
    } else if (Issuer == -1) {
        $("#Tip").html("发布商家必选");
    } else if (roleConfig.length < 1) {
        $("#Tip").html("权限分组未设置");
    } else {

        var formData = new FormData();
        formData.append("activityId", editActivityId) //活动ID
        formData.append("activityTitle", activity_title); //活动标题
        formData.append("activityIntroduce", activity_introduce); //活动简介
        formData.append("activityPlace", activity_place); //活动地点
        formData.append("activityContent", s); //活动内容
        if (document.getElementById("titlePic").value !== "") {
            formData.append("activityTitlePhoto", document.getElementById("titlePic").files[0]); //活动标题图片
        } else if (document.getElementById("coverPic").value !== "") {
            formData.append("activityCover", document.getElementById("coverPic").files[0]); //活动封面图片
        }
        formData.append("activityMaxPeople", activity_maxnum_people); //活动最大人数限制
        formData.append("activityStartTime", activity_start_time); //活动开始时间
        formData.append("activityEndTime", activity_end_time); //活动结束时间

        if (activity_online_time == "") {
            formData.append("activityOnlineTime", activity_CreateTime); //活动上架时间
        } else {
            formData.append("activityOnlineTime", activity_online_time); //活动上架时间
        }

        formData.append("activityIssuer", Issuer) //活动发布者


        formData.append("isOnline", isonline); //活动是否上架
        //角色配置
        formData.append("roleConfig", JSON.stringify(roleConfig)); //活动权限角色配置

        $.ajax({
            url: config.buildPath + "api-amuse/v1.1/activity/update",
            type: "POST",
            dataType: "json",
            processData: false,
            contentType: false,
            headers: { "token": config.token },
            data: formData,
            success: function(result) {
                if (result.code == _encode.REQUEST_SUCCESS) {
                    modalalert("已成功编辑活动");
                    //$("#addActivityDia").modal("hide");
                    setTimeout(backToList, 1000);

                } else {
                    alert("编辑失败，请联系服务器");

                }
            },
            error: function(a, b, c) {
                console.log(a);
            }
        });
    }
}

/**
 * 做延迟1s返回列表
 */
function backToList() {
    window.history.go(-1);
}

// 1.3.2
// 权限选择切换
window.selectPowerUser = (obj) => {
    if (isEdit) {
        layer.msg('编辑状态无法切换分组', { time: 800 });
        return;
    }
    let roleId = $(obj).parent('label').attr('data-role');
    if ($(obj).parent('label').hasClass('powerOn')) {
        console.log(roleConfig.length)
        //当权限配置池为空，直接切换
        if (roleConfig.length < 1) {
            console.log('配置池为空')
            $(obj).parent('label').removeClass('powerOn');
            $(obj).siblings('.powerEdit').hide();
            $(obj).siblings('.powerSet').text('设置')
            $(obj).siblings('.powerSet').attr('onclick', 'setPowerUser(this)')
            return;
        }
        // 如果已经在序列就清空该权限的设置
        if (PowerIsSet(roleId)[0]) {
            console.log('当前序列已在')
            layer.open({
                title: '提醒',
                shade: 0,
                content: '当前权限已设置，继续则会清空设置',
                yes: function(index) {

                    roleConfig.splice(PowerIsSet(roleId)[1]);
                    _utils.modalTip('该权限设置已清空', 500);
                    $(obj).parent('label').removeClass('powerOn');
                    $(obj).siblings('.powerEdit').hide();
                    $(obj).siblings('.powerSet').text('设置')
                    $(obj).siblings('.powerSet').attr('onclick', 'setPowerUser(this)')
                    layer.close(index);
                    console.log(roleConfig);
                }
            })

            return;
        }


    }
    if (roleId == -1) {
        layer.open({
            title: '提醒',
            shade: 0,
            content: '即将清空其余设置，请检查',
            yes: function(index) {
                $('.powerBlock').find('label').removeClass('powerOn');
                $(obj).parent('label').addClass('powerOn');
                roleConfig = [];
                $('.powerBlock').find('label .powerEdit').hide();
                $('.powerBlock').find('label .powerSet').text('设置');
                layer.close(index);
            }
        })

    } else if (roleId !== -1) {
        //权限为全部-1
        let id = $('.powerBlock').find('label').eq(0).attr('data-role')
        //当权限设置为空时，直接让全部设置为
        if (roleConfig.length < 1) {
            $('.powerBlock').find('label').eq(0).removeClass('powerOn');
            $('.powerBlock').find('label').eq(0).find('.powerEdit').hide();
            $('.powerBlock').find('label').eq(0).find('.powerSet').text('设置');
            $('.powerBlock').find('label').eq(0).find('.powerSet').attr('onclick', 'setPowerUser(this)');
            $(obj).parent('label').addClass('powerOn');
            return;
        }
        if (PowerIsSet(id)[0]) {
            layer.open({
                title: '提醒',
                shade: 0,
                content: '当前权限已设置，继续则会清空设置',
                yes: function(index) {
                    roleConfig.splice(PowerIsSet(id)[1]);
                    _utils.modalTip('全部权限已清空', 500);
                    $('.powerBlock').find('label').eq(0).removeClass('powerOn');
                    $('.powerBlock').find('label').eq(0).find('.powerEdit').hide();
                    $('.powerBlock').find('label').eq(0).find('.powerSet').text('设置');
                    $('.powerBlock').find('label').eq(0).find('.powerSet').attr('onclick', 'setPowerUser(this)');
                    $(obj).parent('label').addClass('powerOn');
                    layer.close(index);
                }
            })
        } else {
            $('.powerBlock').find('label').eq(0).removeClass('powerOn');
            $('.powerBlock').find('label').eq(0).find('.powerEdit').hide();
            $('.powerBlock').find('label').eq(0).find('.powerSet').text('设置');
            $('.powerBlock').find('label').eq(0).find('.powerSet').attr('onclick', 'setPowerUser(this)');
            $(obj).parent('label').addClass('powerOn');
        }

    }

}
// 确定要清空
var PowerResetconfirm = (bool) => {
    if (bool == 1) {
        return true;
    }
}
//判断权限设置切换选择时是否已在序列
var PowerIsSet = (powerid) => {
    'use strict'
    let idArr = new Array();
    for (var roleId in roleConfig) {
        idArr.push(roleConfig[roleId])

    }
    console.log(idArr)
    for (var i = 0; i < idArr.length; i++) {
        if (powerid == idArr[i].roleId) {

            return [true, i]
        } else {
            console.log('不存在')
            return [false, i]
        }
    }

}
//设置权限
window.setPowerUser = (obj) => {

    if (!$(obj).parent('label').hasClass('powerOn')) {
        _utils.modalTip('权限未选择无法设置', 500)
        return;
    }
    roleSingleInit();
    let powerName = $(obj).siblings('.powerName').text();
    let powerId = $(obj).parent('label').attr('data-role');

    $('#addSetPower').modal('show');
    $('#addSetPower').find('#power-input-name').val(powerName);
    $('#addSetPower').find('#power-input-name').attr('data-roleid', powerId);

}
//编辑权限
window.editPowerUser = (obj) => {
    roleSingleInit();
    let powerId = $(obj).parent('label').attr('data-role');
    let powerName = $(obj).siblings('.powerName').text();
    console.log(roleConfig);
    for (var i = 0; i < roleConfig.length; i++) {
        if (roleConfig[i].roleId == powerId) {
            $('#addSetPower').modal('show');
            setValueToEditPower(roleConfig[i], powerName, i)
        }
    }
}
var setValueToEditPower = (param, name, index) => {
    roleConfigId = param.id
    roleConfigIndex = index;
    $('#addSetPower').find('#power-input-name').val(name);
    $('#addSetPower').find('#power-input-name').attr('data-roleid', param.roleId);
    if (isEdit) {
        $('#addSetPower').find('#is_pushed').parent('div.row').hide();
        $('#addSetPower').find('#push_time_div').hide();

        $('#addSetPower').find('#enrol_currency').attr('disabled', true)
    }
    $('#addSetPower').find('#publish_start_time').val(_utils.formatDate(param.enrolStartTime));
}
//设置权限存入暂存数列
window.setPowerSubmit = () => {
    //不是编辑的话
    if (!isEdit) {
        console.log('添加')
        if ($('#addSetPower').find('#enrol_start_time').val() == '') {
            _utils.modalalert('发布时间未填写')
            return;
        }
        roleSingle.roleId = $('#addSetPower').find('#power-input-name').attr('data-roleid');
        roleSingle.roleName = $('#addSetPower').find('#power-input-name').val();
        roleSingle.publishStartTime = $('#addSetPower').find('#publish_start_time').val();
        if (isPushed == 1) {

            notifyContent = $('#addSetPower').find("#notify_content").val();
            notifyTime = $('#addSetPower').find("#push_time").val();
            console.log(notifyTime)
        }
        roleSingle.isPush = isPushed;
        roleSingle.pushContent = notifyContent;
        roleSingle.pushTime = notifyTime;
        roleConfig.push(roleSingle);

    }
    //是编辑的话
    else {
        console.log('编辑')
        if ($('#addSetPower').find('#publish_start_time').val() == '') {
            _utils.modalalert('发布时间未填写')
            return;
        }
        roleConfig[roleConfigIndex].publishStartTime = $('#addSetPower').find('#publish_start_time').val();

    }


    let roleId = $('#addSetPower').find('#power-input-name').attr('data-roleid');
    // let json = JSON.stringify(roleSingle)
    console.log(roleConfig)
    _utils.modalTip('设置成功', 1000)
    $('#addSetPower').modal('hide');
    tabSetState(roleId);

}
//切换权限已设置与未设置状态
var tabSetState = (id) => {
    let role = $('.powerBox').find('li')
    for (var i = 0; i < role.length; i++) {
        if ($(role[i]).find('label').attr('data-role') == id) {
            $(role[i]).find('.powerSet').text('已设置')
            $(role[i]).find('.powerSet').removeAttr('onclick')
            $(role[i]).find('.powerEdit').show();
        }

    }

}
//初始化权限设置序列
var roleSingleInit = () => {
    roleSingle = {
        'roleId': 0, //角色ID
        'publishStartTime': '', //发布开始时间
        'isPush': 0, //是否推送
        'pushContent': '',
        'pushTime': '',
        'roleName': ''

    }
    $('#addSetPower').find('#is_pushed').attr('checked', 'checked')
    $('#addSetPower').find('#power-input-name').val('');
    $('#addSetPower').find('#publish_start_time').val('');
    $('#addSetPower').find("#notify_content").val('');
    $('#addSetPower').find("#push_time").val('');
}

// 暂定不删
// 选择资讯类型时判断
// $('select.infoType').change(function() {

//     let value = $(this).find('option:selected').val();
//     $('#infoContentDis').hide();
//     $('#powerUserDis').show();
//     //选择业主通知时权限消失
//     if (value == 2) {
//         $('#powerUserDis').hide();
//     } else if (value == 3) {
//         $('#infoContentDis').show();
//     }
// })
// window.btnAddContent = () => {
//     $('#modal-infoContent').modal('show');
// }