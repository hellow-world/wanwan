


var _utils = require('util/utils.js')
var usersInfo = "";
var groupMsg = "";

//是否为黑名单
var ISBLACKLIST = 1;  
var NOBLACKLIST = 0;

var curEditGroupId = 0;  //0全部  -1 黑名单  其他 id

/*分页使用到的参数*/
var pagenum_userlist =1 ; //总行数
var isFirstSel_userlist = 0; //0: 不是第一次查询，不需返回页数   1： 是第一次查询，需要返回页数

$(function(){
	isFirstSel_userlist = 1;
	selUsers();
	$("#groupDl").find("dt").addClass('grayb'); 
});

/**
 * 右分组dd点击事件
 * @param obj  this
 */
function ddOnclick(obj){
	$("#selAllCheck").attr("checked",false);
	$("#groupDl").find("dd").removeClass('grayb');
	$("#groupDl").find("dt").removeClass('grayb');
	$(obj).addClass('grayb'); 
	curEditGroupId = $(obj).attr("group");
	$("#allUserDiv_left").html($(obj).attr("name"));
	selectUsersByGroupId(curEditGroupId,NOBLACKLIST);
	$("#moveLabel").show();
	$("#addBlackLabel").show();
	$("#moveBlackLabel").hide();
	$("#addToGroupLabel").show();
}

/**
 * 分组全部用户点击事件
 * @param obj this
 */
function dtOnclick(obj){
	$("#selAllCheck").attr("checked",false);
	$("#groupDl").find("dd").removeClass('grayb');
	$(obj).addClass('grayb'); 
	curEditGroupId = 0;
	$("#allUserDiv_left").html("全部用户");
	$("#moveLabel").hide();
	$("#addBlackLabel").show();
	$("#moveBlackLabel").hide();
	$("#addToGroupLabel").show();
	setAllUsersInfo(curEditGroupId,NOBLACKLIST);
}

/**
 * 黑名单dt点击事件
 */
function blackDtOnclick(){
	$("#selAllCheck").attr("checked",false);	
	$("#addToGroupLabel").hide();
	$("#moveLabel").hide();
	$("#addBlackLabel").hide();
	$("#moveBlackLabel").show();
	$("#allUserDiv_left").html("黑名单");
	curEditGroupId = -1;
	
	setAllUsersInfo(curEditGroupId,ISBLACKLIST);
}
/**
 * 点击tab栏
 */
function tab_user(){
	hideBt();
}

/**
 * 添加分组
 */
function add_userGroup(){
	$("#groupName").val("");
	$("#addGroupDia").modal("show");
} 

/**
 * 查询所有用户
 * @param groupId  -1 : 黑名单  0： 所有用户  其他 ： groupId
 */
function selUsers(){
	$.ajax({
  		url : _utils.basePath + "lottery/selUserList",
  		type : "POST",
  		dataType : "json",
  		data : {
  			lotteryId : lotteryId,
  			page : pagenum_userlist,
			isFirstSel : isFirstSel_userlist
  		},
  		success : function(result){
  			if(result.code == REQUEST_SUCCESS){
  				var message = result.result;
  				/*分页*/
				if(isFirstSel_userlist==1){
					isFirstSel_userlist = 0;
					 $("#page_userlist").paging({
						 totalPage: Math.ceil(result.msg/6),
						 totalSize: result.msg,
						 callback: function(num) {
							 	pagenum_userlist = num;
						 		selUsers();
						 	}
					 });
				}
  				usersInfo = message;
  				getUsersDtNum(ISBLACKLIST)
  				$("#blackNum").html(blackCount);
  				setAllUsersInfo(curEditGroupId,NOBLACKLIST);
  				selGroups();
  			}
  		},
  		error : function(a, b, c){
  			alert(a.status);
  		}
	});
}

/**
 * 查找群组
 */
function selGroups(){
	$.ajax({
  		url : _utils.basePath + "lottery/selGroupList",
  		type : "POST",
  		dataType : "json",
  		data : {
  			lotteryId : lotteryId
  		},
  		success : function(result){
  			if(result.code == REQUEST_SUCCESS){
  				var message = result.result;
  				groupMsg = message;
  				$("#groupDl").html("");
  				$("#groupDl").append(addGroupDtHtml());
  				getUsersDtNum(NOBLACKLIST);
  				$("#allUserSum").html(usersCount);
  				if(message.length!=0){
  					for(var i=0; i<message.length; i++){
  						addHtmlToGroup(message[i].groupName,message[i].id,getUsersNum(message[i].id,NOBLACKLIST));
  					}
  				}
  			}
  		},
  		error : function(a, b, c){
  			alert(a.status);
  		}
	});
}

/**
 *获取userNum
 */
function getUsersNum(groupId,isBlackList){
	var count = 0;
	for (var i = 0; i < usersInfo.length; i++) {
		if(usersInfo[i].groupId == groupId && usersInfo[i].isBlackList==isBlackList )
			count++;
	}
	return count;
}

/**
 * 查询单分组
 */
function selectUsersByGroupId(groupId,isBlackList){
	$("#userinfo_ul").html("");
	if(usersInfo.length!=0){
		for(var i=0; i<usersInfo.length; i++){
			if(usersInfo[i].groupId == groupId&&usersInfo[i].isBlackList==isBlackList)
			$("#userinfo_ul").append(addHtmlToUserInfoHtml(usersInfo[i]));
		}
	}
}

/**
 * 显示所有用户的信息
 * @param groupId  -1 : 黑名单  0： 所有用户  其他 ： groupId
 */
var usersCount = 0;
var blackCount = 0;
function setAllUsersInfo(groupId, isBlackList){
	$("#userinfo_ul").html("");
	if(groupId==-1)
		isBlackList = ISBLACKLIST;
	if(usersInfo.length!=0){
		var groupArray = new Array();
		if((groupId==0||groupId==-1)){
			for(var i=0; i<usersInfo.length; i++){
				if(!groupArray.contains(usersInfo[i].userId)&&usersInfo[i].isBlackList==isBlackList){
					groupArray.push(usersInfo[i].userId);
					$("#userinfo_ul").append(addHtmlToUserInfoHtml(usersInfo[i]));
				}
			}
		}else{
			for(var i=0; i<usersInfo.length; i++){
				if(!groupArray.contains(usersInfo[i].userId)&&usersInfo[i].isBlackList==isBlackList&&usersInfo[i].groupId==groupId){
					groupArray.push(usersInfo[i].userId);
					$("#userinfo_ul").append(addHtmlToUserInfoHtml(usersInfo[i]));
				}
			}
		}
		
	}
}

/**
 * 获取总黑名单和所有用户的人数
 * @param isBlackList
 */
function getUsersDtNum(isBlackList){
	var count  = 0;
	if(usersInfo.length!=0){
		var usersArray = new Array();
		for(var i=0; i<usersInfo.length; i++){
			if(!usersArray.contains(usersInfo[i].userId)&&usersInfo[i].isBlackList==isBlackList){
				usersArray.push(usersInfo[i].userId);
				count++;
			}
		}
		if(isBlackList == ISBLACKLIST){
			blackCount = count;
		}else{
			usersCount = count;
		}
	}
}

/**
 * 添加分组html
 * @param groupName
 * @param userNumId
 * @param groupIdHtmlId
 * @param groupId
 * @returns {String}
 */
function addGroupHtml(groupName,userNumId,groupIdHtmlId,groupId){
	var res = '<dd class="right_1_dd" group="'+groupId+'" name="'+groupName+'" onclick="ddOnclick(this)"><span>'+groupName+'</span><em><span>(</span><span id="'+userNumId+'">0</span><span>)</span><span id="'+groupIdHtmlId+'" style="display: none;">1</span></em></dd>';
	
	return res;
}

/**
 * groupHtml Dt 
 * @returns {String}
 */
function addGroupDtHtml(){
	var res = '<dt class="right_1_dt" id="allUserDt" onclick="dtOnclick(this)" group="0">'+
	'<span class="right_1_1">全部用户</span><em><span>(</span><span id="allUserSum">3</span><span>)</span></em></dt>';
	return res;
}

/**
 * 添加分组并赋值
 * @param groupName
 * @param groupId
 * @param userNum
 */
function addHtmlToGroup(groupName,groupId,userNum){
	var userNumHtmlId = groupId+"_"+"num";
	var groupIdHtmlId = groupId+"_id";
	$("#groupDl").append(addGroupHtml(groupName,userNumHtmlId,groupIdHtmlId,groupId));
	document.getElementById(userNumHtmlId).innerText = userNum;
	document.getElementById(groupIdHtmlId).innerText = groupId;
}
/**
 * li 的新增属性 data1：userId   data2：userName
 * @param message
 */
function addHtmlToUserInfoHtml(message){
	
	var res = '<li class="left_3_li" ><label><input type="checkbox" name="user_checkbox" value1="'+message.id+'" onclick="usercheckClick(this)" value="'+message.userId+'"><span>&nbsp;&nbsp;&nbsp;</span><img style="width: 48px; width: 48px" src="'+message.userAvatar+'"><span>&nbsp;&nbsp;&nbsp;</span><span class="name">'+message.userName+'</span></label></li>';
	return res;
}

/**
 * 全选监听事件
 */
function selAllClick(){
	var all = document.getElementById("selAllCheck");
	var userCheck = document.getElementsByName("user_checkbox");
	if(all.checked == true){
		for(var i=0;i<userCheck.length;i++){
			userCheck[i].checked = true;
        }
	}else{
        if(userCheck.length){
            for(var i=0;i<userCheck.length;i++){
            	userCheck[i].checked = false;
            }
        }
    }
	isOpenBtn();
}

/**
 * 子checkbox监听事件
 * @param obj
 */
function usercheckClick(obj){
	document.getElementById("selAllCheck").checked = false;
	isOpenBtn();
}

/**
 * 判断是否被选中
 * @returns {Boolean}
 */
function isHasChecked(){
	var all = document.getElementById("selAllCheck");
	var userCheck = document.getElementsByName("user_checkbox");
	if(all.checked == false){
		for(var i=0;i<userCheck.length;i++){
			if(userCheck[i].checked ==true){
				return true;
			}
		}
		return false;
	}else{
		return true;
	}
}

/**
 * 根据是否被选中更改label  a标签的样式
 */
function isOpenBtn(){
	if(isHasChecked()){
		$("#addTo").attr("href","javascript:void(0)");
		$("#addTo").attr("onclick","addToGroup()");
		$("#addTo").attr("style","");
		
		$("#moveToList").attr("href","javascript:void(0)");
		$("#moveToList").attr("onclick","moveToGroupList()");
		$("#moveToList").attr("style","");
		
		$("#blackList").attr("href","javascript:void(0)");
		$("#blackList").attr("onclick","addToBlack()");
		$("#blackList").attr("style","");
		
		$("#moveblackList").attr("href","javascript:void(0)");
		$("#moveblackList").attr("onclick","moveToBlack()");
		$("#moveblackList").attr("style","");
		
	}else{
		$("#addTo").attr("href","javascript:return false;");
		$("#addTo").attr("onclick","return false;");
		$("#addTo").attr("style","cursor: default;opacity: 0.2;");
		
		$("#moveToList").attr("href","javascript:return false;");
		$("#moveToList").attr("onclick","return false;");
		$("#moveToList").attr("style","cursor: default;opacity: 0.2;");
		
		$("#blackList").attr("href","javascript:return false;");
		$("#blackList").attr("onclick","return false;");
		$("#blackList").attr("style","cursor: default;opacity: 0.2;");
		
		$("#moveblackList").attr("href","javascript:return false;");
		$("#moveblackList").attr("onclick","return false;");
		$("#moveblackList").attr("style","cursor: default;opacity: 0.2;");
	}
}

/**
 * 添加到组
 */
function addToGroup(){
	addGroupDataToSelect();
	$("#addToGroupDia").modal("show");
	
}



/**
 * 添加到分组时给select栏添加value
 */
function addGroupDataToSelect(){
	$("#guropSelect").html("");
	$("#guropSelect").append('<option value="">请选择分组</option>');
	if(groupMsg.length!=0){
		for (var i = 0; i < groupMsg.length; i++) {
			$("#guropSelect").append('<option value="'+groupMsg[i].id+'">'+groupMsg[i].groupName+'</option>');
		}
		
	}
}

/**
 * 添加到组
 */
function addToGroupSubmit(){
	var groupId = $("#guropSelect").val();
	if(utils_isNull(groupId)){
		alert("尚未选择分组");
	}else{
		$.ajax({
	  		url : _utils.basePath + "lottery/addToGroup",
	  		type : "POST",
	  		dataType : "json",
	  		data : {
	  			groupId : groupId,
	  			checkedUserId : getSelectedUid(NOBLACKLIST),
	  			lotteryId : lotteryId
			},
			traditional : true,
	  		success : function(result){
	  			if(result.code == REQUEST_SUCCESS){
					$("#addToGroupDia").modal("hide");
					selUsers();
					//modalalert("添加成功");
	  			}
	  		},
	  		error : function(a, b, c){
	  			alert(a.status);
	  		}
		});
	}

}

/**
 * 获取选中的userId
 * type  1:是黑名单的时候获取id   0: 获取userId
 * @returns {Array}
 */
function getSelectedUid(type){
	var checkedUserId = new Array();
	var checkedId = new Array();
	var all = document.getElementById("selAllCheck");
	var userCheck = document.getElementsByName("user_checkbox");
	checkedUserId = [];
	checkedId = [];
	if(all.checked == false){
		for(var i=0;i<userCheck.length;i++){
			if(userCheck[i].checked ==true){
				checkedUserId.push(userCheck[i].value);
				checkedId.push(userCheck[i].getAttribute("value1"));
			}
		}
		
	}else{
		for(var i=0;i<userCheck.length;i++){
			checkedUserId.push(userCheck[i].value);
			checkedId.push(userCheck[i].getAttribute("value1"));
		}
	}
	if(type==ISBLACKLIST)
		return checkedId;
	else
		return checkedUserId;
}

/**
 * 添加分组提交
 */
function groupAddSubmit(){
	var groupName = $("#groupName").val();

	if(utils_isNull(groupName)){
		$("#addgroup_tip").html("请输入分组名称");
	}else{
		$.ajax({
	  		url : _utils.basePath + "lottery/addGroup",
	  		type : "POST",
	  		dataType : "json",
	  		data : {
	  			groupName : groupName,
	  			lotteryId : lotteryId
			},
	  		success : function(result){
	  			if(result.code == REQUEST_SUCCESS){
		  			var groupId = result.result;
		  			addHtmlToGroup(groupName,groupId,0);
		  			selUsers();
					$("#addGroupDia").modal("hide");
	  			}
	  		},
	  		error : function(a, b, c){
	  			alert(a.status);
	  		}
		});
	}

}

/**
 * 添加到黑名单
 */
function addToBlack(){
	$.ajax({
  		url : _utils.basePath + "lottery/addToBlack",
  		type : "POST",
  		dataType : "json",
  		data : {
  			checkedUserId : getSelectedUid(NOBLACKLIST),
  			lotteryId : lotteryId
		},
		traditional : true,
  		success : function(result){
  			selUsers();
  			modalalert(result.msg)
  		},
  		error : function(a, b, c){
  			alert(a.status);
  		}
	});
}

/**
 * 移出黑名单
 */
function moveToBlack(){
	$.ajax({
  		url : _utils.basePath + "lottery/moveToBlack",
  		type : "POST",
  		dataType : "json",
  		data : {
  			checkedUserId : getSelectedUid(NOBLACKLIST),
  			lotteryId : lotteryId
		},
		traditional : true,
  		success : function(result){
  			selUsers();
  			modalalert(result.msg)
  		},
  		error : function(a, b, c){
  			alert(a.status);
  		}
	});
}

/**
 * 移出分组
 */
function moveToGroupList(){
	$.ajax({
  		url : _utils.basePath + "lottery/moveToGroup",
  		type : "POST",
  		dataType : "json",
  		data : {
  			checkedUserId : getSelectedUid(NOBLACKLIST),
  			groupId : curEditGroupId,
  			lotteryId : lotteryId
		},
		traditional : true,
  		success : function(result){
  			selUsers();
  			modalalert(result.msg)
  		},
  		error : function(a, b, c){
  			alert(a.status);
  		}
	});
}
