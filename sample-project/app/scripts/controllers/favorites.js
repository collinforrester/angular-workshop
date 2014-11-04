'use strict';

/**
 * @ngdoc function
 * @name phonebookApp.controller:FavoritesCtrl
 * @description
 * # FavoritesCtrl
 * Controller of the phonebookApp
 */
angular.module('phonebookApp')
	.controller('FavoritesCtrl', function($scope, $timeout, Favorite) {
		function showMessage(message, type) {
			var id = Math.ceil(Math.random() * 99999999);
			$scope.messages.push({
				message: message,
				type: type,
				id: id
			});
			$timeout(function() {
				for (var i = 0; i < $scope.messages.length; i++) {
					if ($scope.messages[i].id === id) {
						$scope.messages.splice(i, 1);
					}
				}
			}, 3000);
		}

		Favorite
			.query()
			.$promise
			.then(function(data) {
				$scope.favorites = data;
			})
			.catch(function(e) {
				showMessage('Unable to complete request.  Reason: ' + e.data + ' (status: ' + e.status + ')');
			});
		
		$scope.removeFromFavorites = function(favorite) {
			var index = $scope.favorites.indexOf(favorite);
			favorite.$delete(function() {
				$scope.favorites.splice(index, 1);
			}, function(e) {
				showMessage('Unable to complete request.  Reason: ' + e.data + ' (status: ' + e.status + ')');
			});
		};

		$scope.messages = [];
	});