'use strict';

const $            = require('gulp-load-plugins')();
const gulp         = require('gulp');

const babelify     = require('babelify');
const browserify   = require('browserify');
const watchify     = require('watchify');
const buffer       = require('vinyl-buffer');
const source       = require('vinyl-source-stream');

// File paths
const paths = {
  src: 'src/',
  dist: 'lib/',
  test: 'test/'
};

/*
 * Deletes processed files.
 */
gulp.task('clean', function() {
  return gulp.src(paths.dist, {read: false})
    .pipe($.plumber())
    .pipe($.clean());
});

/*
 * Lint source and test files.
 */
gulp.task('lint', function() {
  return gulp.watch([paths.src + '/**/*.js', paths.test + '/**/*.js'])
    .on('change', function(file) {
      gulp.src(file.path)
        .pipe($.plumber())
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.eslint.failAfterError());
    });
});

/*
 * Transpiles JS file for Node.
 */
function buildNode(file, watch) {
  if (watch) {
    return gulp.watch(paths.src + file + '.js')
      .on('change', function(file) {
        $.util.log('Copying to lib...');
        gulp.src(file.path)
          .pipe($.plumber())
          .pipe($.babel())
          .pipe(gulp.dest(paths.dist));
      });
  } else {
    return gulp.src(paths.src + file + '.js')
      .pipe($.plumber())
      .pipe($.babel())
      .pipe(gulp.dest(paths.dist));
  }
}

/*
 * Transpiles and uglifies JS file for browser.
 */
function buildBrowser(file, watch) {
  const props = {
    entries: [paths.src + file + '.js'],
    debug : true,
    cache: {},
    packageCache: {},
    standalone: 'swapi'
  };

  const bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    let stream = bundler.transform('babelify')
      .bundle();
    return stream
      .pipe($.plumber())
      .on('error', (err) => { $.notify().write(err); })
      .pipe(source(file + '.browser.js'))
      .pipe(buffer())
      .pipe($.uglify())
      .pipe(gulp.dest(paths.dist));
  }

  bundler.on('update', function() {
    rebundle();
    $.util.log('Rebundle...');
  });

  return rebundle();
}

/*
 * Build scripts.
 */
gulp.task('build', ['clean', 'lint'], function() {
  buildNode('swapi', false);
  buildBrowser('swapi', false);
});

/*
 * Build first, and watch for future changes.
 */
gulp.task('default', ['build'], function() {
  buildNode('swapi', true);
  buildBrowser('swapi', true);
});