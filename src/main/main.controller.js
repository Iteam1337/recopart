(function () {
  'use strict';
  angular
    .module('recopart')
    .controller('Main', Main);

  // add dependencies here
  Main.$inject = [
    '$scope',
    '$log'
  ];

  /**
   * @namespace Main
   * @desc Describe what Main does!
   * @memberOf Controllers
   */
  function Main($scope, $log) {
    var vm = this; // our view model
    // add properties here, ex: vm.accounts = [];
    vm.name = 'RecoPart';
    vm.deviceready = false;

    // add methods to controller here, ex: vm.updateAccounts = updateAccounts;

    function activate() {
      // put init code here
      $scope.$on('deviceready', onDeviceready);
    }

    // add functions here, ex:
    function onDeviceready() {
      console.log('onDeviceready');
      vm.deviceready = true;
      $scope.$apply();
    }

    function destroy() {
      // put clean-up code here
    }

    $scope.$on('$destroy', destroy);
    activate();
  }
})();