function tab_sign(){
	hideBt();
	$("#a_sign").show();
	getSignUsers();
}
/*分页使用到的参数*/
var pagenum_signuser =1 ; //页码
var isFirstSel_signuser = 1; //0: 不是第一次查询，不需返回页数   1： 是第一次查询，需要返回页数	
/**
 * 获取已经签到的用户
 */
function getSignUsers(){
	$.ajax({
		url : basePath + "/lotterySign/selSignUsers",
		type : "POST",
		data : {
			lotteryId : lotteryId,
			page : pagenum_signuser,
			isFirstSel : isFirstSel_signuser,
			colPerPage : page_half
		},
		dataType : "JSON",
		success : function(result){
			var userMsg = result.result;
			if(result.code==REQUEST_SUCCESS){
				var userArr = new Array();
				var newMsg = new Array();
				if(userMsg.length!=0){
					for (var i = 0; i < userMsg.length; i++) {
						if(!(userArr.contains(userMsg[i].userId) || userMsg[i].isBlackList==1)){
							userArr.push(userMsg[i].userId);
							newMsg.push(userMsg[i]);
						}
					}
					/*分页*/
					if(isFirstSel_signuser==1){
						isFirstSel_signuser = 0;
						 $("#page_signusers").paging({
							 totalPage: Math.ceil(result.msg/page_half),
							 totalSize: result.msg,
							 callback: function(num) {
								 	pagenum_signuser = num;
							 		getSignUsers();
							 	}
						 });
					}
					$("#signUserTbody").empty();
					$("#signUserTbody").append(setValueToSignTable(newMsg));
				}
			}
		},
		error : function(a,b,c){
			alert(a.status);
		}
	});
}

/* 动态加载数据到表格*/
function setValueToSignTable(param){
	var res = "";
	for(var i = 0;i<param.length;i++){
		res+=addTdToSignTable(param[i]);
	}
	return res;
}

/* 给acitivity表格每行加载数据 */
function addTdToSignTable(param){
	var res = '<tr class="text-c" >'+getradiohtml();
	var userAvatar = '<img width="60px" src="'+param.userAvatar+'">';
	//for(var key in param )
	res += "<td>"+param.id+"</td>";
	res += "<td>"+param.userName+"</td>";
	res += "<td>"+param.userTelPhone+"</td>";
	res += "<td>"+userAvatar+"</td>";
	res += "<td>"+param.signTime+"</td>";
	return res+"</tr>";
}