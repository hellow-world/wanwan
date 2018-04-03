// 通用变量
var h_window = $(window).height();
var w_window = $(window).width();
var h_doc = $(document).height();

//控制下滑的面板
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var vote_id;
$(function() {

    vote_id = getParams('postId');
    console.log(vote_id);
    selVote();
    
})

function selVote() {
    $.ajax({
        url: 'https://wanwan.citygreen-china.cn:18443/api-social/v1.0/vote/post/'+vote_id,
        dataType: 'json',
        type: 'GET',
        success: function(res) {
            console.log(res)
            if (res.code !== 200) {
                alert(res.msg)
            } else {
                var message = res.result;
                setVote(message);
            }
        },
        error: function(a, b, c) {
            alert(a.status)
        }
    })
}

function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

function setVote(param) {
    $('#info-name').text(param.nickname);
    $('.thumbUp a').text(param.supportSum);
    $('.infoHead>img').attr('src', param.avatar);
    $('.infoHead .rank>img').attr('src', param.levelIcon);
    $('.context span').text(param.description);
    $('#allNum').text(param.img.length);
    $('#dateNum').text(param.createTime);
    $('#banner img').attr('src', param.img[0].bigPicture);
    dateSerize();

}
// function getBanner(obj)
// {
// 	var res="";
// 	for (var i = 0; i < obj.length; i++) {

// 		res+="<li class='swiper-wrapper'><img src=''></li>"

// 	}
// 	return res;
// }
$('.thumbUp').on('click', function() {

    if (isAndroid) {
        window.location.href = "http://url.cn/5T5jESL";
    } else if (isiOS) {
        window.location.href = "https://itunes.apple.com/cn/app/%E7%8E%A9%E7%8E%A9-%E8%AE%A9%E5%9F%8E%E5%B8%82%E6%9B%B4%E5%A5%BD%E7%8E%A9/id1306426336?mt=8";
    }

})
function dateSerize(){
    var date = $('#dateNum').text();
    var mydate = date.slice(0,date.indexOf(' '))
    $('#dateNum').text(mydate);
}
