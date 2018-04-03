var gulp = require('gulp');
var $ = require('gulp-load-plugins')();//用require引入gulp模块
var open = require('open');
var autoprefixer = require('gulp-autoprefixer');

var app = {
	srcPath: 'src/',				//设置放置源代码的文件夹目录
	// devPath: 'build/',				//设置放置可编辑可开发的文件目录
	prdPath: 'dist/'				//设置放置最终发布版本
};

gulp.task('lib',function(){
	gulp.src(app.srcPath+'lib/*')
	// .pipe(gulp.dest(app.devPath + 'vendor'))
	.pipe(gulp.dest(app.prdPath + 'lib'))
	.pipe($.connect.reload())
})//指定gulp一个‘lib’任务将bower1里面的第三方JS复制写入可开发和最终版本里面

gulp.task('html',function(){
	gulp.src(app.srcPath+'**/*.html')
	// .pipe(gulp.dest(app.devPath))
	.pipe(gulp.dest(app.prdPath))
	.pipe($.connect.reload())
})//指定gulp一个‘lib’任务将src里面的html写入
// gulp.task('json',function(){
// 	gulp.src(app.srcPath +'data/**/*.json')
// 	.pipe(gulp.dest(app.devPath + 'data'))
// 	.pipe(gulp.dest(app.prdPath + 'data'))
// 	.pipe($.connect.reload())
// })//指定gulp一个‘lib’任务将data里面的json数据写入

gulp.task('css',function(){
	gulp.src(app.srcPath +'css/*.css')
	// .pipe(gulp.dest(app.devPath + 'css'))
	.pipe(autoprefixer({
             browsers: ['last 2 versions'],
            cascade: false
        }))
	.pipe($.cssmin())
	.pipe(gulp.dest(app.prdPath + 'css'))
	.pipe($.connect.reload())
})
gulp.task('less',function(){
	gulp.src(app.srcPath +'css/*.less')
	.pipe($.less())
	.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
	.pipe(gulp.dest(app.prdPath + 'css'))
	.pipe($.connect.reload())
})

gulp.task('js',function(){
	gulp.src(app.srcPath +'js/*.js')
	// .pipe(gulp.dest(app.devPath + 'js'))
	
	.pipe(gulp.dest(app.prdPath + 'js'))
	.pipe($.connect.reload())
})

gulp.task('image',function(){
	gulp.src(app.srcPath +'image/**/*')
	// .pipe(gulp.dest(app.devPath + 'image'))
	//.pipe($.imagemin())
	.pipe(gulp.dest(app.prdPath + 'image'))
	.pipe($.connect.reload())
})


gulp.task('build',['lib','html','css','less','js','image'])


gulp.task('clean',function(){
	gulp.src([app.prdPath])
	.pipe($.clean())
})

gulp.task('server',['build'],function(){
	$.connect.server({
		root:[app.prdPath],
		livereload:true,
		port:9003
	});
	open('http://localhost:9003');

	gulp.watch(app.srcPath + 'js/*.js',['js'])
	gulp.watch(app.srcPath + 'lib/*',['lib'])
	// gulp.watch('bower_components/**/*.js',['lib'])
	gulp.watch(app.srcPath + '**/*.html',['html'])
	// gulp.watch(app.srcPath + 'data/**/*.json',['json'])
	gulp.watch(app.srcPath + 'css/*.css',['css'])
	gulp.watch(app.srcPath + 'css/*.less',['less'])
	gulp.watch(app.srcPath + 'image/**/*',['image'])
})

gulp.task('default',['server'])