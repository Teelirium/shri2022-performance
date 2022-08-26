var gulp = require('gulp'),
cleanCSS = require('gulp-clean-css'),
terser = require('gulp-terser'),
htmlMin = require('gulp-htmlmin'),
inlineSource = require('gulp-inline-source');

function stuff() {
    gulp.src('./src/styles.css')
    .pipe(cleanCSS())
    //.pipe(gulp.dest('.'));

    gulp.src('./src/scripts.js')
    .pipe(terser())
    //.pipe(gulp.dest('.'));

    gulp.src('./src/index.html')
    .pipe(inlineSource())
    .pipe(htmlMin({
        collapseWhitespace: true
    }))
    .pipe(gulp.dest('.'));
}

exports.default = gulp.task('default', stuff);