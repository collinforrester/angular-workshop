'use strict';

/**
 * @ngdoc service
 * @name phonebookApp.cacheInterceptor
 * @description
 * # cacheInterceptor
 * Factory in the phonebookApp.
 */
angular.module('phonebookApp')
.factory('cacheInterceptor', function($cacheFactory) {
    return {
      'request': function(config) {
        if (config.method !== 'GET') {
          $cacheFactory.get('$http').removeAll();
        }
        return config;
      }
    };
  });