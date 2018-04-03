/*
 * @Author: admin
 * @Date:   2018-02-26 15:25:46
 * @Last Modified by:   admin
 * @Last Modified time: 2018-03-27 13:57:43
 */
var config = require('service/config.js')
var errorcode = require('service/errorcode.js')
var _utils = require('util/utils.js')

var teamMsg = "";
var editGuessId = 0;

var isPushed = 1; //是否推送，推送为1，不推送为0
var notifyContent = ""; //推送内容
var notifyTime = ""; //推送时间
$(function() {
    // CurrentUser();
    $("#teamTbody").empty();
    editGuessId = getParams("guessId");
    if (editGuessId == null) {
        $("#addSubmitBtn").show();
        $("#editSubmitBtn").hide();
    } else {
        $("#editSubmitBtn").show();
        $("#addSubmitBtn").hide();
        selGuess();
    }

});
/**
 * 是否推动的checkbox点击事件处理
 */
window.onClickHander = function(obj) {
    if (obj.checked) {
        $("#notify_content").show();
        $("#push_time_div").show();
        notifyContent = $("#notify_content").val();
        notifyTime = $("#push_time").val();
        isPushed = 1;
    } else {
        $("#notify_content").hide();
        $("#push_time_div").hide();
        notifyContent = "";
        notifyTime = "";
        isPushed = 0;
    }
}

function selGuess() {

    /*请求edit数据*/
    $.ajax({
        url: config.basePath + "guess/selGuess",
        type: "POST",
        data: {
            guessId: editGuessId
        },
        dataType: "json",
        success: function(result) {
            if (result.code != errorcode.REQUEST_SUCCESS) {
                alert(result.msg);
            } else {
                var message = result.result;
                $("#guessName").val(message.title);
                $("#guess_start_time").val(message.guessStartTime);
                $("#guess_end_time").val(message.guessEndTime);
                $("#game_time").val(message.gameStartTime);
                $("#drawLottery_time").val(message.predictDrawTime);
                var message_team = message.guessTeam;
                /*为表格赋值*/
                teamMsg = message_team;
                $("#teamTbody").empty();
                $("#teamTbody").append(setValueToTable(message_team, "", getoperaHtml()));
            }
        },
        error: function(a, b, c) {
            alert(a.status);
        }
    });
}

function selTeams() {
    /*请求teamTable数据*/
    $.ajax({
        url: config.basePath + "guess/selTeam",
        type: "POST",
        data: {
            guessId: editGuessId
        },
        dataType: "json",
        success: function(result) {
            if (result.code != errorcode.REQUEST_SUCCESS) {
                alert(result.msg);
            } else {
                var message = result.result;
                /*为表格赋值*/
                teamMsg = message;
                $("#teamTbody").empty();
                $("#teamTbody").append(setValueToTable(message, "", getoperaHtml()));
            }
        },
        error: function(a, b, c) {
            alert(a.status);
        }
    });
}

/*获取参数的值*/
function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};

/*队伍icon*/
function set(obj) {
    var $td = $(obj).parents('tr').children('td');
    var iconHtml = $td.eq(2).eq(0)[0].innerHTML;
    var strIconHtml = new String(iconHtml);
    var indexStart = strIconHtml.indexOf("src", 0);
    var index_start = strIconHtml.indexOf("\"", indexStart);
    var index_end = strIconHtml.indexOf("\"", index_start + 1);

    var src = strIconHtml.substring(index_start + 1, index_end);
    var teamName = $td.eq(1).text();

    $("#scan_teamName").val(teamName);
    document.getElementById("scan_teamTitlePicContainer").innerHTML = '<img width="100px" src="' + src + '">';
}

/*iconHtml中获取src的值*/
function getSrc(iconHtml) {
    var indexStart = iconHtml.indexOf("src", 0);
    var index_start = iconHtml.indexOf("\"", indexStart);
    var index_end = iconHtml.indexOf("\"", index_start + 1);

    var src = iconHtml.substring(index_start + 1, index_end);
    return src;
}
/**
 * 做延迟1s返回列表
 */
function backToList() {
    window.history.back();
}
/*提交竞猜添加*/
$('#submitAdd').on('click', function() {
    addGuessSubmit();
})

function addGuessSubmit() {
    var teamMsg = new Array();
    $("#teamTable").find("tr").each(function() {

        var $td = $(this).children('td');
        if (($td.parent().index() + 1) > 0) {
            var obj = new Object();
            var teamName = $(this).children('td:eq(1)').text();
            var iconHtml = $td.eq(2)[0].innerHTML;
            obj.teamName = teamName;
            obj.teamIcon = getSrc(iconHtml);
            teamMsg.push(obj);
        }
    });
    if (isPushed == 1) {
        notifyContent = $("#notify_content").val();
        notifyTime = $("#push_time").val();
    }

    var title = $("#guessName").val();
    var guessStartTime = $("#guess_start_time").val();
    var guessEndTime = $("#guess_end_time").val();
    var gameStartTime = $("#game_time").val();
    var predictDrawTime = $("#drawLottery_time").val();
    if (title == "" || title == null) {
        $("#Tip").html("竞猜名称必填");
    } else if (guessStartTime == "" || guessStartTime == null) {
        $("#Tip").html("竞猜开始时间必填");
    } else if (guessEndTime == "" || guessEndTime == null) {
        $("#Tip").html("竞猜结束时间必填");
    } else if (gameStartTime == "" || gameStartTime == null) {
        $("#Tip").html("预计比赛开始时间必填");
    } else if (predictDrawTime == "" || predictDrawTime == null) {
        $("#Tip").html("预计开奖时间必填");
    } else {
        $.ajax({
            type: "POST",
            url: config.basePath + "guess/addGuess",
            dataType: "json",
            data: {
                teamMsg: JSON.stringify(teamMsg),
                title: title,
                notifyContent: notifyContent,
                notifyTime: notifyTime,
                guessStartTime: guessStartTime,
                guessEndTime: guessEndTime,
                gameStartTime: gameStartTime,
                predictDrawTime: predictDrawTime,
            },
            success: function(result) {
                if (result.code == errorcode.REQUEST_SUCCESS) {
                    modalalert("已成功添加竞猜");
                    setTimeout(backToList, 1000);
                } else {
                    alert(result.msg);
                }
            },
            error: function(a, b, c) {
                alert(a.status);
            }
        });
    }
}


/*提交竞猜编辑*/
$('#submitEdit').on('click', function() {

    editGuessSubmit();
})

function editGuessSubmit() {
    var teamMsg = new Array();
    $("#teamTable").find("tr").each(function() {
        var $td = $(this).children('td');
        if (($td.parent().index() + 1) > 0) {
            var obj = new Object();

            var id = $(this).children('td:eq(0)').text();
            var teamName = $(this).children('td:eq(1)').text();
            var iconHtml = $td.eq(2)[0].innerHTML;
            obj.teamId = id;
            obj.teamName = teamName;
            obj.teamIcon = getSrc(iconHtml);
            teamMsg.push(obj);
        }
    });

    var title = $("#guessName").val();
    var guessStartTime = $("#guess_start_time").val();
    var guessEndTime = $("#guess_end_time").val();
    var gameStartTime = $("#game_time").val();
    var predictDrawTime = $("#drawLottery_time").val();
    if (title == "" || title == null) {
        $("#Tip").html("竞猜名称必填");
    } else if (guessStartTime == "" || guessStartTime == null) {
        $("#Tip").html("竞猜开始时间必填");
    } else if (guessEndTime == "" || guessEndTime == null) {
        $("#Tip").html("竞猜结束时间必填");
    } else if (gameStartTime == "" || gameStartTime == null) {
        $("#Tip").html("预计比赛开始时间必填");
    } else if (predictDrawTime == "" || predictDrawTime == null) {
        $("#Tip").html("预计开奖时间必填");
    } else {
        $.ajax({
            type: "POST",
            url: config.basePath + "guess/editGuess",
            dataType: "json",
            data: {
                teamMsg: JSON.stringify(teamMsg),
                id: editGuessId,
                title: title,
                guessStartTime: guessStartTime,
                guessEndTime: guessEndTime,
                gameStartTime: gameStartTime,
                predictDrawTime: predictDrawTime,
            },
            success: function(result) {
                console.log(result);
                if (result.code == errorcode.REQUEST_SUCCESS) {
                    modalalert("已成功编辑竞猜");
                    //$("#addActivityDia").modal("hide");
                    setTimeout(backToList, 1000);
                } else {
                    alert('服务器回复信息:' + result.msg);
                }
            },
            error: function(a, b, c) {
                alert(a.status);
            }
        });
    }
}


/*提交队伍添加*/
$('#btn_addTeam').on('click', function() {
    addTeamSubmit();
})

function addTeamSubmit() {

    var teamName = $("#teamName").val();
    if (teamName == "" || teamName == null) {
        $("#Tip_team").html("队伍名称必填");
    } else {
        var formData = new FormData();
        //formData.append("teamName", teamName);
        formData.append("icon", document.getElementById("teamPic").files[0]);
        $.ajax({
            url: config.basePath + "guess/uploadIcon",
            type: "POST",
            dataType: "json",
            processData: false,
            contentType: false,
            data: formData,
            success: function(result) {
                if (result.code == errorcode.REQUEST_SUCCESS) {
                    var url = result.msg;
                    var tbody = setTableData(teamName, url, getoperaHtml());
                    $("#teamTbody").append(tbody);
                    $("#addTeamDia").modal("hide");
                } else {
                    alert(result.msg);
                    $("#addTeamDia").modal("hide");
                }
            },
            error: function(a, b, c) {
                alert(a.status);
            }
        });
    }
}

function clearAddTeamDia() {
    $("#teamName").val("");
    document.getElementById("titlePicContainer").innerHTML = "";
    $("#teamPic").val("");
}

function getFileName(o) {
    var pos = o.lastIndexOf("\\");
    return o.substring(pos + 1);
}

/*提交队伍修改*/
function editTeamSubmit() {
    var teamName = $("#edit_teamName").val();

    var files = document.getElementById("edit_teamPic").files[0];
    var file = $("#edit_teamPic").val();
    var fileName = getFileName(file);
    if (teamName == "" || teamName == null) {
        $("#Tip_editTeam").html("队伍名称必填");
    } else if (fileName == "" || fileName == null) {
        setTableteamName(teamName, editTeamUrl);
        $("#editTeamDia").modal("hide");
    } else {
        var formData = new FormData();
        //formData.append("teamName", teamName);
        formData.append("icon", document.getElementById("edit_teamPic").files[0]);
        $.ajax({
            url: config.basePath + "guess/uploadIcon",
            type: "POST",
            dataType: "json",
            processData: false,
            contentType: false,
            data: formData,
            success: function(result) {
                if (result.code == errorcode.REQUEST_SUCCESS) {
                    var url = result.msg;
                    setTableteamName(teamName, url);
                    $("#editTeamDia").modal("hide");
                } else {
                    alert(result.msg);
                    $("#addTeamDia").modal("hide");
                }
            },
            error: function(a, b, c) {
                alert(a.status);
            }
        });
    }
}


/* 动态加载数据到表格*/
function setValueToTable(param, behind, end) {
    var res = "";
    for (var i = 0; i < param.length; i++) {
        res += addTdToTable(param[i], behind, end);
    }
    return res;
}

/* 给team表格每行加载数据 */
function addTdToTable(param, behind, end) {
    var res = '<tr class="text-c" >' + behind;
    //for(var key in param )
    res += "<td>" + param.teamId + "</td>";
    res += "<td>" + param.teamName + "</td>";
    res += '<td><img width="100px" src="' + param.teamIcon + '"></td>';
    return res + end + "</tr>";
}

/* 操作栏html*/
function getoperaHtml() {
    var res = "<td><a title='查看' href='javascript:;' class='ml-5 btn_teamScan' style='text-decoration:none'><i class='Hui-iconfont'>&#xe665;</i></a>" +
        "<a title='修改' href='javascript:;' class='ml-5 btn_teamEdit' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6df;</i></a>" +
        "<a title='删除' href='javascript:;' class='ml-5 btn_teamDel' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6e2;</i></a></td>";
    return res;
}

var currentEditId = 0;
/* 队伍查看对话框 */
$('#teamTbody').on('click', '.btn_teamScan', function() {
    team_scan(this);
})

function team_scan(obj) {
    addDataToScanDialog(obj);
    $("#scanTeamDia").modal("show");
}

/* 队伍编辑 */
$('#teamTbody').on('click', '.btn_teamEdit', function() {
    team_edit(this);
})

function team_edit(obj) {
    addDataToEditDialog(obj);
    $("#editTeamDia").modal("show");
}

/* 队伍删除 */
$('#teamTbody').on('click', '.btn_teamDel', function() {
    team_del(this);
})

function team_del(obj) {
    $(obj).parent().parent().remove();
}

/*消息弹出框*/
function modalalert(msg) {
    $.Huimodalalert(msg, 3000);
}

/*新增team对话框*/
$('#btn_teamAdd').on('click', function() {
    team_add();
})

function team_add() {
    clearAddTeamDia();
    $("#addTeamDia").modal("show");
}

/*查看队伍Dialog填值*/
function addDataToScanDialog(obj) {
    var $td = $(obj).parents('tr').children('td');
    var iconHtml = $td.eq(2).eq(0)[0].innerHTML;
    var strIconHtml = new String(iconHtml);
    var indexStart = strIconHtml.indexOf("src", 0);
    var index_start = strIconHtml.indexOf("\"", indexStart);
    var index_end = strIconHtml.indexOf("\"", index_start + 1);

    var src = strIconHtml.substring(index_start + 1, index_end);
    var teamName = $td.eq(1).text();

    $("#scan_teamName").val(teamName);
    document.getElementById("scan_teamTitlePicContainer").innerHTML = '<img width="100px" src="' + src + '">';
}

/*查看队伍Dialog填值*/
var editTeamName = "";
var editTeamUrl = "";
var editObj = "";

function addDataToEditDialog(obj) {
    var $td = $(obj).parents('tr').children('td');
    var iconHtml = $td.eq(2).eq(0)[0].innerHTML;
    var strIconHtml = new String(iconHtml);
    var indexStart = strIconHtml.indexOf("src", 0);
    var index_start = strIconHtml.indexOf("\"", indexStart);
    var index_end = strIconHtml.indexOf("\"", index_start + 1);

    var src = strIconHtml.substring(index_start + 1, index_end);
    var teamName = $td.eq(1).text();

    editTeamName = teamName;
    editTeamUrl = src;
    editObj = obj;

    $("#edit_teamName").val(teamName);
    document.getElementById("edit_teamTitlePicContainer").innerHTML = '<img width="100px" src="' + src + '">';
}

var teamId = 0;

/*为Teamtable添加一行数据*/
function setTableData(teamName, img, end) {
    var res = '<tr class="text-c" >';
    teamId += 1;
    res += "<td>" + teamId + "</td>";
    res += "<td>" + teamName + "</td>";
    res += '<td><img width="100px" src="' + img + '"></td>';
    return res + end + "</tr>";
}

/*编辑一行数据*/
function setTableteamName(teamName) {
    var $td = $(editObj).parents('tr').children('td');
    $td.eq(1).text(teamName);
}

/*编辑一行数据*/
function setTableteamName(teamName, url) {
    var $td = $(editObj).parents('tr').children('td');
    $td.eq(1).text(teamName);
    $td.eq(2).eq(0)[0].innerHTML = '<img width="100px" src="' + url + '">';
}