var concat = require('gulp-concat');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');
var express = require('express');
const babel = require('gulp-babel');

var cssDestination = 'assets/css';
var imgDestination = 'assets/img';
var jsDestination = 'assets/js';
var fontDestination = 'assets/fonts';
const serverDestination = 'dist/server';
const sharedDestination = 'dist/src';

// Serve up app.
gulp.task('serve', function() {
  var app = express();

  // app.get('/', function (req, res) {
  //   res.send('Hello World!');
  // });
  app.use('/', express.static('assets'));
  app.get('/*', (req, res) => res.sendFile(`${process.cwd()}/assets/index.html`));

  app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
  });
});

gulp.task('compile-shared', ['clean-shared'], () => {
  return gulp.src('src/js/**/*').pipe(babel()).pipe(gulp.dest('dist/src/js'));
});

gulp.task('compile-server', ['clean-server'], () => {
  return gulp.src('server/**/*.js').pipe(babel()).pipe(gulp.dest('dist/server'));
});

gulp.task('clean-css', () => del(`${cssDestination}/**/*`));
gulp.task('clean-js', () => del(`${jsDestination}/**/*`));
gulp.task('clean-img', () => del(`${imgDestination}/**/*`));
gulp.task('clean-fonts', () => del(`${fontDestination}/**/*`));
gulp.task('clean-server', () => del(`${serverDestination}/**/*`));
gulp.task('clean-shared', () => del(`${sharedDestination}/**/*`));

var tasks = ['css', 'img', 'wpreact', 'fonts', 'compile-shared', 'compile-server'];

// Watch and rebuild JavaScript and Stylesheets.
gulp.task('dist', tasks);

gulp.task('default', tasks.concat('serve'), function() {
  console.log('Watching development files...'); // eslint-disable-line no-console
  gulp.watch(['src/css/**/*'], ['css']);
  gulp.watch(['src/img/**/*'], ['img']);
  gulp.watch(['src/js/**/*'], ['wpreact', 'compile-shared']);
  gulp.watch(['server/**/*'], ['compile-server']);
});

// Build Stylesheets.
gulp.task('css', ['clean-css'], function() {
  return gulp.src([
    'node_modules/font-awesome/css/font-awesome.min.css',
    'src/css/app.scss'
  ])
  .pipe(sass({
    errLogToConsole: false,
    onError: function(err) {
      gutil.log(err);
      gutil.beep();
    }
  }))
  .pipe(concat('all.css'))
  .pipe(gulp.dest(cssDestination));
});

// Copy images
gulp.task('img', ['clean-img'], function() {
  return gulp.src([
    'src/img/**'
  ])
  .pipe(gulp.dest(imgDestination));
});

// Build fonts.
gulp.task('fonts', ['clean-fonts'], function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest(fontDestination));
});

// Build Webpack React files.
gulp.task('wpreact', ['css', 'clean-js'], function() {
  return gulp.src([])
    .pipe(webpack( require('./webpack.react.js') ))
    .pipe(gulp.dest(jsDestination));
});
