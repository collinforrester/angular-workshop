# Lab 1 - $resource

`git checkout lab-1`

## Goal

Create 2 new factories (`yo angular:factory Contact`, `yo angular:factory Favorite`) to replace the duplicate and over complicated usage of `$http` throughout the controllers and the directive.

## Details

In the current code base there is alot of opportunity to refactor the code and reuse alot of it.  Each controller has copy/pasted `$http` calls.  We're going to create the factories for both Contact and Favorites to replace these `$http` calls.  When we're done, we should be able to remove all references to `$http` from our app.  Additionally we'll be fixing the broken unit tests and creating our first unit test as we move along (yeoman stubs out empty test files for us).

### Contact

Two pieces of the code were ommitted to not give the entire solution, but most of the legwork.  Here our `Contact` factory is returning the `$resource` that will handle all communications to our contacts endpoint.

```
angular.module('phonebookApp')
  .factory('Contact', function ($resource) {
    var Contact = $resource(/* TODO */, {/*TODO*/}, {
      // Extra - add the endpoint for sending an SMS to a contact at http://localhost:1337/api/contact/:id/sms
    });

    return Contact;
  });
```

A sample unit tests below is how we'll want to make sure no future developers unknowingly break the `Contact $resource` API.  In the `beforeEach` block, we reset each of the variables to the `it` blocks can execute with a clean slate each time.  The first line of code in the unit test, `httpBackend.expectGET(SERVICE_URL + '/api/contact').respond([], 201);` does several things.  First it sets up an expectation that will fail the test case (similar to `expect()`,  except it comes before the rest of the test).  `expectGET` just says that before the test is finished running, `$httpBackend` should get a GET request to the specified URL.  The `.respond()` API is to set the mock responsed from `$httpBackend`.

The last 2 steps are straight forward.  `Contact.query()` is the function call that we're testing.  `httpBackend.flush()` is a mechanism to force async code to act synchronous to make testing a breeze.  All pending HTTP requests will be flushed.

```
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
```