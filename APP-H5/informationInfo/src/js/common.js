// 通用变量
var h_window = $(window).height();
var w_window = $(window).width();
var h_doc = $(document).height();

var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

var _token;
var info_id;
$(function() {
    $('.titleImg img').hide();
    info_id = getParams('informationId');
    select_weixin();


})

function select_weixin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        $("footer").show();
    } else {
        $("footer").hide();
    }
}
$(document).ready(function() {

    // _token = getCookie('token');
    _token = getParams('token');
    // if(_token = null)
    // {
    //     
    // }
    // alert(_token);

    // alert(document.cookie);
    // _token = document.cookie;
    // $.ajax({
    //     type: 'HEAD',
    //     url: document.location.href,
    //     complete: function(xhr, data) {
    //         // if(xhr.getResponseHeader('token')=null)
    //         // {
    //         //     alert('传递HEAD参数错误')
    //         //     return;
    //         // }
    //         // else
    //         // {
    //         var allheader = xhr.getAllResponseHeaders();
    //         alert(allheader);
    //         // _token = xhr.getResponseHeader('token')
    //         // alert('token'+':'+_token); 
    //         // }

    //     }
    // })
    // var req = new XMLHttpRequest();
    // req.open('GET', document.location, false);
    // req.send(null);
    // var headers = req.getAllResponseHeaders().toLowerCase();
    // alert(headers);


    // info_id = getParams('informationId')
    // _token = getParams('token')
    selCard();
})
$('.titleImg img').load(function() {
    $('.lds-ellipsis').hide();
    $(this).show();
})

function selCard() {
    $.ajax({

        url: 'https://api.wanwantech.cn:18443/api-integral/{version}/information/details',
        type: 'GET',
        dataType: 'json',
        headers: { "token": _token },
        data: { informationId: info_id },
        success: function(res) {

            if (!res.code === 200) {
                console.log(res.msg)
            } else {
                var msg = res.result;
                setValue(msg);
            }
        },
        error: function(a, b, c) {
            alert(a.status)
        }

    })
}

function setValue(param) {
    //标题图片
    document.title = param.title;
    $('.titleImg img').attr('src', param.contentImg)
    $('.title').text(param.title)
    $('#Content .input_content').empty();
    $('#Content .input_content').append(param.content)
    $('#Content .foot span').append(formatDate(param.createTime))
    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
        var i = document.createElement('iframe');
        i.src = '/favicon.ico';
        i.style.display = 'none';
        i.onload = function() {
            setTimeout(function() {
                i.remove();
            }, 9)
        }
        document.body.appendChild(i);
    }

}
//获取url数据
function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
$('.titleImg img').load(function() {
    $('.lds-ellipsis').hide();
    $(this).fadeIn(300);
})

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}


function formatDate(v) {
    let res='';
    res+=v.substring(0,4)+'年';
    res+=v.substring(5,7)+'月';
    res+=v.substring(8,10)+'日';
    return res;
}
// 微信链接判断移动端转发
$('#btnDownload').click(function() {
    if (isAndroid) {
        window.location.href = "http://url.cn/5T5jESL";
    } else if (isiOS) {
        window.location.href = "https://itunes.apple.com/cn/app/%E7%8E%A9%E7%8E%A9-%E8%AE%A9%E5%9F%8E%E5%B8%82%E6%9B%B4%E5%A5%BD%E7%8E%A9/id1306426336?mt=8";
    }
})
// 去除下表条
$('#btnClose').click(function() {
    $('footer').hide();
})