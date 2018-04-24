/*
 * @Author: admin
 * @Date:   2018-03-02 10:24:09
 * @Last Modified by:   admin
 * @Last Modified time: 2018-04-02 17:25:57
 */
require('./index.css')
var _config = require('service/config.js')
var _utils = require('util/utils.js')
var _encode = require('service/errorcode.js')
var pagenum = 1; //总行数
var isSearch = false; //false:没有搜索之后的分页查询。 true： 有了搜索的分页查询
var isFirstSel = 0; //0: 不是第一次查询，不需返回页数   1： 是第一次查询，需要返回页数
var cardMsg = "";
var editAdsenseId = 0;
var num_perPage = 9; //分页后台传参数
var _type_val = 2;
var voteAdsenseId = 0;
var isFileAccess = false;//上传文件失败或者成功

var _url = {

    cardUrl: _config.basePath + 'card/selList', //按类型查询
    activityUrl: _config.basePath + 'activity/list',
    guessUrl: _config.basePath + "guess/selGuesses",
    voteUrl: _config.buildPath + "api-social/v1.0/vote",
    selActivityUrl: _config.basePath + "activity/selByName", //按名称查询
    selCardUrl: _config.basePath + "card/selByName",
    selGuessUrl: _config.basePath + "guess/selGuesseByName"
}
var adMaxNum = {
    banner: 5,
    second: 2,
    hot: 2,
    recommend: 1,
    recommend_gifts: 4


}
$(function() {


    editAdsenseId = _utils.getParams("adsenseId");
    voteAdsenseId = _utils.getParams("voteId");
    if (editAdsenseId == null && voteAdsenseId !== null) {
        $("#addSubmitBtn").show();
        $("#editSubmitBtn").hide();
        setVoteValue();
    } else if (editAdsenseId !== null) {
        $("#editSubmitBtn").show();
        $("#addSubmitBtn").hide();
        selAdsense();
    } else if (editAdsenseId == null && voteAdsenseId == null) {
        $("#addSubmitBtn").show();
        $("#editSubmitBtn").hide();
    }
})

// 为评选活动赋值
function setVoteValue() {
    $('#form-adsense-add').find('.adContentType').show().html('评选');
    $('#form-adsense-add').find('.adContentId').show().html(voteAdsenseId);
    editSubTitle();


}
// 搜索当前编辑广告位的信息
function selAdsense() {

    /*请求edit数据*/
    $.ajax({
        url: _config.buildPath + "api-integral/{version}/advert/single",
        type: "GET",
        headers: { "token": _config.token },
        data: {
            advertId: editAdsenseId
        },
        dataType: "json",
        success: function(res) {
            console.log(res);
            if (res.code != _encode.REQUEST_SUCCESS) {
                alert(res.msg);
            } else {
                message = res.result;
                setEditValue(message)
            }
        },
        error: function(a, b, c) {
            alert(a.status);
        }
    });
}

/*编辑框填入数据*/
function setEditValue(param) {
    let _form = $('#form-adsense-add')
    console.log('编辑')
    if (param.adContentType == 105) {
        editSubTitle();
        _form.find('#adsense_subtitle').text(param.adSubTitle)
    } else {
        _form.find('#adsense_subtitle').val(param.adSubTitle)
    }
    _form.find('input[name=adName]').val(param.adName);
    _form.find('input[name=adName]').attr('readonly', 'readonly')
    $('#adsense_location').val(param.adLocationId);
    $('#adsense_location').attr('disabled', 'disabled')
    _form.find('input[name=adsortNum]').val(param.sortNum)
    _form.find('input[name=adsortNum]').attr('readonly', 'readonly')
    _form.find('input[name=adTitle]').val(param.adTitle)

    _form.find('input[name=startTime]').val(param.startTime)
    _form.find('input[name=endTime]').val(param.endTime)
    _form.find('input[type=radio]').attr('disabled', 'true')
    //放图片
    _form.find('#titlePicContainer').html(`<img src='${param.adImg}'>`)
    if (param.isOnline === 1) {
        _form.find('#adOn').attr('checked', 'checked')
    }
    if (param.isOnline === 0) {
        _form.find('#adOff').attr('checked', 'checked')
    }

    _form.find('.adContentType').show().html(getContentTypeToString(param.adContentType))
    _form.find('.adContentId').show().html(param.adContentId)
    _form.find('textarea#adsense_content').text(param.adRemark)



    let picSize = param.adLocationId
    if (picSize == 1) {
        $('#inputPic').find('#titlePicContainer').removeClass().addClass('img-container-bannerTitle')
        $('#inputPic').find('#titlePic').removeClass().addClass('img-btn-bannerTitle')
        selectImg(fileInputs_bannerTitlePic, imgDivs_bannerTitlePic, 6);
    }
    if (picSize == 2) {
        $('#inputPic').find('#titlePicContainer').removeClass().addClass('img-container-secondTitle')
        $('#inputPic').find('#titlePic').removeClass().addClass('img-btn-secondTitle')
        selectImg(fileInputs_secondTitlePic, imgDivs_secondTitlePic, 7);
    }
    if (picSize == 3) {
        $('#inputPic').find('#titlePicContainer').removeClass().addClass('img-container-hotTitle')
        $('#inputPic').find('#titlePic').removeClass().addClass('img-btn-hotTitle')
        selectImg(fileInputs_hotTitlePic, imgDivs_hotTitlePic, 8);
    }
    if (picSize == 4) {
        $('#inputPic').find('#titlePicContainer').removeClass().addClass('img-container-recommendTitle')
        $('#inputPic').find('#titlePic').removeClass().addClass('img-btn-recommendTitle')
        selectImg(fileInputs_recommendTitlePic, imgDivs_recommendTitlePic, 9);
    }
    if (picSize == 5) {
        $('#inputPic').find('#titlePicContainer').removeClass().addClass('img-container-smallTitle')
        $('#inputPic').find('#titlePic').removeClass().addClass('img-btn-smallTitle')
        selectImg(fileInputs_smallTitlePic, imgDivs_smallTitlePic, 10);
    }




}

function getContentTypeToString(id) {
    console.log(id)
    if (id == 101) {
        return '活动';
    } else if (id == 104) {
        return '卡券';
    } else if (id == 102) {
        return '竞猜';
    } else if (id == 105) {

        return '评选';
    } else if (id == 103) {
        return '商品';
    }
}
/*评选改变副标题为玩法介绍*/

function editSubTitle() {
    var res;
    res = `<label class='fl'><span class="c-red">*</span>玩法介绍：</label><textarea name="adSubTitle" id="adsense_subtitle" cols="30" rows="10" placeholder="请在这里填写玩法介绍" style="width:50%;border: 1px solid #000;padding: 5px 5px;font-size: 14px;"></textarea>`
    $('#form-adsense-add').find('div.row').eq(4).empty().append(res);
}
$('#btnSel').on('click', function() {

    $("#modal-demo").modal("show");
    selCardList();
})

/*位置选择*/
$('#adsense_location').change(function() {
    _location_val = $(this).val();

    if (_location_val == 1) {
        $('#inputPic').find('#titlePicContainer').removeClass().addClass('img-container-bannerTitle')
        $('#inputPic').find('#titlePic').removeClass().addClass('img-btn-bannerTitle')
        selectImg(fileInputs_bannerTitlePic, imgDivs_bannerTitlePic, 6);
        $('#adsense_sort').attr('placeholder', '1~5')
    }
    if (_location_val == 2) {
        $('#inputPic').find('#titlePicContainer').removeClass().addClass('img-container-secondTitle')
        $('#inputPic').find('#titlePic').removeClass().addClass('img-btn-secondTitle')
        selectImg(fileInputs_secondTitlePic, imgDivs_secondTitlePic, 7);
        $('#adsense_sort').attr('placeholder', '1~2')
    }
    if (_location_val == 3) {
        $('#inputPic').find('#titlePicContainer').removeClass().addClass('img-container-hotTitle')
        $('#inputPic').find('#titlePic').removeClass().addClass('img-btn-hotTitle')
        selectImg(fileInputs_hotTitlePic, imgDivs_hotTitlePic, 8);
        $('#adsense_sort').attr('placeholder', '1~2')
    }
    if (_location_val == 4) {
        $('#inputPic').find('#titlePicContainer').removeClass().addClass('img-container-recommendTitle')
        $('#inputPic').find('#titlePic').removeClass().addClass('img-btn-recommendTitle')
        selectImg(fileInputs_recommendTitlePic, imgDivs_recommendTitlePic, 9);
        $('#adsense_sort').attr('placeholder', '1')

    }
    if (_location_val == 5) {
        $('#inputPic').find('#titlePicContainer').removeClass().addClass('img-container-smallTitle')
        $('#inputPic').find('#titlePic').removeClass().addClass('img-btn-smallTitle')
        selectImg(fileInputs_smallTitlePic, imgDivs_smallTitlePic, 10);
        $('#adsense_sort').attr('placeholder', '1~4')

    }

})
/*类型选择*/
$('#adsense_type').change(function() {
    _type_val = $(this).val();
    if (_type_val == 1) {
        selActivityList();

    } else if (_type_val == 2) {
        selCardList();

    } else if (_type_val == 3) {
        selGuessList();

    } else if (_type_val == 0) {
        selCardList();

    } else if (_type_val == 4) {
        selVoteList();

    }
})
/*位置选择*/
$('#adsense_location').change(function() {
    let _location_val = $(this).val();
    if (_location_val == 1) {
        $('#direction .gray').removeClass('blue')
        $('#direction .banner').addClass('blue')

    } else if (_location_val == 2) {
        $('#direction .gray').removeClass('blue')
        $('#direction .second .block').addClass('blue')

    } else if (_location_val == 3) {
        $('#direction .gray').removeClass('blue')
        $('#direction .third').addClass('blue')

    } else if (_location_val == 4) {
        $('#direction .gray').removeClass('blue')
        $('#direction .forth').addClass('blue')

    } else if (_location_val == 5) {
        $('#direction .gray').removeClass('blue')
        $('#direction .fifth .block').addClass('blue')

    }
})
/*按名称查找*/
$('#btnselSubmit').on('click', function() {

    if (_type_val == 1) {
        selActivitybyName();
    } else if (_type_val == 2) {
        selCardbyName();
    } else if (_type_val == 3) {
        selGuessbyName();
    }

})
/*按名称查找活动*/
function selActivitybyName() {
    var sel_input = $('#sel_input').val();
    isSearch = true;
    $.ajax({
        url: _url.selActivityUrl,
        type: "POST",
        dataType: "json",
        headers: { "token": _config.token },
        data: {
            page: pagenum,
            isFirstSel: isFirstSel,
            numPerPage: num_perPage,
            activityName: sel_input
        },
        success: function(result) {
            console.log(result)
            if (result.code != _encode.REQUEST_SUCCESS) {
                alert(result.msg);
            } else {
                var message = result.result;
                cardMsg = message;
                /*分页*/
                if (isFirstSel == 1) {
                    isFirstSel = 0;
                    $("#page").paging({
                        totalPage: Math.ceil(result.msg / 9),
                        totalSize: result.msg,
                        callback: function(num) {
                            pagenum = num;
                            if (isSearch)
                                selActivitybyName();
                            else
                                selActivityList();
                        }
                    });
                }
                /*为表格赋值*/
                $("#selCardbody").empty();
                $("#selCardbody").append(setValueToTable_activity(message));
            }
        },
        error: function(a, b, c) {
            alert(a.status);
        }
    });
}
/*按名称查找卡券*/
function selCardbyName() {
    var sel_input = $('#sel_input').val();
    isSearch = true;
    $.ajax({
        url: _url.selCardUrl,
        type: "POST",
        dataType: "json",
        headers: { "token": _config.token },
        data: {
            page: pagenum,
            isFirstSel: isFirstSel,
            numPerPage: num_perPage,
            cardName: sel_input
        },
        success: function(result) {
            console.log(result)
            if (result.code != _encode.REQUEST_SUCCESS) {
                alert(result.msg);
            } else {
                var message = result.result;
                cardMsg = message;
                /*分页*/
                if (isFirstSel == 1) {
                    isFirstSel = 0;
                    $("#page").paging({
                        totalPage: Math.ceil(result.msg / 9),
                        totalSize: result.msg,
                        callback: function(num) {
                            pagenum = num;
                            if (isSearch)
                                selCardbyName();
                            else
                                selCardList();
                        }
                    });
                }
                /*为表格赋值*/
                $("#selCardbody").empty();
                $("#selCardbody").append(setValueToTable(message));
            }
        },
        error: function(a, b, c) {
            alert(a.status);
        }
    });
}
/*按名称查找竞猜*/
function selGuessbyName() {
    var sel_input = $('#sel_input').val();
    isSearch = true;
    $.ajax({
        url: _url.selGuessUrl,
        type: "POST",
        dataType: "json",
        headers: { "token": _config.token },
        data: {
            page: pagenum,
            isFirstSel: isFirstSel,
            numPerPage: num_perPage,
            guessName: sel_input
        },
        success: function(result) {
            console.log(result)
            if (result.code != _encode.REQUEST_SUCCESS) {
                alert(result.msg);
            } else {
                var message = result.result;
                cardMsg = message;
                /*分页*/
                if (isFirstSel == 1) {
                    isFirstSel = 0;
                    $("#page").paging({
                        totalPage: Math.ceil(result.msg / 9),
                        totalSize: result.msg,
                        callback: function(num) {
                            pagenum = num;
                            if (isSearch)
                                selGuessbyName();
                            else
                                selGuessList();
                        }
                    });
                }
                /*为表格赋值*/
                $("#selCardbody").empty();
                $("#selCardbody").append(setValueToTable_guess(message));
            }
        },
        error: function(a, b, c) {
            alert(a.status);
        }
    });
}
/**
 * 查找卡券
 */
function selCardList() {
    isSearch = false;
    $.ajax({
        url: _url.cardUrl,
        type: "POST",
        dataType: "json",
        headers: { "token": _config.token },
        data: {
            page: pagenum,
            isFirstSel: isFirstSel,
            numPerPage: num_perPage
        },
        success: function(result) {

            if (result.code != _encode.REQUEST_SUCCESS) {
                alert(result.msg);
            } else {
                var message = result.result;
                cardMsg = message;
                /*分页*/
                if (isFirstSel == 1) {
                    isFirstSel = 0;
                    $("#page").paging({
                        totalPage: Math.ceil(result.msg / 9),
                        totalSize: result.msg,
                        callback: function(num) {
                            pagenum = num;
                            if (isSearch)
                                selcardByDate();
                            else
                                selCardList();
                        }
                    });
                }
                /*为表格赋值*/
                $("#selCardbody").empty();
                $("#selCardbody").append(setValueToTable(message));
            }
        },
        error: function(a, b, c) {
            alert(a.status);
        }
    });
}
/**
 * 查找活动
 */
function selActivityList() {
    isSearch = false;
    $.ajax({
        url: _url.activityUrl,
        type: "POST",
        dataType: "json",
        headers: { "token": _config.token },
        data: {
            page: pagenum,
            isFirstSel: isFirstSel,
            numPerPage: num_perPage
        },
        success: function(result) {

            if (result.code != _encode.REQUEST_SUCCESS) {
                alert(result.msg);
            } else {
                var message = result.result;
                cardMsg = message;
                /*分页*/
                if (isFirstSel == 1) {
                    isFirstSel = 0;
                    $("#page").paging({
                        totalPage: Math.ceil(result.msg / 15),
                        totalSize: result.msg,
                        callback: function(num) {
                            pagenum = num;
                            if (isSearch)
                                selcardByDate();
                            else
                                selActivityList();
                        }
                    });
                }
                /*为表格赋值*/
                $("#selCardbody").empty();
                $("#selCardbody").append(setValueToTable_activity(message));
            }
        },
        error: function(a, b, c) {
            alert(a.status);
        }
    });
}
/**
 * 查找竞猜
 */
function selGuessList() {
    isSearch = false;
    $.ajax({
        url: _url.guessUrl,
        type: "POST",
        dataType: "json",
        headers: { "token": _config.token },
        data: {
            page: pagenum,
            isFirstSel: isFirstSel,
            numPerPage: num_perPage
        },
        success: function(result) {

            if (result.code != _encode.REQUEST_SUCCESS) {
                alert(result.msg);
            } else {
                var message = result.result;
                cardMsg = message;
                /*分页*/
                if (isFirstSel == 1) {
                    isFirstSel = 0;
                    $("#page").paging({
                        totalPage: Math.ceil(result.msg / 15),
                        totalSize: result.msg,
                        callback: function(num) {
                            pagenum = num;
                            if (isSearch)
                                selcardByDate();
                            else
                                selGuessList();
                        }
                    });
                }
                /*为表格赋值*/
                $("#selCardbody").empty();
                $("#selCardbody").append(setValueToTable_guess(message));
            }
        },
        error: function(a, b, c) {
            alert(a.status);
        }
    });
}
/*查找评选*/
function selVoteList() {
    isSearch = false;
    $.ajax({
        url: _url.voteUrl,
        type: "get",
        dataType: "json",
        headers: { 'token': _config.token },
        // data: {
        //     page: pagenum,
        //     isFirstSel: isFirstSel,
        //     numPerPage: num_perPage
        // },
        success: function(result) {
            console.log(result);
            if (result.code != _encode.REQUEST_SUCCESS) {
                alert(result.msg)
            } else {
                var message = result.result;
                cardMsg = message;
                /*分页*/
                // if (isFirstSel == 1) {
                //     isFirstSel = 0;
                //     $("#page").paging({
                //         totalPage: Math.ceil(result.msg / 15),
                //         totalSize: result.msg,
                //         callback: function(num) {
                //             pagenum = num;
                //             if (isSearch)
                //                 selcardByDate();
                //             else
                //                 selVoteList();
                //         }
                //     });
                // }
                /*为表格赋值*/
                $("#selCardbody").empty();
                $("#selCardbody").append(setValueToTable_vote(message));
            }
        },
        error: function(a, b, c) {

            alert(a.status);
        }
    });
}
/* 动态加载数据到表格*/
function setValueToTable(param, behind) {
    var res = "";
    for (var i = 0; i < param.length; i++) {
        res += addTdToTable(param[i], behind);
    }
    return res;
}

function setValueToTable_activity(param, behind) {
    var res = "";
    for (var i = 0; i < param.length; i++) {
        res += addTdToTable_activity(param[i], behind);
    }
    return res;
}

function setValueToTable_guess(param, behind) {
    var res = "";
    for (var i = 0; i < param.length; i++) {
        res += addTdToTable_guess(param[i], behind);
    }
    return res;
}

function setValueToTable_vote(param, behind) {
    var res = "";
    for (var i = 0; i < param.length; i++) {
        res += addTdToTable_vote(param[i], behind);
    }
    return res;
}
/* 给card表格每行加载数据 */
function addTdToTable(param, behind) {
    var res = '<tr class="text-c" >' + behind;
    //for(var key in param )
    res += "<td class='card_id'>" + param.id + "</td>";
    res += "<td class='card_name'>" + param.cardTitle + "</td>";
    res += "<td>" + param.cardCreateTime + "</td>";
    if (param.isTop == 1) {
        res += getoperaHtml_down();
    } else {
        res += getoperaHtml_up();
    }
    return res + "</tr>";
}

function addTdToTable_activity(param, behind) {
    var res = '<tr class="text-c" >' + behind;
    //for(var key in param )
    res += "<td class='card_id'>" + param.id + "</td>";
    res += "<td class='card_name'>" + param.activityTitle + "</td>";
    res += "<td>" + param.activityCreateTime + "</td>";
    if (param.isTop == 1) {
        res += getoperaHtml_down();
    } else {
        res += getoperaHtml_up();
    }
    return res + "</tr>";
}

function addTdToTable_guess(param, behind) {
    var res = '<tr class="text-c" >' + behind;
    //for(var key in param )
    res += "<td class='card_id'>" + param.id + "</td>";
    res += "<td class='card_name'>" + param.title + "</td>";
    res += "<td>" + param.drawTime + "</td>";
    if (param.isTop == 1) {
        res += getoperaHtml_down();
    } else {
        res += getoperaHtml_up();
    }
    return res + "</tr>";
}

function addTdToTable_vote(param, behind) {
    var res = '<tr class="text-c" >' + behind;
    //for(var key in param )
    res += "<td class='card_id'>" + param.voteId + "</td>";
    res += "<td class='card_name'>" + param.voteSubject + "</td>";
    res += "<td>" + param.createTime + "</td>";
    if (param.isTop == 1) {
        res += getoperaHtml_down();
    } else {
        res += getoperaHtml_up();
    }
    return res + "</tr>";
}
/* 操作栏up*/
function getoperaHtml_up() {
    var res = "<td><a title='选择' href='javascript:;' class='ml-5 btn_select' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6a7;</i></a>" + "</td>";
    return res;
}
/* 操作栏down*/
function getoperaHtml_down() {
    var res = "<td><a title='选择' href='javascript:;' class='ml-5 btn_select' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6a7;</i></a>" + "</td>";
    return res;
}
/*操作选定*/
$('#selCardbody').on('click', '.btn_select', function() {
    var _this_name = $(this).parents('tr').find('.card_name').text()
    var _this_id = $(this).parents('tr').find('.card_id').text();
    var _this_type = $('#adsense_type').find('option:selected').text();

    var res = '是否选择 ' + '"' + _this_name + '"' + ' 为广告位'
    $('#modal-select-confirm').find('.modal-body p').html(res)
    $('#modal-select-confirm').modal('show');
    $('#modal-select-confirm').find('.btn-primary').on('click', function() {
        console.log(_this_id)
        $('#modal-select-confirm').modal('hide');
        $('#modal-demo').modal('hide');
        $('span.adContent').removeClass('dis-none');
        $('span.adContentType').html(setContentType(_this_type));
        $('span.adContentId').html(setContentId(_this_id));
    })
})

function setContentId(id) {
    var res = id;
    return res;

}

function setContentType(type) {
    var res = type;
    return res;

}


function adContentTypeId(type) {
    switch (type) {
        case '活动':
            return 101;
            break;
        case '竞猜':
            return 102;
            break;
        case '卡券':
            return 104;
            break;
        case '评选':
            return 105;
            break;
        case '商品':
            return 103;
            break;
        case '类型筛选':
            return 104;
            break;
    }
}
/*提交添加广告位*/
window.adsenseSubmit = function() {
    let _form = $('#form-adsense-add')
    var ad_name = _form.find('input[name=adName]').val();
    var ad_locationId = _form.find('#adsense_location').find('option:selected').val();
    var ad_sort = _form.find('input[name=adsortNum]').val();
    var ad_title = _form.find('input[name=adTitle]').val();
    var ad_subTitle = _form.find('#adsense_subtitle').val();
    var start_time = _form.find('input[name=startTime]').val();
    var end_time = _form.find('input[name=endTime]').val();
    var is_online = _form.find('input[name=isOnline]:checked').val();

    var advert_img = document.getElementById('titlePic').files[0];
    var ad_contentId = _form.find('.adContentId').html();
    var ad_contentType = adContentTypeId(_form.find('.adContentType').html())
    var ad_remark = _form.find('textarea#adsense_content').val();
    var id_del = 0;
    // console.log(document.getElementById('titlePic').files[0]);
    if (ad_name == "") {
        modalTip('请填写广告名称', 1000)
        return;
    } else if (ad_locationId == 0) {

        modalTip('请正确选择广告位置', 1000)
        return;
    } else if (ad_sort == "") {

        modalTip('请正确填写排序', 1000)
        return;
    } else if (ad_title == "") {
        modalTip('请正确填写主标题', 1000)
        return;
    } else if (ad_subTitle == "") {
        modalTip('请正确填写副标题', 1000)
        return;
    } else if (start_time == "") {
        modalTip('请正确填写开始时间', 1000)
        return;
    } else if (end_time == "") {
        modalTip('请正确填写结束时间', 1000)
        return;
    } else if (is_online == "") {
        is_online = 0;

    } else if (advert_img == "undefined") {
        modalTip('请正确上传图片', 1000)
        return;
    } else if (ad_contentId == "") {
        modalTip('请选择正确的广告内容', 1000)
        return;
    } else if (ad_contentType == "") {
        modalTip('请选择正确的广告类型', 1000)
        return;
    } else if (ad_remark == "") {
        ad_remark = '无';

    }
    let formdata = new FormData()
    formdata.append("adName", ad_name)
    formdata.append("adLocationId", ad_locationId)
    formdata.append("sortNum", ad_sort)
    formdata.append("adTitle", ad_title)
    formdata.append("adSubTitle", ad_subTitle)
    formdata.append("startTime", start_time)
    formdata.append("endTime", end_time)
    formdata.append("isOnline", is_online)
    formdata.append("advertImg", advert_img)
    formdata.append("adContentId", ad_contentId)
    formdata.append("adContentType", ad_contentType)
    formdata.append("adRemark", ad_remark)
    formdata.append("isDel", id_del)

    $.ajax({
        type: 'POST',
        url: _config.buildPath + "api-integral/v1.0/advert/",
        dataType: 'json',
        headers: { "token": _config.token },
        data: formdata,
        processData: false,
        contentType: false,
        success: function(res) {
            console.log(res);
            if (res.code !== _encode.REQUEST_SUCCESS) {
                alert(res.msg)
            } else {
                modalTip('添加广告位成功', 2000);
                setTimeout(backToList, 2000)
            }

        },
        error: function(a, b, c) {
            alert(a.status);
        }
    })

}
/*提交编辑广告位*/
window.editAdsenseSubmit = function() {
    let _form = $('#form-adsense-add')
    var ad_name = _form.find('input[name=adName]').val();
    var ad_locationId = _form.find('#adsense_location').find('option:selected').val();
    var ad_sort = _form.find('input[name=adsortNum]').val();
    var ad_title = _form.find('input[name=adTitle]').val();
    var ad_subTitle = _form.find('#adsense_subtitle').val();
    console.log(ad_subTitle)
    var start_time = _form.find('input[name=startTime]').val();
    var end_time = _form.find('input[name=endTime]').val();
    var is_online = _form.find('input[name=isOnline]:checked').val();

    var advert_img = document.getElementById('titlePic').files[0];
    var ad_contentId = _form.find('.adContentId').html();
    var ad_contentType = adContentTypeId(_form.find('.adContentType').html())
    var ad_remark = _form.find('textarea#adsense_content').val();
    var id_del = 0;
    // console.log(document.getElementById('titlePic').files[0]);
    if (ad_name == "") {
        modalTip('请填写广告名称', 1000)
        return;
    } else if (ad_locationId == 0) {

        modalTip('请正确选择广告位置', 1000)
        return;
    } else if (ad_sort == "") {

        modalTip('请正确填写排序', 1000)
        return;
    } else if (ad_title == "") {
        modalTip('请正确填写主标题', 1000)
        return;
    } else if (ad_subTitle == "") {
        modalTip('请正确填写副标题', 1000)
        return;
    } else if (start_time == "") {
        modalTip('请正确填写开始时间', 1000)
        return;
    } else if (end_time == "") {
        modalTip('请正确填写结束时间', 1000)
        return;
    } else if (is_online == "") {
        is_online = 0;

    } else if (advert_img == "undefined") {
        modalTip('请正确上传图片', 1000)
        return;
    } else if (ad_contentId == "") {
        modalTip('请选择正确的广告内容', 1000)
        return;
    } else if (ad_contentType == "") {
        modalTip('请选择正确的广告类型', 1000)
        return;
    } else if (ad_remark == "") {
        ad_remark = '无';

    }
    let formdata = new FormData()
    formdata.append("adName", ad_name)
    formdata.append("adLocationId", ad_locationId)
    formdata.append("sortNum", ad_sort)
    formdata.append("adTitle", ad_title)
    formdata.append("adSubTitle", ad_subTitle)
    formdata.append("startTime", start_time)
    formdata.append("endTime", end_time)
    formdata.append("isOnline", is_online)
    formdata.append("advertImg", advert_img)
    formdata.append("adContentId", ad_contentId)
    formdata.append("adContentType", ad_contentType)
    formdata.append("adRemark", ad_remark)
    formdata.append("isDel", id_del)
    formdata.append("id", editAdsenseId)
    console.log(advert_img)
    $.ajax({
        type: 'POST',
        url: _config.buildPath + "api-integral/v1.0/advert/edit",
        dataType: 'json',
        processData: false,
        contentType: false,
        headers: { "token": _config.token },
        data: formdata,
        // data: {
        //     adName       : ad_name,
        //     adLocationId : ad_locationId,
        //     sortNum      : ad_sort,
        //     adTitle      : ad_title,
        //     adSubTitle   : ad_subTitle,
        //     startTime    : start_time,
        //     endTime      : end_time,
        //     isOnline     : is_online,
        //     advertImg    : advert_img,
        //     adContentId  : ad_contentId,
        //     adContentType: ad_contentType,
        //     adRemark     : ad_remark,
        //     isDel        : id_del,
        //     id           : editAdsenseId
        // },
        success: function(res) {
            console.log(res);
            if (res.code !== _encode.REQUEST_SUCCESS) {
                alert(res.msg)
            } else {
                modalTip('编辑广告位成功', 2000);
                setTimeout(backToList, 2000)
            }

        },
        error: function(a, b, c) {
            alert(a.status);
        }
    })

}

function backToList() {

    _utils.backToList();
}

function modalTip(text, dur) {
    $.Huimodalalert(text, dur || 2000)
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
/*验证当前排序*/
$('#adsense_sort').change(function() {

    let input_sort = $(this).val();
    let input_location = parseInt($('#adsense_location').find('option:selected').val());
    if (input_location == '0') {
        modalTip('请先选择广告位置')
        $(this).val('');

    } else if (input_location == '1' && input_sort > adMaxNum.banner) {
        modalTip('该广告位序号超出限制')
        $(this).val('');
    } else if (input_location == '2' && input_sort > adMaxNum.second) {
        modalTip('该广告位序号超出限制')
        $(this).val('');

    } else if (input_location == '3' && input_sort > adMaxNum.hot) {
        modalTip('该广告位序号超出限制')

        $(this).val('');

    } else if (input_location == '4' && input_sort > adMaxNum.recommend) {
        modalTip('该广告位序号超出限制')
        $(this).val('');

    } else if (input_location == '5' && input_sort > adMaxNum.recommend_gifts) {
        modalTip('该广告位序号超出限制')
        $(this).val('');


    }

})

// //广告图片显示在小示意图
// $('#titlePic').change(function() {

//     if($('.img-container').has('img'))
//     {
//         console.log(2)
//     }
//     else
//     {
//         alert('请正确上传图片')
//         return;
//     }
//     let filereader = new FileReader()
//     let img_file = document.getElementById('titlePic').files[0];
//     let location_id = $('#adsense_location').val();
//     if (location_id == 0) {
//         alert('请先选择广告位置');
//         return;
//     }
//     filereader.readAsDataURL(img_file);
//     let img = new Image();
//     filereader.onload = function(res) {
//         img.src = res.target.result;
//         img.onload = function() {
//             if (location_id == 1) {
//                 $('#direction .banner span').hide();
//                 $('#direction .banner').append(`<img src="${img.src}">`);
//             }
//             if (location_id == 2) {
//                 $('#direction .second .block:first span').hide();
//                 $('#direction .second .block').append(`<img src="${img.src}">`);
//             }
//             if (location_id == 3) {
//                 $('#direction .third:first span').hide();
//                 $('#direction .third:first').append(`<img src="${img.src}">`);
//             }
//             if (location_id == 4) {
//                 $('#direction .forth span').hide();
//                 $('#direction .forth').append(`<img src="${img.src}">`);
//             }
//             if (location_id == 5) {
//                 $('#direction .fifth .block:first span').hide();
//                 $('#direction .fifth .block:first').append(`<img src="${img.src}">`);
//             }
//         }
//     }

// })