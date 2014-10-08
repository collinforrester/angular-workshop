'use strict';

/**
 * @ngdoc function
 * @name phonebookApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the phonebookApp
 */
angular.module('phonebookApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('http://localhost:1337/api/favorite').then(function(response) {
    	$scope.favorites = response.data;
    });
    $scope.search = function() {
    	$http({
    		url: 'http://localhost:1337/api/contact',
    		method: 'GET',
    		params: {
	    		where: {
	    			name: {
	    				contains: $scope.searchText
	    			}
	    		}
	    	}
    	}).then(function(response) {
	    	$scope.searchResults = response.data;
	    });
    };
  });
