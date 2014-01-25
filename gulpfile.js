var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var karma = require('gulp-karma');
var runSequence = require('run-sequence');

var builds = {
  core: 'build/threestrap-core.js',
  extra: 'build/threestrap-extra.js',
  bundle: 'build/threestrap.js',
};

var products = [
  builds.core,
  builds.extra,
  builds.bundle,
];

var vendor = [
  'node_modules/lodash/dist/lodash.js',
];

var core = [
  'src/binder.js',
  'src/bootstrap.js',
  'src/plugin.js',
  'src/aliases.js',
  'src/core/renderer.js',
  'src/core/bind.js',
  'src/core/size.js',
  'src/core/fill.js',
  'src/core/loop.js',
  'src/core/time.js',
  'src/core/scene.js',
  'src/core/camera.js',
  'src/core/render.js',
];

var extra = [
  'vendor/stats.min.js',
  'vendor/controls/*.js',
  'src/extra/stats.js',
  'src/extra/controls.js',
];

var bundle = vendor.concat(core).concat(extra);

var test = [
  'vendor/three.js',
].concat(bundle).concat([
  'test/**/*.spec.js',
]);

gulp.task('core', function () {
  return gulp.src(core)
    .pipe(concat(builds.core))
    .pipe(gulp.dest(''));
});

gulp.task('extra', function () {
  return gulp.src(extra)
    .pipe(concat(builds.extra))
    .pipe(gulp.dest(''));
});

gulp.task('bundle', function () {
  return gulp.src(bundle)
    .pipe(concat(builds.bundle))
    .pipe(gulp.dest(''));
});

gulp.task('uglify', function () {
  return gulp.src(products)
    .pipe(uglify())
    .pipe(rename({
      ext: ".min.js"
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('karma', function() {
  return gulp.src(test)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run',
    }));
});

gulp.task('default', function (callback) {
  runSequence(['core', 'extra', 'bundle'], 'uglify', callback);
});

gulp.task('test', function (callback) {
  runSequence(['core', 'extra', 'bundle'], 'karma', callback);
});
