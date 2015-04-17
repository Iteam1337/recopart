(function () {
  'use strict';
  angular
    .module('recopart')
    .factory('main', main);

  // add dependencies here
  main.$inject = [
    '$log'
  ];

  /**
   * @namespace main
   * @desc Describe what main does!
   * @memberOf Services
   */
  function main($log) {
    var service = {
      // add properties here, ex: accounts: []

      // add methods here, ex: updateAccounts: updateAccounts
      oddNumbers: oddNumbers
    };

    return service;
    ///////////////////

    // add functions here, ex: function updateAccounts() {}
    function oddNumbers(arr) {
      return arr.filter(function (num) { return num%2; });
    }
  }
})();