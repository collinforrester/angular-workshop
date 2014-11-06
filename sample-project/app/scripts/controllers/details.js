'use strict';

/**
 * @ngdoc function
 * @name phonebookApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the phonebookApp
 */
angular.module('phonebookApp')
	.controller('DetailsCtrl', function($scope, $routeParams, Contact) {
		$scope.contact = Contact.get({ id: $routeParams.id });
	});