'use strict';

describe('Service: Favorite', function () {

  // load the service's module
  beforeEach(module('phonebookApp'));

  // instantiate service
  var Favorite, httpBackend, SERVICE_URL;
  beforeEach(inject(function (_Favorite_, _SERVICE_URL_, $httpBackend) {
    Favorite = _Favorite_;
    SERVICE_URL = _SERVICE_URL_;
    httpBackend = $httpBackend;
  }));

  it('should #query() to correct URL', function () {
    httpBackend
      .expectGET(SERVICE_URL + '/api/favorite')
      .respond([], 201);
    Favorite.query();
    httpBackend.flush();
  });

  it('should #get() to correct URL', function () {
    httpBackend
      .expectGET(SERVICE_URL + '/api/favorite/45')
      .respond({}, 201);
    Favorite.get({ id: 45 });
    httpBackend.flush();
  });

  it('should #save() to correct URL', function () {
    httpBackend
      .expectPOST(SERVICE_URL + '/api/favorite', {
        contact: 55
      })
      .respond({}, 201);
    var fav = new Favorite({contact: 55});
    fav.$save();
    httpBackend.flush();
  });

});
