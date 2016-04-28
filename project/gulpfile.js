/**
 * Created by pc on 2016/3/8.
 */

"use strict";

var gulp         = require('gulp');
var browserSync = require('browser-sync').create();
var rename       = require('gulp-rename');
var concat       = require('gulp-concat');
var px3rem       = require("gulp-px3rem");
var sass         = require('gulp-sass');
var uglify 		  = require("gulp-uglify");
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require("gulp-minify-css");


//编译sass，标记maps文件
gulp.task("sass",function(){
	return  gulp.src(['css/sass/*.scss'])
			.pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest('./css/style'))
			.pipe(concat('main.css'))
			.pipe(sourcemaps.write('./maps'))
			.pipe(gulp.dest('./css'));
});
//px转换rem
gulp.task('px3rem',["sass"],function(){
	gulp.src('css/main.css')
			.pipe(px3rem({remUnit: 72 }))//转化基值72，不写默认为75
			//.pipe(minifyCss())
			.pipe(rename('main.merge.css'))//重命名文件
			.pipe(gulp.dest('./css'))
});


//js压缩
gulp.task('minify-js', function () {
	gulp.src('js/src/*.js') // 要压缩的js文件
		.pipe(uglify())//使用uglify进行压缩,更多配置请参考：
		.pipe(rename({suffix:".min"}))
		.pipe(gulp.dest('js/minJs')); //压缩后的路径
});

//图片压缩,个人认为目前不需要压缩图片，上线之前一次性压缩比较好
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant'); //png图片压缩插件

gulp.task('imgMinify', function () {
	return gulp.src('images/src/*')
			.pipe(imagemin({
				progressive: true,
				use: [pngquant()] //使用pngquant来压缩png图片
			}))
			.pipe(gulp.dest('./images'));
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
			baseDir: "//"//定义从那个位置启动服务器
		}
	});
});
gulp.task('watch', function () {
	gulp.watch([
		'css/sass/*.scss',
		'pages/*.html',
		'js/src/*.js'
	], ['minify-js','sass','px3rem']);
});


//,'browser-sync'
gulp.task('default', ['watch','imgMinify']);
function errorHandler(error){
	this.emit('end');
}
