var gulp = require('gulp'),
cleanCSS = require('gulp-clean-css'),
terser = require('gulp-terser'),
htmlMin = require('gulp-htmlmin');

function css() {
    gulp.src('./src/styles.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('.'));
}

function js() {
    gulp.src('./src/scripts.js')
    .pipe(terser())
    .pipe(gulp.dest('.'));
}

function html() {
    gulp.src('./src/index.html')
    .pipe(htmlMin({
        collapseWhitespace: true
    }))
    .pipe(gulp.dest('.'));
}

exports.default = gulp.parallel(css, js, html)