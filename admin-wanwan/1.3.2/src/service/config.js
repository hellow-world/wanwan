/*
* @Author: admin
* @Date:   2018-01-31 14:34:05
* @Last Modified by:   admin
* @Last Modified time: 2018-04-24 15:44:20
*/
var config = {

	//basePath : 'https://wanwan.citygreen-china.com:8445/',//内网
	basePath : 'https://api.wanwantech.com:8445/',

	//buildPath: 'https://api.wanwantech.cn:18443/',
	buildPath : 'https://api.wanwantech.com:18443/',//外网

	viewPath : 'http://192.168.1.153:8890/dist/view/',

	token:"dRu8aEWVS2we8yRsNt3AaCYHIjU9ZAhzmwyST/XiYZPy+XitrowdMb/NEIgwHvLa1WoVEKBNtfh/L3Ua/527IiOpsHftZ7AmG1pfpr8TNIIurhTk+QgbM37zz4vFI0V8LPxXS1tRyFVbSE4mlr5fPUkObwofBkU5T51tkDeSzq4=",
	sponsorName:"",
	adContentTypeId :
	{
		activity:101,//活动
		guess:102,//竞猜
		merchant:103,//商品
		card:104,//卡券
		vote:105//评选
	},
	adLocationId :
	{
		banner:1,//banner位
		secondLevel:2,//二级广告位
		hotActivity:3,//热门活动
		recommendMain:4,//商品主推荐
		recommendDetail:5//推荐商品
	}
}


module.exports = config;