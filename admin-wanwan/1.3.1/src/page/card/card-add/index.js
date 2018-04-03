/*
 * @Author: admin
 * @Date:   2018-02-28 16:41:56
 * @Last Modified by:   admin
 * @Last Modified time: 2018-03-27 11:52:06
 */
var _config = require('service/config.js')
var _encode = require('service/errorcode.js')
var _utils = require('util/utils.js')
var sponserName = "";
$(function() {
    $('#card_content').froalaEditor({
        theme: 'dark',
        imageUploadURL: _config.basePath + "uploadImgEditor",
        language: 'zh_cn',
        height: 200,
        /*  toolbarButtons: [  
                           'bold', 'italic', 'underline', 'paragraphFormat', 'align','color','fontSize','insertImage','insertTable','undo', 'redo'  
                         ] */
    })

});



/*消息弹出框*/
function modalalert(msg) {
    $.Huimodalalert(msg, 3000);
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
/**
 * 是否推动的checkbox点击事件处理
 */
var isPushed = 1;
var notifyContent = "";
var notifyTime = "";

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
/**
 * 新增card提交到服务器
 */
$('#btnaddSubmit').on('click', function() {
    addCardSubmit();
})

function addCardSubmit() {
    var card_title = $('#card_title').val();
    var card_introduce = $('#card_introduce').val();
    var card_place = $('#card_place').val();
    var card_num = $('#card_num').val();
    var purchase_num = $('#purchase_num').val();
    var product_type = $('#product_type').val();
    var pay_way = $('#pay_way').val();
    var card_price = $('#card_price').val();
    var card_putaway_time = $('#card_putaway_time').val();
    var cardpurchase_start_time = $('#cardpurchase_start_time').val();
    var cardpurchase_end_time = $('#cardpurchase_end_time').val();
    var card_start_time = $('#card_start_time').val();
    var card_end_time = $('#card_end_time').val();
    var card_content = $('div#card_content').froalaEditor('html.get');
    var s = card_content.replace(/style\s*=(['\"\s]?)[^'\"]*?\1/gi, '');
    var s = s.replace(/width\s*:(['\"\s]?)[^'\"]*?\1/gi, '');

    var card_CreateTime = getNowFormatDate();
    if (card_title == "" || card_title.length > 19) {
        $("#Tip").html("标题不能为空或长度不能超过19个字符");
    } else if (document.getElementById("titlePic").value == "") {
        $("#Tip").html("请上传正确格式的标题图片");
    } else if (document.getElementById("coverPic").value == "") {
        $("#Tip").html("请上传正确格式的封面图片");
    } else if (card_introduce == "" || card_introduce.length > 39) {
        $("#Tip").html("简介不能为空或长度超过39");
    } else if (card_place == "") {
        $("#Tip").html("商品地点必填");
    } else if (card_num == "") {
        $("#Tip").html("商品数量必填");
    } else if (purchase_num == "") {
        $("#Tip").html("购买数量必填");
    } else if (product_type == "") {
        $("#Tip").html("产品类型必填");
    } else if (pay_way == "") {
        $("#Tip").html("支付方式必填");
    } else if (card_price == "") {
        $("#Tip").html("商品价格必填");
    } else if (card_putaway_time == "") {
        $("#Tip").html("上架时间必填");
    } else if (card_start_time == "" || card_end_time == "") {
        $("#Tip").html("开始时间必填");
    } else if (cardpurchase_start_time == "" || cardpurchase_end_time == "") {
        $("#Tip").html("购买时间必填");
    } else {
        if (isPushed == 1) {
            notifyContent = $("#notify_content").val();
            notifyTime = $("#push_time").val();
        }
        var formData = new FormData();
        formData.append("cardTitle", card_title);
        formData.append("cardIntroduce", card_introduce);
        formData.append("place", card_place);
        formData.append("cardSum", card_num);
        formData.append("cardRestrictSum", purchase_num);
        formData.append("type", product_type);
        formData.append("currencyType", pay_way);
        formData.append("cardPrice", card_price);
        formData.append("cardStartTime", card_start_time);
        formData.append("cardEndTime", card_end_time);
        formData.append("cardPutawayTime", card_putaway_time);
        formData.append("purchaseStartTime", cardpurchase_start_time);
        formData.append("purchaseEndTime", cardpurchase_end_time);
        formData.append("cardContent", s);
        formData.append("cardCreateTime", card_CreateTime);
        formData.append("sponsorName", sponserName);
        formData.append("title", document.getElementById("titlePic").files[0]);
        formData.append("cover", document.getElementById("coverPic").files[0]);

        //活动推送的参数
        formData.append("isPushed", isPushed);
        formData.append("notifyContent", notifyContent);
        formData.append("notifyTime", notifyTime);

        $.ajax({
            url: _config.basePath + "card/add",
            type: "POST",
            dataType: "json",
            processData: false,
            contentType: false,
            data: formData,
            success: function(result) {
                if (result.code == _encode.REQUEST_SUCCESS) {
                    modalalert("已成功添加");
                    setTimeout(function(args) {
                        window.history.back();
                    }, 1000) // body, ...args)
                } else {
                    alert("添加失败:" + result.msg);
                }
            },
            error: function(a, b, c) {
                alert(a.status);
            }
        });
    }
}