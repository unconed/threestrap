var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var karma = require('gulp-karma');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');

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
  'src/api.js',
  'src/bootstrap.js',
  'src/plugin.js',
  'src/aliases.js',
  'src/core/fallback.js',
  'src/core/renderer.js',
  'src/core/bind.js',
  'src/core/size.js',
  'src/core/fill.js',
  'src/core/loop.js',
  'src/core/time.js',
  'src/core/scene.js',
  'src/core/camera.js',
  'src/core/render.js',
  'src/core/warmup.js',
];

var extra = [
  'vendor/stats.min.js',
  'vendor/controls/*.js',
  'src/extra/stats.js',
  'src/extra/controls.js',
  'src/extra/cursor.js',
  'src/extra/fullscreen.js',
  'src/extra/vr.js',
  'src/extra/ui.js',
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
      action: 'single',
    }));
});

gulp.task('watch-karma', function() {
  return gulp.src(test)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'watch',
    }));
});

gulp.task('watch-build', function () {
  gulp.src(bundle)
    .pipe(
      watch(function(files) {
        return gulp.start('build');
      })
    );
});

// Main tasks

gulp.task('build', function (callback) {
  runSequence(['core', 'extra', 'bundle'], callback);
})

gulp.task('default', function (callback) {
  runSequence('build', 'uglify', callback);
});

gulp.task('test', function (callback) {
  runSequence('build', 'karma', callback);
});

gulp.task('watch', function (callback) {
  runSequence('watch-build', 'watch-karma', callback);
});
