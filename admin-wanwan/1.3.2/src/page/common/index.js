/*
* @Author: admin
* @Date:   2018-01-29 16:11:50
* @Last Modified by:   admin
* @Last Modified time: 2018-04-09 18:02:49
*/
require('./index.css')
require('../lib/jquery.cookie.js')
var _utils = require('util/utils.js')
var _config = require('service/config.js')
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
var _token=$.cookie('token')
var _sponsorName = $.cookie('sponsorName')
if(_token===undefined||_sponsorName===undefined)
{
    //top.location.href="../../";
    top.location.href="../../dist/";
	
}
else
{
    console.log('登录成功')
    console.log(_sponsorName)
}
_config.token = _token;
_config.sponsorName = _sponsorName;
window.onload=function(){
    var temp = document.getElementsByTagName("a");
    var i = 0;
    for(i=0;i<temp.length;i++){
        //console.log(temp[i].href);
        if(temp[i].href=="https://www.froala.com/wysiwyg-editor?k=u")
        {           temp[i].parentNode.removeChild(temp[i].parentNode.childNodes[0]);
        }
    }
}
$('input[type=file]').change(function(){
    let fileSize = this.files[0].size
    if(fileSize>1048576)
    {
        _utils.modalalert('文件大于1M，请重新上传')
        return;
    }
})
