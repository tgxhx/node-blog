var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var supervisor = require("gulp-supervisor");

gulp.task("node", function () {
    supervisor("index.js");
});


gulp.task('server', ["node"], function () {
    var files = [
        'views/**/*.html',
        'views/**/*.ejs',
        'views/**/*.jade',
        'public/**/*.*'
    ];

    //gulp.run(["node"]);
    browserSync.init(files, {
        proxy: 'http://localhost:3000',
        browser: 'chrome',
        notify: false,
        port: 4000 //这个是browserSync对http://localhost:3000实现的代理端口
    });

    gulp.watch(files).on("change", reload);
});