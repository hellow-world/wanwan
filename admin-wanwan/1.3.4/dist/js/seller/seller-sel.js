webpackJsonp([11],{0:function(e,t,a){e.exports=a(44)},44:function(e,t,a){function n(){y=!1,$.ajax({url:g.basePath+"merchant/selList",type:"POST",dataType:"json",data:{page:P,isFirstSel:D},success:function(e){if(e.code!=S.REQUEST_SUCCESS)alert(e.msg);else{var t=e.result;E=t,1==D&&(D=0,$("#page").paging({totalPage:Math.ceil(e.msg/15),totalSize:e.msg,callback:function(e){P=e,y?T():n()}})),$("#merchantTbody").empty(),$("#merchantTbody").append(l(t,i()))}},error:function(e,t,a){}})}function l(e,t){for(var a="",n=0;n<e.length;n++)a+=c(e[n],t);return a}function c(e,t){var a='<tr class="text-c" >'+t;return a+="<td>"+e.id+"</td>",a+="<td>"+e.merchantName+"</td>",a+="<td>"+e.createTime+"</td>",a+="<td>暂时空着</td>",a+=r(),a+"</tr>"}function r(){var e="<td><a title='查看' href='javascript:;' class='ml-5 btn_scan' style='text-decoration:none'><i class='Hui-iconfont'>&#xe665;</i></a><a title='修改' href='javascript:;' class='ml-5 btn_edit' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6df;</i></a></td>";return e}function i(){var e="<td><input type='checkbox'></td>";return e}function d(){$("#addSellerDia").modal("show")}function s(e){var t=$(e).parents("tr").children("td"),a=t.eq(1).text();w=a,h(w),$("#editSellerDia").modal("show")}function o(e){var t=$(e).parents("tr").children("td"),a=t.eq(1).text();p(a),$("#scanSellerDia").modal("show")}function u(e){$.Huimodalalert(e,3e3)}function m(e){var t="-",a=":",n=e.getMonth()+1,l=e.getDate(),c=e.getHours(),r=e.getMinutes(),i=e.getSeconds();n>=1&&n<=9&&(n="0"+n),l>=0&&l<=9&&(l="0"+l),c>=0&&c<=9&&(c="0"+c),r>=0&&r<=9&&(r="0"+r),i>=0&&i<=9&&(i="0"+i);var d=e.getFullYear()+t+n+t+l+" "+c+a+r+a+i;return d}function p(e){for(var t=0;t<E.length;t++)E[t].id==e&&($("#scan_sellerName").val(E[t].merchantName),$("#scan_sellerDeductPer").val(100*E[t].beanDeductionPercent),$("#scan_sellerDeduct").val(E[t].beanDeductionLimit),$("#scan_sellerAccount").val(E[t].merchantAccount),$("#scan_sellerPassword").val(E[t].merchantPassword),document.getElementById("scan_sellerPicContainer").innerHTML="<img src="+E[t].merchantAvatar+">",document.getElementById("scan_sellerQr").innerHTML="<img src="+E[t].merchantQr+">")}function h(e){for(var t=0;t<E.length;t++)E[t].id==e&&($("#edit_sellerName").val(E[t].merchantName),$("#edit_sellerDeductPer").val(100*E[t].beanDeductionPercent),$("#edit_sellerDeduct").val(E[t].beanDeductionLimit),$("#edit_sellerAccount").val(E[t].merchantAccount),$("#edit_sellerPassword").val(E[t].merchantPassword),document.getElementById("edit_sellerPicContainer").innerHTML="<img src="+E[t].merchantAvatar+">")}function f(){var e=$("#edit_sellerName").val(),t=$("#edit_sellerAccount").val(),a=$("#edit_sellerPassword").val(),l=$("#edit_sellerDeductPer").val(),c=$("#edit_sellerDeduct").val(),r=new FormData;r.append("id",w),r.append("merchantName",e),r.append("merchantAccount",t),r.append("merchantPassword",a),r.append("beanDeductionPercent",l),r.append("beanDeductionLimit",c),r.append("avatar",document.getElementById("edit_sellerPic").files[0]),$.ajax({url:g.basePath+"merchant/edit",type:"POST",dataType:"json",processData:!1,contentType:!1,data:r,success:function(e){e.code==S.REQUEST_SUCCESS?(u("已成功修改"),n(),$("#editSellerDia").modal("hide")):alert("添加失败  "+e.msg)},error:function(e,t,a){alert(e.status)}})}function v(){var e=$("#add_sellerName").val(),t=$("#add_sellerAccount").val(),a=$("#add_sellerPassword").val(),l=$("#add_sellerDeductPer").val(),c=$("#add_sellerDeduct").val(),r=new Date,i=m(r);if(""==e)$("#addTip").html("活动标题必填");else if(""==l)$("#addTip").html("抵扣额度不能为空");else if(""==c)$("#addTip").html("抵扣额度不能为空");else if(""==t)$("#addTip").html("商家账号必填");else if(""==a)$("#addTip").html("商家密码必填");else if(""==document.getElementById("add_sellerPic").files[0])$("#addTip").html("请上传正确格式的头像图片");else{var d=new FormData;d.append("merchantName",e),d.append("merchantAccount",t),d.append("merchantPassword",a),d.append("beanDeductionPercent",l),d.append("beanDeductionLimit",c),d.append("createTime",i),d.append("avatar",document.getElementById("add_sellerPic").files[0]),$.ajax({url:g.basePath+"merchant/add",type:"POST",dataType:"json",processData:!1,contentType:!1,data:d,success:function(e){e.code==S.REQUEST_SUCCESS?(u("已成功添加"),n(),$("#addSellerDia").modal("hide")):alert("添加失败 "+e.msg)},error:function(e,t,a){alert(e.status)}})}}function _(){var e=$("#sellerSel_startTime").val(),t=$("#sellerSel_endTime").val();D=1,b.utils_isNull(e)&&b.utils_isNull(t)?(y=!1,P=1,n()):!b.utils_isNull(e)&&!b.utils_isNull(t)&&e<=t?(y=!0,T()):alert(ERROR_SELECT_PARAM)}function T(){$.ajax({url:g.basePath+"merchant/selByDate",type:"POST",dataType:"json",data:{startTime:$("#sellerSel_startTime").val(),endTime:$("#sellerSel_endTime").val(),page:P,isFirstSel:D},success:function(e){if(0!=e.code){var t=e.result;E=t,1==D&&(D=0,$("#page").paging({totalPage:Math.ceil(e.msg/15),totalSize:e.msg,callback:function(e){P=e,y?T():n()}})),$("#merchantTbody").empty(),$("#merchantTbody").append(l(t,i(),r()))}else alert(e.msg)}})}var g=a(1),S=a(3),b=a(2),P=1,y=!1,D=0,E="",w=0;$(function(){D=1,n()}),$("#btnAdd").on("click",function(){d()}),$("#merchantTbody").on("click",".btn_edit",function(){s(this)}),$("#merchantTbody").on("click",".btn_scan",function(){o(this)}),$("#btneditSubmit").on("click",function(){f()}),$("#btnaddSubmit").on("click",function(){v()}),$("#btnSubmit").on("click",function(){_()})}});