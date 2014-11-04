'use strict';

/**
 * @ngdoc function
 * @name phonebookApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the phonebookApp
 */
angular.module('phonebookApp')
  .controller('MainCtrl', function ($scope, Favorite, $timeout, Contact) {
    
		function showMessage(message, type) {
			var id = Math.ceil(Math.random() * 99999999);
			$scope.messages.push({
				message: message,
				type: type,
				id: id
			});
			$timeout(function() {
				for(var i = 0; i < $scope.messages.length; i++) {
					if($scope.messages[i].id === id) {
						$scope.messages.splice(i, 1);
					}
				}
			}, 3000);
		}

		$scope.searchResults = Contact.query();

    $scope.addToFavorites = function(contact) {
    	var favorite = new Favorite({ contact: contact.id });
    	favorite.$save(function() {
				$scope.searchResults = Contact.query();
		    showMessage('Contact added to favorites', 'success');
    	}, function(e) {
	    	showMessage('Unable to complete request.  Reason: ' + e.data + ' (status: ' + e.status + ')', 'danger');
    	});
    };

    $scope.messages = [];
  });
