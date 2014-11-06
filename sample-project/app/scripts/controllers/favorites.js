'use strict';

/**
 * @ngdoc function
 * @name phonebookApp.controller:FavoritesCtrl
 * @description
 * # FavoritesCtrl
 * Controller of the phonebookApp
 */
angular.module('phonebookApp')
	.controller('FavoritesCtrl', function($scope, Notification, Favorite) {
		Favorite
			.query()
			.$promise
			.then(function(data) {
				$scope.favorites = data;
			})
			.catch(function(e) {
				Notification.push({ message: 'Unable to complete request.  Reason: ' + e.data + ' (status: ' + e.status + ')', type: 'error'});
			});
		
		$scope.removeFromFavorites = function(favorite) {
			var index = $scope.favorites.indexOf(favorite);
			favorite.$delete(function() {
				$scope.favorites.splice(index, 1);
			}, function(e) {
				Notification.push({ message: 'Unable to complete request.  Reason: ' + e.data + ' (status: ' + e.status + ')', type: 'error'});
			});
		};
	});