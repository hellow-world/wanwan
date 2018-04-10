/*
* @Author: admin
* @Date:   2018-02-01 15:52:02
* @Last Modified by:   admin
* @Last Modified time: 2018-02-28 17:37:42
*/
var _config = require('service/config.js')
var url_selUsers = _config.basePath + "manageruser/selectAllUser";
$(function() {
	$.ajax({
		url : url_selUsers,
		type : "POST",
		dataType : "json",
		success: function(result){
			console.log(result);
		},
		error:function(result) {
			alert("Error");
		},
	});
});

/*管理员-角色-添加*/
function admin_role_add(){
	$("#adduserDia").modal("show");
}

/*管理员-角色-删除*/
function admin_role_del(obj,id){
	layer.confirm('角色删除须谨慎，确认要删除吗？',function(index){
		$.ajax({
			type: 'POST',
			url: '',
			dataType: 'json',
			success: function(data){
				$(obj).parents("tr").remove();
				layer.msg('已删除!',{icon:1,time:1000});
			},
			error:function(data) {
				console.log(data.msg);
			},
		});		
	});
}