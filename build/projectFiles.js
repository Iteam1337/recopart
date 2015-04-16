var mbf = require('main-bower-files'),
  globby = require('globby'),
  path = require('path'),
  _ = require('lodash');

function bowerDependencies(includeDev) {
  return mbf(['**/*.js', '!**/mocha/*', '!**/chai/*', '!**/sinon*/**'], {includeDev:includeDev})
    .map(function (filePath) {
      return path.relative(process.cwd(), filePath).replace(/\\/g, '/');
    });
}

function getAll(options) {
  var opts = _.omit(options, ['includeDev', 'code', 'tests']);
  opts.dependencies = bowerDependencies(options.includeDev);
  opts.code = globby.sync(options.code);
  if(options.tests) {
    opts.tests = globby.sync(options.tests);
  }
  return opts;
}

getAll.bowerDependencies = bowerDependencies;

module.exports = getAll;