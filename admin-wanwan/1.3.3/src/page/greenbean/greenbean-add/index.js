/*
* @Author: admin
* @Date:   2018-02-27 14:28:22
* @Last Modified by:   admin
* @Last Modified time: 2018-04-02 16:24:56
*/
/**
 * 发送方式： 0：单人发放 1：excel 发送
 */
var _config = require('service/config.js')
var _encode = require('service/errorcode.js')
var _utils  = require('util/utils.js')

var SENDTYPE_SINGLEUSER = 0;
var SENDTYPE_MULTIUSERS = 1;
$(function(){
	// _utils.CurrentUser();
});

var isFromJackpot = 0; //0:不是  1：是 

$('#isJackpot').on('click',function(){
	onClickHander(this);
})
function onClickHander(obj){
    if(obj.checked){
        $("#greenbean_num").show();
        isFromJackpot = 1;
    }else{
        $("#greenbean_num").hide();
        isFromJackpot = 0;
    }
    
}
 
/*消息弹出框*/
function modalalert(msg){
	$.Huimodalalert(msg,3000);
}

/*格式化时间*/
function getNowFormatDate() {
    var date = new Date();
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

/**
 * 取消excel上传
 */
window.cancelExcel = function(){
	document.getElementById("users_file").value ='';
	$("#greenbean_users").attr("disabled", false);
	$("#greenbean_money").attr("disabled", false);
	dataMsg = null;
}
/**
 * 所有用户的标志
 * 优先级最高 
 * 此功能暂时被屏蔽了,狗策划的锅。
 */
var flag; //1:自己输入的值  2：excel传入的值  3：全体
var isAllFlag = 0;  //0:没选中全部  1： 已选中全部
function allUsers(){
	if(isAllFlag==0){
		$("#allSpan").html("取消全部");
		isAllFlag = 1;
		document.getElementById("users_file").value ='';
		
		$("#greenbean_users").attr("disabled", true);
		$("#greenbean_money").attr("disabled", true);
	}
	else{
		$("#allSpan").html("全体");
		$("#greenbean_users").attr("disabled", false);
		$("#greenbean_money").attr("disabled", false);
		isAllFlag = 0;
	}
}

/**
 * 新增发放提交
 */
 $('#btnSubmit').on('click',function(){
 	addGreenbeanSubmit();
 })
function addGreenbeanSubmit(){
	var beanDepartment = $('#greenbean_department').val();
	var beanUsers = $('#greenbean_users').val();
	var beanMoney = $('#greenbean_money').val();
	var beanReason = $('#greenbean_reason').val();
	var beanSource = $('#greenbean_title').val();
	var beanPutawayTime = $('#greenbean_putawayTime').val();
	var file = $("#users_file").val();
	
	var beanCreateTime = getNowFormatDate();
	if(beanReason==""){
		$("#Tip").html("申请原因请填写");
	}
	else if(beanPutawayTime==""){
		$("#Tip").html("发放时间必填");
	}
	else if(beanSource==""){
		$("#Tip").html("发放标题必填");
	}
	else{
		var formData = new FormData();
		var data ="";
		if(!_utils.utils_isNull(dataMsg)){
			data = convertJSON(dataMsg);
			formData.append("fileName", _utils.getFileName(file));
			formData.append("sendType", SENDTYPE_MULTIUSERS);
		}else{
			data = convertJSON(beanUsers, beanMoney);
			formData.append("beanUser", beanUsers);
			formData.append("telephone", beanUsers);
			formData.append("beanNum", beanMoney);
			formData.append("sendType", SENDTYPE_SINGLEUSER);
		}
		
		formData.append("data", JSON.stringify(data));
		formData.append("isAllUser", isAllFlag);
		formData.append("sponsorName", _utils.sponsorName);
		formData.append("SponsorDepartment", beanDepartment);
		formData.append("sponsorReason", beanReason);
		formData.append("putawayTime", beanPutawayTime);
		formData.append("isFromJackpot", isFromJackpot);
		formData.append("beanSource", beanSource);
		$.ajax({
			url : _config.basePath + "bean/send",
			type : "POST",
			dataType : "json",
			processData : false,
			contentType : false,
			data : formData,
			success : function(result){
				if(result.code==_encode.REQUEST_SUCCESS){
					modalalert("已成功添加绿豆");
					setTimeout(backToList,1000);
				}else{     
					alert(result.msg);
				}
			}, 
			error : function(a,b,c){
				alert(a.status);
			}
		});
		
	}
}

/**
 * 做延迟1s返回列表
 */
function backToList(){
	window.history.back();
}
/*
FileReader共有4种读取方法：
1.readAsArrayBuffer(file)：将文件读取为ArrayBuffer。
2.readAsBinaryString(file)：将文件读取为二进制字符串
3.readAsDataURL(file)：将文件读取为Data URL
4.readAsText(file, [encoding])：将文件读取为文本，encoding缺省值为'UTF-8'
             */
var wb;//读取完成的数据
var rABS = false; //是否将文件读取为二进制字符串
var dataMsg = "";
window.importf = function (obj) {//导入
    if(!obj.files) {
        return;
    }
    var f = obj.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result;
        if(rABS) {
            wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                type: 'base64'
            });
        } else {
            wb = XLSX.read(data, {
                type: 'binary'
            });
        }
        //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        //wb.Sheets[Sheet名]获取第一个Sheet的数据
        //document.getElementById("demo").innerHTML= JSON.stringify( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) );
		//console.log(JSON.stringify( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) ));
        dataMsg = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        if(!_utils.utils_isNull(dataMsg)){
        	$("#greenbean_users").attr("disabled", true);
        	$("#greenbean_money").attr("disabled", true);
        }
		/*console.log(dataMsg);
		console.log(convertJSON(dataMsg));*/
		//console.log(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
    };
    if(rABS) {
        reader.readAsArrayBuffer(f);
    } else {
        reader.readAsBinaryString(f);
    }
}

function fixdata(data) { //文件流转BinaryString
    var o = "",
        l = 0,
        w = 10240;
    for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
}

/**
 * 文件数据组装
 * @param data
 * @returns {Array}
 */
function convertJSON(){
	var jsonD = {};
	var jsonA = [];
	if(arguments.length==1){
		for(var i=0; i<arguments[0].length; i++){
			var index = 0;
			jsonD = {};
			for(key in arguments[0][i]){
				if(index==0){
					jsonD["telephone"] = arguments[0][i][key];
				}
				if(index==1){
					jsonD["num"] = arguments[0][i][key];
				}
				index+=1;
			}
			jsonA[i] = jsonD;
		}
	}
	else if (arguments.length==2){
		if(_utils.utils_isNull(arguments[0],arguments[1])){
		
			alert("请正确填写参数");
			return null;
		}
		jsonD["telephone"] = arguments[0];
		jsonD["num"] = arguments[1];
		jsonA[0] = jsonD;
	}
	else{
		alert("确定是正确的姿势操作？？");
	}
	return jsonA;
}

/**
 * 单人数据组装
 * @param data
 * @returns {Array}
 *//*
function convertJSON(telephone, num){
	alert(1);
	if(utils_isNull(telephone,num)){
		return null;
	}
	var jsonD = {};
	var jsonA = [];
	jsonD["telephone"] = telephone;
	jsonD["num"] = num;
	jsonA[0] = jsonD;
	return jsonA;
}*/
 
	 
 
