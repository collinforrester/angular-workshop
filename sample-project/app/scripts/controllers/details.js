'use strict';

/**
 * @ngdoc function
 * @name phonebookApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the phonebookApp
 */
angular.module('phonebookApp')
	.controller('DetailsCtrl', function($scope, $http, $routeParams, $timeout) {
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
		$scope.loadContactDetails = function() {
			if ($routeParams.id) {
				$http({
					url: 'http://localhost:1337/api/contact/' + $routeParams.id,
					method: 'GET'
				}).then(function(response) {
					$scope.contact = response.data;
				}).catch(function(e) {
					showMessage('Unable to complete request.  Reason: ' + e.data + ' (status: ' + e.status + ')');
				});
			}
		};
		$scope.addToFavorites = function(contact) {
			$http.post('http://localhost:1337/api/favorite', {
				contact: contact.id
			}).then(function( /*response*/ ) {
				$scope.getContacts();
				$scope.loadContactDetails();
			}).catch(function(e) {
				showMessage('Unable to complete request.  Reason: ' + e.data + ' (status: ' + e.status + ')');
			});
		};
		$scope.loadContactDetails();

		$scope.messages = [];
	});