# Lab 2 - Directives

`git checkout lab-2`

## Goal
Create a `<notifications></notifications>` directive to take place of the duplicated `$scope.messages` code from each controller and manage the notifications through a `Notification` service.  At the end of this lab we will also have written tests for the existing `<favorite-state></favorite-state>` directive as well as the new directive and service.

## Details

### Notification service

A full featured `Notification` service that we can use to easily create rich notifications from controllers and directives.  The full code can be found below from the service that the lab answer includes.  Feel free to as few or more features as time permits.  The primary goal is that this service pushes notifications objects onto the `current` array with 3 properties: `message`, `type`, and `class`.

```
angular.module('phonebookApp')
  .service('Notification', function ($interval) {
    var DELAY = 4000;
    var RUNS = 1;
    var self = this;
    var counter = 1;
    this.current = [];
    this.push = function(newNotification) {
      if(typeof newNotification === 'string') {
        newNotification = { message: newNotification };
      }
      var delay = newNotification.delay || DELAY;
      if(!newNotification.type) {
        newNotification.type = 'success';
      }
      if(newNotification.type === 'error') {
        newNotification.type = 'danger';
      }
      newNotification.id = counter++;
      newNotification.class = 'alert-' + newNotification.type;
      newNotification.promise = $interval(function() {
        self.pop(newNotification.id);
      }, delay, RUNS);
      this.current.push(newNotification);
    };
    this.pop = function(id) {
      if(angular.isDefined(id)) {
        for (var i = 0; i < this.current.length; i++) {
          var n = this.current[i];
          if(n.id === id) {
            $interval.cancel(n.promise);
            this.current.splice(i, 1);
          }
        }
      }
    };
  });
```

### Notification directive

The counterpart to the `Notification` factory to display notifications to the user.  It is a very small directive with the majority of the functionality baked into the HTML template.

```
angular.module('phonebookApp')
  .directive('notifications', function(Notification) {
    return {
      template: '<div class="notifications"><div class="notification" id="notification-{{$index}}" ng-class="n.class" ng-repeat="n in notifications">{{n.message}}</div></div>',
      restrict: 'E',
      scope: {},
      link: function postLink(scope, element) {
        scope.notifications = Notification.current;
      }
    };
  });
```

Additionally, we'll add the unit tests for the new notifications directive.  If you use yeoman (`yo angular:directive notifications`) to create the directive, you'll have a unit test stubbed out for you where you can quickly add the code below.

```
it('should show alert for each message', inject(function ($compile) {
  element = angular.element('<notifications></notifications>');
  element = $compile(element)(scope);
  Notification.push('Hey');
  Notification.push('You');
  Notification.push('Guys');
  scope.$digest();
  expect(element.children().eq(0).children().length).toBe(3);
}));
```

The important thing to notice is that after the `Notification` service is used to push alerts, the we must call `$rootScope.digest()` in order for Angular's digest cycle to run and let the directive update the DOM.  After that, we can run our expectation. 
