/*
* @Author: admin
* @Date:   2018-02-25 17:06:32
* @Last Modified by:   admin
* @Last Modified time: 2018-03-18 17:16:07
*/
var config = require('service/config.js')
var _utils = require('util/utils')
var errorcode = require('service/errorcode.js')

var guessMsg = "";
var teamMsg = "";
/*分页使用到的参数*/
var pagenum =1 ; //总行数
var isSearch = false; //false:没有搜索之后的分页查询。 true： 有了搜索的分页查询
var isFirstSel = 0; //0: 不是第一次查询，不需返回页数   1： 是第一次查询，需要返回页数
var num_perPage = 15;//分页后台传参数

$(function(){
	// CurrentUser();
	isFirstSel =1;  
	selGuess();
});
function selGuess(){
		isSearch = false;
		 $.ajax({
		  		url : config.basePath + "guess/selGuesses",
		  		type : "POST",
		  		data : {
		  			page : pagenum,
					isFirstSel : isFirstSel,
					numPerPage:num_perPage
		  		},
		  		dataType : "json",
		  		success : function(result){
		  			if(result.code!=errorcode.REQUEST_SUCCESS)
		  			{
		  				alert(result.msg);
		  			}else{
		  				var message = result.result;
						/*为表格赋值*/
		  				guessMsg = message;
		  				/*分页*/
						if(isFirstSel==1){
							isFirstSel = 0;
							 $("#page").paging({
								 totalPage: Math.ceil(result.msg/15),
								 totalSize: result.msg,
								 callback: function(num) {
								 		pagenum = num;
								 		if(isSearch)
								 			selGuessByDate();
								 		else
								 			selGuess();
								 	}
							 });
						}
						$("#guessTbody").empty();
						$("#guessTbody").append(setValueToTable(message,_utils.getradiohtml(),_utils.getoperaHtml()));
		  			}
		  		},
		  		error : function(a, b, c){
		  			alert(a.status);
		  		}
		  	});
		 
	}
/* 竞猜编辑 */
	$('#guessTbody').on('click','.btnEdit',function(){

		guess_edit(this);
	})
	function guess_edit(obj){
		var $td= $(obj).parents('tr').children('td');  
        var id = $td.eq(1).text();
        window.location.href = "./guess-add.html"+"?guessId="+id;
	}
	
	/* 竞猜删除 */
	$('#guessTbody').on('click','.btnDel',function(){

		guess_del(this);
	})
	function guess_del(obj){
		var $td= $(obj).parents('tr').children('td');  
        var guessId = $td.eq(1).text();
		delGuess(guessId,obj);
	}
	
	/* 竞猜查看 */
	$('#guessTbody').on('click','.btnScan',function(){

		guess_scan(this);
	})
	function guess_scan(obj){
		var $td= $(obj).parents('tr').children('td');  
        var guessId = $td.eq(1).text();  
		addDataToScanDialog(guessId);
		$("#scanguessDia").modal("show");
	}
	
	/**
	 * 选择获胜方
	 * @param obj
	 */
	 $('#guessTbody').on('click','.btnselWinner',function(){

		selwinner(this);
	})
	function selwinner(obj){
		var $td= $(obj).parents('tr').children('td');  
        var guessId = $td.eq(1).text(); 
        getTeamData(guessId);
        $("#selWinnerDia").modal("show");
	}
 
	/*消息弹出框*/
 	function modalalert(msg){
		$.Huimodalalert(msg,3000);
	}
 	$('#btnguessAdd').on('click',function(){
 		activityGuess_add();
 	})
 	/*新增竞猜跳转*/
 	function activityGuess_add(){
 		/*$("#addActivityDia").modal("show");*/
 		window.location.href = './guess-add.html';
 	}
 	$('#btnguessRules').on('click',function(){
 		guessRules_edit();
 	})
 	/*竞猜规则编辑弹窗*/
 	function guessRules_edit(){
 		/*查询rule并赋值给area*/
 		selGuessRulesSubmit();
 		$("#guessRulesDia").modal("show");
 	}
 	
 	/* 动态加载数据到表格*/
	function setValueToTable(param,behind,end){
		var res = "";
		for(var i = 0;i<param.length;i++){
			res+=addTdToTable(param[i],behind,end);
		}
		return res;
	}
	
	/* 给guess表格每行加载数据 */
	function addTdToTable(param,behind,end){
		var res = '<tr class="text-c" >'+behind;
		//for(var key in param )
		res += "<td>"+param.id+"</td>";
		res += "<td>"+param.title+"</td>";
		res += "<td>"+param.guessStartTime+"</td>";
		res += "<td>"+param.guessEndTime+"</td>";
		res += "<td>"+param.numberPeople+"</td>";
		res += "<td>"+"暂时没有"+"</td>";
		res += "<td>"+"暂时也没有"+"</td>";
		if(param.drawTime!=null){
			res+=getNoSeloperaHtml();
		}else
			res+=getoperaHtml()
		return res+"</tr>";
	}
	
	/* 动态加载数据到Team表格*/
	function setValueToTeamTable(param,id){
		var res = "";
		for(var i = 0;i<param.length;i++){
			res+=addTdToTeamTable(param[i],id);
		}
		return res;
	}
	
	/* 给team表格每行加载数据 */
	function addTdToTeamTable(param,id){
		var res = '<tr class="text-c" >';
		//for(var key in param )
		res += "<td>"+param.teamId+"</td>";
		res += "<td>"+param.teamName+"</td>";
		res += '<td><img width="100px" src="'+param.teamIcon+'"></td>';
		res += "<td>"+id+"</td>";
		return res+"</tr>";
	}
	
	/* 操作栏html*/
	function getoperaHtml(){
		var res = "<td><a title='查看' href='javascript:;' class='ml-5 btnScan' style='text-decoration:none'><i class='Hui-iconfont'>&#xe665;</i></a>"+					
						"<a title='修改' href='javascript:;' class='ml-5 btnEdit' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6df;</i></a>"+
						"<a title='删除' href='javascript:;' class='ml-5 btnDel' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6e2;</i></a>&nbsp;&nbsp;"+
						"<a title='选择获胜方' href='javascript:;' class='ml-5 btnselWinner' style='text-decoration:none'>选择获胜方</a></td>";
		return res;
	}
	
	/* 没有选择胜利操作栏html*/
	function getNoSeloperaHtml(){
		var res = "<td><a title='查看' href='javascript:;' class='ml-5 btnScan' style='text-decoration:none'><i class='Hui-iconfont'>&#xe665;</i></a>"+					
						"<a title='修改' href='javascript:;' class='ml-5 btnEdit' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6df;</i></a>"+
						"<a title='删除' href='javascript:;' class='ml-5 btnDel' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6e2;</i></a>&nbsp;&nbsp;"+
						"<a title='选择获胜方' href='javascript:void(0);'  class='ml-5' style='text-decoration:none;color:red'>竞猜已开奖</a></td>"
		return res;
	}
	
	/*选择获胜方的操作栏*/
	function getTeamoperaHtml(){
		var res = "<td><a title='选择' href='javascript:;' class='ml-5 btnselTeam' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6a7;</i></a></td>";
		return res;
	}
	
	
	
	/* 动态加载数据到Team表格*/
	function setValueToSelTeamTable(param,id){
		var res = "";
		for(var i = 0;i<param.length;i++){
			res+=addTdToSelTeamTable(param[i],id);
		}
		return res;
	}
	
	/* 给Selteam表格每行加载数据 */
	function addTdToSelTeamTable(param,id){
		var res = '<tr class="text-c" >';
		//for(var key in param )
		res += "<td>"+param.teamId+"</td>";
		res += "<td>"+param.teamName+"</td>";
		res += '<td><img width="100px" src="'+param.teamIcon+'"></td>';
		res += "<td>"+id+"</td>";
		
		res +=getTeamoperaHtml();
		return res+"</tr>";
	}
	
	/*radio栏html*/
	function getradiohtml(){
		var res = "<td><input type='checkbox'></td>";
		return res; 
	}
	
	
	
 	/*查询Dia赋值*/
	function addDataToScanDialog(id){
		for(var i=0; i<guessMsg.length; i++){
			if(guessMsg[i].id == id){
				$("#scan_guessName").val(guessMsg[i].title);
				$("#scan_guessStartTime").val(guessMsg[i].guessStartTime);
				$("#scan_guessEndTime").val(guessMsg[i].guessEndTime);
				$("#scan_predictDrawTime").val(guessMsg[i].predictDrawTime);
				$("#scan_gameStartTime").val(guessMsg[i].gameStartTime);
				
				/*请求teamTable数据*/
			    $.ajax({
			  		url : config.basePath + "guess/selTeam",
			  		type : "POST",
			  		data : {
			  			guessId : id
			  		},
			  		dataType : "json",
			  		success : function(result){
			  			if(result.code!=errorcode.REQUEST_SUCCESS)
			  			{
			  				alert(result.msg);
			  			}else{ 
			  				var message = result.result;
							/*为表格赋值*/
			  				teamMsg = message;
							$("#scan_teamTbody").empty();
							$("#scan_teamTbody").append(setValueToTeamTable(message,id,getTeamoperaHtml()));
			  			}
			  		},
			  		error : function(a, b, c){
			  			alert(a.status);
			  		}
			  	});
			}
		}
	}
	
	/*删除竞猜提交*/
	function delGuess(guessId,obj){
		$.ajax({
	  		url : config.basePath + "guess/delGuess",
	  		type : "POST",
	  		data : {
	  			guessId : guessId
	  		},
	  		dataType : "json",
	  		success : function(result){
	  			if(result.code!=errorcode.REQUEST_SUCCESS)
	  			{
	  				alert(result.msg);
	  			}else{ 
	  				modalalert("删除成功");
	  				//window.location.reload(); //全局刷新
	  				$(obj).parent().parent().remove();
	  			}
	  		},
	  		error : function(a, b, c){
	  			alert(a.status);
	  		}
	  	});
	}
	
	/*查找rules*/
	function selGuessRulesSubmit(){
		$.ajax({
			url : config.basePath + "guess/selGuessRules",
			type : "POST",
			dataType : "json",
			success : function(result){
				if(result.code!=0){
					$("#guess_rules").val(result.msg);
				}else{
					alert(result.msg);
				}
			}
		});
	}
	
	/*编辑竞猜规则提交*/
	$('#btnRules').on('click',function(){
		editRulesSubmit();
	})
	function editRulesSubmit(){
		$.ajax({
			url : config.basePath + "guess/editGuessRules",
			type : "POST",
			dataType : "json",
			data : {
				rules : $("#guess_rules").val()
			},
			success : function(result){
				if(result.code==errorcode.REQUEST_SUCCESS){
					modalalert("编辑成功");
					$("#guessRulesDia").modal("hide");
				}else{
					alert(result.msg);
				}
			}
		});
	}
	//根据筛选条件搜竞猜
	$('.btnselDate').on('click',function(){

		selGuessByDateSubmit();
	})
	//根据筛选条件搜竞猜
	function selGuessByDateSubmit(){
		var startTime = $("#guessSel_startTime").val();
		var endTime = $("#guessSel_endTime").val();
		isFirstSel = 1;
		if(_utils.utils_isNull(startTime) && _utils.utils_isNull(endTime)){
			isSearch = false;
			pagenum = 1;
			selGuess();
		}else if(!_utils.utils_isNull(startTime) && !_utils.utils_isNull(endTime) && startTime<=endTime){
			isSearch = false;
			selGuessByDate();
		}
		else{
			alert(ERROR_SELECT_PARAM);
		}
		
		
	}
	
	/*按日期查询提交*/
	function selGuessByDate(){
		$.ajax({
			url : config.basePath + "guess/selGuessByDate",
			type : "POST",
			dataType : "json",
			data : {
				startTime : $("#guessSel_startTime").val(),
				endTime : $("#guessSel_endTime").val(),
				page : pagenum,
				isFirstSel : isFirstSel,
				numPerPage:num_perPage
			},
			success : function(result){
				if(result.code!=0){
	  				var message = result.result;
					/*为表格赋值*/
	  				guessMsg = message;
	  				/*分页*/
					if(isFirstSel==1){
						isFirstSel = 0;
						 $("#page").paging({
							 totalPage: Math.ceil(result.msg/15),
							 totalSize: result.msg,
							 callback: function(num) {
							 		pagenum = num;
							 		if(isSearch)
							 			selGuessByDate();
							 		else
							 			selGuess();
							 	}
						 });
					}
					$("#guessTbody").empty();
					$("#guessTbody").append(setValueToTable(message,_utils.getradiohtml(),_utils.getoperaHtml()));
				}else{
					alert(result.msg);
				}
			}
		});
	}
	
	/*请求teamTable数据*/
	function getTeamData(guessId){
	
	    $.ajax({
	  		url : config.basePath + "guess/selTeam",
	  		type : "POST",
	  		data : {
	  			guessId : guessId
	  		},
	  		dataType : "json",
	  		success : function(result){
	  			if(result.code!=errorcode.REQUEST_SUCCESS)
	  			{
	  				alert(result.msg);
	  			}else{ 
	  				var message = result.result;
					/*为表格赋值*/
					$("#selTeamTbody").empty();
					$("#selTeamTbody").append(setValueToSelTeamTable(message,guessId));
	  			}
	  		},
	  		error : function(a, b, c){
	  			alert(a.status);
	  		}
	  	});
	}
	
	var winnerGuessId; 
    var winnerTeamId;
	/**
	 * 选择队伍提交
	 * @param obj
	 */
	 $('#selTeamTbody').on('click','.btnselTeam',function(){
	 	selTeam(this);
	 })
	function selTeam(obj){
		var $td= $(obj).parents('tr').children('td');  
		winnerGuessId = $td.eq(3).text(); 
		winnerTeamId = $td.eq(0).text();
	    $("#winnerSpan").text($td.eq(1).text());
	    $("#selWinnerSubmitDia").modal("show");
	}
	$('#btnteamSubmit').click(function(){
		selTeamSubmit();
	})
	function selTeamSubmit(){
		 $.ajax({
		    	url : config.basePath + "guess/setWonTeam",
		    	type : "POST",
		    	data : {
		    		teamId : winnerTeamId,
		    		guessId : winnerGuessId,
		    		numPerPage:num_perPage
		    	},
		    	dataType : "json",
		    	success : function(result){
		    		if(result.code==errorcode.REQUEST_SUCCESS){
		    			modalalert("开奖成功");
		    			$("#selWinnerDia").modal("hide");	
		    			$("#selWinnerSubmitDia").modal("hide");
		    			selGuess();
		    		}else{
		    			alert(result.msg);
		    		}
		    	},
		    	error : function(a,b,c){
		    		alert(a.status);
		    	}
		    });
	}