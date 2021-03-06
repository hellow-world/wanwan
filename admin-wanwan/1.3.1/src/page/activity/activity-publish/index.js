/*
* @Author: admin
* @Date:   2018-02-05 10:03:08
* @Last Modified by:   admin
* @Last Modified time: 2018-03-28 14:58:57
*/
'use strict'
require('./index.css')
var config = require('service/config.js')
var _encode = require('service/errorcode.js')
var _util = require('util/utils.js')
var num_perPage = 15;//分页后台传参数

/*分页使用到的参数*/
var pagenum =1 ; //总行数
var isSearch = false; //false:没有搜索之后的分页查询。 true： 有了搜索的分页查询
var isFirstSel = 0; //0: 不是第一次查询，不需返回页数   1： 是第一次查询，需要返回页数

var activityMsg = "";
var currentEditId = 0;
/*load页面进行查询*/
$(window).load(function(){
		 $('#scan_content').froalaEditor({
		        theme: 'dark',
		        imageUploadURL: config.basePath+ "uploadImgEditor",  
		        language: 'zh_cn',
		        height: 200,
		        toolbarButtons: [  
		                         'bold', 'italic', 'underline', 'paragraphFormat', 'align','color','fontSize','insertImage','insertTable','undo', 'redo'  
		                       ] 
		      });
		      
		 $('#edit_content').froalaEditor({
	        theme: 'dark',
	        imageUploadURL: config.basePath+ "uploadImgEditor",  
	        language: 'zh_cn',
	        height: 200,
	      /*  toolbarButtons: [  
	                         'bold', 'italic', 'underline', 'paragraphFormat', 'align','color','fontSize','insertImage','insertTable','undo', 'redo'  
	                       ] */
	      });
		 isFirstSel =1;
		 // _util.CurrentUser();
		 selActivityList();
		 // console.log('0')
})
	
	/**
	 * 查找活动
	 */
	function selActivityList(){
		isSearch = false;
		$.ajax({
			url : config.basePath + "activity/list",
			type : "POST",
			dataType : "json",
			data : {
				page : pagenum,
				isFirstSel : isFirstSel,
				numPerPage:num_perPage
			},
			success : function(result){
				if(result.code!=_encode.REQUEST_SUCCESS)
				{
					alert("no Activity");
				}else{
					
					var message = result.result;
					activityMsg = message;
					/*分页*/
					if(isFirstSel==1){
						isFirstSel = 0;
						 $("#page").paging({
							 totalPage: Math.ceil(result.msg/15),
							 totalSize: result.msg,
							 callback: function(num) {
							 		pagenum = num;
							 		if(isSearch)
							 			selActivityDate();
							 		else
							 			selActivityList();
							 	}
						 });
					}
					/*为表格赋值*/
					$("#actTbody").empty();
					$("#actTbody").append(setValueToTable(message,getradiohtml()));
				}
			},
			error : function(a, b, c){
				alert(a.status);
			}
		});
	}
	
	/**
	 * 删除活动提交
	 * @param activityId
	 * @param obj
	 */
	function delteActivity(activityId,obj){
		var formData = new FormData();
		formData.append("id", activityId);
		
		$.ajax({
			url : config.basePath + "activity/del",
			type : "POST",
			dataType : "json",
			processData : false,
			contentType : false,
			data : formData,
			success : function(result){
				if(result.code==_encode.REQUEST_SUCCESS){
					modalalert("已成功删除活动");
					$(obj).parent().parent().remove();
				}else{
					alert(result.msg);
				}
			}, 
			error : function(a,b,c){
				alert(a.status);
			}
		});
	}

	/* 动态加载数据到表格*/
	function setValueToTable(param,behind){
		var res = "";
		for(var i = 0;i<param.length;i++){
			res+=addTdToTable(param[i],behind);
		}
		return res;
	}
	
	/* 给acitivity表格每行加载数据 */
	function addTdToTable(param,behind){
		var res = '<tr class="text-c" >'+behind;
		//for(var key in param )
		res += "<td>"+param.id+"</td>";
		res += "<td>"+config.sponsorName+"</td>";
		res += "<td>"+param.activityCreateTime+"</td>";
		res += "<td>"+param.activityTitle+"</td>";
		res += "<td>"+"暂时空着"+"</td>";
		res += "<td>"+"暂时空着"+"</td>";
		res += "<td>"+"全部"+"</td>";
		if(param.isTop ==1){
			res += getoperaHtmlnoTop();
		}else{
			res += getoperaHtml();
		}
		return res+"</tr>";
	}
	
	/* 加载数据为每行 */
	function addTdToTable1(param,behind,end){
		var res = '<tr class="text-c">'+behind;
		for(var key in param )
			res += "<td>"+param[key]+"</td>";
		return res+end+"</tr>";
	}
	
	/* 操作栏html top*/
	function getoperaHtml(){
		console.log('操作栏创建')
		var res = "<td><a title='查看' href='javascript:void(0);' class='ml-5 setScan' style='text-decoration:none'><i class='Hui-iconfont'>&#xe665;</i></a>"+					
						"<a title='修改' href='javascript:void(0);' class='ml-5 setEdit' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6df;</i></a>"+
						"<a title='删除' href='javascript:void(0);' class='ml-5 setDel' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6e2;</i></a>"+
						"<a title='置顶' href='javascript:void(0);' class='ml-5 setTop' style='text-decoration:none'><i class='Hui-iconfont'>&#xe679;</i></a></td>";
		return res;

	}
	
	/* 操作栏html notop*/
	function getoperaHtmlnoTop(){
		var res = "<td><a title='查看' href='javascript:void(0);' class='ml-5 setScan' style='text-decoration:none'><i class='Hui-iconfont'>&#xe665;</i></a>"+					
						"<a title='修改' href='javascript:void(0);' class='ml-5 setEdit' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6df;</i></a>"+
						"<a title='删除' href='javascript:void(0);' class='ml-5 setDel' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6e2;</i></a>"+
						"<a title='取消置顶' href='javascript:void(0);' class='ml-5 setcanTop' style='text-decoration:none'><i class='Hui-iconfont'>&#xe674;</i></a></td>";
		return res;
	}
	
	/*radio栏html*/
	function getradiohtml(){
		var res = "<td><input type='checkbox'></td>";
		return res;
	}
	
	/* 活动发布页面跳转 */
	window.activity_add = function(){
		
		window.location.href = "./activity-add.html";
	}
	
	/* 活动编辑 */
	$('#actTbody').on('click','.setEdit',function(){

		console.log('活动编辑')
		activity_edit(this);
	})
	function activity_edit(obj){
		var $td= $(obj).parents('tr').children('td');  
        var activityId = $td.eq(1).text();
        currentEditId = activityId;
		addDataToEditDialog(currentEditId);
		$("#editActivityDia").modal("show");
	}
	
	/* 活动删除 */
	$('#actTbody').on('click','.setDel',function(){
		console.log('活动删除')
		activity_del(this);
	})
	function activity_del(obj){
		var $td= $(obj).parents('tr').children('td');  
        var activityId = $td.eq(1).text();
		delteActivity(activityId,obj);
	}
	
	/* 活动置顶 */
	$('#actTbody').on('click','.setTop',function(){
		console.log('活动置顶')
		activity_top(this);
	})
	function activity_top(obj){
		var $td= $(obj).parents('tr').children('td');  
        var activityId = $td.eq(1).text();
        $("#topId").val(activityId);
        $("#topActivityDia").modal("show");
	}
	
	/**
	 * 取消置顶
	 * @param obj
	 */
	 $('#actTbody').on('click','.setcanTop',function(){
		console.log('取消置顶')
		activity_cancelTop(this);
	})
	function activity_cancelTop(obj){
		var $td= $(obj).parents('tr').children('td');  
        var activityId = $td.eq(1).text();
        cancelTopSubmit(activityId);
	}
	
	/* 活动查看对话框 */
	$('#actTbody').on('click','.setScan',function(){
		console.log('活动查看')
		activity_scan(this);
	})
	function activity_scan(obj){
		var $td= $(obj).parents('tr').children('td');  
        var activityId = $td.eq(1).text();  
		addDataToScanDialog(activityId);
		$("#scanActivityDia").modal("show");
	}
	
	/*消息弹出框*/
	function modalalert(msg){
		$.Huimodalalert(msg,3000);
	}
		
	/*显示/隐藏titlePicDiv*/
	$('#display').click(function(){editTitlePic();})
	function editTitlePic(){
		if($('#titlePicDiv').is(':hidden')){
			$("#titlePicDiv").show();
			$("#display").html("收起");
		}else{
			$("#titlePicDiv").hide();
			$("#display").html("展开");
		}
	}
	
	/*显示/隐藏coverPicDiv*/
	$('#displayCover').click(function(){editCoverPic();})
	function editCoverPic(){
		if($('#coverPicDiv').is(':hidden')){
			$("#coverPicDiv").show();
			$("#displayCover").html("收起");
		}else{
			$("#coverPicDiv").hide();
			$("#displayCover").html("展开");
		}
	}
	
	/*移除HTML中的tag 暂时不用*/
	function removeHTMLTag(str) {
		alert(str);
		var str="<div><span>123</span></div>";
        alert($(str).find("span").html());
	/*	alert(str);
        str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
        str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
        //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
        str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
        str=str.replace(/\s/g,''); //将空格去掉
        alert(str);
        var a="<img src=‘12313’>22<img data-url='221231322'/>asdq<img data-url='221231322'/>";
        var aaa=a.match(/<img[^>]+>/g);
        alert(aaa);

        //a 是 <img src=""/>
        return str;*/
	}	
	
	/*scanActivityDia赋值*/
	function addDataToScanDialog(id){
		
		for(var i=0; i<activityMsg.length; i++){
			if(activityMsg[i].id == id){
				$("#scan_activityName").val(activityMsg[i].activityTitle);
				$("#scan_activityIntroduce").val(activityMsg[i].activityIntroduce);
				$("#scan_activityAddress").val(activityMsg[i].activityPlace);
				$("#scan_payWay").val(activityMsg[i].enrolCurrency);
				$("#scan_moneyNumber").val(activityMsg[i].enrolCurrencySum);
				$("#scan_maxNum").val(activityMsg[i].activityNumberPeople);
				$("#scan_startTime").val(activityMsg[i].activityStartTime);
				$("#scan_endTime").val(activityMsg[i].activityEndTime);
				$("#scan_enroleStartTime").val(activityMsg[i].enrolStartTime);
				$("#scan_enroleEndTime").val(activityMsg[i].enrolEndTime);
				$("#scan_titlePic").val(activityMsg[i].activityTitlePhoto);
				$("#scan_scorePic").val(activityMsg[i].activityCover);
				/*removeHTMLTag(activityMsg[i].activityContent);*/
				var content = activityMsg[i].activityContent;
			/*	alert(content);
				$("#scan_content").val($(content).text());*/
				$('#scan_content').froalaEditor('html.set', content);
				
			}
		}
	}
	
	/*editActivityDia赋值*/
	function addDataToEditDialog(id){
		
		for(var i=0; i<activityMsg.length; i++){
			if(activityMsg[i].id == id){
				$("#edit_activityName").val(activityMsg[i].activityTitle);
				$("#edit_activityIntroduce").val(activityMsg[i].activityIntroduce);
				$("#edit_activityAddress").val(activityMsg[i].activityPlace);
				$("#edit_payWay").val(activityMsg[i].enrolCurrency);
				$("#edit_moneyNumber").val(activityMsg[i].enrolCurrencySum);
				$("#edit_maxNum").val(activityMsg[i].activityNumberPeople);
				$("#edit_startTime").val(activityMsg[i].activityStartTime);
				$("#edit_endTime").val(activityMsg[i].activityEndTime);
				$("#edit_enroleStartTime").val(activityMsg[i].enrolStartTime);
				$("#edit_enroleEndTime").val(activityMsg[i].enrolEndTime);
				document.getElementById("titlePicContainer").innerHTML = "<img src="+activityMsg[i].activityTitlePhoto+">";
				document.getElementById("coverPicContainer").innerHTML = "<img src="+activityMsg[i].activityCover+">";
				var content = activityMsg[i].activityContent;
				$('#edit_content').froalaEditor('html.set', content);
				
			}
		}
	}
	
	/*编辑活动提交*/
	$('#editSubmit').click(function(){editActivitySubmit();})
	function editActivitySubmit(){
		/*if(document.getElementById("titlePicContainer").innerHTML==""){
			$("#Tip").html("请上传正确格式的标题图片");
		}
		else if(document.getElementById("coverPicContainer").innerHTML==""){
			$("#Tip").html("请上传正确格式的封面图片");
		}*/
		var formData = new FormData();
		formData.append("id", currentEditId);
		formData.append("activityTitle", $("#edit_activityName").val());
		formData.append("activityIntroduce", $("#edit_activityIntroduce").val());
		formData.append("activityPlace", $("#edit_activityAddress").val());
		formData.append("enrolCurrency", $("#edit_payWay").val());
		formData.append("enrolCurrencySum", $("#edit_moneyNumber").val());
		formData.append("activityNumberPeople", $("#edit_maxNum").val());
		formData.append("activityStartTime", $("#edit_startTime").val());
		formData.append("activityEndTime", $("#edit_endTime").val());
		formData.append("enrolStartTime", $("#edit_enroleStartTime").val());
		formData.append("enrolEndTime", $("#edit_enroleEndTime").val());
		formData.append("activityContent", $('div#edit_content').froalaEditor('html.get'));
		formData.append("title", document.getElementById("edit_titlePic").files[0]);
		formData.append("cover", document.getElementById("edit_coverPic").files[0]);
		
		$.ajax({
			url : config.basePath + "activity/edit",
			type : "POST",
			dataType : "json",
			processData : false,
			contentType : false,
			data : formData,
			success : function(result){
				if(result.code==_encode.REQUEST_SUCCESS){
					modalalert("已成功修改活动");
					$("#editActivityDia").modal("hide");
					//window.location.reload(); //全局刷新
					selActivityList();
				}else{
					alert(result.msg);
				}
			}, 
			error : function(a,b,c){
				alert(a.status);
			}
		});
	}
	
	/**
	 * 提交活动查询时间
	 */
	 $('#selSubmit').click(function(){selActivityByDateSubmit();})

	function selActivityByDateSubmit(){
		var startTime = $("#activitySel_startTime").val();
		var endTime = $("#activitySel_endTime").val();
		isFirstSel = 1;
		if(_util.utils_isNull(startTime) && _util.utils_isNull(endTime)){
			isSearch = false;
			pagenum = 1;
			selActivityList();
		}else if(!_util.utils_isNull(startTime) && !_util.utils_isNull(endTime) && startTime<=endTime){
			isSearch = true;
			selActivityDate();
		}else{
			alert(_encode.ERROR_SELECT_PARAM);
		}
	}
	
	/*按日期查询提交*/
	function selActivityDate(){
		$.ajax({
			url : config.basePath + "activity/selByDate",
			type : "POST",
			dataType : "json",
			data : {
				startTime : $("#activitySel_startTime").val(),
				endTime : $("#activitySel_endTime").val(),
				page : pagenum,
				isFirstSel : isFirstSel,
				numPerPage:num_perPage
			},
			success : function(result){
				if(result.code!=0){
					var message = result.result;
					activityMsg = message;
					/*分页*/
					if(isFirstSel==1){
						isFirstSel = 0;
						 $("#page").paging({
							 totalPage: Math.ceil(result.msg/15),
							 totalSize: result.msg,
							 callback: function(num) {
							 		pagenum = num;
							 		if(isSearch)
							 			selActivityDate();
							 		else
							 			selActivityList();
							 	}
						 });
					}
					/*为表格赋值*/
					$("#actTbody").empty();
					$("#actTbody").append(setValueToTable(message,getradiohtml(),getoperaHtml()));
				}else{
					alert(result.msg);
				}
			},
			error : function(a,b,c){
				alert(a.status);
			}
		});
	}
	
	/**
	 * 置顶活动提交
	 */
	window.topActivitySubmit = function(){
		var formData = new FormData();
		formData.append("id", $("#topId").val());
		formData.append("topPic", document.getElementById("topPic").files[0]);
		
		$.ajax({
			url : config.basePath + "activity/topActivity",
			type : "POST",
			dataType : "json",
			processData : false,
			contentType : false,
			data : formData,
			success : function(result){
				if(result.code==_encode.REQUEST_SUCCESS){
					modalalert("置顶成功");
					$("#topActivityDia").modal("hide");
					//window.location.reload(); //全局刷新
					selActivityList();
				}else{
					alert(result.msg);
				}
			}, 
			error : function(a,b,c){
				alert(a.status);
			}
		});
	}
	
	/**
	 * 取消置顶提交
	 */
	function cancelTopSubmit(id){
		$.ajax({
			url : config.basePath + "activity/cancelTop",
			type : "POST",
			dataType : "json",
			data : {
				id : id
			},
			success : function(result){
				if(result.code==_encode.REQUEST_SUCCESS){
					modalalert("取消置顶成功");
					selActivityList();
				}else{
					alert(result.msg);
				}
			}, 
			error : function(a,b,c){
				alert(a.status);
			}
		});
	}

