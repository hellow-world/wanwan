
var _utils    = require('util/utils.js');
var _config   = require('service/config.js'); 
var _encode   = require('service/errorcode.js');

const pagenum = 1,//页码
	  pagesize= 15//一页行数


$(function(){

	// selInformationList();
})
//搜索资讯数据
var selInformationList = ()=>
{
	$.ajax({
		url:_config.basePath + '',
		type:'POST',
		dataType:'json',
		headers:{'token':_config.token},
		success:(res)=>
		{
			if(res.code!==_encode.REQUEST_SUCCESS)
			{
				alert(res.msg)
			}
			else
			{
				let message = res.result;
				$('#infoTbody').empty();
				$('#infoTbody').append(setInformationList(message));
				

			}
		},
		error:(a,b,c)=>
		{
			alert(a.status)
		}
	})
}
//赋值给列表
var setInformationList = (param)=>
{
	let res = `<tr class="tetx-c">`;
	for (var i = 0; i < param.length; i++) {
		res+=addValueToList(param[i])
	}
	return res + `</tr>`;
}
var addValueToList = (param)=>
{
	let res = ``;
	res+=`<td class='info-id'>${param}</td>`;
	res+=`<td>${param}</td>`;
	res+=`<td>${param}</td>`;
	res+=`<td>${param}</td>`;
	res+=`<td>${behindHandle()}</td>`;
}
var behindHandle = ()=>
{
	let res;
	res+=`<a title='查看' href='javascript:;' class='ml-5' onclick="infoScan(this)" style='text-decoration:none'><i class='Hui-iconfont'>&#xe665;</i></a>
		  <a title='修改' href='javascript:;' class='ml-5' onclick="infoEdit(this)" style='text-decoration:none'><i class='Hui-iconfont'>&#xe6df;</i></a>
		  <a title='删除' href='javascript:;' class='ml-5' onclick="infoDel(this)" style='text-decoration:none'><i class='Hui-iconfont'>&#xe6e2;</i></a>
		  `;
    return res;
}
//查看
window.infoScan = (obj)=>
{
	let id = $(this).parent('td').find('.info-id');

}
window.infoEdit = (obj)=>
{
	let id = $(this).parent('td').find('.info-id');
	
}
window.infoDel = (obj)=>
{
	let id = $(this).parent('td').find('.info-id');
	
}
