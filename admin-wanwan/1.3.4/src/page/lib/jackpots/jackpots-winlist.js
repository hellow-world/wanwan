function tab_winuser(){
	hideBt();
	geWinnerList();
}

var winnerMsg;
/*分页使用到的参数*/
var pagenum_winnerlist =1 ; //页码
var isFirstSel_winnerlist = 1; //0: 不是第一次查询，不需返回页数   1： 是第一次查询，需要返回页数	
/**
 * 获取已经签到的用户
 */
function geWinnerList(){
	$.ajax({
		url : basePath + "/lotterySign/selWinnerList",
		type : "POST",
		data : {
			lotteryId : lotteryId,
			page : pagenum_winnerlist,
			isFirstSel : isFirstSel_winnerlist,
			colPerPage : page_half
		},
		dataType : "JSON",
		success : function(result){
			var userMsg = result.result;
			winnerMsg = userMsg;
			if(result.code==REQUEST_SUCCESS){
				if(userMsg.length!=0){
					/*分页*/
					if(isFirstSel_winnerlist==1){
						isFirstSel_winnerlist = 0;
						 $("#page_winnerlist").paging({
							 totalPage: Math.ceil(result.msg/page_half),
							 totalSize: result.msg,
							 callback: function(num) {
								 	pagenum_winnerlist = num;
								 	geWinnerList();
							 	}
						 });
					}
					$("#winnerTbody").empty();
					$("#winnerTbody").append(setValueToWinTable(userMsg));
				}
			}
		},
		error : function(a,b,c){
			alert(a.status);
		}
	});
}

/* 动态加载数据到表格*/
function setValueToWinTable(param){
	var res = "";
	for(var i = 0;i<param.length;i++){
		res+=addTdToWinTable(param[i]);
	}
	return res;
}

/* 给表格每行加载数据 */
function addTdToWinTable(param){
	var res = '<tr class="text-c" >'+getradiohtml();
	var winnerAwardImg = '<img width="60px" src="'+param.winnerAwardImg+'">';
	var editReamrkHtml = "<a title='编辑' href='javascript:;' onclick='editRemark(this)' class='ml-5' style='text-decoration:none'><i class='Hui-iconfont' style='color: #5a98de;'>&nbsp;&nbsp;编辑&#xe6df;</i></a>";
	var lotteryState = "正常";
	if(param.lotteryState != 1){
		lotteryState = "异常";
	}
	//for(var key in param )
	res += "<td>"+param.id+"</td>";
	res += "<td>"+param.winnerUserName+"</td>";
	res += "<td>"+param.telephone+"</td>";
	res += "<td>"+param.winnerAwardName+"</td>";
	res += "<td>"+winnerAwardImg+"</td>";
	res += "<td>"+lotteryState+"</td>";
	res += "<td>"+param.remark+editReamrkHtml+"</td>";
	return res+"</tr>";
}

var curEditWinnerId;
function editRemark(obj){
	var $td= $(obj).parents('tr').children('td');  
	curEditWinnerId = $td.eq(1).text();
	$("#remark_msg").val(getReamrkMsg());
	$("#editWinnerListRemarkDia").modal("show");
}

function getReamrkMsg(){
	for (var i = 0; i < winnerMsg.length; i++) {
		if(winnerMsg[i].id==curEditWinnerId){
			return winnerMsg[i].remark;
		}
	}
}

function editWinnerListRemarkSubmit(){
	var remarkMsg = $("#remark_msg").val();
	if(utils_isNull(remarkMsg)){
		$("#editremark_tip").html("请输入备注信息");
	}else{
		$.ajax({
			url : basePath + "/lotterySign/editRemarkMsg",
			type : "POST",
			data : {
				lotteryId : lotteryId,
				remarkMsg : remarkMsg,
				winnerId : curEditWinnerId
			},
			dataType : "JSON",
			success : function(result){
				if(result.code==REQUEST_SUCCESS){
					modalalert("修改成功");
					$("#editWinnerListRemarkDia").modal("hide");
					geWinnerList();
				}
			},
			error : function(a,b,c){
				alert(a.status);
			}
		});
	}
	
}
