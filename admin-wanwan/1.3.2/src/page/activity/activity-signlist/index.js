/*
 * @Author: admin
 * @Date:   2018-04-19 11:41:36
 * @Last Modified by:   admin
 * @Last Modified time: 2018-04-19 18:24:41
 */
var _utils = require('util/utils.js')

window.ExportExcel = () => {

    _utils.export.toCSV('activitySignTable', '报名名单');
    
}