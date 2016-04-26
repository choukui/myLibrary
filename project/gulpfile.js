/**
 * Created by pc on 2016/3/8.
 */

"use strict";

var gulp         = require('gulp');
var gulp_postcss = require('gulp-postcss');
var browserSync = require('browser-sync').create();
var autoprefixer = require('autoprefixer');
var rename       = require('gulp-rename');
var csswring     = require('csswring');
var concat       = require('gulp-concat');
var px2rem       = require("postcss-px2rem");
var sass         = require('gulp-sass');
var uglify 		  = require("gulp-uglify");
gulp.task('build:css', function(){
	var processors = [
		autoprefixer,
		px2rem({ remUnit: 72 }),
		csswring({
			preserveHacks: true,
			removeAllComments: true
		})
	];
	return gulp.src(['css/sass/*.scss','!css/sass/base.scss'])
		.pipe(sass())//编译scss
		.pipe(gulp.dest('css/style'))//编译好的sass输出到css下的style文件下
		.pipe(gulp_postcss(processors))
		.pipe(concat('main.css'))//合并为main.css
		.on('error', errorHandler)
		.pipe(rename({suffix: ".min"}))//重命名为main.min.css
		.pipe(gulp.dest('./css'))//输出在css文件里
		.pipe(browserSync.stream())//自动刷新浏览器
});

//js压缩


gulp.task('minify-js', function () {
	gulp.src('js/src/*.js') // 要压缩的js文件
		.pipe(uglify())//使用uglify进行压缩,更多配置请参考：
		.pipe(rename({suffix:".min"}))
		.pipe(gulp.dest('js/minJs')); //压缩后的路径
});
 //Static server
gulp.task('browser-sync', function() {
	var files = [
		'pages/*.html',
		'css/**/*.css',
		'js/*.js'
	];
	browserSync.init(files,{
		server: {
			baseDir: "/"//定义从那个位置启动服务器
		}
	});
});
gulp.task('watch', function () {
	gulp.watch([
		'css/sass/*.scss',
		'!css/main.min.css',
		'pages/*.html',
		'js/src/*.js'
	], ['build:css','minify-js']);
});



gulp.task('default', ['watch','browser-sync']);
function errorHandler(error){
	this.emit('end');
}
