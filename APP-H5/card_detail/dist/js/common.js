// 通用变量
var h_window = $(window).height();
var w_window = $(window).width();
var h_doc = $(document).height();

var _token;
var card_id;
$(function() {
    card_id = getParams('cardId')
    _token = getParams('token')
    card_id = 
    selCard();
})
function selCard() {
    alert(card_id);
    $.ajax({

        url: 'https://wanwan.citygreen-china.cn:18443/api-user/v1.0/user/card/details/'+card_id,
        type: 'GET',
        dataType: 'json',
        headers: { "token": _token },
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
    $('.titleImg img').attr('src', param.cardCover)
    $('#maxNum').text(param.cardSum)
    $('#curNum').text(param.purchasedSum)
    $('.title').text(param.cardTitle)
    $('.subTitle').text(param.cardIntroduce)
    $('.time').find('#startTime').text(param.cardStartTime)
    $('.time').find('#endTime').text(param.cardEndTime)
    $('.address #place').text(param.cardPlace)
    $('#Content .input_content').empty();
    $('#Content .input_content').append(param.cardContent)

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