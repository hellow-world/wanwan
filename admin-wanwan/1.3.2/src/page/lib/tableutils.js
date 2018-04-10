/* 动态加载数据到表格*/
function setValueToTable(param,behind,end){
	var res = "";
	
	for(var i = 0;i<param.length;i++){
		res+=addTdToTable(param[i],behind,end);
	}
	return res;
}

/* 加载数据为每行 */
function addTdToTable(param,behind,end){
	var res = '<tr class="text-c">'+behind;
	for(var key in param ){
		res += "<td>"+param[key]+"</td>";
	}
	return res+end+"</tr>";
}

/*radio栏html*/
function getradiohtml(){
	var res = "<td><input type='checkbox'></td>";
	return res;
}

/**
 * 空数据表格内容添加
 * @param colnum 列数
 * @returns
 */
function noDataTbody(colnum){
	var res = "";
	res += '<tr><td colspan="'+colnum+'" style="text-align: center">暂无数据</td></tr>';
	 
}

