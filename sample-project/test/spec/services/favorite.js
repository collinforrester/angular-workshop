'use strict';

describe('Service: Favorite', function () {

  // load the service's module
  beforeEach(module('phonebookApp'));

  // instantiate service
  var Favorite;
  beforeEach(inject(function (_Favorite_) {
    Favorite = _Favorite_;
  }));

  it('should do something', function () {
    expect(!!Favorite).toBe(true);
  });

});
