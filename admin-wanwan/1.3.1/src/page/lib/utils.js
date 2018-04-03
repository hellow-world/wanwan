
/**
 * 判断参数是否全部为空 
 * @param param
 * @returns {Boolean} true 为空， false 不为空
 */
function utils_isNull(){
	
	for(var i=0; i<arguments.length; i++){
		if(arguments[i] == "" || arguments[i] == null){
			return true;
		}
		return false;
	}	
	
}

/**
 * 获取当前用户
 * 未添加权限管理的时候添加此功能。暂用0.0
 */
var sponsorName = "";
function CurrentUser(){
	
	 $.ajax({
	  		url : basePath + "/manageruser/selectcurUser",
	  		type : "POST",
	  		dataType : "json",
	  		success : function(result){
	  			if(result.code!=REQUEST_SUCCESS)
	  			{
	  				alert("no users, please re-entry~");
	  				top.document.location.href = basePath +"/";
	  			}else{
	  				sponsorName = result.msg.userName;
	  			}
	  		},
	  		error : function(a, b, c){
	  			alert(a.status);
	  		}
	  	});
}

/**
 * 获取文件名
 * @param o 文件(型如：$("#").val())
 * @returns
 */
function getFileName(o){
    var pos=o.lastIndexOf("\\");
    return o.substring(pos+1);  
}

/**
 * 获取网页传递的参数值
 * @param key key值
 * @returns  key对应的value
 */
function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};

/**
 * 数组添加contains方法
 */
Array.prototype.contains = function(item){
	  return RegExp("\\b"+item+"\\b").test(this);
};

/* 
* 方法:Array.remove(dx) 通过遍历,重构数组 
* 功能:删除数组元素. 
* 参数:dx删除元素的下标. 
*/
Array.prototype.remove=function(dx) 
{ 
  if(isNaN(dx)||dx>this.length){return false;} 
  for(var i=0,n=0;i<this.length;i++) 
  { 
    if(this[i]!=this[dx]) 
    { 
      this[n++]=this[i] 
    } 
  } 
  this.length-=1 
} 

/*消息弹出框*/
function modalalert(msg){
	$.Huimodalalert(msg,3000);
}

/**
 * 深度拷贝一个引用型参数  
 * @param p 被拷贝对象
 * @param c 初始为空，需要拷贝的对象
 * @returns {___anonymous1520_1521}
 */
function Copy(p, c) {
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
}


