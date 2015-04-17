(function () {
  'use strict';

  var deviceready = false;
  var rootScope;

  function emitReady() {
    rootScope.$broadcast('deviceready');
  }

  document.addEventListener('deviceready', function ($rootScope) {
    deviceready = true;
    if(rootScope) {
      $rootScope.deviceready = true;
      emitReady();
    }
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
    rootScope = $rootScope;
    rootScope.deviceready = deviceready;
    if(deviceready) {
      emitReady();
    }
  }
})();