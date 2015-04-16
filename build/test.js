var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  mocha = require('gulp-mocha-phantomjs'),
  karma = require('gulp-karma'),
  fs = require('fs'),
  path = require('path'),
  projectFiles = require('./projectFiles'),
  serve = require('./serve');

var config = require('./config.json');

var runningServer;
var taskNames = {};
var runningTasks = {};

function _lint(name) {
  taskNames.lint = name;
  gulp.task(name, function() {
    runningTasks.lint = true;

    return gulp.src(config.js)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
  });
}

function _mocha(name) {
  taskNames.mocha = name;
  gulp.task(name, function() {
    var isWatching = process.argv.indexOf('watch') > -1;
    var livereload = (isWatching) ?
      {port: config.mochaLrPort} :
      null;
    var connect = serve({
      port: config.mochaPort,
      root: process.cwd(),
      livereload: livereload
    }, {
      '/': {
        file: path.join(__dirname, config.mochaFile),
        assets: {
          includeDev: true,
          code: config.code,
          tests: config.tests,
          livereload: livereload
        }
      }
    });

    var stream = mocha();
    stream.write({path: 'http://localhost:' + config.mochaPort + '/'});
    stream.end();

    stream.on('end', function() {
      if (!runningTasks.watching) {
        connect.serverClose();
      }
    });

    runningTasks.mocha = connect;

    return stream;
  });
}

function _karma(name) {
  taskNames.karma = name;
  var isWatching = process.argv.indexOf('watch') > -1;
  gulp.task(name, function() {
    var options = {
      frameworks: ['mocha', 'sinon-chai'],
      reporters: ['progress'],
      port: config.karmaPort,
      colors: true,
      browsers: config.karmaBrowsers,
      action: (isWatching) ? 'watch' : 'run'
    };
    runningTasks.karma = true;
    var files = projectFiles.bowerDependencies(true).concat([
      'src/**/*.module.js',
      'src/**/*.js',

      'test/**/*.js'
    ]);
    var task = gulp.src(files).pipe(karma(options));
    if(isWatching) {
      task = task.on('error', function(err) {
        // Make sure failed tests cause gulp to exit non-zero 
        throw err;
      });
    }

    return task;
  });
}

function _watch() {
  if(runningTasks.watching) { return; }

  runningTasks.watching = true;
  if(runningTasks.lint) { gulp.watch(config.js, [taskNames.lint]); }
  if(runningTasks.mocha) {
    gulp.watch(config.code.concat(config.tests), [taskNames.mocha])
      .on('change', function (evt) {
        gulp.src(evt.path).pipe(runningTasks.mocha.reload());
      });
  }
}

module.exports = {
  lint: _lint,
  mocha: _mocha,
  karma: _karma,
  watch: _watch
};