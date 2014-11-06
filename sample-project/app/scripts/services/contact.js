'use strict';

/**
 * @ngdoc service
 * @name phonebookApp.Contact
 * @description
 * # Contact
 * Factory in the phonebookApp.
 */
angular.module('phonebookApp')
  .factory('Contact', function ($resource) {
    var Contact = $resource('http://localhost:1337/api/contact/:id', {
      id: '@id'
    }, {
      query: {
        cache: true,
        isArray: true
      },
      get: {
        cache: true
      },
      sms: {
        url: 'http://localhost:1337/api/contact/:id/sms',
        method: 'GET',
        isArray: false
      }
    });

    return Contact;
  });
