'use strict';

describe('Service: cacheInterceptor', function () {

  // load the service's module
  beforeEach(module('phonebookApp'));

  // instantiate service
  var cacheInterceptor, cacheFactory;
  beforeEach(inject(function (_cacheInterceptor_, $cacheFactory) {
    cacheInterceptor = _cacheInterceptor_;
    cacheFactory = $cacheFactory;
    spyOn(cacheFactory, 'get').and.returnValue({
      removeAll: jasmine.createSpy()
    });
  }));

  it('clear cache factory on non get requests', function () {
    cacheInterceptor.request({method: 'POST'});
    expect(cacheFactory.get.calls.count()).toBe(1);
    expect(cacheFactory.get).toHaveBeenCalledWith('$http');
    expect(cacheFactory.get().removeAll.calls.count()).toBe(1);
  });

  it('does not clear cache factory on get requests', function () {
    cacheInterceptor.request({method: 'GET'});
    expect(cacheFactory.get.calls.count()).toBe(0);
    expect(cacheFactory.get).not.toHaveBeenCalledWith('$http');
    expect(cacheFactory.get().removeAll.calls.count()).toBe(0);
  });

});
