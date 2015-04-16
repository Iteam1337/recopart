var gulp = require('gulp'),
  tasks = require('./build');

tasks.build.assets('assets');
tasks.build.html('html');
tasks.build.clean('clean');
tasks.build.concat('concat');
tasks.build.less('less');   // <-- disable this and...
//tasks.build.sass('sass'); // <-- enable this to use sass instead
tasks.build.templatecache('templatecache');
//tasks.build.manifest('manifest'); // <-- enable this to use an appcache manifest
tasks.build.build('build');
//tasks.build.build('livebuild', 'platforms/*/www');
tasks.build.serve('serve');

tasks.test.lint('lint');
tasks.test.mocha('mocha');
tasks.test.karma('karma');

gulp.task('watch', function () {
  tasks.watch();
});


gulp.task('default', require('gulp-task-listing'));