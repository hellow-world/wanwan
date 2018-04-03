/*
* @Author: admin
* @Date:   2018-02-08 15:18:53
* @Last Modified by:   admin
* @Last Modified time: 2018-02-25 16:51:04
*/
var config = require('service/config.js')
var errorcode = require('service/errorcode.js')
var _utils = require('util/utils.js')
/*分页使用到的参数*/
var pagenum =1 ; //总行数
var isSearch = false; //false:没有搜索之后的分页查询。 true： 有了搜索的分页查询
var isFirstSel = 0; //0: 不是第一次查询，不需返回页数   1： 是第一次查询，需要返回页数

$(function(){
	// CurrentUser();//验证当前用户
	isFirstSel =1; 
	selLotteryList();
});
/**
 * 查询抽奖
 */
function selLotteryList(){
	isSearch = false;
	$.ajax({
  		url : config.basePath + "lottery/sel",
  		type : "POST",
  		data : {
  			page : pagenum,
			isFirstSel : isFirstSel
  		},
  		dataType : "json",
  		success : function(result){
  			if(result.code==errorcode.DATABASE_ERROR)
  			{
  				$("#jackpotTbody").empty();
				$("#jackpotTbody").append(_utils.noDataTbody(9));

  			}else if(result.code == errorcode.REQUEST_SUCCESS){
	  			var message = result.result;
	  			for (var i = 0; i < message.length; i++) {
	  				delete message[i].lotteryQr;
				}
	  			/*分页*/
				if(isFirstSel==1){
					isFirstSel = 0;
					 $("#page").paging({
						 totalPage: Math.ceil(result.msg/15),
						 totalSize: result.msg,
						 callback: function(num) {
						 		pagenum = num;
						 		if(isSearch)
						 			selLotteryByName();
						 		else
						 			selLotteryList();
						 	}
					 });
				}
				/*为表格赋值*/
				$("#jackpotTbody").empty();
				$("#jackpotTbody").append(_utils.setValueToTable(message,getradiohtml(),_utils.getoperaHtml()));
  			}
  		},
  		error : function(a, b, c){
  			alert(a.status);
  		}
  	});
}
function jackpotAddSubmit(){
	var lotteryName = $("#jackPotName").val();
	
	if(_utils.utils_isNull(jackPotName)){
		$("#Tip").html("请输入奖励名称");
	}else{
		$.ajax({
			url : config.basePath + "lottery/add",
			type : "POST",
			dataType : "JSON",
			data : {
				lotteryName : lotteryName,
				sponsorName : sponsorName
			},
			success : function(result){
				selLotteryList();
				$("#addJackpotDia").modal("hide");
			},
			error : function(a,b,c){
				alert(a.status);
			}
		});
	}
}

/**
 * 按名称查询抽奖
 */
$('#btnSel').click(function(){
	selJackpotsByNameSubmit();
})
function selJackpotsByNameSubmit(){
	var lotteryName = $("#lottery_name").val();
	isFirstSel = 1;
	if(_utils.utils_isNull(lotteryName)){
		isSearch = false;
		pagenum = 1;
		selLotteryList();
	}else{
		isSearch = true;
		selLotteryByName();
	}
}

function selLotteryByName(){
	$.ajax({
  		url : config.basePath + "lottery/selByName",
  		type : "POST",
  		data : {
  			page : pagenum,
			isFirstSel : isFirstSel,
			lotteryName : $("#lottery_name").val()
  		},
  		dataType : "json",
  		success : function(result){
  			if(result.code==errorcode.DATABASE_ERROR)
  			{
  				$("#jackpotTbody").empty();
				$("#jackpotTbody").append(_utils.noDataTbody(9));

  			}else if(result.code == errorcode.REQUEST_SUCCESS){
	  			var message = result.result;
	  			for (var i = 0; i < message.length; i++) {
	  				delete message[i].lotteryQr;
				}
	  			/*分页*/
				if(isFirstSel==1){
					isFirstSel = 0;
					 $("#page").paging({
						 totalPage: Math.ceil(result.msg/15),
						 totalSize: result.msg,
						 callback: function(num) {
						 		pagenum = num;
						 		if(isSearch)
						 			selLotteryByName();
						 		else
						 			selLotteryList();
						 	}
					 });
				}
				/*为表格赋值*/
				$("#jackpotTbody").empty();
				$("#jackpotTbody").append(_utils.setValueToTable(message,getradiohtml(),_utils.getoperaHtml()));
  			}
  		},
  		error : function(a, b, c){
  			alert(a.status);
  		}
  	});
}