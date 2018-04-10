/*
* @Author: admin
* @Date:   2018-02-27 16:55:38
* @Last Modified by:   admin
* @Last Modified time: 2018-03-26 15:47:16
*/
var _config = require('service/config.js')
var _encode = require('service/errorcode.js')
var _utils  = require('util/utils.js')
/*分页使用到的参数*/
var pagenum =1 ; //总行数
var isSearch = false; //false:没有搜索之后的分页查询。 true： 有了搜索的分页查询
var isFirstSel = 0; //0: 不是第一次查询，不需返回页数   1： 是第一次查询，需要返回页数
var sellerMsg = "";
var currentEditId = 0;
/*load页面进行查询*/
$(function (){
	// CurrentUser();
	isFirstSel =1; 
	selSellerList();
});

/**
 * 查找商家
 */
function selSellerList(){
	isSearch = false;
	$.ajax({
		url : _config.basePath + "merchant/selList",
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
				sellerMsg = message;
				/*分页*/
				if(isFirstSel==1){
					isFirstSel = 0;
					 $("#page").paging({
						 totalPage: Math.ceil(result.msg/15),
						 totalSize: result.msg,
						 callback: function(num) {
						 		pagenum = num;
						 		if(isSearch)
						 			selSellerByDate();	
						 		else
						 			selSellerList();
						 	}
					 });
				}
				/*为表格赋值*/
				$("#merchantTbody").empty();
				$("#merchantTbody").append(setValueToTable(message,getradiohtml()));
			}
		},
		error : function(a, b, c){
			//alert(a.status);
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

/* 给seller表格每行加载数据 */
function addTdToTable(param,behind){
	var res = '<tr class="text-c" >'+behind;
	//for(var key in param )
	res += "<td>"+param.id+"</td>";
	res += "<td>"+param.merchantName+"</td>";
	res += "<td>"+param.createTime+"</td>";
	res += "<td>"+"暂时空着"+"</td>";
	res += getoperaHtml();
	return res+"</tr>";
}

/* 加载数据为每行 */
function addTdToTable1(param,behind,end){
	var res = '<tr class="text-c">'+behind;
	for(var key in param )
		res += "<td>"+param[key]+"</td>";
	return res+end+"</tr>";
}

/* 操作栏html top*/
function getoperaHtml(){
	var res = "<td><a title='查看' href='javascript:;' class='ml-5 btn_scan' style='text-decoration:none'><i class='Hui-iconfont'>&#xe665;</i></a>"+					
					"<a title='修改' href='javascript:;' class='ml-5 btn_edit' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6df;</i></a></td>";
					/*"<a title='删除' href='javascript:;' onclick='seller_del(this)' class='ml-5' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6e2;</i></a>";*/
	return res;
}

/*radio栏html*/
function getradiohtml(){
	var res = "<td><input type='checkbox'></td>";
	return res;
}

/* 商家发布页面跳转 */
$('#btnAdd').on('click',function(){
	seller_add();
})
function seller_add(){
	$("#addSellerDia").modal("show");
}

/* 商家编辑 */
$('#merchantTbody').on('click','.btn_edit',function(){
	seller_edit(this);
})
function seller_edit(obj){
	var $td= $(obj).parents('tr').children('td');  
    var sellerId = $td.eq(1).text();
    currentEditId = sellerId;
	addDataToEditDialog(currentEditId);
	$("#editSellerDia").modal("show");
}

/* 商家删除 */
function seller_del(obj){
	var $td= $(obj).parents('tr').children('td');  
    var sellerId = $td.eq(1).text();
	delteseller(sellerId,obj);
}

/* 商家查看对话框 */
$('#merchantTbody').on('click','.btn_scan',function(){
	seller_scan(this);
})
function seller_scan(obj){
	var $td= $(obj).parents('tr').children('td');  
    var sellerId = $td.eq(1).text();
	addDataToScanDialog(sellerId);
	$("#scanSellerDia").modal("show");
}

/*消息弹出框*/
function modalalert(msg){
	$.Huimodalalert(msg,3000);
}

/*格式化 时间*/
function getNowFormatDate(date) {
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var second = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hours >= 0 && hours <= 9) {
    	hours = "0" + hours;
    }
    if (minutes >= 0 && minutes <= 9) {
    	minutes = "0" + minutes;
    }
    if (second >= 0 && second <= 9) {
    	second = "0" + second;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + hours + seperator2 + minutes
            + seperator2 + second;
    return currentdate;
}

/*scansellerDia赋值*/
function addDataToScanDialog(id){
	
	for(var i=0; i<sellerMsg.length; i++){
		if(sellerMsg[i].id == id){
			$("#scan_sellerName").val(sellerMsg[i].merchantName);
			$("#scan_sellerDeductPer").val(sellerMsg[i].beanDeductionPercent*100);
			$("#scan_sellerDeduct").val(sellerMsg[i].beanDeductionLimit);
			$("#scan_sellerAccount").val(sellerMsg[i].merchantAccount);
			$("#scan_sellerPassword").val(sellerMsg[i].merchantPassword);
			document.getElementById("scan_sellerPicContainer").innerHTML = "<img src="+sellerMsg[i].merchantAvatar+">";
			document.getElementById("scan_sellerQr").innerHTML = "<img src="+sellerMsg[i].merchantQr+">";
		}
	}
}

/*editsellerDia赋值*/
function addDataToEditDialog(id){
	
	for(var i=0; i<sellerMsg.length; i++){
		if(sellerMsg[i].id == id){
			$("#edit_sellerName").val(sellerMsg[i].merchantName);
			$("#edit_sellerDeductPer").val(sellerMsg[i].beanDeductionPercent*100);
			$("#edit_sellerDeduct").val(sellerMsg[i].beanDeductionLimit);
			$("#edit_sellerAccount").val(sellerMsg[i].merchantAccount);
			$("#edit_sellerPassword").val(sellerMsg[i].merchantPassword);
			document.getElementById("edit_sellerPicContainer").innerHTML = "<img src="+sellerMsg[i].merchantAvatar+">";
		}
	}
}

/*编辑商家提交*/
$('#btneditSubmit').on('click',function(){
	editSellerSubmit();
})
function editSellerSubmit(){
	var merchantName = $("#edit_sellerName").val();// 商家名称
	var merchantAccount = $("#edit_sellerAccount").val();// 商家账号
	var merchantPassword = $("#edit_sellerPassword").val();// 商家密码
	var beanDeductionPercent = $("#edit_sellerDeductPer").val();// 绿豆抵扣额度百分比限制
	var beanDeductionLimit = $("#edit_sellerDeduct").val();// 绿豆抵扣最高额度限制
	
	var formData = new FormData();
	
	formData.append("id", currentEditId);
	formData.append("merchantName", merchantName);
	formData.append("merchantAccount", merchantAccount);
	formData.append("merchantPassword", merchantPassword);
	formData.append("beanDeductionPercent", beanDeductionPercent);
	formData.append("beanDeductionLimit", beanDeductionLimit);
	formData.append("avatar", document.getElementById("edit_sellerPic").files[0]);
	
	$.ajax({
		url : _config.basePath + "merchant/edit",
		type : "POST",
		dataType : "json",
		processData : false,
		contentType : false,
		data : formData,
		success : function(result){
			if(result.code==_encode.REQUEST_SUCCESS){
				modalalert("已成功修改");
				selSellerList();
				$("#editSellerDia").modal("hide");
			}else{
				alert("添加失败  "+result.msg);
			}
		}, 
		error : function(a,b,c){
			alert(a.status);
		}
	});
}

/**
 * 新增商家
 */
 $('#btnaddSubmit').on('click',function(){
 	addSellerSubmit();
 })
function addSellerSubmit(){
	var merchantName = $("#add_sellerName").val();// 商家名称
	var merchantAccount = $("#add_sellerAccount").val();// 商家账号
	var merchantPassword = $("#add_sellerPassword").val();// 商家密码
	var beanDeductionPercent = $("#add_sellerDeductPer").val();// 绿豆抵扣额度百分比限制
	var beanDeductionLimit = $("#add_sellerDeduct").val();// 绿豆抵扣最高额度限制
	var date = new Date();
	var createTime = getNowFormatDate(date);
	if(merchantName==""){
		$("#addTip").html("活动标题必填");
	}
	else if(beanDeductionPercent==""){
		$("#addTip").html("抵扣额度不能为空");
	}
	else if(beanDeductionLimit==""){
		$("#addTip").html("抵扣额度不能为空");
	}
	else if(merchantAccount==""){
		$("#addTip").html("商家账号必填");
	}
	else if(merchantPassword==""){
		$("#addTip").html("商家密码必填");
	}
	else if(document.getElementById("add_sellerPic").files[0]==""){
		$("#addTip").html("请上传正确格式的头像图片");
	}
	else{
		var formData = new FormData();
		formData.append("merchantName", merchantName);
		formData.append("merchantAccount", merchantAccount);
		formData.append("merchantPassword", merchantPassword);
		formData.append("beanDeductionPercent", beanDeductionPercent);
		formData.append("beanDeductionLimit", beanDeductionLimit);
		formData.append("createTime", createTime);
		//formData.append("merchantAvatar", document.getElementById("add_sellerPic").files[0]);
		formData.append("avatar", document.getElementById("add_sellerPic").files[0]);
		
		$.ajax({
			url : _config.basePath + "merchant/add",
			type : "POST",
			dataType : "json",
			processData : false,
			contentType : false,
			data : formData,
			success : function(result){
				if(result.code==_encode.REQUEST_SUCCESS){
					modalalert("已成功添加");
					selSellerList();
					$("#addSellerDia").modal("hide");
				}else{
					alert("添加失败 "+result.msg);
				}
			}, 
			error : function(a,b,c){
				alert(a.status);
			}
		});
		
	}

}

/**
 * 删除商家提交
 * @param sellerId
 * @param obj
 */
function delteseller(sellerId,obj){
	var formData = new FormData();
	formData.append("id", sellerId);
	
	$.ajax({
		url : _config.basePath + "seller/del",
		type : "POST",
		dataType : "json",
		processData : false,
		contentType : false,
		data : formData,
		success : function(result){
			if(result.code==_encode.REQUEST_SUCCESS){
				modalalert("已成功删除商家");
				$(obj).parent().parent().remove();
			}else{
				alert(result.msg);
			}
		}, 
		error : function(a,b,c){
			alert(a.status);
		}
	});
}

/*按日期查询提交*/
$('#btnSubmit').on('click',function(){
	selSellerByDateSubmit();
})
function selSellerByDateSubmit(){
	var startTime = $("#sellerSel_startTime").val();
	var endTime = $("#sellerSel_endTime").val();
	isFirstSel = 1;
	if(_utils.utils_isNull(startTime)&&_utils.utils_isNull(endTime)){
		isSearch = false;
		pagenum = 1;
		selSellerList();
	}else if(!_utils.utils_isNull(startTime) && !_utils.utils_isNull(endTime) && startTime<=endTime){
		isSearch = true;
		selSellerByDate();
	}else{
		alert(ERROR_SELECT_PARAM);
	}
}

/*按日期查询提交*/
function selSellerByDate(){
	$.ajax({
		url : _config.basePath + "merchant/selByDate",
		type : "POST",
		dataType : "json",
		data : {
			startTime : $("#sellerSel_startTime").val(),
			endTime : $("#sellerSel_endTime").val(),
			page : pagenum,
			isFirstSel : isFirstSel
		},
		success : function(result){
			if(result.code!=0){
				var message = result.result;
				sellerMsg = message;
				/*分页*/
				if(isFirstSel==1){
					isFirstSel = 0;
					 $("#page").paging({
						 totalPage: Math.ceil(result.msg/15),
						 totalSize: result.msg,
						 callback: function(num) {
						 		pagenum = num;
						 		if(isSearch)
						 			selSellerByDate();
						 		else
						 			selSellerList();
						 	}
					 });
				}
				/*为表格赋值*/
				
				$("#merchantTbody").empty();
				$("#merchantTbody").append(setValueToTable(message,getradiohtml(),getoperaHtml()));
			}else{
				alert(result.msg);
			}
		}
	});
}


