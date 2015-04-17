describe('main', function () {

    var $rootScope, main;

    beforeEach(module('recopart', function ($provide) {
        // add mocks here, ex: $provide.value('app.services.foo', foo);
    }));
    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get('$rootScope');

        main = $injector.get('main');
    }));
    it('can create the service', function () {
        expect(main).to.be.an('object');
    });
    it('can filter odd numbers', function () {
        var arr = [1,2,3,4,5,6,7,8,9];
        var result = main.oddNumbers(arr);

        expect(result).to.eql([1,3,5,7,9]);
    });
});