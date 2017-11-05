var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var supervisor = require("gulp-supervisor");

var uglify = require('gulp-uglify') // 压缩js
var csso = require('gulp-csso') //压缩css
var autoprefixer = require('gulp-autoprefixer') // 自动添加浏览器前缀
var scss = require('gulp-sass') // 编译scss
var imagemin = require('gulp-imagemin') // 压缩图片
var rename = require('gulp-rename') // 重命名
var notify = require('gulp-notify') // 通知
var ejs = require('gulp-ejs')
var gutil = require('gulp-util')

gulp.task("node", function () {
    supervisor("index.js");
});

//scss函数
var scssSrc = 'src/scss/*.scss'
var cssSrc = 'src/css/*.css'
var jsSrc = 'src/js/*.js'
var imgSrc = 'src/images/*'
var ejsSrc = 'src/**/*.ejs'
var staticSrc = ['src/js/**/*.*', 'src/fonts/**/*.*']

gulp.task('server', ["node"], function () {
    var files = [
        'views2/**/*.ejs',
        'public2/**/*.*'
    ];

    //gulp.run(["node"]);
    browserSync.init(files, {
        proxy: 'http://localhost:3000',
        browser: 'chrome',
        notify: false,
        port: 4000 //这个是browserSync对http://localhost:3000实现的代理端口
    });

    //监听css
    gulp.watch(cssSrc, ['css'])
    //监听scss
    gulp.watch(scssSrc, ['scss'])
    //监听js
    gulp.watch(jsSrc, ['js'])
    //监听图片
    gulp.watch(imgSrc, ['images'])
    //监听复制html
    gulp.watch(ejsSrc, ['copy-ejs'])
});

// 压缩css任务
gulp.task('css', function () {
    return gulp.src('src/css/*.css')
        .pipe(gulp.dest('public2/css'))
        .pipe(reload({
            stream: true
        }))
})

//scss error
function swallowError(error) {
    // If you want details of the error in the console
    console.error(error.toString())
    this.emit('end')
}

//编译scss
gulp.task('scss', function () {
    gulp.src(scssSrc)
        //使用scss函数插件
        .pipe(scss())
        .on('error', swallowError)
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('src/css/'))
        .pipe(csso())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('src/css/'))
})

//压缩js任务
gulp.task('js', function () {
    gulp.src(jsSrc)
        .pipe(gulp.dest('public2/js/'))
        .pipe(reload({
            stream: true
        }))
})

//压缩图片任务
gulp.task('images', function () {
    gulp.src(imgSrc)
        .pipe(gulp.dest('public2/images/'))
        .pipe(reload({
            stream: true
        }))
})

// 复制ejs到node views2任务
gulp.task('copy-ejs', function () {
    gulp.src(ejsSrc, {base: './src'})
        .pipe(gulp.dest('views2'))
})

//复制静态文件
gulp.task('copy-static', function () {
    gulp.src(staticSrc, {base: './src'})
        .pipe(gulp.dest('public2'))
})

gulp.task('default', function () {
    gulp.start('scss', 'css', 'js', 'images', 'copy-ejs', 'server')
}) 