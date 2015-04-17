describe('main/main.controller', function () {

  var $rootScope, $scope, vm, main;

  beforeEach(module('recopart'));
  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    main = {
      oddNumbers: sinon.stub().returns([1,3])
    };

    var $controller = $injector.get('$controller');
    vm = $controller('Main', {
      '$scope': $scope,
      'main': main
      // put mocks here
    });
    $scope.$digest();
  }));
  it('can create the controller', function () {
    expect(vm).to.exist;
  });
  it('sets the correct default values', function () {
    expect(vm.allNumbers).to.eql([1,2,3]);
  });
  it('calls main.oddNumbers to set vm.allNumbers', function () {
    expect(main.oddNumbers).calledOnce.calledWith([1,2,3]);
  });
  describe('#addNumber', function () {
    it('pushes a new, consecutive number to vm.allNumbers', function () {
      vm.addNumber();
      expect(vm.allNumbers).to.eql([1,2,3,4]);
      vm.addNumber();
      expect(vm.allNumbers).to.eql([1,2,3,4,5]);
    });
    it('updates vm.oddNumbers when vm.allNumbers change', function () {
      vm.addNumber();
      expect(main.oddNumbers).calledWith([1,2,3,4]);
      vm.addNumber();
      expect(main.oddNumbers).calledWith([1,2,3,4,5]);
    });
  });
});