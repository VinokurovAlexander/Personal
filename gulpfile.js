'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemap = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const del = require('del');
const server = require('browser-sync').create();
const rename = require('gulp-rename');
const svgstore = require('gulp-svgstore');

gulp.task('css', () => {
  return gulp.src('src/scss/style.scss')
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});
gulp.task('del-build', () => {
  return del('build');
});
gulp.task('server', () => {
  server.init ({
    server: 'build/',
    ui: false,
    notify: false
  });
  gulp.watch('src/js/**/*.js', gulp.series('copy', 'refresh'));
  gulp.watch('src/img/**/*.{jpg,png,svg}', gulp.series('copy', 'refresh'));
  gulp.watch('src/scss/**/*.{scss,sass}', gulp.series('css', 'refresh'));
  gulp.watch('src/*.html', gulp.series('copy', 'refresh'));
});
gulp.task ('refresh', function (done) {
  server.reload();
  done();
});
gulp.task('copy', () => {
  return gulp.src([
    'src/libs/**',
    'src/fonts/**/**',
    'src/img/**',
    'src/js/**',
    'src/*.html'
  ], {
    base: 'src'
  })
    .pipe(gulp.dest('build'));
});

gulp.task("sprite", function() {
  return gulp.src([
    "src/img/*.svg",
  ])
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});


gulp.task('build', gulp.series('del-build', 'copy', 'css'));
gulp.task('start', gulp.series('build', 'server'));
