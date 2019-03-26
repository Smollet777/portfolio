const gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  del = require('del'),
  critical = require('critical');

function styles() {
  return gulp.src('sass/**/*.+(sass|scss)')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 0.1%'],
      cascade: false
    }))
    .pipe(gulp.dest('dist'))
}

function css() {
  return gulp.src('sass/**/*.+(sass|scss)')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 0.1%'],
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(gulp.dest('dist'));
}

function watch() {
  browserSync.init({
    server: "./",
    files: "",
    notify: false,
    index: "noCriticalCSS.html"
  })

  gulp.watch(['sass/**/*.+(sass|scss)'], css);
  gulp.watch(['js/**/*.js'], scripts);
  gulp.watch(['*.html']).on('change', browserSync.reload);
}

function scripts() {
  return gulp.src(['js/main.js', 'js/*.js'])
    .pipe(concat('all.min.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify({
      toplevel: true
    }))
    .pipe(gulp.dest('dist'))
}

function clean() {
  return del(['dist'])
}

function criticalCSS() {
  return critical.generate({
    inline: true,
    css: ['dist/main.css'],
    src: 'noCriticalCSS.html',
    dest: 'index.html',
    minify: true,
    width: 1300,
    height: 900,
  });
}


gulp.task('watch', watch);
gulp.task('del', clean);
gulp.task('sass', styles);
gulp.task('build', gulp.series('del', gulp.parallel(scripts, css), criticalCSS));