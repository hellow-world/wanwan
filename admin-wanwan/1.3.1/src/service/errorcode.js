
// 请求返回状态
var serverEncode = {
	SERVER_ERROR : 500,
	SERVER_ERROR_MSG : '服务器异常',
	SERVER_ERROR : 500,
 	SERVER_ERROR_MSG : "服务器异常",

 	DATABASE_ERROR : 101,
 	DATABASE_ERROR_MSG : "数据库异常",

 	REQUEST_SUCCESS : 200,
 	REQUEST_SUCCESS_MSG : "请求成功",

 	ERROR_PARAMS : 400,
 	ERROR_PARAMS_MSG : "请求参数不合法或存在空值",

 	CAPTCHA_ERROR : 10,
 	CAPTCHA_ERROR_MSG : "验证码错误",

 	TOKEN_ERROR : 150,
 	TOKEN_ERROR_MSG : "token验证失败",

 	BEAN_INSUFFICIENT : 24,
 	BEAN_INSUFFICIENT_MSG : "所需绿豆数量不足",

 	ERROR_SELECT_PARAM : "输入的搜索条件有误"
}

module.exports = serverEncode