/*
 * @Author: admin
 * @Date:   2018-03-01 09:46:01
 * @Last Modified by:   admin
 * @Last Modified time: 2018-03-29 15:32:57
 */
//上下架操作
var _config = require('service/config.js')
var _utils = require('util/utils.js')
var _encode = require('service/errorcode.js')

var $vote_id;
var VoteMsg="";
/*分页使用到的参数*/
var pagenum = 1; //总行数
var isSearch = false; //false:没有搜索之后的分页查询。 true： 有了搜索的分页查询
var isFirstSel = 0; //0: 不是第一次查询，不需返回页数   1： 是第一次查询，需要返回页数
var num_perPage = 15;
$(function() {

    
    selVoteList()



})
window.tab_switch = function(obj) {
    var afterStyle = window.getComputedStyle(obj, ":after");
    var _switch = obj.getAttribute('data-switch');
    if (_switch === "off") {
        $(obj).css('background', '#199ed8');
        $(obj).removeClass('off');
        $(obj).addClass('on');
        $(obj).attr('data-switch', 'on')

    } else {
        $(obj).css('background', '#888');
        $(obj).removeClass('on');
        $(obj).addClass('off');
        $(obj).attr('data-switch', 'off')
    }

}
/*审核评选*/
window.reviewSubmit = function(obj) {
    $vote_id = $(obj).parent('td').siblings('.vote_id').text();
    console.log($vote_id);
    window.location.href = './selection-review.html'+'?voteId=' + $vote_id;
}
/*发布到广告*/
window.votePublish = function(obj) {
    $vote_id = $(obj).parent('td').siblings('.vote_id').text()
    window.location.href = '../adsense/adsense-add.html' + '?voteId=' + $vote_id;

}
/*编辑评选*/
window.voteEdit = function(obj){
    $vote_id = $(obj).parent('td').siblings('.vote_id').text()
    window.location.href = './selection-add.html' + '?voteId=' + $vote_id;

}
// 查询评选活动
function selVoteList() {
    isSearch = false;
    $.ajax({
        url: _config.buildPath+"api-social/v1.0/vote",
        type: 'GET',
        dataType: 'json',
        headers: { "token": _config.token },
        data:
        {
        	page: pagenum,
            
            pageSize: num_perPage
        },
        success: function(res) {
            console.log(res);
            if (res.code != _encode.REQUEST_SUCCESS) {
                alert(res.msg)
            } else {

                var message = res.result;
                VoteMsg = message;
                /*分页*/
                if (isFirstSel == 1) {
                    isFirstSel = 0;
                    $("#page").paging({
                        totalPage: Math.ceil(res.msg / 15),
                        totalSize: res.msg,
                        callback: function(num) {
                            pagenum = num;
                            if (isSearch)
                                selAdsenseDate();
                            else
                                selVoteList();
                        }
                    });
                }
                /*为表格赋值*/
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
    res += "<td class='vote_id'>" + param.voteId + "</td>";
    res += "<td>" + param.voteSubject + "</td>";
    res += "<td>" + param.voteStartTime + "</td>";
    res += "<td>" + param.voteEndTime + "</td>";
    res += "<td>" + "123" + "</td>";
    
    
    
    if (param.isOnline == 0) {
        res += "<td>" + "<div class='tgl-btn off' data-switch='off' onclick='tab_switch(this);'>" + "</div>" + "</td>";
    }
    if (param.isOnline == 1) {
        res += "<td>" + "<div class='tgl-btn on' data-switch='on' onclick='tab_switch(this);'>" + "</div>" + "</td>";
    }
    if(param.voteState == 0)
    {
        res += "<td>" + '未开始' + "</td>";
    }
    else if(param.voteState == 1)
    {
        res += "<td>" + '进行中' + "</td>";
    }
    else if(param.voteState == 2)
    {
        res += "<td>" + '已结束' + "</td>";
    }
    else if(param.voteState == 3)
    {
        res += "<td>" + '已下架' + "</td>";
    }
    
    res += getoperaHtml();
    
    return res + "</tr>";
}

/* 操作栏up*/
function getoperaHtml() {
    var res = "<td>" +
        "<a title='查看' href='javascript:;' class='ml-5 btn_edit' style='text-decoration:none' onclick='voteScan(this)'><i class='Hui-iconfont'>&#xe665</i></a>" +
        "<a title='编辑' href='javascript:;' class='ml-5 btn_del' style='text-decoration:none' onclick='voteEdit(this)'><i class='Hui-iconfont'>&#xe6df;</i></a>" +
        "<a title='发布到广告' href='javascript:;' class='ml-5 btn_del' style='text-decoration:none' onclick='votePublish(this)'><i class='Hui-iconfont'>&#xe679;</i></a>" +
        "<a title='审核' href='javascript:;' class='ml-5 btn_del' style='text-decoration:none' onclick='reviewSubmit(this)'><i class='Hui-iconfont'>&#xe637;</i></a>" +
        "</td>";
    return res;
}
/*radio栏html*/
function getradiohtml() {
    var res = "<td><input type='checkbox'></td>";
    return res;
}
// 查看评选
window.voteScan = function(obj)
{
    let scanVoteId = $(obj).parent('td').siblings().eq(1).text();
    console.log(scanVoteId)
    /*请求edit数据*/
    $.ajax({
        url: _config.buildPath+"api-social/v1.0/vote",
        type: "GET",
        headers: { "token": _config.token },
        data: {
            id: scanVoteId
        },
        dataType: "json",
        success: function(res) {

            if (res.code != _encode.REQUEST_SUCCESS) {
                alert(res.msg);
            } else {
                console.log(res);
                var message = res.result[0];
                ScanVote(message);
            }
        },
        error: function(a, b, c) {
            alert(a.status);
        }
    });
}
function ScanVote(param)
{
    $('#scanVoteModal').modal('show')
    $('#scan_voteSubject').val(param.voteSubject)
    $('#scan_voteSubhead').val(param.voteSubhead)
    $('#scan_startTime').val(param.voteStartTime)
    $('#scan_endTime').val(param.voteEndTime)
    $('#scan_createTime').val(param.createTime)
    $('#scan_voteIntroduction').val(param.voteIntroduction)
    $('.modal-body .imgDiv').html(`<img src='${param.voteCover}'>`)


}

