/*
 * @Author: admin
 * @Date:   2018-03-30 10:45:50
 * @Last Modified by:   admin
 * @Last Modified time: 2018-04-17 11:21:07
 */
var _config = require('service/config.js')
var _utils = require('util/utils.js')
var _encode = require('service/errorcode.js')
var pageNum = 1; //页码
var pageSize = 10; //单页查询数量

var publicRoleId; //公用的定义ID
var repeatKey;
var telephoneMsg;

$(function() {

    publicRoleId = _utils.getParams('roleId');
    selUsers();
})

// 查询用户
function selUsers() {
    $.ajax({
        url: _config.buildPath + 'api-user/v1.0/role/user',
        type: 'GET',
        dataType: 'json',
        headers: { "token": _config.token },
        data: {
            roleId: publicRoleId,
            page: pageNum,
            pageSize: pageSize
        },
        success: function(res) {
            console.log(res);
            if (res.code !== _encode.REQUEST_SUCCESS) {
                alert(res.msg)
            } else {
                var message = res.result;
                $('#roleTbody').empty();
                $('#roleTbody').append(setUsersValue(message));
            }
        },
        error: function(a, b, c) {
            alert(a.status)
        }
    })
}

function setUsersValue(param) {
    let res = "";
    for (var i = 0; i < param.length; i++) {
        res += addToTable(param[i])
    }
    return res;
}

function addToTable(param) {
    let res = `<tr class="text-c">`;
    res += `<td><input type="checkbox"></td>`;
    res += `<td>${param.uid}</td>`;
    res += `<td>${param.nickname}</td>`;
    res += `<td>${param.telephone}</td>`;
    res += `<td>${param.roleName}</td>`;
    res += handleHtml();
    return res + `</tr>`;
}
// 操作栏
function handleHtml() {
    let res = `<td>`;
    res += `<a title="编辑" href="javascript:void(0);" class="ml-5" onclick="userEdit(this)"><i class="Hui-iconfont">&#xe6df;</i></a>
            <a title="删除" href="javascript:void(0);" class="ml-5" onclick="userDel(this)"><i class="Hui-iconfont">&#xe6e2;</i></a>`
    return res + '</td>'
}
// 用户编辑
window.userEdit = (obj) => {
    telephoneMsg = $(obj).parent('td').siblings().eq(3).text();
    $('#edit-modal').modal('show');
    $.ajax({
        url: _config.buildPath + 'api-user/v1.0/role',
        type: 'GET',
        dataType: 'json',
        headers: { 'token': _config.token },
        success: (res) => {
            console.log(res);
            if (res.code !== _encode.REQUEST_SUCCESS) {
                alert(res.msg);
            } else {

                let message = res.result;
                $('#role_type').empty();
                $('#role_type').append(setRoleValue(message));
            }
        }
    })

}

var setRoleValue = (param) => {
    let res = `<option value="0" selected>权限分组</option>`;
    for (var i = 0; i < param.length; i++) {

        res += `<option data-id=${param[i].roleId}>${param[i].roleName}</option>`
    }
    return res;
}
//确认编辑用户
window.editConfirm = () => {
    let id = $('#role_type').find('option:selected').attr('data-id')
    $.ajax({
        url: _config.buildPath + 'api-user/v1.0/role/user/update',
        type: 'POST',
        dataType: 'json',
        headers: { 'token': _config.token },
        data: {
            roleId: id,
            telephone: telephoneMsg
        },
        success: (res) => {
            if (res.code !== _encode.REQUEST_SUCCESS) {
                alert(res.msg);
            } else {
                _utils.modalTip('编辑成功', 1000);
                setTimeout("window.location.reload()", 1000)
            }
        }
    })
}
// 用户删除
window.userDel = (obj) => {
    let telephone = $(obj).parent('td').siblings().eq(3).text();
    console.log(telephone)
    $.ajax({
        url: _config.buildPath + 'api-user/v1.0/role/user/delete',
        type: 'POST',
        dataType: 'json',
        data: {
            telephone: telephone
        },
        headers: { "token": _config.token },
        success: (res) => {
            if (res.code !== _encode.REQUEST_SUCCESS) {
                alert(res.msg)
            } else {
                _utils.modalTip('用户删除成功', 1000);
                setTimeout("window.location.reload()", 1000)
            }
        },
        error: (a, b, c) => {
            alert(a.status);
        }
    })
}
// 新增用户
window.addUsers = function() {
    document.getElementById("users_file").value = '';
    $("#telephone").css("background-color", 'transparent');
    $('#telephone').removeAttr("disabled");

    $('#addUsersModal').find('.modal-title').html('新增用户')
    $('#addUsersModal').find('.btnRole').val('提交添加')
    $('#telephone').val('');
    $('#addUsersModal').modal('show');
}
// 提交添加用户
window.addUsersSubmit = function() {
    let tel = $('#telephone').val();
    if (tel == '' && _utils.utils_isNull(convertJSON(dataMsg))) {
        _utils.modalTip('请输入用户手机号');
        return;
    } else if (!_utils.utils_isNull(convertJSON(dataMsg))) {

        tel = '';
        for (var i = 0; i < convertJSON(dataMsg).length; i++) {
            let tel_num = convertJSON(dataMsg)[i].telephone;
            if (i == convertJSON(dataMsg).length - 1) {
                tel += tel_num;
            } else {
                tel += tel_num + ',';
            }


        }

        console.log(tel);
    }
    $.ajax({
        url: _config.buildPath + 'api-user/v1.0/role/user',
        type: 'POST',
        datatype: 'json',
        headers: { "token": _config.token },
        data: {
            roleId: publicRoleId,
            telephone: tel
        },
        success: function(res) {
            if (res.code !== _encode.REQUEST_SUCCESS) {
                if (res.code == 10) {
                    let repeattion_message = res.msg;
                    repeatKey = res.result;
                    handleRepeat();
                    $('#selRolebody').empty();
                    $('#selRolebody').append(selRepeatValue(repeattion_message))
                    return;
                }
                alert(res.msg)
            } else {
                _utils.modalTip('添加用户成功');
                setTimeout(closeModal, 1000)
            }

        },
        error: function(a, b, c) {
            alert(a.status)
        }
    })

}
var handleRepeat = () => {
    $('#repeat-modal').modal('show');
}
window.mergeConfirm = () => {
    $.ajax({
        url: _config.buildPath + 'api-user/v1.0/role/user/back',
        type: 'POST',
        headers: { 'token': _config.token },
        dataType: 'json',
        data: {
            key: repeatKey
        },
        success: (res) => {
            console.log(res)
            if (res.code !== _encode.REQUEST_SUCCESS) {
                alert(res.msg)
            } else if (res.code == _encode.REQUEST_SUCCESS) {
                _utils.modalTip('成功修改用户权限分组', 1000)
                setTimeout("window.location.reload()", 1000)
            }
        },
        error: (a, b, c) => {
            alert(a.status)
        }
    })
}

function selRepeatValue(param) {
    let jay = JSON.parse(param);
    let tel = [];
    let repeatRole;
    for (key in jay) {
        repeatRole = key;
        tel = jay[key]
    }
    let res = ``;
    for (var i = 0; i < tel.length; i++) {
        res += `<tr class="text-c"><td>${repeatRole}</td>`
        res += `<td>${tel[i]}</td></tr>`;
    }
    return res;
}

function closeModal() {
    $('#telephone').val('');
    $('#addUsersModal').modal('hide');
    window.location.reload();
}
//取消Excel上传
window.cancelExcel = () => {
    document.getElementById("users_file").value = '';
    $("#telephone").css("background-color", 'transparent');
    $("#telephone").attr("disabled", false);
    dataMsg = null;
}
var wb; //读取完成的数据
var rABS = false; //是否将文件读取为二进制字符串
var dataMsg = "";
window.importf = (obj) => { //导入
    if (!obj.files) {
        return;
    }
    var f = obj.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result;
        if (rABS) {
            wb = XLSX.read(btoa(fixdata(data)), { //手动转化
                type: 'base64'
            });
        } else {
            wb = XLSX.read(data, {
                type: 'binary'
            });
        }
        //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        //wb.Sheets[Sheet名]获取第一个Sheet的数据
        //document.getElementById("demo").innerHTML= JSON.stringify( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) );
        //console.log(JSON.stringify( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) ));
        dataMsg = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        if (!_utils.utils_isNull(dataMsg)) {
            $("#telephone").attr("disabled", true);
            $("#telephone").css("background-color", '#ccc');
        }
        console.log(dataMsg);
        console.log(convertJSON(dataMsg));
        //console.log(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
    };
    if (rABS) {
        reader.readAsArrayBuffer(f);
    } else {
        reader.readAsBinaryString(f);
    }
}

function fixdata(data) { //文件流转BinaryString
    var o = "",
        l = 0,
        w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
}

/**
 * 文件数据组装
 * @param data
 * @returns {Array}
 */
function convertJSON() {
    var jsonD = {};
    var jsonA = [];
    if (arguments.length == 1) {
        for (var i = 0; i < arguments[0].length; i++) {
            var index = 0;
            jsonD = {};
            for (key in arguments[0][i]) {
                if (index == 0) {
                    jsonD["telephone"] = arguments[0][i][key];
                }
                if (index == 1) {
                    jsonD["num"] = arguments[0][i][key];
                }
                index += 1;
            }
            jsonA[i] = jsonD;
        }
    } else if (arguments.length == 2) {
        if (_utils.utils_isNull(arguments[0], arguments[1])) {

            alert("请正确填写参数");
            return null;
        }
        jsonD["telephone"] = arguments[0];
        jsonD["num"] = arguments[1];
        jsonA[0] = jsonD;
    } else {
        alert("确定是正确的姿势操作？？");
    }
    return jsonA;
}
// 导出成excel
window.importToExcel = () => {
    // return ExcellentExport.excel(this, 'repeatTable', 'Sheet Name Here');
    //return ExcellentExport.convert({ anchor: this, filename: 'data_123.array', format: 'xlsx'},[{name: 'Sheet Name Here 1', from: {table: 'repeatTable'}}]);
    $('.table2excel').table2excel({
        name: "Excel Document Name",
        filename: "repeatList",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true
    })


}