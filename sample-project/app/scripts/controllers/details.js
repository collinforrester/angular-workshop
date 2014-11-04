'use strict';

/**
 * @ngdoc function
 * @name phonebookApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the phonebookApp
 */
angular.module('phonebookApp')
	.controller('DetailsCtrl', function($scope, $routeParams, $timeout, Contact, Favorite) {
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
		$scope.contact = Contact.get({ id: $routeParams.id });
		$scope.addToFavorites = function(contact) {
			var favorite = new Favorite({ contact: contact.id });
			favorite.$save(function() {
				$scope.contact = Contact.get({ id: $routeParams.id }); // so the add favorite button updates
			}, function(e) {
				showMessage('Unable to complete request.  Reason: ' + e.data + ' (status: ' + e.status + ')');
			});
		};
		$scope.messages = [];
	});