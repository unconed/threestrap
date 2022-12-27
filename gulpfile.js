const gulp = require("gulp");
const karma = require("karma");

const parseConfig = karma.config.parseConfig;
const KarmaServer = karma.Server;

const source = ["src/**/*.js"];

const test = source.concat(["test/**/*.spec.js"]);

gulp.task("karma", function (done) {
  parseConfig(
    __dirname + "/karma.conf.js",
    { files: test, singleRun: true },
    { promiseConfig: true, throwErrors: true }
  ).then(
    (karmaConfig) => {
      new KarmaServer(karmaConfig, done).start();
      done();
    },
    (_rejectReason) => {}
  );
});

gulp.task("watch-karma", function () {
  return gulp.src(test).pipe(
    karma({
      configFile: "karma.conf.js",
      action: "watch",
    })
  );
});
