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
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
