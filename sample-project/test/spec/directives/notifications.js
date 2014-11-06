'use strict';

describe('Directive: notifications', function () {

  // load the directive's module
  beforeEach(module('phonebookApp'));

  var element,
    scope,
    Notification;

  beforeEach(inject(function ($rootScope, _Notification_) {
    scope = $rootScope.$new();
    Notification = _Notification_;
  }));

  it('should show alert for each message', inject(function ($compile) {
    element = angular.element('<notifications></notifications>');
    element = $compile(element)(scope);
    Notification.push('Hey');
    Notification.push('You');
    Notification.push('Guys');
    scope.$digest();
    expect(element.children().eq(0).children().length).toBe(3);
  }));
});
