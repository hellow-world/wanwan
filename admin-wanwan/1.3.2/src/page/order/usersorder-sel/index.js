/*
* @Author: admin
* @Date:   2018-02-28 09:41:23
* @Last Modified by:   admin
* @Last Modified time: 2018-02-28 11:43:36
*/
var _config = require('service/config.js')
var _encode = require('service/errorcode.js')
var _utils  = require('util/utils.js')
var orderMsg = "";
/*分页使用到的参数*/
var pagenum =1 ; //总行数
var isSearch = false; //false:没有搜索之后的分页查询。 true： 有了搜索的分页查询
var isFirstSel = 0; //0: 不是第一次查询，不需返回页数   1： 是第一次查询，需要返回页数

/*load页面进行查询*/
$(function (){
	// CurrentUser();
	isFirstSel =1;
	selUserOrderList();
});

/**
 * 查找活动
 */
 $('#btnSubmit').on('click',function(){
 	selUserOrderList();
 })
function selUserOrderList(){
	isSearch = false;
	$.ajax({
		url : _config.basePath + "order/selUsersOrder",
		type : "POST",
		dataType : "json",
		data : {
			page : pagenum,
			isFirstSel : isFirstSel
		},
		success : function(result){
			if(result.code!=_encode.REQUEST_SUCCESS)
			{
				alert("no Order");
			}else{
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
						 			selOrderByDateSubmit();
						 		else
						 			selUserOrderList();
						 	}
					 });
				}
				/*为表格赋值*/
				$("#orderTbody").empty();
				$("#orderTbody").append(setValueToTable(message));
			}
		},
		error : function(a, b, c){
			alert(a.status);
		}
	});
}

/* 动态加载数据到表格*/
function setValueToTable(param){
	var res = "";
	for(var i = 0;i<param.length;i++){
		res+=addTdToTable(param[i]);
	}
	return res;
}

/* 给表格每行加载数据 */
function addTdToTable(param){
	var payment = "";
	var status = "";
	var res = '<tr class="text-c" >';
	//for(var key in param )
	res += "<td>"+param.orderId+"</td>";
	res += "<td>"+param.userName+"</td>";
	res += "<td>"+param.userAccount+"</td>";
	res += "<td>"+param.merchantName+"</td>";
	res += "<td>"+param.orderTime+"</td>";
	res += "<td>"+param.orderAmount+"</td>";
	res += "<td>"+param.beanDeducAmount+"</td>";
	res += "<td>"+param.payAmount+"</td>";
	if(param.orderState==1){
		status = "已完成";
	}
	else if(param.orderState==2){
		status = "进行中";
	}
	else if(param.orderState==3){
		status = "已关闭";
	}else{
		status = "异常";
	}
	res += "<td>"+status+"</td>";
	if(param.payWay==1){
		payment="商家扫码";
	}
	else if(param.payWay==2){
		payment="扫码枪";
	}
	else if(param.payWay==3){
		payment="用户主动扫码";
	}
	else if(param.payWay==4){
		payment="用户购买";
	}
	else{
		payment="付款方式异常";
	}
	res += "<td>"+payment+"</td>";
	return res+"</tr>";
}

/*消息弹出框*/
function modalalert(msg){
	$.Huimodalalert(msg,3000);
}

/*先设置标志再进行ajax请求*/
function onclickSubmit(){
	isFirstSel = 1;
	isSearch = true;
	selOrderByDateSubmit();
}

/*按日期查询提交*/
function selOrderByDateSubmit(){
	var userName = $("#userName").val();
	var startTime = $("#orderSel_startTime").val();
	var endTime = $("#orderSel_endTime").val();
	
	if(startTime>endTime){
		alert("开始时间不能小于结束时间");
	}else if(utils_isNull(userName) && utils_isNull(startTime) && utils_isNull(endTime)){
		isSearch = false;
		pagenum = 1;
		selUserOrderList();
	}else if(utils_isNull(userName) && (utils_isNull(startTime) || utils_isNull(endTime))){
		alert("输入有误");
	}
	else{
		$.ajax({
			url : _config.basePath + "order/selUserOrderByDateName",
			type : "POST",
			dataType : "json",
			data : {
				startTime : startTime,
				endTime : endTime,
				userName : userName,
				page : pagenum,
				isFirstSel : isFirstSel
			},
			success : function(result){
				if(result.code==_encode.REQUEST_SUCCESS){
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
							 			selOrderByDateSubmit();
							 		else
							 			selUserOrderList();
							 	}
						 });
					}
					/*为表格赋值*/
					$("#orderTbody").empty();
					$("#orderTbody").append(setValueToTable(message));
				}else{
					alert(result.msg);
					$("#orderTbody").empty();
				}
			},
			error : function(a, b, c){
				alert(a.status);
			}
		});
	}
}


