'use strict';

describe('Directive: favoriteState', function () {

  // load the directive's module
  beforeEach(module('phonebookApp'));

  var element,
    scope,
    Favorite,
    deferred,
    compile;

  beforeEach(inject(function ($rootScope, $q, $compile, _Favorite_) {
    scope = $rootScope.$new();
    Favorite = _Favorite_;
    compile = $compile;
    deferred = $q.defer();

    // may need to be split into its own beforeEach eventually
  	spyOn(Favorite, 'query').and.returnValue({ $promise: deferred.promise });
  	scope.contacts = [{ id: 1 },{ id: 3 }];
  	element = compile('<ul><li ng-repeat="contact in contacts" favorite-state contact="contact"><button></button></li></ul>')(scope);
  	deferred.resolve([{contact:{id:1}}]);
  	scope.$digest();
  }));

  it('should only make one call to Favorite', function() {
  	expect(Favorite.query.calls.count()).toBe(1);
  });

  it('should disable the button for the contact if their id is returned', function() {
  	expect(element.children().eq(0).find('button').attr('disabled')).toBe('disabled');
  	expect(element.children().eq(1).find('button').attr('disabled')).not.toBe('disabled');
  });
});
