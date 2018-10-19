const gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  pump = require('pump'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  del = require('del');

gulp.task('build', ['del', 'scripts'], (cb) => {
  pump([
      gulp.src('sass/**/*.+(sass|scss)'),
      sass(),
      autoprefixer({
        browsers: ['> 0.1%'],
        cascade: false
      }),
      cleanCSS({
        level: 2
      }),
      gulp.dest('dist')
    ],
    cb
  );
});

gulp.task('sass', (cb) => {
  pump([
      gulp.src('sass/**/*.+(sass|scss)'),
      sass(),
      autoprefixer({
        browsers: ['> 0.1%'],
        cascade: false
      }),
      cleanCSS({
        level: 2
      }),
      gulp.dest('dist'),
      browserSync.stream()
    ],
    cb
  );
});

gulp.task('browser-sync', () =>
  browserSync.init({
    server: "./",
    files: "",
    notify: false
  })
);

gulp.task('watch', ['browser-sync', 'sass'], () => {
  gulp.watch(['sass/**/*.+(sass|scss)'], ['sass']);
  gulp.watch(['js/**/*.js'], ['scripts']);
  gulp.watch(['*.html']).on('change', browserSync.reload);
});

gulp.task('scripts', (cb) => {
  pump([
      gulp.src(['js/main.js', 'js/*.js']),
      concat('all.min.js'),
      babel({
        presets: ['@babel/env']
      }),
      uglify(),
      gulp.dest('dist')
    ],
    cb
  );
});

gulp.task('del', () => del.sync(['dist']));
