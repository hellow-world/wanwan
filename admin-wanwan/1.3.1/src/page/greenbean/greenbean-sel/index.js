/*
* @Author: admin
* @Date:   2018-02-27 11:45:41
* @Last Modified by:   admin
* @Last Modified time: 2018-03-26 17:45:06
*/
var _config = require('service/config.js')
var _encode = require('service/errorcode.js')
var _utils  = require('util/utils.js')

var greenbeanMsg = "";
var currentEditId = 0;
/*分页使用到的参数*/
var pagenum =1 ; //总行数
var isSearch = false; //false:没有搜索之后的分页查询。 true： 有了搜索的分页查询
var isFirstSel = 0; //0: 不是第一次查询，不需返回页数   1： 是第一次查询，需要返回页数
/*load页面进行查询*/
$(function (){
	// CurrentUser();
	isFirstSel = 1;
	selgreenbeanList();
});

/**
 * 查找活动
 */
function selgreenbeanList(){
	isSearch = false;
	$.ajax({
		url : _config.basePath + "bean/selSendBeanList",
		type : "POST",
		dataType : "json",
		data : {
			page : pagenum,
			isFirstSel : isFirstSel
		},
		success : function(result){
			if(result.code!=_encode.REQUEST_SUCCESS)
			{
				alert(result.msg);
			}else{
				var message = result.result;
				greenbeanMsg = message;
				/*分页*/
				if(isFirstSel==1){
					isFirstSel = 0;
					 $("#page").paging({
						 totalPage: Math.ceil(result.msg/15),
						 totalSize: result.msg,
						 callback: function(num) {
						 		pagenum = num;
						 		if(isSearch)
						 			selGreenbeanByDate();
						 		else
						 			selgreenbeanList();
						 	}
					 });
				}
				/*为表格赋值*/
				$("#greenbeanTbody").empty();
				$("#greenbeanTbody").append(setValueToTable(message,getradiohtml()));
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
function deltegreenbean(id,obj){
	var formData = new FormData();
	formData.append("id", id);
	
	$.ajax({
		url : basePath + "/greenbean/del",
		type : "POST",
		dataType : "json",
		processData : false,
		contentType : false,
		data : formData,
		success : function(result){
			if(result.code==REQUEST_SUCCESS){
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

/* 给greenbean表格每行加载数据 */
function addTdToTable(param,behind){
	var res = '<tr class="text-c" >'+behind;
	//for(var key in param )
	res += "<td>"+param.id+"</td>";
	res += "<td>"+_config.sponsorName+"</td>";
	res += "<td>"+param.sponsorDepartment+"</td>";
	res += "<td>"+param.createTime+"</td>";
	res += "<td>"+param.beanNum+"</td>";
	res += "<td>"+param.sponsorReason+"</td>";
	res += "<td>"+"暂时空着"+"</td>";
	res += "<td>"+"暂时空着"+"</td>";
	res += getoperaHtml();
	return res+"</tr>";
}

/* 操作栏down*/
function getoperaHtml(){
	var res = "<td><a title='查看' href='javascript:;' class='ml-5 btn_scan' style='text-decoration:none'><i class='Hui-iconfont'>&#xe665;</i></a></td>"/*"+					
					"<a title='修改' href='javascript:;' onclick='greenbean_edit(this)' class='ml-5' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6df;</i></a>"+
					"<a title='删除' href='javascript:;' onclick='greenbean_del(this)' class='ml-5' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6e2;</i></a>;
*/	return res;
}

/*radio栏html*/
function getradiohtml(){
	var res = "<td><input type='checkbox'></td>";
	return res;
}

/* 卡券新增页面跳转 */
$('#btnAdd').on('click',function(){
	greenbean_add();
})
function greenbean_add(){
	window.location.href =  "./greenbean-add.html";
}

/* 卡券编辑 */
function greenbean_edit(obj){
	var $td= $(obj).parents('tr').children('td');  
    var greenbeanId = $td.eq(1).text();
    currentEditId = greenbeanId;
	addDataToEditDialog(currentEditId);
	$("#editGreenbeanDia").modal("show");
}

/* 卡券删除 */
function greenbean_del(obj){
	var $td= $(obj).parents('tr').children('td');  
    var id = $td.eq(1).text();
	deltegreenbean(id,obj);
}


/* 卡券查看对话框 */
$('#greenbeanTbody').on('click','.btn_scan',function(){
	greenbean_scan(this);
})
function greenbean_scan(obj){
	var $td= $(obj).parents('tr').children('td');  
    var id = $td.eq(1).text();  
	addDataToScanDialog(id);
	$("#scanGreenbeanDia").modal("show");
}

/*消息弹出框*/
function modalalert(msg){
	$.Huimodalalert(msg,3000);
}

/*scanActivityDia赋值*/
function addDataToScanDialog(id){
	
	for(var i=0; i<greenbeanMsg.length; i++){
		if(greenbeanMsg[i].id == id){
			$("#scan_sponsorName").val(greenbeanMsg[i].sponsorName);
			$("#scan_sponsorDepartment").val(greenbeanMsg[i].sponsorDepartment);
			if(greenbeanMsg[i].sendType == 1){
				$("#scan_beanUser").val(greenbeanMsg[i].fileName);
			}else{
				$("#scan_beanUser").val(greenbeanMsg[i].beanUser);
			}
			$("#scan_beanNum").val(greenbeanMsg[i].beanNum);
			$("#scan_sponsorReason").val(greenbeanMsg[i].sponsorReason);
			$("#scan_putawayTime").val(greenbeanMsg[i].putawayTime);
			$("#scan_createTime").val(greenbeanMsg[i].createTime);
			if(greenbeanMsg[i].isFromJackpot == 1){
				$("#scan_isFromJackpot").val("是");
			}else{
				$("#scan_isFromJackpot").val("不是");
			}
		}
	}
}

/*editgreenbeanDia赋值*/
function addDataToEditDialog(id){
	
	for(var i=0; i<greenbeanMsg.length; i++){
		if(greenbeanMsg[i].id == id){
			$("#edit_sponsorName").val(greenbeanMsg[i].sponsorName);
			$("#edit_sponsorDepartment").val(greenbeanMsg[i].sponsorDepartment);
			if(greenbeanMsg[i].sendType == 1){
				$("#edit_beanUser").val(greenbeanMsg[i].fileName);
			}else{
				$("#edit_beanUser").val(greenbeanMsg[i].beanUser);
			}
			$("#edit_beanNum").val(greenbeanMsg[i].beanNum);
			$("#edit_sponsorReason").val(greenbeanMsg[i].sponsorReason);
			$("#edit_putawayTime").val(greenbeanMsg[i].putawayTime);
			$("#edit_createTime").val(greenbeanMsg[i].createTime);
			if(greenbeanMsg[i].isFromJackpot == 1){
				$("#edit_isFromJackpot").prop("checked",true);
			}else{
				$("#edit_isFromJackpot").prop("checked",false);
			}
		}
	}
}

/*编辑greenbean提交*/
function editgreenbeanSubmit(){
	var formData = new FormData();
	
	formData.append("id", currentEditId);
	formData.append("greenbeanIntroduce", $("#edit_sponsorDepartment").val());
	formData.append("place", $("#edit_beanUser").val());
	formData.append("greenbeanSum", $("#edit_beanNum").val());
	formData.append("greenbeanRestrictSum", $("#edit_sponsorReason").val());
	
	$.ajax({
		url : basePath + "/greenbean/edit",
		type : "POST",
		dataType : "json",
		processData : false,
		contentType : false,
		data : formData,
		success : function(result){
			if(result.code==REQUEST_SUCCESS){
				modalalert("已成功修改");
				$("#editgreenbeanDia").modal("hide");
				selgreenbeanList();
			}else{
				alert("编辑失败");
			}
		}, 
		error : function(a,b,c){
			alert(a.status);
		}
	});
}

/**
 * 按日期查询提交
 */
 $('#btnSubmit').on('click',function(){
 	selGreenbeanByDateSubmit();
 })
function selGreenbeanByDateSubmit(){
	var startTime = $("#greenbeanSel_startTime").val();
	var endTime = $("#greenbeanSel_endTime").val();
	isFirstSel = 1;
	if(_utils.utils_isNull(startTime)&&_utils.utils_isNull(endTime)){
		isSearch = false;
		pagenum = 1;
		selgreenbeanList();
	}else if(!_utils.utils_isNull(startTime) && !_utils.utils_isNull(endTime) && startTime<=endTime){
		isSearch = true;
		selGreenbeanByDate();
	}else{
		alert(_encode.ERROR_SELECT_PARAM);
	}
}

/*按日期查询提交*/
function selGreenbeanByDate(){
	$.ajax({
		url : _config.basePath + "bean/selBeanSendByDate",
		type : "POST",
		dataType : "json",
		data : {
			startTime : $("#greenbeanSel_startTime").val(),
			endTime : $("#greenbeanSel_endTime").val(),
			page : pagenum,
			isFirstSel : isFirstSel
		},
		success : function(result){
			if(result.code!=0){
				var message = result.result;
				/*分页*/
				if(isFirstSel==1){
					isFirstSel = 0;
					 $("#page").paging({
						 totalPage: Math.ceil(result.msg/15),
						 totalSize: result.msg,
						 callback: function(num) {
						 		pagenum = num;
						 		if(isSearch)
						 			selGreenbeanByDate();
						 		else
						 			selgreenbeanList();
						 	}
					 });
				}
				greenbeanMsg = message;
				/*为表格赋值*/
				$("#greenbeanTbody").empty();
				$("#greenbeanTbody").append(setValueToTable(message,getradiohtml()));
			}else{
				alert(result.msg);
			}
		}
	});
}



