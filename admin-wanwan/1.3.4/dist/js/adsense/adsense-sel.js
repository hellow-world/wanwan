webpackJsonp([6],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(21);


/***/ }),

/***/ 7:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: admin
	 * @Date:   2018-03-08 17:50:59
	 * @Last Modified by:   admin
	 * @Last Modified time: 2018-04-10 09:49:19
	 */
	__webpack_require__(7);
	var _encode = __webpack_require__(3)
	var _config = __webpack_require__(1)
	var _utils = __webpack_require__(2)
	
	
	/*分页使用到的参数*/
	var pagenum = 1; //总行数
	var isSearch = false; //false:没有搜索之后的分页查询。 true： 有了搜索的分页查询
	var isFirstSel = 0; //0: 不是第一次查询，不需返回页数   1： 是第一次查询，需要返回页数
	var num_perPage = 15; //分页后台传参数
	
	
	
	var AdsenseMsg = "";
	var AdsenseOnlineMsg = "";
	var currentEditId = 0;
	var adsense_isOnline = 0; //默认广告位在线
	
	
	var adsenseTypeId = 1; //默认广告位置类型为1----暂定为banner
	
	
	$(document).ready(function() {
	    isFirstSel = 1;
	    selAdsenseList();
	})
	/*开关按钮的切换*/
	var obj_tab_switch;
	var obj_id;
	var obj_location;
	
	window.tab_switch = function(obj) {
	
	    //每次验证当前广告位是否超出规定数量
	
	    _this = $(obj);
	    obj_id = _this.parent().siblings('.advert_id').html();
	    obj_location = _this.parent().siblings('.advert_location').html();
	    obj_tab_switch = obj;
	    // var afterStyle = window.getComputedStyle(obj, ":after");
	    var _switch = obj.getAttribute('data-switch');
	
	    if (obj_location !== 'banner') {
	
	        alert('该广告位禁止强制下线');
	        return;
	    }
	
	    if (_switch === "off") {
	        $('#modal-adsense').find('.modal-body p').html('是否确认上线');
	        $('#modal-adsense').modal("show");
	
	        return;
	    } else if (_switch === "on") {
	        $('#modal-adsense').find('.modal-body p').html('是否确认下线');
	        $('#modal-adsense').modal("show");
	        return;
	    }
	
	}
	//上下线处理
	window.confirm_tab = function() {
	
	    var _switch = obj_tab_switch.getAttribute('data-switch');
	    $('#modal-adsense').modal("hide");
	    if (_switch === "off") {
	
	        $(obj_tab_switch).css('background', '#199ed8');
	        $(obj_tab_switch).removeClass('off');
	        $(obj_tab_switch).addClass('on');
	        $(obj_tab_switch).attr('data-switch', 'on')
	        adsense_isOnline = 1;
	        adsenseOnline(obj_id, adsense_isOnline);
	
	    } else {
	        $(obj_tab_switch).css('background', '#888');
	        $(obj_tab_switch).removeClass('on');
	        $(obj_tab_switch).addClass('off');
	        $(obj_tab_switch).attr('data-switch', 'off')
	        adsense_isOnline = 0;
	        adsenseOnline(obj_id, adsense_isOnline);
	    }
	}
	
	function adsenseOnline(id, iso) {
	    $.ajax({
	        type: 'put',
	        url: _config.buildPath+'api-integral/1.0/advert/onlineState',
	        headers:{"token":_config.token},
	        data: {
	            advertId: id,
	            isOnline: iso
	        },
	        dataType: 'json',
	        success: function(res) {
	            console.log(res);
	        },
	        error: function(a, b, c) {
	            alert(a.status);
	        }
	    })
	}
	//查询广告位
	function selAdsenseList() {
	    isFirstSel = false;
	    $.ajax({
	        type: 'GET',
	        url: _config.buildPath+"api-integral/v1.0/advert/all",
	        headers:{"token":_config.token},
	        // data: {
	        //     page: pagenum,
	        //     isFirstSel: isFirstSel
	        // },
	        dataType: 'json',
	        success: function(res) {
	            console.log(res);
	            if (res.code != _encode.REQUEST_SUCCESS) {
	                alert(res.msg)
	            } else {
	
	                var message = res.result;
	                AdsenseMsg = message;
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
	                                selAdsenseList();
	                        }
	                    });
	                }
	                /*为表格赋值*/
	                $("#adsenseTbody").empty();
	                $("#adsenseTbody").append(setValueToTable(message, getradiohtml()));
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
	    var locationName = param.adLocationId
	    if (locationName === 1) {
	        locationName = 'banner';
	    } else if (locationName === 2) {
	        locationName = '二级广告位';
	    } else if (locationName === 3) {
	        locationName = '热门活动';
	    } else if (locationName === 4) {
	        locationName = '推荐商品大图';
	    } else if (locationName === 5) {
	        locationName = '推荐商品小图';
	    }
	    var res = '<tr class="text-c" >' + behind;
	    //for(var key in param )
	    res += "<td class='advert_id'>" + param.id + "</td>";
	    res += "<td>" + param.adName + "</td>";
	    res += "<td class='advert_location'>" + locationName + "</td>";
	    res += "<td>" + param.sortNum + "</td>";
	    res += "<td>" + "" + "</td>";
	    res += "<td>" + param.startTime + "</td>";
	    res += "<td>" + param.endTime + "</td>";
	    res += "<td>" + param.createTime + "</td>";
	    if (param.isOnline == 0) {
	        res += "<td>" + "<div class='tgl-btn off' data-switch='off' onclick='tab_switch(this);'>" + "</div>" + "</td>";
	    }
	    if (param.isOnline == 1) {
	        res += "<td>" + "<div class='tgl-btn on' data-switch='on' onclick='tab_switch(this);'>" + "</div>" + "</td>";
	    }
	    res += "<td>" + "" + "</td>";
	    res += "<td>" + param.adRemark + "</td>";
	    res += "<td>" + "全部" + "</td>";
	    if (param.isTop == 1) {
	        res += getoperaHtml_down();
	    } else {
	        res += getoperaHtml_up();
	    }
	    return res + "</tr>";
	}
	
	/* 操作栏up*/
	function getoperaHtml_up() {
	    var res = "<td>" +
	        "<a title='修改' href='javascript:;' class='ml-5 btn_edit' style='text-decoration:none' onclick='adsense_edit(this)'><i class='Hui-iconfont'>&#xe6df;</i></a>" +
	        "<a title='删除' href='javascript:;' class='ml-5 btn_del' style='text-decoration:none' onclick='adsense_del(this)'><i class='Hui-iconfont'>&#xe6e2;</i></a>" +
	        "</td>";
	    return res;
	}
	
	/* 操作栏down*/
	function getoperaHtml_down() {
	    var res = "<td>" +
	        "<a title='修改' href='javascript:;' class='ml-5 btn_edit' style='text-decoration:none' onclick='adsense_edit(this)'><i class='Hui-iconfont'>&#xe6df;</i></a>" +
	        "<a title='删除' href='javascript:;' class='ml-5 btn_del' style='text-decoration:none' onclick='adsense_del(this)'><i class='Hui-iconfont'>&#xe6e2;</i></a>" +
	        "</td>";
	    return res;
	}
	/*radio栏html*/
	function getradiohtml() {
	    var res = "<td><input type='checkbox'></td>";
	    return res;
	}
	//广告位排序
	window.adsenseSort = function() {
	
	    $('#modal-adsenseSort').modal('show');
	    adsenseSortList();
	}
	//广告位编辑
	window.adsense_edit = function(obj) {
	
	    var $id = $(obj).parent('td').siblings('.advert_id').text();
	    window.location.href = "./adsense-add.html" + "?adsenseId=" + $id;
	}
	//广告位删除
	window.adsense_del = function(obj) {
	
	    _this = $(obj);
	    var $id = parseInt($(obj).parent('td').siblings('.advert_id').text());
	    var online = _this.parent().siblings().eq(9).find('div').attr('data-switch')
	    console.log(online)
	    if (online === 'on') {
	        _utils.modalTip('该广告位未下线', 3000);
	        return;
	
	    } else if (online === 'off') {
	        delteAdsense($id, obj);
	
	    }
	
	}
	/**
	 * 删除广告位
	 * @param activityId
	 * @param obj
	 */
	function delteAdsense(AdsenseId, obj) {
	    var formData = new FormData();
	    formData.append("advertId", AdsenseId);
	    console.log(typeof AdsenseId)
	    console.log(AdsenseId)
	    $.ajax({
	        url: _config.buildPath+"api-integral/v1.0/advert/isDel",
	        type: "PUT",
	        dataType: "json",
	        headers: { "token": _config.token },
	        // processData: false,
	        // contentType: false,
	        data: {
	            advertId: AdsenseId
	        },
	        success: function(result) {
	            if (result.code == _encode.REQUEST_SUCCESS) {
	                _utils.modalTip("已成功删除广告位",2000);
	                $(obj).parent('tr').remove();
	                setTimeout(reload,2000)
	            } else {
	                alert(result.msg);
	            }
	        },
	        error: function(a, b, c) {
	            alert(a.status);
	        }
	    });
	}
	
	
	//根据筛选条件搜广告位
	function selAdsenseSubmit() {
	    var startTime = $("#adsenseSel_startTime").val();
	    var endTime = $("#adsenseSel_endTime").val();
	    isFirstSel = 1;
	    if (_utils.utils_isNull(startTime) && _utils.utils_isNull(endTime)) {
	        isSearch = false;
	        pagenum = 1;
	        selAdsense();
	    } else if (!_utils.utils_isNull(startTime) && !_utils.utils_isNull(endTime) && startTime <= endTime) {
	        isSearch = false;
	        selGuessByDate();
	    } else {
	        alert(ERROR_SELECT_PARAM);
	    }
	
	
	}
	// 广告排序搜索
	function adsenseSortList() {
	    console.log('进入排序')
	    $.ajax({
	        url: _config.buildPath+"api-integral/v1.0/advert/mainPage",
	        type: 'GET',
	        dataType: 'json',
	        headers: { "token": _config.token },
	        success: function(res) {
	            console.log(res)
	            if (res.code != _encode.REQUEST_SUCCESS) {
	                alert(res.msg)
	            } else {
	                message = res.result;
	                AdsenseOnlineMsg = message;
	                setValueToSortTable(message, adsenseTypeId)
	
	
	            }
	        },
	        error: function(a, b, c) {
	            alert(a.status);
	        }
	    })
	}
	
	function setValueToSortTable(param, id) {
	    $('#selSortbody').empty();
	    $("#selSortbody").append(setValueSort(message, id));
	}
	
	function setValueSort(param, id) {
	    var res = "";
	    var initList = new Array();
	    for (var i = 0; i < param.length; i++) {
	
	        if (param[i].adLocationId === id) {
	            var initObject = new Object();
	            initObject.id = param[i].id;
	            initObject.adName = param[i].adName;
	            initObject.createTime = "2018-3-14";
	            initObject.sortNum = param[i].sortNum;
	        } else {
	            continue;
	        }
	        initList.push(initObject)
	    }
	    for (var i = 0; i < initList.length; i++) {
	
	        res += addTdToTable_sort(initList[i]);
	    }
	    return res;
	
	}
	
	function addTdToTable_sort(param) {
	    var res = "<tr class='text-c'>"
	    res += "<td>" + param.id + "</td>";
	    res += "<td>" + param.adName + "</td>"
	    res += "<td>" + param.createTime + "</td>"
	    res += `<td><input type='text' value=${param.sortNum} class='inputSort' name='sortNum'></td>`
	    return res + "</tr>"
	}
	//排序框提交
	window.adsenseSortSubmit = function() {
	
	
	    var ad_locationId = $("#adsense_type_sort").find('option:selected').val();
	    if (ad_locationId === 0) {
	        ad_locationId = 1;
	    }
	    var sortMsg = new Array();
	    $('#selSortbody').find('tr').each(function() {
	        var $td = $(this).children('td');
	        if (($td.parent().index() + 1) > 0) {
	            var obj = new Object();
	
	            var id = $(this).children('td:eq(0)').text();
	            var sort_num = $(this).children('td:eq(3)').find('input').val();
	            
	            obj.id = parseInt(id);
	            obj.sortNum = parseInt(sort_num);
	            sortMsg.push(obj);
	        }
	    })
	    
	    //中间做数组去重验证
	    if (!sortNumVerify(sortMsg)) {
	
	        _utils.modalTip('排序中有重复的序号', 2000);
	        return;
	    }
	    $.ajax({
	        url: _config.buildPath+"api-integral/v1.0/advert/sort",
	        dataType: 'json',
	        type: 'PUT',
	        headers: { "token": _config.token },
	        data: {
	
	            adLocationType: adsenseTypeId,
	            sortMsg: JSON.stringify(sortMsg)
	        },
	        success: function(res) {
	            if(res.code!=_encode.REQUEST_SUCCESS)
	            {
	                    alert(res.msg)
	            }
	            else
	            {
	                _utils.modalTip('广告位排序成功',1000);
	                setTimeout(reload,1000)
	            }        
	        },
	        error: function(a, b, c) {
	            alert(a.status);
	        }
	    })
	
	}
	//类型选择框变换
	$('#adsense_type_sort').change(function() {
	
	    var $locationId = parseInt($(this).find('option:selected').val());
	    setValueToSortTable(AdsenseOnlineMsg, $locationId)
	
	})
	//排序序号重复验证
	function sortNumVerify(arr) {
	    if (arr.length > 1) {
	        for (var i = 0; i < arr.length; i++) {
	            let item = arr[i]['sortNum'];
	            let num = 0;
	            console.log('item'+item)
	            for (var j = 0; j < arr.length; j++) {
	                if (item == arr[j]['sortNum']) {
	                    num += 1;
	                }
	                console.log('重复次数：'+num)
	                console.log(arr[j]['sortNum']);
	            }
	            
	            if (num > 1) {
	
	                return false;
	                break;
	            }
	            else
	            {
	                return true;
	                break;
	            }
	
	        }
	    } else {
	        return true;
	    }
	
	}
	function reload()
	{
	    window.location.reload();
	}

/***/ })

});