'use strict';

describe('Service: Contact', function () {

  // load the service's module
  beforeEach(module('phonebookApp'));

  // instantiate service
  var Contact, httpBackend, SERVICE_URL;
  beforeEach(inject(function (_Contact_, _SERVICE_URL_, $httpBackend) {
    Contact = _Contact_;
    SERVICE_URL = _SERVICE_URL_;
    httpBackend = $httpBackend;
  }));

  it('should #query() to correct URL', function () {
    httpBackend
      .expectGET(SERVICE_URL + '/api/contact')
      .respond([], 201);
    Contact.query();
    httpBackend.flush();
  });

  it('should #get() to correct URL', function () {
    httpBackend
      .expectGET(SERVICE_URL + '/api/contact/45')
      .respond({}, 201);
    Contact.get({ id: 45 });
    httpBackend.flush();
  });

  it('shoudl #sms() to correct URL', function() {
    httpBackend
      .expectGET(SERVICE_URL + '/api/contact/45/sms?message=hi')
      .respond({}, 201);
    var c = new Contact({ id: 45 });
    c.$sms({message: 'hi'});
    httpBackend.flush();
  });

});
