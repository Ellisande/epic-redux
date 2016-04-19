var concat = require('gulp-concat');
var connect = require('connect');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');
var express = require('express');

var cssDestination = 'assets/css';
var imgDestination = 'assets/img';
var jsDestination = 'assets/js';
var fontDestination = 'assets/fonts';

// Serve up app.
gulp.task('serve', function() {
  var app = express();

  // app.get('/', function (req, res) {
  //   res.send('Hello World!');
  // });
  app.use('/', express.static('assets'));
  app.get('/*', (req, res) => res.sendFile(`${process.cwd()}/assets/index.html`));

  app.listen(4000, function () {
    console.log('Example app listening on port 3000!');
  });
});

// Wipe out the JavaScript, Stylesheet and Web Font destinations.
gulp.task('clean', function(cb) {
  del([
    jsDestination + '/**/*',
    cssDestination + '/**/*',
    imgDestination + '/**/*',
    fontDestination + '/**/*'
  ]).then(function (/*paths*/) {
    cb();
  });
});

var tasks = ['clean', 'css', 'img', 'js', 'wpreact', 'fonts'];

// Watch and rebuild JavaScript and Stylesheets.
gulp.task('dist', tasks);

gulp.task('default', tasks.concat('serve'), function() {
  console.log('Watching development files...'); // eslint-disable-line no-console
  gulp.watch(['src/css/**/*'], ['css']);
  gulp.watch(['src/img/**/*'], ['img']);
  gulp.watch(['src/js/**/*'], ['wpreact']);
});

// Build Stylesheets.
gulp.task('css', function() {
  return gulp.src([
    'node_modules/uikit/dist/css/uikit.min.css',
    'node_modules/uikit/dist/uikit.almost-flat.min.css',
    'node_modules/uikit/dist/components/**/*.css',
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
gulp.task('img', function() {
  return gulp.src([
    'src/img/**'
  ])
  .pipe(gulp.dest(imgDestination));
});

// Build fonts.
gulp.task('fonts', function() {
  return gulp.src('node_modules/uikit/dist/fonts/**/*')
    .pipe(gulp.dest(fontDestination));
});


// Build JavaScript files.
gulp.task('js', function() {
  return gulp.src([
    'node_modules/uikit/dist/js/uikit.min.js',
    'node_modules/uikit/dist/js/components/tooltip.min.js',
    'node_modules/lodash/lodash.js'
  ])
  .pipe(concat('all.js'))
  .pipe(gulp.dest(jsDestination));
});

// // Build Webpack files.
// gulp.task('wp', function() {
//   return gulp.src([])
//     .pipe(webpack( require('./webpack.config.js') ))
//     .pipe(gulp.dest(jsDestination));
// });

// Build Webpack React files.
gulp.task('wpreact', ['css'], function() {
  return gulp.src([])
    .pipe(webpack( require('./webpack.react.js') ))
    .pipe(gulp.dest(jsDestination));
});
