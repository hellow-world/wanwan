/*
 * @Author: admin
 * @Date:   2018-04-19 11:41:36
 * @Last Modified by:   admin
 * @Last Modified time: 2018-04-20 23:03:12
 */
var _utils = require('util/utils.js')
var _config = require('service/config.js')
var _encode = require('service/errorcode.js')

var pagenum = 1;
var pageSize = 15;
var isSearched = false;
var isFirstSel = 0; //0: 不是第一次查询，不需返回页数   1： 是第一次查询，需要返回页数
$(function() {

    let id = _utils.getParams('activityId')
    isFirstSel =1;
    selSignList(id);

})
var selSignList = (id) => {
    isSearched = false;
    $.ajax({
        url: _config.buildPath + 'api-amuse/v1.1/activity/enrol',
        type: 'get',
        dataType: 'json',
        headers: { "token": _config.token },
        data: {
            activityId: id,
            page: pagenum,
            pageSize: pageSize
        },
        success: (res) => {
            console.log(res);
            if (res.code !== _encode.REQUEST_SUCCESS) {
                alert(res.msg)
            } else {
                let message = res.result;
                $('#signTbody').empty();
                $('#signTbody').append(setValueToList(message))
                /*分页*/
                if (isFirstSel == 1) {
                    isFirstSel = 0;
                    $("#page").paging({
                        totalPage: Math.ceil(res.msg / 15),
                        totalSize: res.msg,
                        callback: function(num) {
                            pagenum = num;
                            if (isSearch)
                                selSignDate();
                            else
                                selSignList();
                        }
                    });
                }
            }
        },
        error: (a, b, c) => {
            alert(a.status);
        }
    })
}
//给列表赋值
var setValueToList = (param)=>
{
	let res = '';
	for (var i = 0; i < param.length; i++) {
		res+=addValueToTable(param[i],i)
	}
	return res;
}
var addValueToTable = (param,num)=>
{
	let res = `<tr class="text-c">`
	res+=`<td >${num}</td>
		  <td >${param.uid}</td>
		  <td >${_utils.formatDate(param.enrolTime)}</td>
		  <td >${param.nickname}</td>
		  <td >${param.telephone}</td>
		  <td >${param.roleName}</td>
		  <td >${param.carrySum}</td>
		  <td >${param.enrolCost/100}</td>
	      `
	return res + `</tr>`
}
window.ExportExcel = () => {

    _utils.export.toCSV('activitySignTable', '报名名单');

}