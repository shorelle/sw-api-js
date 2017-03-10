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
  dist: 'lib/'
};

/*
 * Deletes processed files.
 */
gulp.task('clean', () => {
  return gulp.src(paths.dist, {read: false})
    .pipe($.plumber())
    .pipe($.clean());
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
          .pipe($.babel({
              presets: ['es2015']
          }))
          .pipe(gulp.dest(paths.dist));
      });
  } else {
    return gulp.src(paths.src + file + '.js')
      .pipe($.plumber())
      .pipe($.babel({
            presets: ['es2015']
        }))
      .pipe(gulp.dest(paths.dist));
  }
}

/*
 * Transpiles and uglifies JS file for browser.
 */
function buildBrowser(file, watch) {
  var props = {
    entries: [paths.src + file + '.js'],
    debug : true,
    cache: {},
    packageCache: {},
    standalone: 'swapi'
  };

  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.transform('babelify', { 
        presets: ['es2015']
      })
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
gulp.task('build', ['clean'], function() {
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