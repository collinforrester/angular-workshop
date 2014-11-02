'use strict';

/**
 * @ngdoc function
 * @name phonebookApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the phonebookApp
 */
angular.module('phonebookApp')
  .controller('MainCtrl', function ($scope, $http, $timeout) {
    
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

  	$scope.getContacts = function() {
	  	$http({
	  		url: 'http://localhost:1337/api/contact',
	  		method: 'GET'
	  	}).then(function(response) {
	    	$scope.searchResults = response.data;
	    	showMessage(response.data.length + ' results returned.', 'success');
	    }).catch(function(e) {
	    	showMessage('Unable to complete request.  Reason: ' + e.data + ' (status: ' + e.status + ')', 'danger');
	    });
  	};

    $scope.addToFavorites = function(contact) {
    	$http.post('http://localhost:1337/api/favorite', {
    		contact: contact.id
    	}).then(function(/*response*/) {
		    $scope.getContacts();
		    showMessage('Contact added to favorites', 'success');
	    }).catch(function(e) {
	    	showMessage('Unable to complete request.  Reason: ' + e.data + ' (status: ' + e.status + ')', 'danger');
	    });
    };

    $scope.messages = [];
    $scope.getContacts();
  });
