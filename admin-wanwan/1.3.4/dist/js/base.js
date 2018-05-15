/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".js/" + ({"1":"selection/selection-review","2":"members/member-select","3":"information/information-sel","4":"information/information-add","5":"index","6":"adsense/adsense-sel","7":"adsense/adsense-add","8":"activity/activity-publish","9":"activity/activity-add","10":"welcome","11":"seller/seller-sel","12":"selection/selection-sel","13":"selection/selection-add","14":"role/role-sel","15":"role/role-bind","16":"order/usersorder-sel","17":"order/order-sel","18":"members/admin-role","19":"jackpots/jackpot-sel","20":"jackpots/jackpot-add","21":"guess/guess-sel","22":"guess/guess-add","23":"greenbean/greenbean-sel","24":"greenbean/greenbean-add","25":"card/card-sel","26":"card/card-add","27":"activity/activity-signlist","28":"activity/activity-publisher"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(24);


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

	/*
	* @Author: admin
	* @Date:   2018-01-31 14:34:05
	* @Last Modified by:   admin
	* @Last Modified time: 2018-05-11 15:32:32
	*/
	var config = {
	
		//basePath : 'https://wanwan.citygreen-china.com:8445/',//内网
		basePath : 'https://api.wanwantech.com:8445/',//外网
	
		//buildPath: 'https://api.wanwantech.cn:18443/',//内网
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


/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: John
	 * @Date:   2018-01-30 14:28:32
	 * @Last Modified by:   admin
	 * @Last Modified time: 2018-05-08 17:39:08
	 */
	var _encode = __webpack_require__(3)
	var config = __webpack_require__(1)
	var _utils = {
	
	    request: function(param) {
	        var _this = this;
	        $.ajax({
	            type: param.method || 'get',
	            url: param.url || '',
	            dataType: param.type || 'json',
	            data: param.data || '',
	            success: function(res) {
	                console.log(res)
	                // 请求成功
	                if (_encode.REQUEST_SUCCESS === res.code) {
	                    typeof param.success === 'function' && param.success(res.data, res.msg)
	
	                }
	                // 没有登陆状态，需要强制登录
	                // else if(10 === res.status){
	                //  _this.doLogin()
	                // }
	                // // 请求数据错误
	                // else if(1 ===res.status){
	                //  typeof param.error === 'function' && param.error(res.msg)
	                // }
	
	            },
	            error: function(err) {
	                typeof param.error === 'function' && param.error(err.code)
	            }
	
	        });
	    },
	    // 获取服务器地址
	    getServerUrl: function(path) {
	        return conf.serverHost + path;
	    },
	    // 获取url参数
	    getUrlParam: function(name) {
	        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
	        var result = window.location.search.substr(1).match(reg);
	        return result ? decodeURIComponent(result[2]) : null;
	    },
	    /*格式化当前时间*/
	    getNowFormatDate: () => {
	        var date = new Date();
	        var seperator1 = "-";
	        var seperator2 = ":";
	        var month = date.getMonth() + 1;
	        var strDate = date.getDate();
	        var hours = date.getHours();
	        var minutes = date.getMinutes();
	        var second = date.getSeconds();
	        if (month >= 1 && month <= 9) {
	            month = "0" + month;
	        }
	        if (strDate >= 0 && strDate <= 9) {
	            strDate = "0" + strDate;
	        }
	        if (hours >= 0 && hours <= 9) {
	            hours = "0" + hours;
	        }
	        if (minutes >= 0 && minutes <= 9) {
	            minutes = "0" + minutes;
	        }
	        if (second >= 0 && second <= 9) {
	            second = "0" + second;
	        }
	        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
	            " " + hours + seperator2 + minutes +
	            seperator2 + second;
	        return currentdate;
	    },
	    //格式化日期时间
	    formatDate: (v) => {
	        if (/^(-)?\d{1,10}$/.test(v)) {
	            v = v * 1000;
	        } else if (/^(-)?\d{1,13}$/.test(v)) {
	            v = v * 1;
	        }
	        if (navigator.userAgent.indexOf("Safari") > -1) {
	            if (navigator.userAgent.indexOf("Chrome") > -1) {
	                var dateObj = new Date(v);
	                var month = dateObj.getMonth() + 1;
	                var day = dateObj.getDate();
	                var hours = dateObj.getHours();
	                var minutes = dateObj.getMinutes();
	                var seconds = dateObj.getSeconds();
	                if (month < 10) {
	                    month = "0" + month;
	                }
	                if (day < 10) {
	                    day = "0" + day;
	                }
	                if (hours < 10) {
	                    hours = "0" + hours;
	                }
	                if (minutes < 10) {
	                    minutes = "0" + minutes;
	                }
	                if (seconds < 10) {
	                    seconds = "0" + seconds;
	                }
	                var UnixTimeToDate = dateObj.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
	                return UnixTimeToDate;
	            }
	            var year = v.substring(0, 4);
	            var month = v.substring(5, 7);
	            var day = v.substring(8, 10);
	            var hours = v.substring(11, 13);
	            var minutes = v.substring(14, 16);
	            var seconds = v.substring(17, 19);
	            var UnixTimeToDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
	
	
	        } else {
	            var dateObj = new Date(v);
	            var month = dateObj.getMonth() + 1;
	            var day = dateObj.getDate();
	            var hours = dateObj.getHours();
	            var minutes = dateObj.getMinutes();
	            var seconds = dateObj.getSeconds();
	            if (month < 10) {
	                month = "0" + month;
	            }
	            if (day < 10) {
	                day = "0" + day;
	            }
	            if (hours < 10) {
	                hours = "0" + hours;
	            }
	            if (minutes < 10) {
	                minutes = "0" + minutes;
	            }
	            if (seconds < 10) {
	                seconds = "0" + seconds;
	            }
	            var UnixTimeToDate = dateObj.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
	        }
	        //v = v.replace(/\-/g, "/");
	
	
	        return UnixTimeToDate;
	    },
	    /**
	     * 判断参数是否全部为空 
	     * @param param
	     * @returns {Boolean} true 为空， false 不为空
	     */
	    utils_isNull: function() {
	
	        for (var i = 0; i < arguments.length; i++) {
	            if (arguments[i] == "" || arguments[i] == null) {
	                return true;
	            }
	            return false;
	        }
	    },
	    /**
	     * 获取当前用户
	     * 未添加权限管理的时候添加此功能。暂用0.0
	     */
	    sponsorName: "",
	    CurrentUser: function() {
	
	        $.ajax({
	            url: config.basePath + "manageruser/selectcurUser",
	            type: "POST",
	            dataType: "json",
	            success: function(result) {
	                console.log(result)
	                if (result.code != _encode.REQUEST_SUCCESS) {
	                    alert("no users, please re-entry~");
	                    top.document.location.href = "../../index.html";
	                } else {
	                    sponsorName = result.msg.userName;
	                }
	            },
	            error: function(a, b, c) {
	                alert(a.status);
	            }
	        });
	
	    },
	    /**
	     * 获取文件名
	     * @param o 文件(型如：$("#").val())
	     * @returns
	     */
	    getFileName: function(o) {
	        var pos = o.lastIndexOf("\\");
	        return o.substring(pos + 1);
	    },
	    /**
	     * 获取网页传递的参数值
	     * @param key key值
	     * @returns  key对应的value
	     */
	    getParams: function(key) {
	        var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
	        var r = window.location.search.substr(1).match(reg);
	        if (r != null) {
	            return unescape(r[2]);
	        }
	        return null;
	    },
	    /*消息弹出框*/
	    modalalert: function(msg) {
	        $.Huimodalalert(msg, 3000);
	    },
	    /**
	     * 深度拷贝一个引用型参数  
	     * @param p 被拷贝对象
	     * @param c 初始为空，需要拷贝的对象
	     * @returns {___anonymous1520_1521}
	     */
	    Copy: function(p, c) {
	        var c = c || {};
	        for (var i in p) {
	            if (typeof p[i] == "object") {
	                c[i] = (p[i].constructor === Array) ? [] : {};
	                Copy(p[i], c[i]);
	            } else {
	                c[i] = p[i];
	            }
	        }
	        return c;
	    },
	    /* 动态加载数据到表格*/
	    setValueToTable: function(param, behind, end) {
	        var res = "";
	
	        for (var i = 0; i < param.length; i++) {
	            res += this.addTdToTable(param[i], behind, end);
	        }
	        return res;
	    },
	    /* 加载数据为每行 */
	    addTdToTable: function(param, behind, end) {
	        var res = '<tr class="text-c">' + behind;
	        for (var key in param) {
	            res += "<td>" + param[key] + "</td>";
	        }
	        return res + end + "</tr>";
	    },
	    /*radio栏html*/
	    getradiohtml: function() {
	        var res = "<td><input type='checkbox'></td>";
	        return res;
	    },
	    /**
	     * 空数据表格内容添加
	     * @param colnum 列数
	     * @returns
	     */
	    noDataTbody: function(colnum) {
	        var res = "";
	        res += '<tr><td colspan="' + colnum + '" style="text-align: center">暂无数据</td></tr>';
	
	    },
	    //操作栏创建
	    getoperaHtml: function() {
	        console.log('操作栏创建')
	        var res = "<td><a title='查看' href='javascript:void(0);' class='ml-5 setScan' style='text-decoration:none'><i class='Hui-iconfont'>&#xe665;</i></a>" +
	            "<a title='修改' href='javascript:void(0);' class='ml-5 setEdit' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6df;</i></a>" +
	            "<a title='删除' href='javascript:void(0);' class='ml-5 setDel' style='text-decoration:none'><i class='Hui-iconfont'>&#xe6e2;</i></a>" +
	            "<a title='置顶' href='javascript:void(0);' class='ml-5 setTop' style='text-decoration:none'><i class='Hui-iconfont'>&#xe679;</i></a></td>";
	        return res;
	    },
	    //返回列表
	    backToList: function() {
	        window.history.back();
	    },
	    // 通用提示框
	    modalTip: function(text, dur) {
	        $.Huimodalalert(text, dur || 2000)
	    },
	    // Object to Array
	    ObjectToArray: function(object) {
	
	        var arr = Object.keys(object).map(key => object[key]);
	        return arr;
	    },
	    //HTML转表格
	    export: {
	        _fallbacktoCSV: true,
	        toXLS: function(tableId, filename) {
	            this._filename = (typeof filename == 'undefined') ? tableId : filename;
	
	            //var ieVersion = this._getMsieVersion();
	            //Fallback to CSV for IE & Edge
	            if ((this._getMsieVersion() || this._isFirefox()) && this._fallbacktoCSV) {
	                return this.toCSV(tableId);
	            } else if (this._getMsieVersion() || this._isFirefox()) {
	                alert("Not supported browser");
	            }
	
	            //Other Browser can download xls
	            var htmltable = document.getElementById(tableId);
	            var html = htmltable.outerHTML;
	
	            this._downloadAnchor("data:application/vnd.ms-excel" + encodeURIComponent(html), 'xls');
	        },
	        toCSV: function(tableId, filename) {
	            this._filename = (typeof filename === 'undefined') ? tableId : filename;
	            // Generate our CSV string from out HTML Table
	            var csv = this._tableToCSV(document.getElementById(tableId));
	            // Create a CSV Blob
	            // var blob = new Blob([csv], { type: "text/csv;charset=gb2312,\ufeff" });
	
	
	            // // Determine which approach to take for the download
	            // if (navigator.msSaveOrOpenBlob) {
	            //     // Works for Internet Explorer and Microsoft Edge
	            //     navigator.msSaveOrOpenBlob(blob, this._filename + ".csv");
	            // } else {
	            //     this._downloadAnchor(URL.createObjectURL(blob), '.csv');
	            // }
	            var encodedUri = encodeURI("data:text/csv;charset=gb2312,\ufeff" + csv);
	            this._downloadAnchor(encodedUri, '.csv');
	        },
	        _getMsieVersion: function() {
	            var ua = window.navigator.userAgent;
	
	            var msie = ua.indexOf("MSIE ");
	            if (msie > 0) {
	                // IE 10 or older => return version number
	                return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
	            }
	
	            var trident = ua.indexOf("Trident/");
	            if (trident > 0) {
	                // IE 11 => return version number
	                var rv = ua.indexOf("rv:");
	                return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
	            }
	
	            var edge = ua.indexOf("Edge/");
	            if (edge > 0) {
	                // Edge (IE 12+) => return version number
	                return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
	            }
	
	            // other browser
	            return false;
	        },
	
	        _isFirefox: function() {
	            if (navigator.userAgent.indexOf("Firefox") > 0) {
	                return 1;
	            }
	
	            return 0;
	        },
	        _downloadAnchor: function(content, ext) {
	            var anchor = document.createElement("a");
	            anchor.style = "display:none !important";
	            anchor.id = "downloadanchor";
	            document.body.appendChild(anchor);
	
	            // If the [download] attribute is supported, try to use it
	
	            if ("download" in anchor) {
	                anchor.download = this._filename + "." + ext;
	            }
	            anchor.href = content;
	            anchor.click();
	            anchor.remove();
	        },
	        _tableToCSV: function(table) {
	            // We'll be co-opting `slice` to create arrays
	            var slice = Array.prototype.slice;
	
	            return slice
	                .call(table.rows)
	                .map(function(row) {
	                    return slice
	                        .call(row.cells)
	                        .map(function(cell) {
	                            return '"t"'.replace("t", cell.textContent);
	                        })
	                        .join(",");
	                })
	                .join("\r\n");
	        }
	    }
	    // 七牛云
	    // QiNiu: {
	    //     uploader: Qiniu.uploader({
	    //         runtimes: 'html5,flash,html4', //上传模式,依次退化
	    //         browse_button: 'pickfiles', //上传选择的点选按钮，**必需**
	    //         uptoken_url: '/token', //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
	    //         // uptoken : '', //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
	    //         // unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
	    //         // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
	    //         domain: 'http://qiniu-plupload.qiniudn.com/', //bucket 域名，下载资源时用到，**必需**
	    //         get_new_uptoken: false, //设置上传文件的时候是否每次都重新获取新的token
	    //         container: 'container', //上传区域DOM ID，默认是browser_button的父元素，
	    //         max_file_size: '100mb', //最大文件体积限制
	    //         flash_swf_url: 'js/plupload/Moxie.swf', //引入flash,相对路径
	    //         max_retries: 3, //上传失败最大重试次数
	    //         dragdrop: true, //开启可拖曳上传
	    //         drop_element: 'container', //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
	    //         chunk_size: '4mb', //分块上传时，每片的体积
	    //         auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
	    //         init: {
	    //             'FilesAdded': function(up, files) {
	    //                 plupload.each(files, function(file) {
	    //                     // 文件添加进队列后,处理相关的事情
	    //                 });
	    //             },
	    //             'BeforeUpload': function(up, file) {
	    //                 // 每个文件上传前,处理相关的事情
	    //             },
	    //             'UploadProgress': function(up, file) {
	    //                 // 每个文件上传时,处理相关的事情
	    //             },
	    //             'FileUploaded': function(up, file, info) {
	    //                 // 每个文件上传成功后,处理相关的事情
	    //                 // 其中 info.response 是文件上传成功后，服务端返回的json，形式如
	    //                 // {
	    //                 //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
	    //                 //    "key": "gogopher.jpg"
	    //                 //  }
	    //                 // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
	
	    //                 // var domain = up.getOption('domain');
	    //                 // var res = parseJSON(info.response);
	    //                 // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
	    //             },
	    //             'Error': function(up, err, errTip) {
	    //                 //上传出错时,处理相关的事情
	    //             },
	    //             'UploadComplete': function() {
	    //                 //队列文件处理完毕后,处理相关的事情
	    //             },
	    //             'Key': function(up, file) {
	    //                 // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
	    //                 // 该配置必须要在 unique_names: false , save_key: false 时才生效
	
	    //                 var key = "";
	    //                 // do something with key here
	    //                 return key
	    //             }
	    //         }
	    //     })
	    // }
	
	};
	module.exports = _utils;

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	
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

/***/ }),

/***/ 8:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

	
	/**
	 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
	 * embed the css on the page. This breaks all relative urls because now they are relative to a
	 * bundle instead of the current page.
	 *
	 * One solution is to only use full urls, but that may be impossible.
	 *
	 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
	 *
	 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
	 *
	 */
	
	module.exports = function (css) {
	  // get current location
	  var location = typeof window !== "undefined" && window.location;
	
	  if (!location) {
	    throw new Error("fixUrls requires window.location");
	  }
	
		// blank or null?
		if (!css || typeof css !== "string") {
		  return css;
	  }
	
	  var baseUrl = location.protocol + "//" + location.host;
	  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");
	
		// convert each url(...)
		/*
		This regular expression is just a way to recursively match brackets within
		a string.
	
		 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
		   (  = Start a capturing group
		     (?:  = Start a non-capturing group
		         [^)(]  = Match anything that isn't a parentheses
		         |  = OR
		         \(  = Match a start parentheses
		             (?:  = Start another non-capturing groups
		                 [^)(]+  = Match anything that isn't a parentheses
		                 |  = OR
		                 \(  = Match a start parentheses
		                     [^)(]*  = Match anything that isn't a parentheses
		                 \)  = Match a end parentheses
		             )  = End Group
	              *\) = Match anything and then a close parens
	          )  = Close non-capturing group
	          *  = Match anything
	       )  = Close capturing group
		 \)  = Match a close parens
	
		 /gi  = Get all matches, not the first.  Be case insensitive.
		 */
		var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
			// strip quotes (if they exist)
			var unquotedOrigUrl = origUrl
				.trim()
				.replace(/^"(.*)"$/, function(o, $1){ return $1; })
				.replace(/^'(.*)'$/, function(o, $1){ return $1; });
	
			// already a full url? no change
			if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			  return fullMatch;
			}
	
			// convert the url to a full url
			var newUrl;
	
			if (unquotedOrigUrl.indexOf("//") === 0) {
			  	//TODO: should we add protocol?
				newUrl = unquotedOrigUrl;
			} else if (unquotedOrigUrl.indexOf("/") === 0) {
				// path should be relative to the base url
				newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
			} else {
				// path should be relative to current directory
				newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
			}
	
			// send back the fixed url(...)
			return "url(" + JSON.stringify(newUrl) + ")";
		});
	
		// send back the fixed css
		return fixedCss;
	};


/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: admin
	* @Date:   2018-01-29 16:11:50
	* @Last Modified by:   admin
	* @Last Modified time: 2018-05-11 11:09:53
	*/
	__webpack_require__(8)
	__webpack_require__(34)
	var _utils = __webpack_require__(2)
	var _config = __webpack_require__(1)
	/**
	 * 数组添加contains方法
	 */
	Array.prototype.contains = function(item){
		  return RegExp("\\b"+item+"\\b").test(this);
	};
	
	/* 
	* 方法:Array.remove(dx) 通过遍历,重构数组 
	* 功能:删除数组元素. 
	* 参数:dx删除元素的下标. 
	*/
	Array.prototype.remove=function(dx) 
	{ 
	  if(isNaN(dx)||dx>this.length){return false;} 
	  for(var i=0,n=0;i<this.length;i++) 
	  { 
	    if(this[i]!=this[dx]) 
	    { 
	      this[n++]=this[i] 
	    } 
	  } 
	  this.length-=1 
	}
	var _token=$.cookie('token')
	var _sponsorName = $.cookie('sponsorName')
	if(_token===undefined||_sponsorName===undefined)
	{
	    //top.location.href="../../index.html";//外网
	    top.location.href="../../dist/";
		
	}
	else
	{
	    console.log('登录成功')
	    console.log(_sponsorName)
	}
	_config.token = _token;
	_config.sponsorName = _sponsorName;
	window.onload=function(){
	    var temp = document.getElementsByTagName("a");
	    var i = 0;
	    for(i=0;i<temp.length;i++){
	        //console.log(temp[i].href);
	        if(temp[i].href=="https://www.froala.com/wysiwyg-editor?k=u")
	        {           temp[i].parentNode.removeChild(temp[i].parentNode.childNodes[0]);
	        }
	    }
	}
	$('input[type=file]').change(function(){
	    let fileSize = this.files[0].size
	    if(fileSize>1048576)
	    {
	        _utils.modalalert('文件大于1M，请重新上传')
	        return;
	    }
	})


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery Cookie Plugin v1.4.1
	 * https://github.com/carhartl/jquery-cookie
	 *
	 * Copyright 2013 Klaus Hartl
	 * Released under the MIT license
	 */
	(function (factory) {
		if (true) {
			// AMD
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(46)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			// CommonJS
			factory(require('jquery'));
		} else {
			// Browser globals
			factory(jQuery);
		}
	}(function ($) {
	
		var pluses = /\+/g;
	
		function encode(s) {
			return config.raw ? s : encodeURIComponent(s);
		}
	
		function decode(s) {
			return config.raw ? s : decodeURIComponent(s);
		}
	
		function stringifyCookieValue(value) {
			return encode(config.json ? JSON.stringify(value) : String(value));
		}
	
		function parseCookieValue(s) {
			if (s.indexOf('"') === 0) {
				// This is a quoted cookie as according to RFC2068, unescape...
				s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
			}
	
			try {
				// Replace server-side written pluses with spaces.
				// If we can't decode the cookie, ignore it, it's unusable.
				// If we can't parse the cookie, ignore it, it's unusable.
				s = decodeURIComponent(s.replace(pluses, ' '));
				return config.json ? JSON.parse(s) : s;
			} catch(e) {}
		}
	
		function read(s, converter) {
			var value = config.raw ? s : parseCookieValue(s);
			return $.isFunction(converter) ? converter(value) : value;
		}
	
		var config = $.cookie = function (key, value, options) {
	
			// Write
	
			if (value !== undefined && !$.isFunction(value)) {
				options = $.extend({}, config.defaults, options);
	
				if (typeof options.expires === 'number') {
					var days = options.expires, t = options.expires = new Date();
					t.setTime(+t + days * 864e+5);
				}
	
				return (document.cookie = [
					encode(key), '=', stringifyCookieValue(value),
					options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
					options.path    ? '; path=' + options.path : '',
					options.domain  ? '; domain=' + options.domain : '',
					options.secure  ? '; secure' : ''
				].join(''));
			}
	
			// Read
	
			var result = key ? undefined : {};
	
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			var cookies = document.cookie ? document.cookie.split('; ') : [];
	
			for (var i = 0, l = cookies.length; i < l; i++) {
				var parts = cookies[i].split('=');
				var name = decode(parts.shift());
				var cookie = parts.join('=');
	
				if (key && key === name) {
					// If second argument (value) is a function it's a converter...
					result = read(cookie, value);
					break;
				}
	
				// Prevent storing a cookie that we couldn't decode.
				if (!key && (cookie = read(cookie)) !== undefined) {
					result[name] = cookie;
				}
			}
	
			return result;
		};
	
		config.defaults = {};
	
		$.removeCookie = function (key, options) {
			if ($.cookie(key) === undefined) {
				return false;
			}
	
			// Must not alter options, thus extending a fresh object...
			$.cookie(key, '', $.extend({}, options, { expires: -1 }));
			return !$.cookie(key);
		};
	
	}));


/***/ }),

/***/ 46:
/***/ (function(module, exports) {

	module.exports = window.jQuery;

/***/ }),

/***/ 47:
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function(useSourceMap) {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			return this.map(function (item) {
				var content = cssWithMappingToString(item, useSourceMap);
				if(item[2]) {
					return "@media " + item[2] + "{" + content + "}";
				} else {
					return content;
				}
			}).join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};
	
	function cssWithMappingToString(item, useSourceMap) {
		var content = item[1] || '';
		var cssMapping = item[3];
		if (!cssMapping) {
			return content;
		}
	
		if (useSourceMap && typeof btoa === 'function') {
			var sourceMapping = toComment(cssMapping);
			var sourceURLs = cssMapping.sources.map(function (source) {
				return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
			});
	
			return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
		}
	
		return [content].join('\n');
	}
	
	// Adapted from convert-source-map (MIT)
	function toComment(sourceMap) {
		// eslint-disable-next-line no-undef
		var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
		var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
	
		return '/*# ' + data + ' */';
	}


/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	
	var stylesInDom = {};
	
	var	memoize = function (fn) {
		var memo;
	
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	};
	
	var isOldIE = memoize(function () {
		// Test for IE <= 9 as proposed by Browserhacks
		// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
		// Tests for existence of standard globals is to allow style-loader
		// to operate correctly into non-standard environments
		// @see https://github.com/webpack-contrib/style-loader/issues/177
		return window && document && document.all && !window.atob;
	});
	
	var getTarget = function (target) {
	  return document.querySelector(target);
	};
	
	var getElement = (function (fn) {
		var memo = {};
	
		return function(target) {
	                // If passing function in options, then use it for resolve "head" element.
	                // Useful for Shadow Root style i.e
	                // {
	                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
	                // }
	                if (typeof target === 'function') {
	                        return target();
	                }
	                if (typeof memo[target] === "undefined") {
				var styleTarget = getTarget.call(this, target);
				// Special case to return head of iframe instead of iframe itself
				if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
					try {
						// This will throw an exception if access to iframe is blocked
						// due to cross-origin restrictions
						styleTarget = styleTarget.contentDocument.head;
					} catch(e) {
						styleTarget = null;
					}
				}
				memo[target] = styleTarget;
			}
			return memo[target]
		};
	})();
	
	var singleton = null;
	var	singletonCounter = 0;
	var	stylesInsertedAtTop = [];
	
	var	fixUrls = __webpack_require__(15);
	
	module.exports = function(list, options) {
		if (false) {
			if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
	
		options.attrs = typeof options.attrs === "object" ? options.attrs : {};
	
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();
	
		// By default, add <style> tags to the <head> element
	        if (!options.insertInto) options.insertInto = "head";
	
		// By default, add <style> tags to the bottom of the target
		if (!options.insertAt) options.insertAt = "bottom";
	
		var styles = listToStyles(list, options);
	
		addStylesToDom(styles, options);
	
		return function update (newList) {
			var mayRemove = [];
	
			for (var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
	
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
	
			if(newList) {
				var newStyles = listToStyles(newList, options);
				addStylesToDom(newStyles, options);
			}
	
			for (var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
	
				if(domStyle.refs === 0) {
					for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();
	
					delete stylesInDom[domStyle.id];
				}
			}
		};
	};
	
	function addStylesToDom (styles, options) {
		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
	
			if(domStyle) {
				domStyle.refs++;
	
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
	
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
	
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
	
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles (list, options) {
		var styles = [];
		var newStyles = {};
	
		for (var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = options.base ? item[0] + options.base : item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
	
			if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
			else newStyles[id].parts.push(part);
		}
	
		return styles;
	}
	
	function insertStyleElement (options, style) {
		var target = getElement(options.insertInto)
	
		if (!target) {
			throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
		}
	
		var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];
	
		if (options.insertAt === "top") {
			if (!lastStyleElementInsertedAtTop) {
				target.insertBefore(style, target.firstChild);
			} else if (lastStyleElementInsertedAtTop.nextSibling) {
				target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				target.appendChild(style);
			}
			stylesInsertedAtTop.push(style);
		} else if (options.insertAt === "bottom") {
			target.appendChild(style);
		} else if (typeof options.insertAt === "object" && options.insertAt.before) {
			var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
			target.insertBefore(style, nextSibling);
		} else {
			throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
		}
	}
	
	function removeStyleElement (style) {
		if (style.parentNode === null) return false;
		style.parentNode.removeChild(style);
	
		var idx = stylesInsertedAtTop.indexOf(style);
		if(idx >= 0) {
			stylesInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement (options) {
		var style = document.createElement("style");
	
		options.attrs.type = "text/css";
	
		addAttrs(style, options.attrs);
		insertStyleElement(options, style);
	
		return style;
	}
	
	function createLinkElement (options) {
		var link = document.createElement("link");
	
		options.attrs.type = "text/css";
		options.attrs.rel = "stylesheet";
	
		addAttrs(link, options.attrs);
		insertStyleElement(options, link);
	
		return link;
	}
	
	function addAttrs (el, attrs) {
		Object.keys(attrs).forEach(function (key) {
			el.setAttribute(key, attrs[key]);
		});
	}
	
	function addStyle (obj, options) {
		var style, update, remove, result;
	
		// If a transform function was defined, run it on the css
		if (options.transform && obj.css) {
		    result = options.transform(obj.css);
	
		    if (result) {
		    	// If transform returns a value, use that instead of the original css.
		    	// This allows running runtime transformations on the css.
		    	obj.css = result;
		    } else {
		    	// If the transform function returns a falsy value, don't add this css.
		    	// This allows conditional loading of css
		    	return function() {
		    		// noop
		    	};
		    }
		}
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
	
			style = singleton || (singleton = createStyleElement(options));
	
			update = applyToSingletonTag.bind(null, style, styleIndex, false);
			remove = applyToSingletonTag.bind(null, style, styleIndex, true);
	
		} else if (
			obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function"
		) {
			style = createLinkElement(options);
			update = updateLink.bind(null, style, options);
			remove = function () {
				removeStyleElement(style);
	
				if(style.href) URL.revokeObjectURL(style.href);
			};
		} else {
			style = createStyleElement(options);
			update = applyToTag.bind(null, style);
			remove = function () {
				removeStyleElement(style);
			};
		}
	
		update(obj);
	
		return function updateStyle (newObj) {
			if (newObj) {
				if (
					newObj.css === obj.css &&
					newObj.media === obj.media &&
					newObj.sourceMap === obj.sourceMap
				) {
					return;
				}
	
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
	
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag (style, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (style.styleSheet) {
			style.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = style.childNodes;
	
			if (childNodes[index]) style.removeChild(childNodes[index]);
	
			if (childNodes.length) {
				style.insertBefore(cssNode, childNodes[index]);
			} else {
				style.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag (style, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			style.setAttribute("media", media)
		}
	
		if(style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			while(style.firstChild) {
				style.removeChild(style.firstChild);
			}
	
			style.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink (link, options, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		/*
			If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
			and there is no publicPath defined then lets turn convertToAbsoluteUrls
			on by default.  Otherwise default to the convertToAbsoluteUrls option
			directly
		*/
		var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;
	
		if (options.convertToAbsoluteUrls || autoFixUrls) {
			css = fixUrls(css);
		}
	
		if (sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = link.href;
	
		link.href = URL.createObjectURL(blob);
	
		if(oldSrc) URL.revokeObjectURL(oldSrc);
	}


/***/ })

/******/ });