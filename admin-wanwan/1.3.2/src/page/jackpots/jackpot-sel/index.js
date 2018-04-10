/*
 * @Author: admin
 * @Date:   2018-02-08 15:18:53
 * @Last Modified by:   John
 * @Last Modified time: 2018-04-08 10:03:11
 */
var config = require('service/config.js')
var errorcode = require('service/errorcode.js')
var _utils = require('util/utils.js')
/*分页使用到的参数*/
var pagenum = 1; //总行数
var isSearch = false; //false:没有搜索之后的分页查询。 true： 有了搜索的分页查询
var isFirstSel = 0; //0: 不是第一次查询，不需返回页数   1： 是第一次查询，需要返回页数

$(function() {
    isFirstSel = 1;
    selLotteryList();
});
/**
 * 查询抽奖
 */
function selLotteryList() {
    isSearch = false;
    $.ajax({
        url: config.basePath + "lottery/sel",
        type: "POST",
        data: {
            page: pagenum,
            isFirstSel: isFirstSel
        },
        dataType: "json",
        success: function(result) {
        	console.log(result)
            if (result.code == errorcode.DATABASE_ERROR) {
                $("#jackpotTbody").empty();
                $("#jackpotTbody").append(_utils.noDataTbody(9));
                alert(result.msg)

            } else if (result.code == errorcode.REQUEST_SUCCESS) {
                var message = result.result;
                for (var i = 0; i < message.length; i++) {
                    delete message[i].lotteryQr;
                }
                /*分页*/
                if (isFirstSel == 1) {
                    isFirstSel = 0;
                    $("#page").paging({
                        totalPage: Math.ceil(result.msg / 15),
                        totalSize: result.msg,
                        callback: function(num) {
                            pagenum = num;
                            if (isSearch)
                                selLotteryByName();
                            else
                                selLotteryList();
                        }
                    });
                }
                /*为表格赋值*/
                $("#jackpotTbody").empty();
                $("#jackpotTbody").append(setValueToTable(message, getradiohtml(),getoperaHtml()));
            }
        },
        error: function(a, b, c) {
            alert(a.status);
        }
    });
}
window.jackpotAddSubmit = function() {
    var lotteryName = $("#jackPotName").val();

    if (_utils.utils_isNull(jackPotName)) {
        $("#Tip").html("请输入奖励名称");
    } else {
        $.ajax({
            url: config.basePath + "lottery/add",
            type: "POST",
            dataType: "JSON",
            data: {
                lotteryName: lotteryName
            },
            success: function(result) {
                selLotteryList();
                $("#addJackpotDia").modal("hide");
            },
            error: function(a, b, c) {
                alert(a.status);
            }
        });
    }
}

/**
 * 按名称查询抽奖
 */
$('#btnSel').click(function() {
    selJackpotsByNameSubmit();
})

function selJackpotsByNameSubmit() {
    var lotteryName = $("#lottery_name").val();
    isFirstSel = 1;
    if (_utils.utils_isNull(lotteryName)) {
        isSearch = false;
        pagenum = 1;
        selLotteryList();
    } else {
        isSearch = true;
        selLotteryByName();
    }
}

function selLotteryByName() {
    $.ajax({
        url: config.basePath + "lottery/selByName",
        type: "POST",
        data: {
            page: pagenum,
            isFirstSel: isFirstSel,
            lotteryName: $("#lottery_name").val()
        },
        dataType: "json",
        success: function(result) {
            if (result.code == errorcode.DATABASE_ERROR) {
                $("#jackpotTbody").empty();
                $("#jackpotTbody").append(_utils.noDataTbody(9));

            } else if (result.code == errorcode.REQUEST_SUCCESS) {
                var message = result.result;
                for (var i = 0; i < message.length; i++) {
                    delete message[i].lotteryQr;
                }
                /*分页*/
                if (isFirstSel == 1) {
                    isFirstSel = 0;
                    $("#page").paging({
                        totalPage: Math.ceil(result.msg / 15),
                        totalSize: result.msg,
                        callback: function(num) {
                            pagenum = num;
                            if (isSearch)
                                selLotteryByName();
                            else
                                selLotteryList();
                        }
                    });
                }
                /*为表格赋值*/
                $("#jackpotTbody").empty();
                $("#jackpotTbody").append(setValueToTable(message, getradiohtml(), getoperaHtml()));
            }
        },
        error: function(a, b, c) {
            alert(a.status);
        }
    });
}

/**
 * 添加抽奖对话框
 */
window.jackpotAdd_open = function() {
    $("#jackPotName").val("");
    $("#addJackpotDia").modal("show");
}

/* 操作栏html top*/
function getoperaHtml() {
    var res = "<td><a title='编辑' href='javascript:;' onclick='jackpot_edit(this)' class='ml-5' style='text-decoration:none'><i class='Hui-iconfont' style='color: #5a98de;'>编辑&#xe6df;</i></a>" +
        "<a title='删除' href='javascript:;' onclick='jackpot_del(this)' class='ml-5' style='text-decoration:none'><i class='Hui-iconfont' style='color: #5a98de;'>删除&#xe6e2;</i></a></td>";
    return res;
}

/**
 * 编辑抽奖
 * @param obj
 */
window.jackpot_edit = function(obj) {
    var $td = $(obj).parents('tr').children('td');
    var id = $td.eq(1).text();
    window.location.href = "./jackpot-add.html" + "?lotteryId=" + id;
}
/* 动态加载数据到表格*/
function setValueToTable(param, behind, end) {

    var res = "";

    for (var i = 0; i < param.length; i++) {
        res += addTdToTable(param[i], behind, end);
    }
    return res;
}
/*radio栏html*/
function getradiohtml() {
    var res = "<td><input type='checkbox'></td>";
    return res;
}
function addTdToTable(param,behind,end){
		var res = '<tr class="text-c">'+behind;
		for(var key in param ){
			res += "<td>"+param[key]+"</td>";
		}
		return res+end+"</tr>";
}