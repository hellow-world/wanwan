/*
 * @Author: admin
 * @Date:   2018-01-29 11:05:21
 * @Last Modified by:   admin
 * @Last Modified time: 2018-04-17 09:17:08
 */
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

//环境变量控制
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(name, title) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        favicon: './favicon.ico',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
};

var config = {
    //入口文件
    entry: {
        'common': ['./src/page/common/index.js'], //公共JS路径
        'index': ['./src/page/index/index.js'],
        'welcome': ['./src/page/welcome/index.js'],
        //会员管理
        'members/admin-role': ['./src/page/members/admin-role/index.js'],
        // 会员查询
        'members/member-select':['./src/page/members/member-select/index.js'],
        //活动管理
        'activity/activity-publish': ['./src/page/activity/activity-publish/index.js'],
        'activity/activity-publisher': ['./src/page/activity/activity-publisher/index.js'],
        // 'activity/activity-edit'   : ['./src/page/activity/activity-edit/index.js'],
        'activity/activity-add': ['./src/page/activity/activity-add/index.js'],
        //奖池设置
        'jackpots/jackpot-sel': ['./src/page/jackpots/jackpot-sel/index.js'],
        'jackpots/jackpot-add': ['./src/page/jackpots/jackpot-add/index.js'],
        //活动竞猜
        'guess/guess-sel': ['./src/page/guess/guess-sel/index.js'],
        'guess/guess-add': ['./src/page/guess/guess-add/index.js'],
        //绿豆管理
        'greenbean/greenbean-sel': ['./src/page/greenbean/greenbean-sel/index.js'],
        'greenbean/greenbean-add': ['./src/page/greenbean/greenbean-add/index.js'],
        //商家管理
        'seller/seller-sel': ['./src/page/seller/seller-sel/index.js'],
        //订单管理
        'order/order-sel': ['./src/page/order/order-sel/index.js'],
        'order/usersorder-sel': ['./src/page/order/usersorder-sel/index.js'],
        //卡券管理
        'card/card-sel': ['./src/page/card/card-sel/index.js'],
        'card/card-add': ['./src/page/card/card-add/index.js'],
        //评选活动
        'selection/selection-add': ['./src/page/selection/selection-add/index.js'],
        'selection/selection-sel': ['./src/page/selection/selection-sel/index.js'],
        'selection/selection-review': ['./src/page/selection/selection-review/index.js'],
        //广告位设置
        'adsense/adsense-sel': ['./src/page/adsense/adsense-sel/index.js'],
        'adsense/adsense-add': ['./src/page/adsense/adsense-add/index.js'],
        // 权限管理-角色管理,
        'role/role-sel':['./src/page/role/role-sel/index.js'],
        'role/role-bind':['./src/page/role/role-bind/index.js']

    },
    //输出文件
    output: {
        path: __dirname + '/dist', //构建存放目录    
        publicPath: 'dev' === WEBPACK_ENV ? '/dist/' : '/dist/', //构建最终路径存放目录
        filename: 'js/[name].js' //构建存放路径的文件名（js）
    },
    //导入外部JS资源
    externals: {
        'jquery'  : 'window.jQuery'
    },
    //加载的外挂
    module: {
        loaders: [
            //css样式文件
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            //图片字体文件
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            {
                test: /\.string$/,
                loader: 'html-loader',
                query: {
                    minimize: true,
                    removeAttributeQuotes: false
                }
            },
            {
	            test: path.join(__dirname, 'es6'),
	            loader: 'babel-loader',
	            query: {
	                presets: ['es2015']
            	}
            }
        ]
    },
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image'
        }
        // extensions: ['','js']
    },
    devServer:{
        disableHostCheck: true
    },
    plugins: [
        //提取公共模块到js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        //提取src的外部文件到输出文件里面
        new CopyWebpackPlugin([{
                from: path.resolve(__dirname + '/src/page/lib'),
                to: path.resolve(__dirname + '/lib')
            }

        ]),
        //单独提取css文件
        new ExtractTextPlugin('css/[name].css'),
        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('welcome', '欢迎')),
        new HtmlWebpackPlugin(getHtmlConfig('members/member-select', '单人查询')),
        new HtmlWebpackPlugin(getHtmlConfig('members/admin-role', '会员列表')),
        new HtmlWebpackPlugin(getHtmlConfig('activity/activity-add', '活动添加')),
        // new HtmlWebpackPlugin(getHtmlConfig('activity/activity-edit','活动编辑')),
        new HtmlWebpackPlugin(getHtmlConfig('activity/activity-publish', '活动发布')),
        new HtmlWebpackPlugin(getHtmlConfig('activity/activity-publisher', '活动发布者')),
        new HtmlWebpackPlugin(getHtmlConfig('jackpots/jackpot-sel', '奖池设置')),
        new HtmlWebpackPlugin(getHtmlConfig('jackpots/jackpot-add', '抽奖编辑')),
        new HtmlWebpackPlugin(getHtmlConfig('guess/guess-sel', '活动竞猜')),
        new HtmlWebpackPlugin(getHtmlConfig('guess/guess-add', '竞猜添加')),
        new HtmlWebpackPlugin(getHtmlConfig('greenbean/greenbean-sel', '绿豆管理')),
        new HtmlWebpackPlugin(getHtmlConfig('greenbean/greenbean-add', '申请绿豆')),
        new HtmlWebpackPlugin(getHtmlConfig('seller/seller-sel', '商家配置')),
        new HtmlWebpackPlugin(getHtmlConfig('order/order-sel', '商家订单')),
        new HtmlWebpackPlugin(getHtmlConfig('order/usersorder-sel', '用户订单')),
        new HtmlWebpackPlugin(getHtmlConfig('card/card-sel', '卡券管理')),
        new HtmlWebpackPlugin(getHtmlConfig('card/card-add', '新增卡券')),
        new HtmlWebpackPlugin(getHtmlConfig('selection/selection-sel', '评选活动')),
        new HtmlWebpackPlugin(getHtmlConfig('selection/selection-add', '添加评选')),
        new HtmlWebpackPlugin(getHtmlConfig('selection/selection-review', '内容审核')),
        new HtmlWebpackPlugin(getHtmlConfig('adsense/adsense-add', '添加广告')),
        new HtmlWebpackPlugin(getHtmlConfig('adsense/adsense-sel', '广告位设置')),
        new HtmlWebpackPlugin(getHtmlConfig('role/role-sel', '角色管理')),
        new HtmlWebpackPlugin(getHtmlConfig('role/role-bind', '角色绑定'))


    ]
};
if ('dev' === WEBPACK_ENV) {

    config.entry.common.push('webpack-dev-server/client?http://localhost:8890/');
}
module.exports = config;