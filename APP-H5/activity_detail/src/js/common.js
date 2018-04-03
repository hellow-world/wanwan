// 通用变量
var h_window = $(window).height();
var w_window = $(window).width();
var h_doc = $(document).height();

var activity_id;
var _token;
var headInfo;
$(function() {
    $('.titleImg img').hide();
    activity_id = getParams('activityId')
    _token = getParams('token')
    // selActivity();
    
})

function selActivity() {



    $.ajax({

        url: 'https://wanwan.citygreen-china.cn:18443/v1.0/activity/info',
        type: 'GET',
        dataType: 'json',
        headers: { "token": _token},
        data: {

            activityId: activity_id
        },
        success: function(res) {

            console.log(res)
            if (!res.code === 200) {
                console.log(res.msg)
            } else {
                var msg = res.result;
                setValue(msg);
            }
        },
        error: function(a, b, c) {
            console.log(a.status)
        }

    })
}

function setValue(param) {
    //标题图片
    $('.titleImg img').attr('src', param.activityCover)
    $('#postedNum').text(param.enrolPeople)
    $('.title').text(param.activityTitle)
    $('.subTitle').text(param.activityIntroduce)
    $('.time').find('#startTime').text(param.activityStartTime)
    $('.time').find('#endTime').text(param.activityEndTime)
    $('.address #place').text(param.activityPlace)
    $('#Content .input_content').empty();
    $('#Content .input_content').append(param.activityContent)

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