var test = require('./test'),
  build = require('./build');

module.exports = {
  build: build,
  test: test,
  watch: function () {
    build.watch();
    test.watch();
  }
};