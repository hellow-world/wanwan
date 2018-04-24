var lotteryId = "";
var curAwardMsg = "";
var curUserMsg="";
var curGroupUsersMsg="";
var lotteryUidArr = [];   //进行抽奖的userId数组
var lotteryImgArr = [];	  //进行抽奖的img头像数组
var curGroupId = ""; //当前开奖组信息
var curAwardId = ""; //当前奖励id

$(function(){
	lotteryId = getParams("lotteryId");
	getLotteryMsg();
	getSignUsers();
	getLotteryAward();
	//var time1 = window.setInterval("getSignUsers()",5000);
});


function addSignliHtml(userMsg){
	var res = '<li><div class="photo"><img style="width: 100%; height: 100%" src="'+userMsg.userAvatar+'" ></div><div class="name">'+userMsg.userTelPhone+'</div></li>';
	return res;
}

function addAwardliHtml(awardMsg){
	var res = '<li class="option" data-nothing="'+awardMsg.id+'" data-img="'+awardMsg.awardImg+'" data-group="'+awardMsg.lotteryGroupId+'" onclick="liclick(this)">'+awardMsg.awardName+'</li>';
	return res;
}

function liclick(obj){
	$('.bg_nomal').hide();
	$('.winner').show();
	$("#awardImg").addClass("awardimg");
	if($(obj).attr("data-img")!=null){
		$("#awardImg").attr("src", $(obj).attr("data-img"));
	}
	curAwardId = $(obj).attr("data-nothing");
	curGroupId = $(obj).attr("data-group");
	getCurLoteryCurMsg(curGroupId);
}

/**
 * 获取当前奖励的当前用户信息
 * @param curAwardGroupId  组id
 */
function getCurLoteryCurMsg(curAwardGroupId){
	$.ajax({
		url : basePath + "/lotterySign/selSignUsersByGroupId",
		type : "POST",
		data : {
			lotteryId : lotteryId,
			groupId : curAwardGroupId
		},
		dataType : "JSON",
		success : function(result){
			if(result.code==REQUEST_SUCCESS){
				var usersMsg_group = result.result;
				curGroupUsersMsg = new Array();
				for (var i = 0; i < usersMsg_group.length; i++) {
					if(!(usersMsg_group[i].isWinner == 1 || usersMsg_group[i].isBlackList ==1)){
						curGroupUsersMsg.push(usersMsg_group[i]);
					}
				}
			}
		},
		error : function(a,b,c){
			alert(a.status);
		}
	});
}

/**
 * 获取当前奖励的信息并给右边部分奖励区域赋值
 */
function getLotteryAward(){
	$.ajax({
		url : basePath + "/lotteryAward/selList",
		type : "POST",
		data : {
			lotteryId : lotteryId
		},
		dataType : "JSON",
		success : function(result){
			var awardMsg = result.result;
			curAwardMsg = awardMsg;
			$("#awardUl").html("");
			if(result.code==REQUEST_SUCCESS && awardMsg.length>0){
				for (var i = 0; i < awardMsg.length; i++) {
					$("#awardUl").append(addAwardliHtml(awardMsg[i]));
				}
			}
		},
		error : function(a,b,c){
			alert(a.status);
		}
	});
}

/**
 * 获取抽奖信息并给二维码区域添加二维码
 */
function getLotteryMsg(){
	$.ajax({
		url : basePath + "/lottery/selLotteryById",
		type : "POST",
		data : {
			lotteryId : lotteryId
		},
		dataType : "JSON",
		success : function(result){
			$(".qr_box").css({
				"background": "url("+result.result.lotteryQr+") center no-repeat"
			});
		},
		error : function(a,b,c){
			alert(a.status);
		}
	});
}

/**
 * 获取已经签到的用户
 */
function getSignUsers(){
	$.ajax({
		url : basePath + "/lotterySign/selSignUsers",
		type : "POST",
		data : {
			lotteryId : lotteryId
		},
		dataType : "JSON",
		success : function(result){
			var userMsg = result.result;
			curUserMsg = userMsg;
			$("#signUl").html("");
			var userArr = new Array();
			var count = 0;
			if(result.code==REQUEST_SUCCESS){
				for (var i = 0; i < userMsg.length; i++) {
					if(!(userArr.contains(userMsg[i].userId) || userMsg[i].isBlackList==1)){
						userArr.push(userMsg[i].userId);
						$("#signUl").append(addSignliHtml(userMsg[i]));
						count++;
					}
				}
				$("#signed_num").html(count);
			}
		},
		error : function(a,b,c){
			alert(a.status);
		}
	});
}


//////////////////////////////////////////开奖的主要逻辑函数/////////////////////////////////////

var giftNum;  //礼物发放的数量
var timer = new Array(giftNum);	//开始抽奖的定时器
var draw_bool = true;  
var stopTimer = ""; //停止抽奖的定时器，隔1s进行开奖
var cur_i=0; //停止定时器的index值
function drawLottery(obj){
	//getCurLoteryCurMsg(curGroupId)
	giftNum = $("#gift_num").text();
	if(utils_isNull(curGroupId)){
		$("#tip").text("请选择奖品");
		$("#Tips").modal("show");
	}else if(curGroupUsersMsg.length<giftNum){
		//alert("当前奖品数量超过符合抽奖的人数");
		$("#tip").text("当前奖品数量超过符合抽奖的人数");
		$("#Tips").modal("show");
	}else{
	
		if(draw_bool){
			$(obj).text("停      止");
			for (var i = 0; i <giftNum ; i++) {
				clearInterval(timer[i]);
				timer[i] = setInterval('change('+i+')',10);
			}
			
			draw_bool = false;
		}else{
			cur_i=0;
			stopTimer = setInterval('stopInterval()', 100);
			$(obj).text("开始抽奖");
			draw_bool = true;
			//showGotLotteryUsers(); 
		}
	}
	
	
}

/**
 * 清空所有定时器
 */
function clearAllInterval(){
	clearInterval(stopTimer);
	for (var i = 0; i <giftNum ; i++) {
		clearInterval(timer[i]);
	}
}

/**
 * 定义停止的定时器，做出按次序开奖的效果
 */

function stopInterval(){
	if(cur_i>=giftNum){
		clearInterval(stopTimer);
		addHtmlToWinner();
		afterDraw();
		get_draw_user();
	}
	else{
		clearInterval(timer[cur_i]);
		deleteDrawedUsers(cur_i);
		cur_i++;
	}
	
}

/**
 * 抽奖完成之后
 * 1：先删除已经中奖的人
 *:2：然后中奖用户信息插入winner中
 */
function afterDraw(){
	/*step1*/
	var liss = $('#lotteryDrawUl').find('li');
	var drawedUser = new Array();
	var userArr = [];
	for (var i = 0; i < liss.length; i++) {
		userArr.push($(liss[i]).attr('data_user'));
	}
	if(userArr.length!=0){
		$.ajax({
	  		url : basePath + "/lotterySign/delUsers",
	  		type : "POST",
	  		dataType : "json",
	  		data : {
	  			users : userArr,
	  			lotteryId : lotteryId
			},
			traditional : true,
	  		success : function(result){
	  			if(result.code == REQUEST_SUCCESS){
	  				/*更新当前抽奖用户数据*/
	  				getSignUsers();
	  				getCurLoteryCurMsg(curGroupId);
	  				/*step2*/
	  				insertDrawedUsers(1);
	  			}else{
	  				insertDrawedUsers(0);
	  			}
	  		},
	  		error : function(a, b, c){
	  			alert(a.status);
	  		}
		});
	}
}

/**
 * 插入抽奖
 * @param status  1：正常中奖。  0： 异常
 */
function insertDrawedUsers(status){
	var insertedUsers = [];
	
	var liss = $('#lotteryDrawUl').find('li');
	for (var i = 0; i < liss.length; i++) {
		var userObj = new Object();
		userObj["winnerUid"] = $(liss[i]).attr('data_user');
		userObj["winnerAwardId"] = curAwardId;
		userObj["lotteryId"] = lotteryId;
		userObj["lotteryState"] = status;
		insertedUsers.push(userObj);
	}
	
	$.ajax({
  		url : basePath + "/lotterySign/addUsersToWinner",
  		type : "POST",
  		dataType : "json",
  		data : {
  			users : JSON.stringify(insertedUsers),
		},
		traditional : true,
  		success : function(result){
  			if(result.code != REQUEST_SUCCESS){
  				alert(result.msg);
  			}
  			
  		},
  		error : function(a, b, c){
  			alert(a.status);
  		}
	});
}
 
/**
 * 删除已经中奖的用户
 * @param i
 */
function deleteDrawedUsers(i){
	var liss = $('#lotteryDrawUl').find('li');
	var userId = $(liss[i]).attr('data_user');
	for (var i = 0; i < curGroupUsersMsg.length; i++) {
		if(curGroupUsersMsg[i].userId == userId){
			curGroupUsersMsg.splice(i, 1);
		}
	}
}

function htmlToWinner(imgUrl,userName){
	var res = '<li>'
        +'<div class="winnerphoto"><img src="'+imgUrl+'" ></div>'
        +'<div class="winnername">'+userName+'</div></li>';
	return res;
}

/**
 * 开奖页面添加获奖名单
 */
function addHtmlToWinner(){
	var liss = $('#lotteryDrawUl').find('li');
	$("#winner ul").html("");
	for (var i = 0; i < liss.length; i++) {
		$("#winner ul").append(htmlToWinner($(liss[i]).find('img').attr('src'),$(liss[i]).find('span').text()));
	}
	$("#winner ul li").eq(liss.length-1).css("margin-right",0);
    $("#winner").css("width",(168*(liss.length))+(50*(liss.length-1))+"px");
}

/**
 * 页面闪烁主函数
 * @param i li的index
 */
function change(i) 
{
	var index = GetRnd(0,curGroupUsersMsg.length-1);
	var userId = curGroupUsersMsg[index].userId;
	var img_url = curGroupUsersMsg[index].userAvatar;
	var userTelPhone = curGroupUsersMsg[index].userTelPhone;
	
	var liss = $('#lotteryDrawUl').find('li');
	$(liss[i]).attr('data_user',userId);
	$(liss[i]).find('img').attr('src',img_url);
	$(liss[i]).find('span').html(userTelPhone);
} 

function start(){ 
	clearInterval(timer); 
	timer = setInterval('change()',1); 
} 
function ok(){ 
	clearInterval(timer); 
	document.getElementById("showresult").value=document.getElementById("oknum").innerText; 
} 
function GetRnd(min,max){ 
	return parseInt(Math.random()*(max-min+1)); 
} 
function layer_show(){
	$('#layer_winner').css("transform","scale(1)");
	$('#layer_winner .bg_box').css("transform","scale(1)");

}



