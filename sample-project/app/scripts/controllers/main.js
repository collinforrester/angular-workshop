'use strict';

/**
 * @ngdoc function
 * @name phonebookApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the phonebookApp
 */
angular.module('phonebookApp')
  .controller('MainCtrl', function ($scope, $http, $timeout, Contact) {
    
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
    	$http.post('http://localhost:1337/api/favorite', {
    		contact: contact.id
    	}).then(function(/*response*/) {
				$scope.searchResults = Contact.query();
		    showMessage('Contact added to favorites', 'success');
	    }).catch(function(e) {
	    	showMessage('Unable to complete request.  Reason: ' + e.data + ' (status: ' + e.status + ')', 'danger');
	    });
    };

    $scope.messages = [];
  });
