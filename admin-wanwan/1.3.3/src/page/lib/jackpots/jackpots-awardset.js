var awardMsg = "";
var curEditAwardId = 0; //正在修改的awardID
/*分页使用到的参数*/
var pagenum_awardlist =1 ; //页码
var isFirstSel_awardlist = 1; //0: 不是第一次查询，不需返回页数   1： 是第一次查询，需要返回页数
/**
 * 新建奖励
 */
function addLotteryAward(){
	initAddDiaData();
	$("#addLotteryDia").modal("show");
}

/**
 * 
 */
function tab_package(){
	hideBt();
	$("#a_lottery").show();
	selAwardList();
}

function signSceen(){
	//top.document.location.href = basePath +"/lottery/turnSceen?lotteryId="+lotteryId;
	window.open(basePath +"/lottery/turnSceen?lotteryId="+lotteryId);
}

function initAddDiaData(){
	$("#award_name").val("");
	$("#award_img").val("");
	$("#lotteryPicContainer").html("");
	$("#award_lottery_group").html("");
	$("#award_lottery_group").append('<option value=0>全部用户</option>');
	if(groupMsg.length!=0){
		for (var i = 0; i < groupMsg.length; i++) {
			$("#award_lottery_group").append('<option value="'+groupMsg[i].id+'">'+groupMsg[i].groupName+'</option>');
		}
	}
}

function initEditDiaData(id){
	for (var i = 0; i < awardMsg.length; i++) {
		if(awardMsg[i].id == id){
			var msg = awardMsg[i];
			$("#edit_award_name").val(msg.awardName);
			$("#edit_award_img").val("");
			$("#lotteryPicEditContainer").html('<img width="100px" src="'+awardMsg[i].awardImg+'">');
			$("#edit_award_lottery_group").html("");
			$("#edit_award_lottery_group").append('<option value="0">全部用户</option>');
			if(groupMsg.length!=0){
				for (var j = 0; j < groupMsg.length; j++) {
					$("#edit_award_lottery_group").append('<option value="'+groupMsg[j].id+'">'+groupMsg[j].groupName+'</option>');
				}
			}
			$("#edit_award_lottery_group").val(awardMsg[i].lotteryGroupId);
		}
	}
	
}


function selAwardList(){
	$.ajax({
  		url : basePath + "/lotteryAward/selList",
  		type : "POST",
  		dataType : "json",
  		data :{
  			lotteryId : lotteryId,
  			page : pagenum_awardlist,
			isFirstSel : isFirstSel_awardlist,
			colPerPage : page_half
  		},
  		success : function(result){
  			if(result.code == REQUEST_SUCCESS){
  				awardMsg = result.result;
  				var awardMsgSel = new Array();
  				awardMsgSel = Copy(awardMsg, awardMsgSel);
  				if(awardMsgSel.length!=0){
  					for (var i = 0; i < awardMsgSel.length; i++) {
  						awardMsgSel[i].awardImg = '<img width="60px" src="'+awardMsgSel[i].awardImg+'">';
						delete awardMsgSel[i].lotteryGroupId;
						delete awardMsgSel[i].lotteryId;
						delete awardMsgSel[i].createTime;
					}
  					/*分页*/
					if(isFirstSel_awardlist==1){
						isFirstSel_awardlist = 0;
						 $("#page_awardlist").paging({
							 totalPage: Math.ceil(result.msg/page_half),
							 totalSize: result.msg,
							 callback: function(num) {
								 	pagenum_awardlist = num;
								 	selAwardList();
							 	}
						 });
					}
  					/*为表格赋值*/
  					$("#awardTbody").empty();
  					$("#awardTbody").append(setValueToTable(awardMsgSel,getradiohtml(),getOperateHtml()));
  				}
  			}
  		},
  		error : function(a, b, c){
  			alert(a.status);
  		}
	});
}


/* 操作栏html*/
function getOperateHtml(){
	var res = "<td><a title='编辑' href='javascript:;' onclick='award_edit(this)' class='ml-5' style='text-decoration:none'><i class='Hui-iconfont' style='color: #5a98de;'>编辑&#xe6df;</i></a>"+
				"<a title='删除' href='javascript:;' onclick='award_del(this)' class='ml-5' style='text-decoration:none'><i class='Hui-iconfont' style='color: #5a98de;'>删除&#xe6e2;</i></a></td>";
return res;
}

/**
 * 编辑奖品
 * @param obj
 */
function award_edit(obj){
	
	var $td= $(obj).parents('tr').children('td');  
    var id = $td.eq(1).text();
    curEditAwardId = id;
    initEditDiaData(id);
    $("#editLotteryDia").modal("show");
}

function isChangeEditData(awardName,groupId,awardImgs){
	var msg = "";
	for (var i = 0; i < awardMsg.length; i++) {
		if(awardMsg[i].id == curEditAwardId){
			msg = awardMsg[i];
		}
	}
	if(utils_isNull(awardImgs) && awardName==msg.awardName && groupId == msg.lotteryGroupId){
		return true;
	}
	return false;
}

/**
 * 新增奖励提交
 */
function addAwardSubmit(){
	var awardName = $("#award_name").val();
	var groupId = $("#award_lottery_group").val();
	var awardImgs = $('input[id="award_img"]').prop('files')[0];
	if(utils_isNull(awardName)){
		$("#awardAddTip").html("请填写奖励名称");
	}
	else if(utils_isNull(awardImgs)){
		$("#awardAddTip").html("请选择图片");
	}else{
		var formData = new FormData();
		formData.append("awardName", awardName);
		formData.append("lotteryGroupId", groupId);
		formData.append("lotteryId", lotteryId);
		formData.append("icon", awardImgs);
		$.ajax({
	  		url : basePath + "/lotteryAward/add",
	  		type : "POST",
	  		dataType : "json",
	  		data :formData,
			processData : false,
			contentType : false,
			traditional : true,
	  		success : function(result){
	  			if(result.code == REQUEST_SUCCESS){
					$("#addLotteryDia").modal("hide");
					selAwardList();
					//modalalert("添加成功");
	  			}
	  		},
	  		error : function(a, b, c){
	  			alert(a.status);
	  		}
		});
	}
} 

function editAwardSubmit(){
	
	var awardName = $("#edit_award_name").val();
	var groupId = $("#edit_award_lottery_group").val();
	var awardImgs = $('input[id="edit_award_img"]').prop('files')[0];
	if(isChangeEditData(awardName,groupId,awardImgs)){
		alert("noting is changed, can't submit");
	}else{
		//alert("test wrong ")
		if(utils_isNull(awardName)){
			$("#editAwardAddTip").html("请填写奖励名称");
		}
		else{
			if(utils_isNull(awardImgs)){
				awardImgs = null;
			}
			var formData = new FormData();
			formData.append("awardName", awardName);
			formData.append("lotteryGroupId", groupId);
			formData.append("id", curEditAwardId);
			formData.append("icon", awardImgs);
			alert(1);
			$.ajax({
		  		url : basePath + "/lotteryAward/edit",
		  		type : "POST",
		  		dataType : "json",
		  		data :formData,
				processData : false,
				contentType : false,
				traditional : true,
		  		success : function(result){
		  			if(result.code == REQUEST_SUCCESS){
						$("#editLotteryDia").modal("hide");
						selAwardList();
						modalalert("编辑成功");
		  			}
		  		},
		  		error : function(a, b, c){
		  			alert(a.status);
		  		}
			});
		}
	}
	
}

