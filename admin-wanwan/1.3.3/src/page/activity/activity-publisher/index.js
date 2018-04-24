/*
* @Author: admin
* @Date:   2018-04-12 11:06:11
* @Last Modified by:   John
* @Last Modified time: 2018-04-12 15:25:37
*/
var _config = require('service/config.js')
var _encode = require('service/errorcode.js')
var _utils  = require('util/utils.js')

var pagenum =1 ; //总行数
var isSearch = false; //false:没有搜索之后的分页查询。 true： 有了搜索的分页查询
var isFirstSel = 0; //0: 不是第一次查询，不需返回页数   1： 是第一次查询，需要返回页数
window.addPublisher = function()
{
	$('#add_sellerName').val('')
	$('.seller-input').html('')
	$("#addSellerDia").modal("show");
}
$(function(){
	isFirstSel =1;
	selPublisherList();
})
var selPublisherList = ()=>
{
	$.ajax({
		url:_config.buildPath + "api-amuse/v1.1/activity/issuer",
		type:'GET',
		dataType:'json',
		headers:{'token':_config.token},
		success:(res)=>{
			console.log(res)
			if(res.code!==_encode.REQUEST_SUCCESS)
			{
				alert(res.msg)
			}
			else
			{
				let message = res.result;
				$('#merchantTbody').empty();
				$('#merchantTbody').append(setPublisherToTable(message));


			}
			// else
			// {
			// 	/*分页*/
			// 	if(isFirstSel==1){
			// 		isFirstSel = 0;
			// 		 $("#seller-page").paging({
			// 			 totalPage: Math.ceil(res.msg/9),
			// 			 totalSize: res.msg,
			// 			 callback: function(num) {
			// 			 		console.log(num)
			// 			 		pagenum = num;
			// 			 		if(isSearch)
			// 			 			selSellerByDate();	
			// 			 		else
			// 			 			selSellerList();
			// 			 	}
			// 		 });
			// 	}
			// 	/*为表格赋值*/
			// 	let message = res.result;
   //              $("#selSellerbody").empty();
   //              $("#selSellerbody").append(setValueToTable(message));
			// }
		},
		error:(a,b,c)=>
		{
			alert(a.status)
		}
	})

}
var setPublisherToTable = (param)=>
{
	var res = "";
    for (var i = 0; i < param.length; i++) {
        res += addTdToTablePublisher(param[i]);
    }
    return res;
}
var addTdToTablePublisher = (param)=>
{
	var res = '<tr class="text-c" >'
    //for(var key in param )
    res += "<td>" + param.issuerId + "</td>";
    res += "<td>" + param.issuerName + "</td>";
    res += "<td>" + param.createTime + "</td>";
    res += getoperaHtml_publisher();
    return res + "</tr>";
}
var getoperaHtml_publisher = ()=>
{
	var res = "<td><a title='删除' href='javascript:;' class='ml-5' style='text-decoration:none' onclick='publisherDel(this);'><i class='Hui-iconfont'>&#xe6e2;</i></a>" + "</td>";
    return res;
}
var selSellerList = ()=>
{
	isSearch = false;
	$.ajax({
		url:_config.basePath + "merchant/selList",
		type:'POST',
		dataType:'json',
		data : {
			page : pagenum,
			isFirstSel : isFirstSel
		},
		headers:{'token':_config.token},
		success:(res)=>{
			console.log(res)
			if(res.code!==_encode.REQUEST_SUCCESS)
			{
				alert(res.msg)
			}
			else
			{
				/*分页*/
				if(isFirstSel==1){
					isFirstSel = 0;
					 $("#seller-page").paging({
						 totalPage: Math.ceil(res.msg/9),
						 totalSize: res.msg,
						 callback: function(num) {
						 		console.log(num)
						 		pagenum = num;
						 		if(isSearch)
						 			selSellerByDate();	
						 		else
						 			selSellerList();
						 	}
					 });
				}
				/*为表格赋值*/
				let message = res.result;
                $("#selSellerbody").empty();
                $("#selSellerbody").append(setValueToTable(message));
			}
		},
		error:(a,b,c)=>
		{
			alert(a.status)
		}
	})
}
window.sellerAccount = function()
{
	$("#modal-seller").modal("show");
	selSellerList();
}
/* 动态加载数据到表格*/
function setValueToTable(param, behind) {
    var res = "";
    for (var i = 0; i < param.length; i++) {
        res += addTdToTable(param[i], behind);
    }
    return res;
}
/* 给card表格每行加载数据 */
function addTdToTable(param, behind) {
    var res = '<tr class="text-c" >' + behind;
    //for(var key in param )
    res += "<td class='card_id'>" + param.id + "</td>";
    res += "<td class='card_name'>" + param.merchantName + "</td>";
        res += getoperaHtml();
    return res + "</tr>";
}
/* 操作栏up*/
function getoperaHtml() {
    var res = "<td><a title='选择' href='javascript:;' class='ml-5' style='text-decoration:none' onclick='sellerSelectConfirm(this);'><i class='Hui-iconfont'>&#xe6a7;</i></a>" + "</td>";
    return res;
}
window.sellerSelectConfirm = (obj)=>
{
	let sellerName = $(obj).parent('td').siblings().eq(1).text();
	let sellerId = $(obj).parent('td').siblings().eq(0).text();
	$('.seller-input').text(sellerName)
	$('.seller-input').attr('data-id',sellerId)

	_utils.modalalert('已选择商家',1000)
	$("#modal-seller").modal("hide");

}
window.addSubmit = ()=>
{
	if($('.seller-input').text()=='')
	{
		_utils.modalalert('商家不能为空')
		return;
	}
	let sellerId = $('.seller-input').attr('data-id');
	console.log(sellerId)
	$.ajax({
		url:_config.buildPath+'api-amuse/v1.1/activity/issuer',
		type:'POST',
		headers:{'token':_config.token},
		dataType:'json',
		data:
		{
			merchantId:sellerId
		},
		success:(res)=>
		{
			if(res.code!==_encode.REQUEST_SUCCESS)
			{
				alert(res.msg)
			}
			else
			{
				$('#addSellerDia').modal('hide')
				reload();
			}
		},
		error:(a,b,c)=>
		{
			alert(a.status);
		}
	})
}
window.publisherDel = (obj)=>
{
	let publisherId = $(obj).parent('td').siblings().eq(0).text();
	$.ajax({
		url:_config.buildPath + 'api-amuse/v1.1/activity/issuer/delete',
		headers:{"token":_config.token},
		type:'POST',
		dataType:'json',
		data:
		{
			issuerId:publisherId
		},
		success:(res)=>
		{
			_utils.modalalert('发布者删除成功',1000);
			setTimeout(reload,1000)
		},
		error:(a,b,c)=>
		{
			alert(a.status);
		}
	})
}
// 刷新当前页面
function reload()
{
	window.location.reload();
}