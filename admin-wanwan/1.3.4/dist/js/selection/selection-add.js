webpackJsonp([13],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(41);


/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: admin
	 * @Date:   2018-03-12 14:33:30
	 * @Last Modified by:   admin
	 * @Last Modified time: 2018-04-28 09:32:58
	 */
	var _config = __webpack_require__(1)
	var _utils = __webpack_require__(2)
	var _encode = __webpack_require__(3)
	var pagenum = 1; //总行数
	var isSearch = false; //false:没有搜索之后的分页查询。 true： 有了搜索的分页查询
	var isFirstSel = 0; //0: 不是第一次查询，不需返回页数   1： 是第一次查询，需要返回页数
	
	var voteMsg = "";
	var currentEditId = 0;
	var editVoteId;
	
	
	$(function() {
	
	
	    editVoteId = _utils.getParams("voteId");
	    if (editVoteId == null) {
	        $("#addSubmitBtn").show();
	        $("#editSubmitBtn").hide();
	    } else {
	        $("#editSubmitBtn").show();
	        $("#addSubmitBtn").hide();
	        selVote();
	    }
	})
	
	function selVote() {
	
	    /*请求edit数据*/
	    $.ajax({
	        url: _config.buildPath+"api-social/v1.0/vote",
	        type: "GET",
	        headers: { "token": _config.token },
	        data: {
	            id: editVoteId
	        },
	        dataType: "json",
	        success: function(result) {
	            if (result.code != _encode.REQUEST_SUCCESS) {
	                alert(result.msg);
	            } else {
	                console.log(result);
	                var message = result.result;
	                setVote(message[0]);
	            }
	        },
	        error: function(a, b, c) {
	            alert(a.status);
	        }
	    });
	}
	
	function setVote(param) {
	    var _form = $('#form-vote-add');
	    _form.find('input[name=voteTitle]').val(param.voteSubject)
	    _form.find('input[name=voteSubTitle]').val(param.voteSubhead)
	    _form.find('input[name=voteSubTitle]').val(param.voteSubhead)
	    _form.find('input[name=startTime]').val(param.voteStartTime)
	    _form.find('input[name=endTime]').val(param.voteEndTime)
	    _form.find('#titlePicContainer').html(`<img src='${param.voteCover}'>`)
	    if (param.isOnline === 1) {
	        _form.find('#adOn').attr('checked', 'checked')
	    }
	    if (param.isOnline === 0) {
	        _form.find('#adOff').attr('checked', 'checked')
	    }
	    _form.find('textarea').val(param.voteIntroduction)
	
	}
	
	
	window.addVoteSubmit = function() {
	
	    var _form = $('#form-vote-add')
	    var v_title = _form.find("input[name='voteTitle']").val();
	    var v_subtitle = _form.find('input[name=voteSubTitle]').val();
	    var start_time = _form.find('input[name=startTime]').val();
	    var end_time = _form.find('input[name=endTime]').val();
	    var is_online = _form.find('input[name=isOnline]:checked').val();
	    var is_official = _form.find('input[name=isOfficial]:checked').val(); //是否官方
	
	    var v_img = document.getElementById('titlePic').files[0];
	    var v_des = _form.find('textarea').val();
	
	    console.log('主标题' + v_title)
	
	    if (v_title == "") {
	        _utils.modalTip('请填写主标题', 1000)
	        return;
	    } else if (v_subtitle == "") {
	        _utils.modalTip('请正确填写副标题', 1000)
	        return;
	    } else if (start_time == "") {
	        _utils.modalTip('请正确填写开始时间', 1000)
	        return;
	    } else if (end_time == "") {
	        _utils.modalTip('请正确填写结束时间', 1000)
	        return;
	    } else if (is_online == "") {
	        is_online = 0;
	
	    } else if (v_img == "undefined") {
	        _utils.modalTip('请正确上传图片', 1000)
	        return;
	    } else if (v_des == "") {
	        _utils.modalTip('请正确填写描述', 1000)
	        return;
	
	    }
	    var formdata = new FormData()
	    formdata.append("subject", v_title)
	    formdata.append("subhead", v_subtitle)
	    formdata.append("startTime", start_time)
	    formdata.append("endTime", end_time)
	    formdata.append("isOnline", is_online)
	    formdata.append("cover", v_img)
	    formdata.append("voteType",is_official)
	    formdata.append("introduction", v_des)
	
	    console.log(formdata.get('subject'));
	
	    $.ajax({
	
	        type: 'POST',
	        url: _config.buildPath + "api-social/v1.0/vote",
	        headers: { "token": _config.token },
	        processData: false,
	        contentType: false,
	        dataType: 'json',
	        data: formdata,
	
	        success: function(res) {
	            console.log(res)
	            if (res.code !== _encode.REQUEST_SUCCESS) {
	                alert(res.msg)
	            } else {
	                _utils.modalTip('添加评选活动成功', 2000);
	                setTimeout(back, 2000)
	            }
	
	        },
	        error: function(a, b, c) {
	            alert(a.status);
	        }
	    })
	}
	
	function back() {
	    _utils.backToList();
	}
	
	window.editVoteSubmit = function() {
	    var _form       = $('#form-vote-add')
	    var v_title     = _form.find("input[name='voteTitle']").val();//主标题
	    var v_subtitle  = _form.find('input[name=voteSubTitle]').val();//副标题
	    var start_time  = _form.find('input[name=startTime]').val();//开始时间
	    var end_time    = _form.find('input[name=endTime]').val();//结束时间
	    var is_online   = _form.find('input[name=isOnline]:checked').val();//是否上线
	    var is_official = _form.find('input[name=isOfficial]:checked').val(); //是否官方
	    var v_img       = document.getElementById('titlePic').files[0];//图片
	    var v_des       = _form.find('textarea').val();//描述
	
	    console.log('主标题' + v_title)
	
	    if (v_title == "") {
	        _utils.modalTip('请填写主标题', 1000)
	        return;
	    } else if (v_subtitle == "") {
	        _utils.modalTip('请正确填写副标题', 1000)
	        return;
	    } else if (start_time == "") {
	        _utils.modalTip('请正确填写开始时间', 1000)
	        return;
	    } else if (end_time == "") {
	        _utils.modalTip('请正确填写结束时间', 1000)
	        return;
	    } else if (is_online == "") {
	        is_online = 0;
	
	    } else if (v_img == "undefined") {
	        _utils.modalTip('请正确上传图片', 1000)
	        return;
	    } else if (v_des == "") {
	        _utils.modalTip('请正确填写描述', 1000)
	        return;
	
	    }
	    var formdata = new FormData()
	    formdata.append("subject", v_title)
	    formdata.append("subhead", v_subtitle)
	    formdata.append("startTime", start_time)
	    formdata.append("endTime", end_time)
	    formdata.append("isOnline", is_online)
	    formdata.append("cover", v_img)
	    formdata.append("introduction", v_des)
	    formdata.append("voteType",is_official)
	    formdata.append("voteId",editVoteId)
	    console.log(formdata.get('subject'));
	
	    $.ajax({
	
	        type: 'POST',
	        url: _config.buildPath + "api-social/v1.0/vote/update",
	        headers: { "token": _config.token },
	        processData: false,
	        contentType: false,
	        dataType: 'json',
	        data: formdata,
	
	        success: function(res) {
	            console.log(res)
	            if (res.code !== _encode.REQUEST_SUCCESS) {
	                alert(res.msg)
	            } else {
	                _utils.modalTip('编辑评选活动成功', 2000);
	                setTimeout(back, 2000)
	            }
	
	        },
	        error: function(a, b, c) {
	            alert(a.status);
	        }
	    })
	}

/***/ })

});