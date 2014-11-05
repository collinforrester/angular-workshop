'use strict';

/**
 * @ngdoc service
 * @name phonebookApp.errorInterceptor
 * @description
 * # errorInterceptor
 * Factory in the phonebookApp.
 */
angular.module('phonebookApp')
  .factory('errorInterceptor', function($q, Notification) {
    return {
      'responseError': function(rejection) {
        Notification.push({
          message: 'There was a problem with your request: ' + rejection.data.message + ' (' + rejection.status + ')',
          type: 'error'
        });
        return $q.reject(rejection);
      }
    };
  });