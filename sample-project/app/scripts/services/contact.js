'use strict';

/**
 * @ngdoc service
 * @name phonebookApp.Contact
 * @description
 * # Contact
 * Factory in the phonebookApp.
 */
angular.module('phonebookApp')
  .factory('Contact', function ($resource, SERVICE_URL) {
    var Contact = $resource(SERVICE_URL + '/api/contact/:id', {
      id: '@id'
    }, {
      sms: {
        url: 'http://localhost:1337/api/contact/:id/sms',
        method: 'GET',
        isArray: false
      }
    });

    return Contact;
  });
