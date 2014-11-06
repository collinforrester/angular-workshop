'use strict';

/**
 * @ngdoc directive
 * @name phonebookApp.directive:notifications
 * @description
 * # notifications
 */
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
