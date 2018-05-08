require('./index.css')
var _utils = require('util/utils.js');
var _config = require('service/config.js');
var _encode = require('service/errorcode.js');

var pagenum = 1; //页码
var pagesize = 15; //一页行数
var isFirstSel = 0; //是否第一次查询 0不是 1是

var infoObject = new Array; //查询资质大体包
var infoSingle; //查询资质单个
var roleConfig;
$(function() {

    selInformationList();
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
    for (var i = 0; i < infoObject.length; i++) {
        if (id == infoObject[i].id) {
            infoSingle = infoObject[i]


        }
    }

    $('#scanInfoDia').find('#scan_infoName').val(infoSingle.title)
    $('#scanInfoDia').find('#scan_createTime').val(infoSingle.createTime)
    $('#scanInfoDia').find('#scan_titlePic').val(infoSingle.titleImg)
    $('#scanInfoDia').find('#scan_coverPic').val(infoSingle.contentImg)
    $('#scanInfoDia').find('#scan_infoContent').val(infoSingle.content.replace(/<[^>]+>/g, ""))
    roleConfig = JSON.parse(infoSingle.roleConfig)
    $('#scanInfoDia').modal('show')

}
window.infoEdit = (obj) => {
    let id = $(obj).parent('td').find('.info-id').val();
    $.ajax({
        url: _config.buildPath + 'api-integral/{version}/information/edit',
        type: 'POST',
        dataType: 'json',
        headers: { 'token': _config.token },
        data: {
            informationId: id
        },
        success: (res) => {
            console.log(res)
        },
        error: (a, b, c) => {
            alert(a.status)
        }
    })

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