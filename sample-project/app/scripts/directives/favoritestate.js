'use strict';

/**
 * @ngdoc directive
 * @name phonebookApp.directive:favoriteState
 * @description
 * # favoriteState
 */
angular.module('phonebookApp')
	.directive('favoriteState', function($http) {
		return {
			restrict: 'A',
			scope: {
				contact: '='
			},
			link: function(scope, element /*, attrs*/ ) {
				$http.get('http://localhost:1337/api/favorite').then(function(response) {
					var ids = _.map(response.data, function(fav) {
						return fav.contact.id;
					});
					if (ids.indexOf(scope.contact.id) > -1) {
						element.find('button').attr('disabled', 'disabled');
					}
				});
			}
		};
	});