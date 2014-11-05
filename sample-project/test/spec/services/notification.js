'use strict';

describe('Service: Notification', function () {

  // load the service's module
  beforeEach(module('phonebookApp'));

  // instantiate service
  var Notification, interval;
  beforeEach(inject(function (_Notification_, $interval) {
    Notification = _Notification_;
    interval = $interval;
  }));

  describe('#pop() function', function() {
    it('should close by id', function() {
      Notification.push('Cats'); // id 1
      Notification.push('Dogs'); // id 2
      Notification.push('Birds'); // id 3
      var promise = Notification.current[1].promise;
      spyOn(interval, 'cancel');
      Notification.pop(Notification.current[1].id); // should be id 2
      expect(Notification.current.length).toBe(2);
      expect(Notification.current[0].id).toBe(1);
      expect(Notification.current[1].id).toBe(3);
      expect(interval.cancel).toHaveBeenCalledWith(promise);
    });
  });

  describe('#push() function', function() {
    it('should turn a string arg into the message', function() {
      Notification.push('Hello');
      expect(Notification.current[0].message).toEqual('Hello');
    });
    it('should use the default delay is not specified', function() {
      spyOn(Notification, 'pop');
      Notification.push('Hello');
      expect(Notification.pop.calls.count()).toBe(0);
      interval.flush(4000);
      expect(Notification.pop.calls.count()).toBe(1);
    });
    it('should default the type to success', function() {
      Notification.push('Hello');
      expect(Notification.current[0].type).toBe('success');
    });
    it('should set the class using the type', function() {
      Notification.push('Hello');
      expect(Notification.current[0].class).toBe('alert-success');
    });
    it('should give every Notification an id', function() {
      Notification.push('Hello');
      Notification.push('Hi');
      expect(Notification.current[0].id).toBe(1);
      expect(Notification.current[1].id).toBe(2);
    });
    it('should shorthand error to danger', function() {
      Notification.push({message:'Hello', type: 'error'});
      expect(Notification.current[0].type).toBe('danger');
    });
  });

});
