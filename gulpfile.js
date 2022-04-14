const gulp = require('gulp'),
  gulpif = require('gulp-if'),
  minimist = require('minimist'),
  browserSync = require('browser-sync').create(),
  sass = require('gulp-sass')(require('sass')),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  del = require('del'),
  critical = require('critical');

const knownOptions = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'production'
  }
};

const options = minimist(process.argv.slice(2), knownOptions);

function styles() {
  return gulp.src('sass/**/*.+(sass|scss)')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(
      gulpif(options.env === 'production', cleanCSS({
        level: 2
      }))
    )
    .pipe(gulp.dest('dist'));
}

function watch() {
  browserSync.init({
    server: "./",
    host: "192.168.1.2", // can't detect proper IP now like it used to
    files: "",
    notify: false,
    index: "noCriticalCSS.html"
  })

  gulp.watch(['sass/**/*.+(sass|scss)'], styles);
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
    target: {
      html: 'index.html',
    },
    width: 1300,
    height: 900,
  });
}


gulp.task('watch', watch);
gulp.task('del', clean);
gulp.task('sass', styles);
gulp.task('build', gulp.series('del', gulp.parallel(scripts, styles), criticalCSS));