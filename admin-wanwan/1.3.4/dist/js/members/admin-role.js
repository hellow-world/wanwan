webpackJsonp([18],{0:function(e,n,o){e.exports=o(35)},35:function(e,n,o){var r=o(1),a=r.basePath+"manageruser/selectAllUser";$(function(){$.ajax({url:a,type:"POST",dataType:"json",success:function(e){console.log(e)},error:function(e){alert("Error")}})})}});