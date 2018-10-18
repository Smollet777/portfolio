const gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  pump = require('pump'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  del = require('del');

gulp.task('sass', (cb) => {
  pump([
      gulp.src('sass/**/*.+(sass|scss)'),
      sass({
        outputStyle: 'compressed'
      }),
      autoprefixer({
        browsers: ['> 0.1%'],
        cascade: false
      }),
      gulp.dest('css'),
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
  gulp.watch(['*.html', 'js/**/*.js']).on('change', browserSync.reload);
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

gulp.task('build', ['del', 'scripts'], (cb) => {
  pump([
      gulp.src('sass/**/*.+(sass|scss)'),
      sass({
        outputStyle: 'compressed'
      }),
      autoprefixer({
        browsers: ['> 0.1%'],
        cascade: false
      }),
      gulp.dest('dist')
    ],
    cb
  );
});