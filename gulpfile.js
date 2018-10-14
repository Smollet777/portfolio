const gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  pump = require('pump'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  del = require('del');

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('sass', (cb) => {
  pump([
      gulp.src('/sass/**/*.+(sass|scss)'),
      sass(),
      autoprefixer({
        browsers: AUTOPREFIXER_BROWSERS
      }),
      gulp.dest('/css'),
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

gulp.task('watch', ['browser-sync', 'sass', 'build'], () => {
  gulp.watch(['/sass/**/*.+(sass|scss)'], ['sass']);
  gulp.watch(['*.html', '/js/**/*.js']).on('change', browserSync.reload);
});

gulp.task('scripts', (cb) => {
  pump([
      gulp.src(['/js/main.js', '/js/*.js']),
      concat('all.min.js'),
      babel({
        presets: ['@babel/env']
      }),
      uglify(),
      gulp.dest('/dist/')
    ],
    cb
  );
});

gulp.task('del', () => del.sync(['/dist']));

gulp.task('build', ['del', 'scripts'], (cb) => {
  pump([
      gulp.src('/sass/**/*.+(sass|scss)'),
      sass({
        outputStyle: 'compressed'
      }),
      autoprefixer(),
      gulp.dest('/dist')
    ],
    cb
  );
});