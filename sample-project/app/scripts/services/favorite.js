'use strict';

/**
 * @ngdoc service
 * @name phonebookApp.Favorite
 * @description
 * # Favorite
 * Factory in the phonebookApp.
 */
angular.module('phonebookApp')
  .factory('Favorite', function ($resource) {
    var Favorite = $resource('http://localhost:1337/api/favorite/:id', {
      id: '@id'
    }, {
    	query: {
    		cache: true,
        isArray: true
    	},
    	get: {
    		cache: true
    	}
    });

    return Favorite;
  });
