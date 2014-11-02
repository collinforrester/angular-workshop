'use strict';

/**
 * @ngdoc function
 * @name phonebookApp.controller:FavoritesCtrl
 * @description
 * # FavoritesCtrl
 * Controller of the phonebookApp
 */
angular.module('phonebookApp')
	.controller('FavoritesCtrl', function($scope, $http, $timeout) {
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
		$scope.removeFromFavorites = function(id) {
			$http.delete('http://localhost:1337/api/favorite/' + id)
				.then(function( /*response*/ ) {
					$scope.getFavorites();
				}).catch(function(e) {
					showMessage('Unable to complete request.  Reason: ' + e.data + ' (status: ' + e.status + ')');
				});
		};

		$scope.getFavorites = function() {
			$http({
				url: 'http://localhost:1337/api/favorite',
				method: 'GET'
			}).then(function(response) {
				$scope.favorites = response.data;
			}).catch(function(e) {
				showMessage('Unable to complete request.  Reason: ' + e.data + ' (status: ' + e.status + ')');
			});
		};
		$scope.getFavorites();
		$scope.messages = [];
	});