webpackJsonp([24],{0:function(e,n,a){e.exports=a(25)},25:function(e,n,a){function t(e){e.checked?($("#greenbean_num").show(),g=1):($("#greenbean_num").hide(),g=0)}function r(e){$.Huimodalalert(e,3e3)}function i(){var e=new Date,n="-",a=":",t=e.getMonth()+1,r=e.getDate(),i=e.getHours(),s=e.getMinutes(),l=e.getSeconds();t>=1&&t<=9&&(t="0"+t),r>=0&&r<=9&&(r="0"+r),i>=0&&i<=9&&(i="0"+i),s>=0&&s<=9&&(s="0"+s),l>=0&&l<=9&&(l="0"+l);var o=e.getFullYear()+n+t+n+r+" "+i+a+s+a+l;return o}function s(){var e=$("#greenbean_department").val(),n=$("#greenbean_users").val(),a=$("#greenbean_money").val(),t=$("#greenbean_reason").val(),s=$("#greenbean_title").val(),o=$("#greenbean_putawayTime").val(),y=$("#users_file").val();i();if(""==t)$("#Tip").html("申请原因请填写");else if(""==o)$("#Tip").html("发放时间必填");else if(""==s)$("#Tip").html("发放标题必填");else{var h=new FormData,_="";c.utils_isNull(v)?(_=p(n,a),h.append("beanUser",n),h.append("telephone",n),h.append("beanNum",a),h.append("sendType",f)):(_=p(v),h.append("fileName",c.getFileName(y)),h.append("sendType",m)),h.append("data",JSON.stringify(_)),h.append("isAllUser",b),h.append("sponsorName",c.sponsorName),h.append("SponsorDepartment",e),h.append("sponsorReason",t),h.append("putawayTime",o),h.append("isFromJackpot",g),h.append("beanSource",s),$.ajax({url:u.basePath+"bean/send",type:"POST",dataType:"json",processData:!1,contentType:!1,data:h,success:function(e){e.code==d.REQUEST_SUCCESS?(r("已成功添加绿豆"),setTimeout(l,1e3)):alert(e.msg)},error:function(e,n,a){alert(e.status)}})}}function l(){window.history.back()}function o(e){for(var n="",a=0,t=10240;a<e.byteLength/t;++a)n+=String.fromCharCode.apply(null,new Uint8Array(e.slice(a*t,a*t+t)));return n+=String.fromCharCode.apply(null,new Uint8Array(e.slice(a*t)))}function p(){var e={},n=[];if(1==arguments.length)for(var a=0;a<arguments[0].length;a++){var t=0;e={};for(key in arguments[0][a])0==t&&(e.telephone=arguments[0][a][key]),1==t&&(e.num=arguments[0][a][key]),t+=1;n[a]=e}else if(2==arguments.length){if(c.utils_isNull(arguments[0],arguments[1]))return alert("请正确填写参数"),null;e.telephone=arguments[0],e.num=arguments[1],n[0]=e}else alert("确定是正确的姿势操作？？");return n}var u=a(1),d=a(3),c=a(2),f=0,m=1;$(function(){});var g=0;$("#isJackpot").on("click",function(){t(this)}),window.cancelExcel=function(){document.getElementById("users_file").value="",$("#greenbean_users").attr("disabled",!1),$("#greenbean_money").attr("disabled",!1),v=null};var b=0;$("#btnSubmit").on("click",function(){s()});var y,h=!1,v="";window.importf=function(e){if(e.files){var n=e.files[0],a=new FileReader;a.onload=function(e){var n=e.target.result;y=h?XLSX.read(btoa(o(n)),{type:"base64"}):XLSX.read(n,{type:"binary"}),v=XLSX.utils.sheet_to_json(y.Sheets[y.SheetNames[0]]),c.utils_isNull(v)||($("#greenbean_users").attr("disabled",!0),$("#greenbean_money").attr("disabled",!0))},h?a.readAsArrayBuffer(n):a.readAsBinaryString(n)}}}});