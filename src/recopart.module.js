(function () {
  'use strict';

  var deviceready = false;
  var rootScope;

  function emitReady() {
    console.log('emitready');
    rootScope.$broadcast('deviceready');
  }

  document.addEventListener('deviceready', function ($rootScope) {
    console.log('deviceready');
    deviceready = true;
    if(rootScope) { $rootScope.deviceready = true; emitReady(); }
  }, false);

  

  angular.module('recopart', [])
    .config(config)
    .run(run);

  config.$inject = [
    // provider dependencies
  ];

  run.$inject = [
    '$rootScope'
  ];

  function config() {

  }

  function run($rootScope) {
    console.log('run');
    rootScope = $rootScope;
    rootScope.deviceready = deviceready;
    if(deviceready) {
      emitReady();
    }
  }
})();