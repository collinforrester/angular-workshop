'use strict';

/**
 * @ngdoc directive
 * @name phonebookApp.directive:favoriteState
 * @description
 * # favoriteState
 */
angular.module('phonebookApp')
	.directive('favoriteState', function(Favorite) {
		return {
			restrict: 'A',
			scope: {
				contact: '='
			},
			compile: function() {
				var promise = Favorite
					.query()
					.$promise.then(function(response) {
						return response.map(function(fav) {
							return fav.contact.id;
						});
					});
				return function postLink(scope, element) {
					promise.then(function(idArray) {
						if (idArray.indexOf(scope.contact.id) > -1) {
							element.find('button').attr('disabled', 'disabled');
						}
					});
				};
			}
		};
	});