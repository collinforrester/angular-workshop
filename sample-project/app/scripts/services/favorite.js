'use strict';

/**
 * @ngdoc service
 * @name phonebookApp.Favorite
 * @description
 * # Favorite
 * Factory in the phonebookApp.
 */
angular.module('phonebookApp')
  .factory('Favorite', function ($resource, SERVICE_URL) {
    var Favorite = $resource(SERVICE_URL + '/api/favorite/:id', {
      id: '@id'
    });

    return Favorite;
  });
