'use strict';

/**
 * @ngdoc overview
 * @name phonebookApp
 * @description
 * # phonebookApp
 *
 * Main module of the application.
 */
angular
  .module('phonebookApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider, $httpProvider) {

    $httpProvider.interceptors.push('errorInterceptor');
    $httpProvider.interceptors.push('cacheInterceptor');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/details/:id', {
        templateUrl: 'views/details.html',
        controller: 'DetailsCtrl'
      })
      .when('/favorites', {
        templateUrl: 'views/favorites.html',
        controller: 'FavoritesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });