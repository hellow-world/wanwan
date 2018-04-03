/*
* @Author: John
* @Date:   2018-01-30 14:28:32
* @Last Modified by:   admin
* @Last Modified time: 2018-03-20 21:47:30
*/
var _encode = require('service/errorcode.js')
var config = require('service/config.js')
var _utils = {

	request : function(param){
		var _this = this;
		$.ajax({
			type    : param.method || 'get',
			url     : param.url    || '',
			dataType: param.type   || 'json',
			data    : param.data   || '',
			success : function(res){
				console.log(res)
				// 请求成功
				if(_encode.REQUEST_SUCCESS === res.code){
					typeof param.success === 'function' && param.success(res.data, res.msg)
					
				}
				// 没有登陆状态，需要强制登录
				// else if(10 === res.status){
				// 	_this.doLogin()
				// }
				// // 请求数据错误
				// else if(1 ===res.status){
				// 	typeof param.error === 'function' && param.error(res.msg)
				// }

			},
			error   : function(err){
				typeof param.error === 'function' && param.error(err.code)
			}

		});
	},
	// 获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    // 获取url参数
    getUrlParam : function(name){
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //统一登录处理
	doLogin : function(){
		window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
	},

	/**
	 * 判断参数是否全部为空 
	 * @param param
	 * @returns {Boolean} true 为空， false 不为空
	 */
	utils_isNull : function(){

			for(var i=0; i<arguments.length; i++){
			if(arguments[i] == "" || arguments[i] == null){
				return true;
			}
			return false;
		}	
	},
	/**
	 * 获取当前用户
	 * 未添加权限管理的时候添加此功能。暂用0.0
	 */
	sponsorName : "",
	CurrentUser : function(){
		
		$.ajax({
	  		url : config.basePath + "manageruser/selectcurUser",
	  		type : "POST",
	  		dataType : "json",
	  		success : function(result){
	  			console.log(result)
	  			if(result.code!=_encode.REQUEST_SUCCESS)
	  			{
	  				alert("no users, please re-entry~");
	  				top.document.location.href = "../../index.html";
	  			}else{
	  				sponsorName = result.msg.userName;
	  			}
	  		},
	  		error : function(a, b, c){
	  			alert(a.status);
	  		}
	  	});

	},
	/**
	 * 获取文件名
	 * @param o 文件(型如：$("#").val())
	 * @returns
	 */
	getFileName : function(o){
		var pos=o.lastIndexOf("\\");
    	return o.substring(pos+1);
	},
	/**
	 * 获取网页传递的参数值
	 * @param key key值
	 * @returns  key对应的value
	 */
	getParams : function (key) {
	    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	},
	/*消息弹出框*/
	modalalert : function (msg){
		$.Huimodalalert(msg,3000);
	},
		/**
	 * 深度拷贝一个引用型参数  
	 * @param p 被拷贝对象
	 * @param c 初始为空，需要拷贝的对象
	 * @returns {___anonymous1520_1521}
	 */
	Copy : function (p, c) {
		var c = c || {};
		for (var i in p){
			if(typeof p[i] == "object"){
				c[i] = (p[i].constructor === Array) ? [] : {};
				Copy(p[i], c[i]);
			}else{
				c[i] = p[i];
			}
		}
		return c;
	},
	/* 动态加载数据到表格*/
	setValueToTable : function(param,behind,end)
	{
		var res = "";
	
		for(var i = 0;i<param.length;i++){
			res+=this.addTdToTable(param[i],behind,end);
		}
		return res;
	},
	/* 加载数据为每行 */
	addTdToTable : function(param,behind,end){
		var res = '<tr class="text-c">'+behind;
		for(var key in param ){
			res += "<td>"+param[key]+"</td>";
		}
		return res+end+"</tr>";
	},
	/*radio栏html*/
	getradiohtml : function()
	{
		var res = "<td><input type='checkbox'></td>";
		return res;
	},
	/**
	 * 空数据表格内容添加
	 * @param colnum 列数
	 * @returns
	 */
	noDataTbody : function(colnum){
	var res = "";
	res += '<tr><td colspan="'+colnum+'" style="text-align: center">暂无数据</td></tr>';
	 
	},
	//操作栏创建
	getoperaHtml: function(){
		console.log('操作栏创建')
		var res = "<td><a title='查看' href='javascript:void(0);' class='ml-5 setScan' style='text-decoration:none'><i class='Hui-iconfont'>&#xe665;</i></a>"+					
						"<a title='修改' href='javascript:void(0);' class='ml-5 setEdit' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6df;</i></a>"+
						"<a title='删除' href='javascript:void(0);' class='ml-5 setDel' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6e2;</i></a>"+
						"<a title='置顶' href='javascript:void(0);' class='ml-5 setTop' style='text-decoration:none'><i class='Hui-iconfont'>&#xe679;</i></a></td>";
		return res;
	},
	//返回列表
	backToList: function(){
		window.history.back();
	},
	// 通用提示框
	modalTip:function(text,dur)
	{
		$.Huimodalalert(text, dur || 2000)
	}



};
module.exports = _utils;