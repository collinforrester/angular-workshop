'use strict';

/**
 * @ngdoc overview
 * @name phonebookApp
 * @description
 * # phonebookApp
 *
 * Main module of the application.
 */
var app = angular
  .module('phonebookApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/details/:id', {
        templateUrl: 'views/details.html',
        controller: 'MainCtrl'
      })
      .when('/favorites', {
        templateUrl: 'views/favorites.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.controller('MainCtrl', function ($scope, $http, $routeParams, $timeout) {
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

    $scope.addToFavorites = function(contact) {
    	$http.post('http://localhost:1337/api/favorite', {
    		contact: contact.id
    	}).then(function(/*response*/) {
		    $scope.getContacts();
		    $scope.loadContactDetails();
	    }).catch(function(e) {
	    	showMessage('Unable to complete request.  Reason: ' + e.data + ' (status: ' + e.status + ')');
	    });
    };

    $scope.removeFromFavorites = function(id) {
    	$http.delete('http://localhost:1337/api/favorite/' + id)
    		.then(function(/*response*/) {
		    	$scope.getFavorites();
		    }).catch(function(e) {
		    	showMessage('Unable to complete request.  Reason: ' + e.data + ' (status: ' + e.status + ')');
		    });
    };

    $scope.loadContactDetails = function() {
    	if($routeParams.id) {
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

    $scope.messages = [];
    $scope.getContacts();
    $scope.getFavorites();
    $scope.loadContactDetails();
  });

app.directive('favoriteState', function($http) {
	return {
		restrict: 'A',
		scope: {
			contact: '='
		},
		link: function(scope, element/*, attrs*/) {
			$http.get('http://localhost:1337/api/favorite').then(function(response) {
				var ids = _.map(response.data, function(fav) {
					return fav.contact.id;
				});
				if(ids.indexOf(scope.contact.id) > -1) {
					element.find('button').attr('disabled', 'disabled');
				}
			});
		}
	};
});