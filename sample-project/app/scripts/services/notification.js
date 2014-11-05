'use strict';

/**
 * @ngdoc service
 * @name phonebookApp.Notification
 * @description
 * # Notification
 * Factory in the phonebookApp.
 */
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
