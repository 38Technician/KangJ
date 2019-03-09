const gulp = require('gulp'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin')
	uglify = require('gulp-uglify'),
	babel = require("gulp-babel");
	
gulp.task('js',function(){
	gulp.src('./src/js/*.js')
	.pipe(babel())
	.pipe(uglify())
	.pipe(rename({'suffix' : '.min'}))
	.pipe(gulp.dest('./dist/js'));
});
gulp.task('sass',function(){
	gulp.src('./src/sass/*.scss')
	.pipe(sass())
	.pipe(rename({'suffix' : '.min'}))
	.pipe(gulp.dest('./dist/css'));
});
gulp.task('img',function(){
	gulp.src('./src/img/*.{jpg,png,gif,ico}')
	.pipe(imagemin())
	.pipe(gulp.dest('./dist/imgmin'))
})
gulp.task('default',function(){
	gulp.watch(['./src/sass/*.scss','./src/img/*.jpg','./src/js/*.js'],['sass','img','js']);
})