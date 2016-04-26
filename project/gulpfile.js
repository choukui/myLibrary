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
var sass = require('gulp-sass');

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
		.pipe(sass())
		.pipe(gulp.dest('css/style'))
		.pipe(gulp_postcss(processors))
		.pipe(concat('main.css'))
		.on('error', errorHandler)
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream())
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
		'js/*.js'
	], ['build:css']);
});
gulp.task('default', ['watch','browser-sync']);
function errorHandler(error){
	this.emit('end');
}
