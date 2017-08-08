var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var less = require('gulp-less');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var tinypng = require('gulp-tinypng-extended');
var reload = browserSync.reload;

//压缩图片
gulp.task('tinypng', function () {
    gulp.src('.src/imgs/*.{png, jpg, gif, jpeg}')
        .pipe(plumber())
        .pipe(tinypng({
            log: true
        }))
        .pire(gulp.dest('dist/imgs'));
});

//浏览器自动刷新
gulp.task('serve', ['sass'], function() {
    browserSync({
        baseDir: './dist'
    });
    gulp.watch('.dist/*.css').on('change', reload);
    gulp.watch('.src/*.js').on('change', reload);
    gulp.watch('.src/*.html').on('change', reload);
});


//编译less sass
gulp.task('less', function() {
    gulp.src('.src./less')
        .pipe(less())
        .pipe(gulp.dest('.dist/css'))
        .pipe(reload({
            stream: true
        }));
});
gulp.task('sass', function () {
    gulp.src('.src/sass/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('default', ['serve'], ['less'], ['sass'], ['tinypng']);