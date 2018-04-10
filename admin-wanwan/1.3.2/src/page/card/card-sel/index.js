/*
* @Author: admin
* @Date:   2018-02-28 11:59:50
* @Last Modified by:   admin
* @Last Modified time: 2018-03-28 15:15:17
*/
var _config = require('service/config.js')
var _encode = require('service/errorcode.js')
var _utils  = require('util/utils.js')
/*分页使用到的参数*/
var pagenum =1 ; //总行数
var isSearch = false; //false:没有搜索之后的分页查询。 true： 有了搜索的分页查询
var isFirstSel = 0; //0: 不是第一次查询，不需返回页数   1： 是第一次查询，需要返回页数
var num_perPage = 15;//分页后台传参数
var cardMsg = "";
var currentEditId = 0;
/*load页面进行查询*/
$(function (){
	 $('#scan_content').froalaEditor({
	        theme: 'dark',
	        imageUploadURL: _config.basePath+ "uploadImgEditor",  
	        language: 'zh_cn',
	        height: 200,
	        toolbarButtons: [  
	                         'bold', 'italic', 'underline', 'paragraphFormat', 'align','color','fontSize','insertImage','insertTable','undo', 'redo'  
	                       ] 
	      });
	      
	 $('#edit_content').froalaEditor({
        theme: 'dark',
        imageUploadURL: _config.basePath+ "uploadImgEditor",  
        language: 'zh_cn',
        height: 200,
      /*  toolbarButtons: [  
                         'bold', 'italic', 'underline', 'paragraphFormat', 'align','color','fontSize','insertImage','insertTable','undo', 'redo'  
                       ] */
      });
	 // CurrentUser();
	 isFirstSel =1; 
	 selCardList();
});

/**
 * 查找活动
 */
function selCardList(){
	isSearch = false;
	$.ajax({
		url : _config.basePath + "card/selList",
		type : "POST",
		dataType : "json",
		data : {
			page : pagenum,
			isFirstSel : isFirstSel,
			numPerPage:num_perPage
		},
		success : function(result){
			if(result.code!=_encode.REQUEST_SUCCESS)
			{
				alert(result.msg);
			}else{
				var message = result.result;
				cardMsg = message;
				/*分页*/
				if(isFirstSel==1){
					isFirstSel = 0;
					 $("#page").paging({
						 totalPage: Math.ceil(result.msg/15),
						 totalSize: result.msg,
						 callback: function(num) {
						 		pagenum = num;
						 		if(isSearch)
						 			selcardByDate();
						 		else
						 			selCardList();
						 	}
					 });
				}
				/*为表格赋值*/
				$("#cardTbody").empty();
				$("#cardTbody").append(setValueToTable(message,getradiohtml()));
			}
		},
		error : function(a, b, c){
			alert(a.status);
		}
	});
}

/**
 * 删除卡券提交
 * @param activityId
 * @param obj
 */
function delteCard(id,obj){
	var formData = new FormData();
	formData.append("id", id);
	
	$.ajax({
		url : _config.basePath + "card/del",
		type : "POST",
		dataType : "json",
		processData : false,
		contentType : false,
		data : formData,
		success : function(result){
			if(result.code==_encode.REQUEST_SUCCESS){
				modalalert("已成功删除");
				$(obj).parent().parent().remove();
			}else{
				alert("删除失败");
			}
		}, 
		error : function(a,b,c){
			alert(a.status);
		}
	});
}

/* 动态加载数据到表格*/
function setValueToTable(param,behind){
	var res = "";
	for(var i = 0;i<param.length;i++){
		res+=addTdToTable(param[i],behind);
	}
	return res;
}

/* 给card表格每行加载数据 */
function addTdToTable(param,behind){
	var res = '<tr class="text-c" >'+behind;
	//for(var key in param )
	res += "<td>"+param.id+"</td>";
	res += "<td>"+_config.sponsorName+"</td>";
	res += "<td>"+param.cardCreateTime+"</td>";
	res += "<td>"+param.cardTitle+"</td>";
	res += "<td>"+param.cardSum+"</td>";
	res += "<td>"+"再说再说"+"</td>";
	res += "<td>"+"暂时空着"+"</td>";
	res += "<td>"+"暂时空着"+"</td>";
	res += "<td>"+"全部"+"</td>";
	if(param.isTop ==1){
		res += getoperaHtml_down();
	}else{
		res += getoperaHtml_up();
	}
	return res+"</tr>";
}

/* 加载数据为每行 */
function addTdToTable1(param,behind,end){
	var res = '<tr class="text-c">'+behind;
	for(var key in param )
		res += "<td>"+param[key]+"</td>";
	return res+end+"</tr>";
}

/* 操作栏up*/
function getoperaHtml_up(){
	var res = "<td><a title='查看' href='javascript:;' class='ml-5 btn_scan' style='text-decoration:none'><i class='Hui-iconfont'>&#xe665;</i></a>"+					
					"<a title='修改' href='javascript:;' class='ml-5 btn_edit' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6df;</i></a>"+
					"<a title='删除' href='javascript:;' class='ml-5 btn_del' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6e2;</i></a>"+
					"<a title='删除' href='javascript:;' class='ml-5 btn_top' style='text-decoration:none'><i class='Hui-iconfont'>&#xe679;</i></a></td>";
	return res;
}

/* 操作栏down*/
function getoperaHtml_down(){
	var res = "<td><a title='查看' href='javascript:;' class='ml-5 btn_scan' style='text-decoration:none'><i class='Hui-iconfont'>&#xe665;</i></a>"+					
					"<a title='修改' href='javascript:;' class='ml-5 btn_edit' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6df;</i></a>"+
					"<a title='删除' href='javascript:;' class='ml-5 btn_del' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6e2;</i></a>"+
					"<a title='删除' href='javascript:;' class='ml-5 btn_cancelTop' style='text-decoration:none'><i class='Hui-iconfont'>&#xe674;</i></a></td>";
	return res;
}

/*radio栏html*/
function getradiohtml(){
	var res = "<td><input type='checkbox'></td>";
	return res;
}

/* 卡券新增页面跳转 */
$('#btnAdd').on('click',function(){
	card_add();
})
function card_add(){
	window.location.href = "./card-add.html";
}

/* 卡券编辑 */
$('#cardTbody').on('click','.btn_edit',function(){
	card_edit(this)
})
function card_edit(obj){
	var $td= $(obj).parents('tr').children('td');  
    var cardId = $td.eq(1).text();
    currentEditId = cardId;
	addDataToEditDialog(currentEditId);
	$("#editCardDia").modal("show");
}

/* 卡券删除 */
$('#cardTbody').on('click','.btn_del',function(){
	card_del(this)
})
function card_del(obj){
	var $td= $(obj).parents('tr').children('td');  
    var id = $td.eq(1).text();
	delteCard(id,obj);
}


/* 卡券查看对话框 */
$('#cardTbody').on('click','.btn_scan',function(){
	card_scan(this)
})
function card_scan(obj){
	var $td= $(obj).parents('tr').children('td');  
    var id = $td.eq(1).text();  
	addDataToScanDialog(id);
	$("#scanCardDia").modal("show");
}

/*消息弹出框*/
function modalalert(msg){
	$.Huimodalalert(msg,3000);
}
	
/*显示/隐藏titlePicDiv*/
$('#display').on('click',function(){
	editTitlePic();
})
function editTitlePic(){
	if($('#titlePicDiv').is(':hidden')){
		$("#titlePicDiv").show();
		$("#display").html("hidden");
	}else{
		$("#titlePicDiv").hide();
		$("#display").html("display");
	}
}

/* 卡券置顶 */
$('#cardTbody').on('click','.btn_top',function(){
	card_top(this)
})
function card_top(obj){
	var $td= $(obj).parents('tr').children('td');  
    var activityId = $td.eq(1).text();
    $("#topId").val(activityId);
    $("#topCardDia").modal("show");
}

/**
 * 取消置顶
 * @param obj
 */
function card_cancelTop(obj){
	var $td= $(obj).parents('tr').children('td');  
    var id = $td.eq(1).text();
    cancelTopSubmit(id);
}

/*显示/隐藏coverPicDiv*/
$('#displayCover').on('click',function(){
	editCoverPic();
})
function editCoverPic(){
	if($('#coverPicDiv').is(':hidden')){
		$("#coverPicDiv").show();
		$("#displayCover").html("hidden");
	}else{
		$("#coverPicDiv").hide();
		$("#displayCover").html("display");
	}
}

/*显示/隐藏sacn_titlePicDiv*/
$('#scan_display').on('click',function(){
	scanTitlePic();
})
function scanTitlePic(){
	if($('#scan_titlePicDiv').is(':hidden')){
		$("#scan_titlePicDiv").show();
		$("#scan_display").html("hidden");
	}else{
		$("#scan_titlePicDiv").hide();
		$("#scan_display").html("display");
	}
}

/*显示/隐藏scan_coverPicDiv*/
$('#scan_displayCover').on('click',function(){
	scanTitlePic();
})
function scanCoverPic(){
	if($('#scan_coverPicDiv').is(':hidden')){
		$("#scan_coverPicDiv").show();
		$("#scan_displayCover").html("hidden");
	}else{
		$("#scan_coverPicDiv").hide();
		$("#scan_displayCover").html("display");
	}
}

/*scanActivityDia赋值*/
function addDataToScanDialog(id){
	
	for(var i=0; i<cardMsg.length; i++){
		if(cardMsg[i].id == id){
			$("#scan_cardName").val(cardMsg[i].cardTitle);
			$("#scan_cardIntroduce").val(cardMsg[i].cardIntroduce);
			$("#scan_place").val(cardMsg[i].place);
			$("#scan_cardNum").val(cardMsg[i].cardSum);
			$("#scan_cardPurchaseNum").val(cardMsg[i].cardRestrictSum);
			$("#scan_cardType").val(cardMsg[i].type);
			$("#scan_payWay").val(cardMsg[i].currencyType);
			$("#scan_cardPrice").val(cardMsg[i].cardPrice);
			$("#scan_cardPutawayTime").val(cardMsg[i].cardPutawayTime);
			$("#scan_purchaseStartTime").val(cardMsg[i].purchaseStartTime);
			$("#scan_purchaseEndTime").val(cardMsg[i].purchaseEndTime);
			$("#scan_cardStartTime").val(cardMsg[i].cardStartTime);
			$("#scan_cardEndTime").val(cardMsg[i].cardEndTime);
			document.getElementById("scan_titlePicContainer").innerHTML = "<img src="+cardMsg[i].cardTitlePhoto+">";
			document.getElementById("scan_coverPicContainer").innerHTML = "<img src="+cardMsg[i].cardCover+">";
			$('#scan_content').froalaEditor('html.set', cardMsg[i].cardContent);
		}
	}
}

/*editCardDia赋值*/
function addDataToEditDialog(id){
	
	for(var i=0; i<cardMsg.length; i++){
		if(cardMsg[i].id == id){
			$("#edit_cardName").val(cardMsg[i].cardTitle);
			$("#edit_cardIntroduce").val(cardMsg[i].cardIntroduce);
			$("#edit_place").val(cardMsg[i].place);
			$("#edit_cardNum").val(cardMsg[i].cardSum);
			$("#edit_cardPurchaseNum").val(cardMsg[i].cardRestrictSum);
			$("#edit_cardType").val(cardMsg[i].type);
			$("#edit_payWay").val(cardMsg[i].currencyType);
			$("#edit_cardPrice").val(cardMsg[i].cardPrice);
			$("#edit_cardPutawayTime").val(cardMsg[i].cardPutawayTime);
			$("#edit_purchaseStartTime").val(cardMsg[i].purchaseStartTime);
			$("#edit_purchaseEndTime").val(cardMsg[i].purchaseEndTime);
			$("#edit_cardStartTime").val(cardMsg[i].cardStartTime);
			$("#edit_cardEndTime").val(cardMsg[i].cardEndTime);
			document.getElementById("edit_titlePicContainer").innerHTML = "<img src="+cardMsg[i].cardTitlePhoto+">";
			document.getElementById("edit_coverPicContainer").innerHTML = "<img src="+cardMsg[i].cardCover+">";
			$('#edit_content').froalaEditor('html.set', cardMsg[i].cardContent);
			
		}
	}
}

/*编辑card提交*/
$('#btneditSubmit').on('click',function(){
	editCardSubmit();
})
function editCardSubmit(){
	var formData = new FormData();
	
	formData.append("id", currentEditId);
	formData.append("cardTitle", $("#edit_cardName").val());
	formData.append("cardIntroduce", $("#edit_cardIntroduce").val());
	formData.append("place", $("#edit_place").val());
	formData.append("cardSum", $("#edit_cardNum").val());
	formData.append("cardRestrictSum", $("#edit_cardPurchaseNum").val());
	formData.append("type", $("#edit_cardType").val());
	formData.append("currencyType", $("#edit_payWay").val());
	formData.append("cardPrice", $("#edit_cardPrice").val());
	formData.append("cardPutawayTime", $("#edit_cardPutawayTime").val());
	formData.append("purchaseStartTime", $("#edit_purchaseStartTime").val());
	formData.append("purchaseEndTime", $("#edit_purchaseEndTime").val());
	formData.append("cardStartTime", $("#edit_cardStartTime").val());
	formData.append("cardEndTime", $("#edit_cardEndTime").val());
	
	formData.append("cardContent", $('div#edit_content').froalaEditor('html.get'));
	formData.append("title", document.getElementById("edit_titlePic").files[0]);
	formData.append("cover", document.getElementById("edit_coverPic").files[0]);
	
	$.ajax({
		url : _config.basePath + "card/edit",
		type : "POST",
		dataType : "json",
		processData : false,
		contentType : false,
		data : formData,
		success : function(result){
			if(result.code==_encode.REQUEST_SUCCESS){
				modalalert("已成功修改");
				$("#editCardDia").modal("hide");
				selCardList();
			}else{
				alert("编辑失败");
			}
		}, 
		error : function(a,b,c){
			alert(a.status);
		}
	});
}

/*按日期查询提交*/
$('#btnselSubmit').on('click',function(){
	selcardByDateSubmit();
})
function selcardByDateSubmit(){
	var startTime = $("#cardSel_startTime").val();
	var endTime = $("#cardSel_endTime").val();
	isFirstSel = 1;
	if(_utils.utils_isNull(startTime) && _utils.utils_isNull(endTime)){
		isSearch = false;
		pagenum = 1;
		selCardList();
	}else if(!_utils.utils_isNull(startTime) && !_utils.utils_isNull(endTime) && startTime<=endTime){
		isSearch = true;
		selcardByDate();
	}else{
		alert(_encode.ERROR_SELECT_PARAM);
	}
}

/*按日期查询提交*/
function selcardByDate(){
	$.ajax({
		url : _config.basePath + "card/selByDate",
		type : "POST",
		dataType : "json",
		data : {
			startTime : $("#cardSel_startTime").val(),
			endTime : $("#cardSel_endTime").val(),
			page : pagenum,
			isFirstSel : isFirstSel,
			numPerPage:num_perPage
		},
		success : function(result){
			if(result.code!=0){
				var message = result.result;
				cardMsg = message;
				/*分页*/
				if(isFirstSel==1){
					isFirstSel = 0;
					 $("#page").paging({
						 totalPage: Math.ceil(result.msg/15),
						 totalSize: result.msg,
						 callback: function(num) {
						 		pagenum = num;
						 		if(isSearch)
						 			selcardByDate();
						 		else
						 			selCardList();
						 	}
					 });
				}
				/*为表格赋值*/
				$("#cardTbody").empty();
				$("#cardTbody").append(setValueToTable(message,getradiohtml()));
			}else{
				alert(result.msg);
			}
		}
	});
}


/**
 * 置顶提交
 */
$('#btntopSubmit').on('click',function(){
	topCardSubmit();
})
function topCardSubmit(){
	var formData = new FormData();
	formData.append("id", $("#topId").val());
	formData.append("topPic", document.getElementById("topPic").files[0]);
	
	$.ajax({
		url : _config.basePath + "card/top",
		type : "POST",
		dataType : "json",
		processData : false,
		contentType : false,
		data : formData,
		success : function(result){
			if(result.code==_encode.REQUEST_SUCCESS){
				modalalert("置顶成功");
				$("#topCardDia").modal("hide");
				//window.location.reload(); //全局刷新
				selCardList();
			}else{
				alert(result.msg);
			}
		}, 
		error : function(a,b,c){
			alert(a.status);
		}
	});
}

/**
 * 取消置顶提交
 */
function cancelTopSubmit(id){
	$.ajax({
		url : _config.basePath + "card/cancelTop",
		type : "POST",
		dataType : "json",
		data : {
			id : id
		},
		success : function(result){
			if(result.code==_encode.REQUEST_SUCCESS){
				modalalert("取消置顶成功");
				selCardList();
			}else{
				alert(result.msg);
			}
		}, 
		error : function(a,b,c){
			alert(a.status);
		}
	});
}


