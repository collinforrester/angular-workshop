'use strict';

describe('Directive: favoriteState', function () {

  // load the directive's module
  beforeEach(module('phonebookApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<favorite-state></favorite-state>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the favoriteState directive');
  }));
});
