require('./index.css')
var _utils = require('util/utils.js');
var _config = require('service/config.js');
var _encode = require('service/errorcode.js');

var pagenum = 1; //页码
var pagesize = 15; //一页行数
var isFirstSel = 0; //是否第一次查询 0不是 1是

var infoObject = new Array; //查询资质大体包
var roleConfig;
var roleConfigId;//权限组的ID
var roleSingle = {

    'roleId': 0, //角色ID
    'pushTime': '',
    'roleName': '',
    'id':0
}
var roleConfigIndex;
var infoEditId;
$(function() {

    $('#edit_infoContent').froalaEditor({
        theme: 'dark',
        imageUploadURL: _config.basePath + "uploadImgEditor",
        language: 'zh_cn',
        height: 200
    })
    selInformationList();
    // 查询权限分组
    selRoleList();
})
//搜索资讯数据
var selInformationList = () => {
    isFirstSel = 1;
    $.ajax({
        url: _config.buildPath + 'api-integral/v1.0/information/list/manager',
        type: 'GET',
        dataType: 'json',
        headers: { 'token': _config.token },
        data: {
            page: pagenum,
            isFirstSel: isFirstSel,
            colPerPage: pagesize
        },
        success: (res) => {
            console.log(res)
            if (res.code !== _encode.REQUEST_SUCCESS) {
                alert(res.msg)
            } else {
                let message = new Array()
                message = res.result;
                infoObject = _utils.ObjectToArray(message);

                /*分页*/
                if (isFirstSel == 1) {
                    isFirstSel = 0;
                    $("#page").paging({
                        totalPage: Math.ceil(res.msg / 15),
                        totalSize: res.msg,
                        callback: function(num) {
                            pagenum = num;
                            selInformationList();
                        }
                    });
                }
                $('#infoTbody').empty();
                $('#infoTbody').append(setInformationList(message));


            }
        },
        error: (a, b, c) => {
            alert(a.status)
        }
    })
}

function selRoleList() {
    $.ajax({
        url: _config.buildPath + 'api-user/v1.0/role',
        type: 'GET',
        dataType: 'json',
        headers: { "token": _config.token },
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
//赋值给列表
var setInformationList = (param) => {
    let res = ``;
    for (var i = 0; i < param.length; i++) {
        res += addValueToList(param[i])
    }
    return res;
}
var addValueToList = (param) => {
    let res = `<tr class="text-c">`;
    res += `<td class='info-id'>${param.id}</td>`;
    res += `<td>${param.title}</td>`;
    res += `<td>${_utils.formatDate(param.createTime)}</td>`;
    res += `<td>资讯</td>`;
    res += `<td>${behindHandle()}</td>`;
    return res + `</tr>`;
}
var behindHandle = () => {
    let res = ``;
    res += `<a title='查看' href='javascript:;' class='ml-5' onclick="infoScan(this)" style='text-decoration:none'><i class='Hui-iconfont'>&#xe665;</i></a>
          <a title='修改' href='javascript:;' class='ml-5' onclick="infoEdit(this)" style='text-decoration:none'><i class='Hui-iconfont'>&#xe6df;</i></a>
          <a title='删除' href='javascript:;' class='ml-5' onclick="infoDel(this)" style='text-decoration:none'><i class='Hui-iconfont'>&#xe6e2;</i></a>
          `;
    return res;
}
//查看
window.infoScan = (obj) => {
    let id = $(obj).parent('td').siblings('.info-id').text();
    let infoSingle;
    for (var i = 0; i < infoObject.length; i++) {
        if (id == infoObject[i].id) {
            infoSingle = infoObject[i]


        }
    }

    $('#scanInfoDia').find('#scan_infoName').val(infoSingle.title)
    $('#scanInfoDia').find('#scan_createTime').val(infoSingle.createTime)
    $('#scanInfoDia').find('#scan_titlePic').val(infoSingle.titleImg)
    $('#scanInfoDia').find('#scan_coverPic').val(infoSingle.contentImg)
    $('#scanInfoDia').find('#scan_sharePic').val(infoSingle.shareImg)
    $('#scanInfoDia').find('#scan_infoContent').val(infoSingle.content.replace(/<[^>]+>/g, ""))
    roleConfig = JSON.parse(infoSingle.roleConfig)
    $('#scanInfoDia').modal('show')

}
window.infoEdit = (obj) => {
    let id = $(obj).parent('td').siblings('.info-id').text();
    infoEditId = id;
    let infoSingle;
    for (var i = 0; i < infoObject.length; i++) {
        if (id == infoObject[i].id) {
            infoSingle = infoObject[i]
        }
    }
    $('#editInfoDia').find('#edit_infoName').val(infoSingle.title)
    $('#editInfoDia').find('#edit_infoContent').froalaEditor('html.set', infoSingle.content)
    $('#editInfoDia').find('#titlePicContainer').html(`<img src=${infoSingle.titleImg}>`)
    $('#editInfoDia').find('#coverPicContainer').html(`<img src=${infoSingle.contentImg}>`)
    if (infoSingle.shareImg == null) {
        $('#editInfoDia').find('#sharePicContainer').html(`<p>当前图片为空</p>`)
    } else {
        $('#editInfoDia').find('#sharePicContainer').html(`<img src=${infoSingle.shareImg}>`)
    }

    $('#editInfoDia').find('#edit_infoContent').froalaEditor('html.set', infoSingle.content)
    roleConfig = JSON.parse(infoSingle.roleConfig)
    console.log(roleConfig)
    setRoleConfig(roleConfig);
    $('#editInfoDia').modal('show')


}
window.infoDel = (obj) => {
    let id = $(obj).parent('td').siblings('.info-id').text();
    $.ajax({
        url: _config.buildPath + 'api-integral/{version}/information/delete',
        type: 'POST',
        dataType: 'json',
        headers: { 'token': _config.token },
        data: {
            informationId: id
        },
        success: (res) => {
            if (res.code !== _encode.REQUEST_SUCCESS) {
                console.log(code.msg)
                layer.msg('删除失败')
            } else {
                layer.msg('删除成功')
                setTimeout(urlReload, 500)
            }
        },
        error: (a, b, c) => {
            alert(a.status)
        }
    })

}

function urlReload() {
    window.location.reload();
}

window.scanPower = () => {
    let roleBox = new Array();
    $.ajax({
        url: _config.buildPath + 'api-user/v1.0/role',
        type: 'GET',
        dataType: 'json',
        async: false, //取消异步
        headers: { 'token': _config.token },
        success: (res) => {

            if (res.code !== _encode.REQUEST_SUCCESS) {
                alert(res.msg)
            } else {
                console.log(res);
                roleBox = res.result;
                $('#scanPower-modal').modal('show');
                $('#scanPower-modal').find('input[type=text]').attr('readonly', 'readonly')
                $('#scanPower-modal').find('input[type=radio]').attr('disabled', 'disabled')
                $('#ScanPowerbody').empty();
                $('#ScanPowerbody').append(addValuePowerToList(roleConfig, roleBox))
            }
        },
        error: (a, b, c) => {
            alert(a.status)
        }
    })

    console.log(roleBox)
    console.log(roleConfig)
}

function addValuePowerToList(param, roleBox) {
    let res = ``;
    for (var i = 0; i < param.length; i++) {
        let rolename;
        if (param[i].roleId == -1) {
            rolename = '全部'
        } else {
            for (var j = 0; j < roleBox.length; j++) {
                if (roleBox[j].roleId == param[i].roleId) {
                    rolename = roleBox[j].roleName;
                }

            }
        }
        res += `<tr class="text-c">`;
        res += `<td>${rolename}</td>`;
        res += `<td>${_utils.formatDate(param[i].publishStartTime)}</td>`;
        res += `</tr>`;

    }
    return res;

}

//权限分组赋值
var setRoleConfig = (arr) => {
    roleConfig = [];
    roleConfig = arr;
    console.log(roleConfig)
    let label = $('.powerBlock');
    $(label).find('label').removeClass('powerOn');
    roleConfigId = arr[0].id;
    console.log(roleConfigId)
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < label.length; j++) {
            let id = $(label[j]).find('label').attr('data-role');

            if (arr[i].roleId == id) {
                $(label[j]).find('label').addClass('powerOn');
                roleConfig[i].roleName = $(label[j]).find('label .powerName').text();
                $(label[j]).find('label .powerSet').html('已设置')
                $(label[j]).find('label .powerSet').removeAttr('onclick')
                $(label[j]).find('label .powerEdit').show();
            }
        }
    }
}
//编辑权限
window.editPowerUser = (obj) => {
    let powerId = $(obj).parent('label').attr('data-role');
    let powerName = $(obj).siblings('.powerName').text();
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
    $('#addSetPower').find('#publish_start_time').val(_utils.formatDate(param.publishStartTime));

}
//初始化权限设置序列
var roleSingleInit = () => {
    roleSingle = {
        'roleId': 0, //角色ID
        'publishStartTime': '', //发布开始时间
        'roleName': '',
        'id':0

    }
    $('#addSetPower').find('#power-input-name').val('');
    $('#addSetPower').find('#publish_start_time').val('');
}
// 权限选择切换
window.selectPowerUser = (obj) => {
    layer.msg('编辑状态无法切换分组', { time: 800 });
    return;
}
//设置权限存入暂存数列
window.setPowerSubmit = () => {
    //是编辑的话
    console.log('编辑')
    if ($('#addSetPower').find('#publish_start_time').val() == '') {
        _utils.modalalert('发布时间未填写')
        return;
    }
    roleConfig[roleConfigIndex].publishStartTime = $('#addSetPower').find('#publish_start_time').val();
    roleConfig[roleConfigIndex].id = roleConfigId;


    let roleId = $('#addSetPower').find('#power-input-name').attr('data-roleid');
    // let json = JSON.stringify(roleSingle)
    console.log(roleConfig)
    _utils.modalTip('设置成功', 1000)
    $('#addSetPower').modal('hide');

}
window.editSubmit = () => {
    console.log(infoEditId)
    let formdata = new FormData();
    let information_content = $('div#edit_infoContent').froalaEditor('html.get');
    let infocontent = information_content.replace(/style\s*=(['\"\s]?)[^'\"]*?\1/gi, '');
    let s = infocontent.replace(/width\s*:(['\"\s]?)[^'\"]*?\1/gi, '');
    formdata.append('content', s);
    formdata.append('id',infoEditId) 
    formdata.append("titleImage", document.getElementById("titlePic").files[0]); //资讯标题图片
    formdata.append("contentImage", document.getElementById("coverPic").files[0]); //资讯封面图
    formdata.append("shareImage", document.getElementById("sharePic").files[0]); //资讯分享图
    formdata.append("roleConfig", JSON.stringify(roleConfig));
    $.ajax({
        type: 'POST',
        url: _config.buildPath + 'api-integral/{version}/information/edit',
        dataType: 'json',
        data: formdata,
        processData: false,
        contentType: false,
        headers: { 'token': _config.token },
        success: (res) => {
            console.log(res);
            if (res.code != _encode.REQUEST_SUCCESS) {
                console.log(res.msg)
                layer.msg('编辑失败')
            } else {
                layer.msg('编辑成功')
                $('#editInfoDia').modal('hide');
                setTimeout(reload,500)
            }
        },
        error: (a, b, c) => {
            alert(a.code)
        }
    })
}
function reload()
{
    window.location.reload();
}