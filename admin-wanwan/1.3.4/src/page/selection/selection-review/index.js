/*
 * @Author: admin
 * @Date:   2018-03-12 17:43:44
 * @Last Modified by:   admin
 * @Last Modified time: 2018-05-04 17:40:46
 */
require('./index.css')
var qiniu = require('qiniu-js')
var _config = require('service/config.js')
var _utils = require('util/utils.js')
var _encode = require('service/errorcode.js')

var $vote_id;//评选ID
var $vote_isofficial;//评选ID
var votePostMsg;
var curmsg = new Object();
$(function() {


    $vote_id = _utils.getParams("voteId")
    $vote_isofficial = _utils.getParams("isofficial")
    console.log($vote_isofficial);
    if($vote_isofficial == 1)
    {
        $('#addTip').show();
    }
    else
    {
        $('#addTip').hide();
    }

    selPostList();


})

function selPostList() {


    $.ajax({
        url: _config.buildPath + "api-social/v1.0/vote/post",
        type: 'GET',
        dataType: 'json',
        headers: { "token": _config.token },
        data: {
            voteId: $vote_id

        },
        success: function(res) {
            if (res.code != _encode.REQUEST_SUCCESS) {
                alert(res.msg)
            } else {

                var message = res.result
                votePostMsg = message
                $("#selectionTbody").empty();
                $("#selectionTbody").append(setValueToTable(message, getradiohtml()));
            }
        },
        error: function(a, b, c) {
            alert(a.status);
        }
    })
}
/* 动态加载数据到表格*/
function setValueToTable(param, behind) {
    var res = "";
    for (var i = 0; i < param.length; i++) {

        // 本地文本化-广告位置与上下线

        res += addTdToTable(param[i], behind);
    }
    return res;
}
/* 给adsense表格每行加载数据 */
function addTdToTable(param, behind) {
    var res = '<tr class="text-c" >' + behind;
    //for(var key in param )
    res += "<td class='vote_id'>" + param.votePostId + "</td>";
    res += "<td>" + param.description + "</td>";
    res += "<td>" + param.nickname + "</td>";
    res += "<td>" + "" + "</td>";
    res += "<td>" + param.createTime + "</td>";
    if (param.isPass == 0) {
        res += "<td>" + "未通过" + "</td>";
    } else if (param.isPass == 1) {
        res += "<td>" + "已通过" + "</td>";
    } else if (param.isPass == 2) {
        res += "<td>" + "审核中" + "</td>";
    }


    res += getoperaHtml();

    return res + "</tr>";
}
/* 操作栏up*/
function getoperaHtml() {
    var res = "<td>" +
        "<a title='审核' href='javascript:;' class='ml-5 btn_del' style='text-decoration:none' onclick='postReview(this)'><i class='Hui-iconfont'>&#xe637;</i></a>" +
        "</td>";
    return res;
}
/*radio栏html*/
function getradiohtml() {
    var res = "<td><input type='checkbox'></td>";
    return res;
}
window.postReview = function(obj) {
    var $postId = $(obj).parent('td').siblings('.vote_id').text();
    for (var i = 0; i < votePostMsg.length; i++) {
        if (votePostMsg[i].votePostId == $postId) {
            curmsg.votePostId = votePostMsg[i].votePostId;
            curmsg.nickname = votePostMsg[i].nickname;
            curmsg.createTime = votePostMsg[i].createTime;
            curmsg.img = votePostMsg[i].img;
            curmsg.description = votePostMsg[i].description;
            curmsg.isPass = votePostMsg[i].isPass;
        }
    }
    $("#selPost").modal("show")
    var _form = $('#form-post-review');
    _form.find('input[name=nickname]').val(curmsg.nickname);
    _form.find('input[name=createTime]').val(curmsg.createTime);
    _form.find('input[name=des]').val(curmsg.description);
    _form.find('.imgList').html(getImg(curmsg.img))

    if (curmsg.isPass == 0) {
        $('.label-pass').html("审核状态：<p style='color:red;'>当前状态为不通过</p>")
    } else if (curmsg.isPass == 1) {
        $('.label-pass').html("审核状态：<p style='color:red;'>当前状态为通过</p>")
    }


}

function getImg(obj) {

    var res = "";
    for (var i = 0; i < obj.length; i++) {

        res += `<li onclick='imgScan(this)'><img src='${obj[i].bigPicture}' class="img-responsive"></li>`;
    }

    return res;
}
window.reviewSubmit = function() {



    //拼凑页面

    var is_pass = $('input[name=isPass]:checked').val();
    // var formdata = new FormData();
    // formdata.append('isPass',is_pass)
    // formdata.append('id',curmsg.votePostId)
    console.log(is_pass)
    console.log(curmsg.votePostId)
    $.ajax({
        url: _config.buildPath + "api-social/v1.0/post/update",
        type: 'POST',
        dataType: 'json',
        // processData: false,
        // contentType: false,
        headers: { "token": _config.token },
        data: {
            isPass: is_pass,
            id: curmsg.votePostId
        },
        success: function(res) {
            console.log(res);
            if (res.code !== _encode.REQUEST_SUCCESS) {
                alert(res.msg)
            } else {
                $("#selPost").modal("hide");
                window.location.reload();
                $('#imgScan img').attr('src', "");
                $('#imgScan').show();
            }
        },
        error: function(a, b, c) {
            alert(a.status);
        }
    })
}
window.imgScan = function(obj) {
    console.log('图片放大');
    $('#imgScan').show();
    var _this_url = $(obj).find('img').attr('src');
    $('#imgScan img').attr('src', _this_url);

    $('#imgScan i').on('click', function() {
        $('#imgScan').hide();
    })
}
//新增官方帖子
window.addOfficialNote = () => {
    $('#modal-note').modal('show');
}
//提交新增官方帖子
window.addNoteSubmit = () => {
    let pic = document.getElementById('coverPic').files[0]; //发布图片
    let userNickname = $('#modal-note').find('input[name=userNickname]').val();
    let userAvatar = document.getElementById('titlePic').files[0]; //发布者头像
    let description = $('#modal-note').find('#noteDescription').val();

    let type = 1;
    let formdata = new FormData();
    let fileArr = 
    {
        "pic":pic,
        "userAvatar":userAvatar
    };
    formdata.append('userNickname', userNickname);
    formdata.append('description', description);
    formdata.append('voteId', $vote_id);
    formdata.append('pic', '发布图片');
    formdata.append('userAvatar', '发布者头像');
    formdata.append('type', type);

    $.ajax({
        url: _config.buildPath + 'api-social/v1.0/post',
        type: 'POST',
        dataType: 'json',
        processData: false,
        contentType: false,
        headers: { 'token': _config.token },
        data: formdata,
        success: (res) => {
            console.log(res)
            if (res.code == _encode.REQUEST_SUCCESS) {
                _uploadqiniu(res.result,fileArr)
            }

        },
        error: (a, b, c) => {
            alert(a.status)
        }
    })

}
var _uploadqiniu = (param,file) => {

    let token = param.token;
    for (var i = 0; i < param.file.length; i++) {
        if(param.file[i].pic == '发布者头像')
        {
            qiniuUp(file.userAvatar, param.file[i].key, token)
        }
        if(param.file[i].pic == '发布图片')
        {
            qiniuUp(file.pic, param.file[i].key, token)
        }
    }
    
    
}
var imgFileToString = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
        return e.target.result;
    }
}

function qiniuUp(file, key, token) {
    var observable = qiniu.upload(file, key, token)
    var observer = {

        next(res)
        {
            console.log(res)
        },
        error(err)
        {
            alert(err)
        },
        complete(res)
        {
            console.log(res)
            _utils.modalTip('添加成功')
            setTimeout(function()
            {
                window.location.reload();
            },2000)
        }
    }
    var subscription = observable.subscribe(observer)
}
