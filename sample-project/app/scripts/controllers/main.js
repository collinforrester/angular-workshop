'use strict';

/**
 * @ngdoc function
 * @name phonebookApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the phonebookApp
 */
angular.module('phonebookApp')
  .controller('MainCtrl', function ($scope, Contact) {
		$scope.searchResults = Contact.query();
  });
