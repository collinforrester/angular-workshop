'use strict';

/**
 * @ngdoc function
 * @name phonebookApp.controller:FavoritesCtrl
 * @description
 * # FavoritesCtrl
 * Controller of the phonebookApp
 */
angular.module('phonebookApp')
	.controller('FavoritesCtrl', function($scope, Favorite) {
		$scope.favorites = Favorite.query();
		
		$scope.removeFromFavorites = function(favorite) {
			var index = $scope.favorites.indexOf(favorite);
			favorite.$delete(function() {
				$scope.favorites.splice(index, 1);
			});
		};
	});