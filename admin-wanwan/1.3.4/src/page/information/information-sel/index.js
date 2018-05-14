require('./index.css')
var _utils = require('util/utils.js');
var _config = require('service/config.js');
var _encode = require('service/errorcode.js');

var pagenum = 1; //页码
var pagesize = 15; //一页行数
var isFirstSel = 0; //是否第一次查询 0不是 1是

var infoObject = new Array; //查询资质大体包
var roleConfig;
var roleSingle = {

    'roleId': 0, //角色ID
    'pushTime': '',
    'roleName': ''
}
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
    let infoSingle;
    for (var i = 0; i < infoObject.length; i++) {
        if (id == infoObject[i].id) {
            infoSingle = infoObject[i]
        }
    }
    $('#editInfoDia').find('#edit_infoName').val(infoSingle.title)
    $('#editInfoDia').find('#edit_infoContent').froalaEditor('html.set',infoSingle.content)
    $('#editInfoDia').find('#titlePicContainer').html(`<img src=${infoSingle.titleImg}>`)
    $('#editInfoDia').find('#coverPicContainer').html(`<img src=${infoSingle.contentImg}>`)
    if(infoSingle.shareImg == null)
    {
        $('#editInfoDia').find('#sharePicContainer').html(`<p>当前图片为空</p>`)
    }
    else{
        $('#editInfoDia').find('#sharePicContainer').html(`<img src=${infoSingle.shareImg}>`)
    }
    
    $('#editInfoDia').find('#edit_infoContent').froalaEditor('html.set',infoSingle.content)
    roleConfig = JSON.parse(infoSingle.roleConfig)
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
    let label = $('.powerBlock');
    $(label).find('label').removeClass('powerOn');
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
    for (var i = 0; i < roleSingle.length; i++) {
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
    //判断是否推送
    // if(param.isPush == null)
    // {
    //     $('#addSetPower').find('#is_pushed').attr('checked',false);
    //     $("#notify_content").hide();
    //     $("#push_time_div").hide();
    //     notifyContent = "";
    //     notifyTime = "";
    //     isPushed = 0;
    // }
    // else if(param.isPush == 1)
    // {
    //     $('#addSetPower').find('#is_pushed').attr('checked','checked');
    //     $("#notify_content").show();
    //     $("#push_time_div").show();
    //     isPushed = 1;
    // }
    if (isEdit) {
        $('#addSetPower').find('#is_pushed').parent('div.row').hide();
        $('#addSetPower').find('#push_time_div').hide();
        $('#addSetPower').find('#enrol_currency').attr('disabled', true)
    }
    else
    {
        $('#addSetPower').find('#notify_content').val(param.pushContent);
        $('#addSetPower').find('#push_time').val(_utils.formatDate(param.pushTime));
    }
    if (isFirstEdit) {
        $('#addSetPower').find('#money_number').val(param.enrolCurrencyNum / 100);
        isFirstEdit = false;
    } else {
        $('#addSetPower').find('#money_number').val(param.enrolCurrencyNum);
    }

    $('#addSetPower').find('#activity_number_people').val(param.enrolMaxPeople);
    $('#addSetPower').find('#activity_carrynumber_people').val(param.carryNumber);
    $('#addSetPower').find('#activity_carrynumber_people').val(param.carryNumber);
    $('#addSetPower').find('#enrol_start_time').val(_utils.formatDate(param.enrolStartTime));
    $('#addSetPower').find('#enrol_end_time').val(_utils.formatDate(param.enrolEndTime));
}
//初始化权限设置序列
var roleSingleInit = () => {
    roleSingle = {
        'roleId': 0, //角色ID
        'publishStartTime': '', //发布开始时间
        'roleName': ''

    }
    $('#addSetPower').find('#power-input-name').val('');
    $('#addSetPower').find('#publish_start_time').val('');
}
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