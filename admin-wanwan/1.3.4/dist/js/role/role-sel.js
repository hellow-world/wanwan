webpackJsonp([14],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(40);


/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: admin
	 * @Date:   2018-03-28 18:06:05
	 * @Last Modified by:   admin
	 * @Last Modified time: 2018-03-30 13:44:04
	 */
	var _config = __webpack_require__(1)
	var _utils = __webpack_require__(2)
	var _encode = __webpack_require__(3)
	
	var isEdit;//判斷是否編輯或者新增
	var publicRoleId;//公用的角色ID
	
	$(function(){
	    selRoleList();
	})
	function selRoleList()
	{
	    $.ajax({
	        url:_config.buildPath + 'api-user/v1.0/role',
	        type:'GET',
	        dataType:'json',
	        headers:{"token":_config.token},
	        success:function(res)
	        {
	            if (res.code!==_encode.REQUEST_SUCCESS)
	            {
	                alert(res.msg)
	            }
	            else
	            {
	                var message = res.result;
	                                /*为表格赋值*/
	                $("#roleTbody").empty();
	                $("#roleTbody").append(setRoleValue(message, getradiohtml()));
	            }
	        },
	        error:function(a,b,c)
	        {
	            alert(a.status)
	        }
	    })
	}
	// 为表格赋值
	function setRoleValue(param,behind)
	{
	    var res = "";
	    for (var i = 0; i < param.length; i++) {
	
	        // 本地文本化-广告位置与上下线
	
	        res += addTdToTable(param[i], behind);
	    }
	    return res;
	}
	/* 给adsense表格每行加载数据 */
	function addTdToTable(param, behind) {
	    var res = '<tr class="text-c" >' + behind;
	    //for(var key in param )
	    res += "<td class='role_id'>" + param.roleId + "</td>";
	    res += "<td class='role_id'>" + param.roleName + "</td>";
	    res += handleHtml();
	    return res + "</tr>";
	}
	// 操作栏
	function handleHtml()
	{
	    let res = `<td>`;
	    res += `<a title="绑定" href="javascript:void(0);" class="ml-5" onclick="roleBind(this)"><i class="Hui-iconfont">&#xe637;</i></a>
	            <a title="修改" href="javascript:void(0);" class="ml-5" onclick="roleEdit(this)"><i class="Hui-iconfont">&#xe6df;</i></a>
	            <a title="删除" href="javascript:void(0);" class="ml-5" onclick="roleDel(this)"><i class="Hui-iconfont">&#xe6e2;</i></a>
	            `
	    return res+'</td>'
	}
	/*radio栏html*/
	function getradiohtml() {
	    var res = "<td><input type='checkbox'></td>";
	    return res;
	}
	// 新增角色对话框
	window.addRole = function() {
	    isEdit = false;
	    $('#addRoleModal').find('.modal-title').html('新增角色')
	    $('#addRoleModal').find('.btnRole').val('提交添加')
	    $('#roleName').val('');
	    $('#addRoleModal').modal('show');
	}
	// 新增角色提交
	window.addRoleSubmit = function() {
	    if(isEdit)
	    {
	        editRoleSubmit();
	        return;
	    }
	    let role_name = $('#roleName').val();
	    if (role_name == '') {
	        _utils.modalTip('请输入角色名');
	        return;
	    } else {
	        $.ajax({
	            url: _config.buildPath + 'api-user/v1.0/role',
	            type: 'POST',
	            datatype: 'json',
	            headers: { "token": _config.token },
	            data: {
	                roleName: role_name
	            },
	            success: function(res) {
	                console.log(res);
	                if(res.code!==_encode.REQUEST_SUCCESS)
	                {
	                	alert(res.msg)
	                }
	                else
	                {
	                	_utils.modalTip('添加角色成功');
	                	setTimeout(closeModal,1000)
	                }
	
	            },
	            error: function(a, b, c) {
	                alert(a.status)
	            }
	        })
	    }
	}
	function editRoleSubmit()
	{
	    let role_name = $('#roleName').val();
	    if (role_name == '') {
	        _utils.modalTip('请输入角色名');
	        return;
	    } else {
	        $.ajax({
	            url: _config.buildPath + 'api-user/v1.0/role/update',
	            type: 'POST',
	            datatype: 'json',
	            headers: { "token": _config.token },
	            data: {
	                roleId:publicRoleId,
	                roleName: role_name
	            },
	            success: function(res) {
	                console.log(res);
	                if(res.code!==_encode.REQUEST_SUCCESS)
	                {
	                    alert(res.msg)
	                }
	                else
	                {
	                    _utils.modalTip('修改角色成功');
	                    setTimeout(closeModal,1000)
	                }
	
	            },
	            error: function(a, b, c) {
	                alert(a.status)
	            }
	        })
	    }
	}
	function closeModal()
	{
		$('#roleName').val('');
		$('#addRoleModal').modal('hide');
	    window.location.reload();
	}
	// 删除提示
	window.roleDel = function(obj)
	{
	    let roleId = $(obj).parent('td').siblings().eq(1).text();
	    $.ajax({
	        url:_config.buildPath + 'api-user/v1.0/role/delete',
	        type:'POST',
	        dataType:'json',
	        headers:{"token":_config.token},
	        data:
	        {
	            roleId:roleId
	        },
	        success:function(res)
	        {
	            if(res.code!==_encode.REQUEST_SUCCESS)
	            {
	                alert(res.msg)
	            }
	            else
	            {
	                _utils.modalTip('角色删除成功');
	                setTimeout(pageReload,1000)
	            }
	        },
	        error:function(a,b,c)
	        {
	            alert(a.status)
	        }
	    })
	
	}
	// 刷新页面
	function pageReload()
	{
	    window.location.reload();
	}
	// 编辑角色
	window.roleEdit = function(obj)
	{
	    let role_id = $(obj).parent('td').siblings().eq(1).text();
	    let role_name = $(obj).parent('td').siblings().eq(2).text();
	    $('#addRoleModal').find('.modal-title').html('编辑角色')
	    $('#addRoleModal').find('.btnRole').val('提交编辑')
	    $('#addRoleModal').modal('show');
	    $('#roleName').val(role_name);
	    isEdit = true;
	    publicRoleId = role_id;
	}
	window.roleBind = function(obj)
	{
	    let role_id = $(obj).parent('td').siblings().eq(1).text();
	    window.location.href='./role-bind.html' + '?roleId=' + role_id;
	}

/***/ })

});