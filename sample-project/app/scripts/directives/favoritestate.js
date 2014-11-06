'use strict';

/**
 * @ngdoc directive
 * @name phonebookApp.directive:favoriteState
 * @description
 * # favoriteState
 */
angular.module('phonebookApp')
	.directive('favoriteState', function(Favorite, Contact, Notification) {
		return {
			restrict: 'A',
			scope: {
				contact: '='
			},
			compile: function() {
				var promise = Favorite
					.query()
					.$promise.then(function(response) {
						return response.map(function(fav) {
							return fav.contact.id;
						});
					});
				return function postLink(scope, element) {
					promise.then(function(idArray) {
						var button = element.find('button');
						var updateButtonState = function() {
							if (idArray.indexOf(scope.contact.id) > -1) {
								element.find('button').attr('disabled', 'disabled');
							}
						};
						updateButtonState();
						button.bind('click', function() {
							var favorite = new Favorite({ contact: scope.contact.id });
							favorite.$save(function(updatedContact) {
								idArray.push(scope.contact.id);
								updateButtonState();
							}, function(e) {
								Notification.push({ message: 'Unable to complete request.  Reason: ' + e.data + ' (status: ' + e.status + ')', type: 'error'});
							});
						});
					});
				};
			}
		};
	});