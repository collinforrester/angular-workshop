'use strict';

describe('Service: errorInterceptor', function () {

  // load the service's module
  beforeEach(module('phonebookApp'));

  // instantiate service
  var errorInterceptor, Notification;
  beforeEach(inject(function (_errorInterceptor_, _Notification_) {
    errorInterceptor = _errorInterceptor_;
    Notification = _Notification_;
  }));

  it('should show a formatted error on responseError', function () {
    spyOn(Notification, 'push');
    var rejection = {
      status: 400,
      data: {
        message: 'No username provided'
      }
    };
    errorInterceptor.responseError(rejection);
    expect(Notification.push).toHaveBeenCalledWith({
      message: 'There was a problem with your request: ' + rejection.data.message + ' (' + rejection.status + ')',
      type: 'error'
    });
  });

});
