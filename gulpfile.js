var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify-css'),
    notify = require('gulp-notify');

gulp.task('sass', function () {
  return gulp.src('public/stylesheets/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('watch', function () {
  gulp.watch('public/stylesheets/*.sass', ['sass']);
});

gulp.task('default', [
  'sass'
]);
