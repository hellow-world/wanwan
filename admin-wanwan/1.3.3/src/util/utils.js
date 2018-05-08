/*
 * @Author: John
 * @Date:   2018-01-30 14:28:32
 * @Last Modified by:   admin
 * @Last Modified time: 2018-05-08 17:39:08
 */
var _encode = require('service/errorcode.js')
var config = require('service/config.js')
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