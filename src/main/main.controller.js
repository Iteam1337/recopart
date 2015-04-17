(function () {
  'use strict';
  angular
    .module('recopart')
    .controller('Main', Main);

  // add dependencies here
  Main.$inject = [
    '$scope',
    '$log',
    'main'
  ];

  /**
   * @namespace Main
   * @desc Describe what Main does!
   * @memberOf Controllers
   */
  function Main($scope, $log, main) {
    var vm = this; // our view model
    // add properties here, ex: vm.accounts = [];
    vm.name = 'RecoPart';
    vm.deviceready = false;

    vm.allNumbers = [1,2,3];

    vm.addNumber = addNumber;

    // add methods to controller here, ex: vm.updateAccounts = updateAccounts;

    function activate() {
      // put init code here
      $scope.$on('deviceready', onDeviceready);
      $scope.$watch('vm.allNumbers', onAllNumbersChange);
    }

    function addNumber() {
      vm.allNumbers.push(vm.allNumbers.length+1);
    }
    
    function onAllNumbersChange() {
      vm.oddNumbers = main.oddNumbers(vm.allNumbers);
    }

    // add functions here, ex:
    function onDeviceready() {
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