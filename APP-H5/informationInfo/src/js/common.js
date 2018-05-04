// 通用变量
var h_window = $(window).height();
var w_window = $(window).width();
var h_doc = $(document).height();

var _token;
var info_id;
$(function() {
    $('.titleImg img').hide();
    $.ajax({
        type:'HEAD',
        url:window.location.href,
        complete:function(xhr,data)
        {
            if(xhr.getResponseHeader('informationId')=null||xhr.getResponseHeader('token')=null)
            {
                alert('传递HEAD参数错误')
                return;
            }
            else
            {
               info_id = xhr.getResponseHeader('informationId')
               _token = xhr.getResponseHeader('token') 
            }
            
        }
    })
    
    // info_id = getParams('informationId')
    // _token = getParams('token')
    selCard();
})
$('.titleImg img').load(function()
{
    $('.lds-ellipsis').hide();
    $(this).show();
})
function selCard() {
    alert(info_id);
    $.ajax({

        url: 'https://api.wanwantech.cn:18443/api-integral/{version}/information/details',
        type: 'GET',
        dataType: 'json',
        headers: { "token": _token },
        data:{informationId:info_id},
        success: function(res) {

            if (!res.code === 200) {
                alert(res.msg)
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
    $('.titleImg img').attr('src', param.contentImg)
    $('.title').text(param.title)
    $('#Content .input_content').empty();
    $('#Content .input_content').append(param.content)
    $('#Content .foot span').append(param.createTime)

}

function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
$('.titleImg img').load(function()
{
    $('.lds-ellipsis').hide();
    $(this).fadeIn(300);
})