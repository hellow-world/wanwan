/*
* @Author: admin
* @Date:   2018-01-29 10:38:26
* @Last Modified by:   admin
* @Last Modified time: 2018-04-20 20:16:19
*/
'use strict'
require('./index.css')

var _config = require('service/config.js')
var _sponsorName = _config.sponsorName;
$('#adminName').text(_sponsorName);
