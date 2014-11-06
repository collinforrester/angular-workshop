# Lab 3 - Interceptors

`git checkout lab-3`

## Goal

Add some finishing touches to our project by adding some generic, application level error handling and enabling Angular's built in HTTP caching.

## Details

### Error handling

```
angular.module('phonebookApp')
  .factory('errorInterceptor', function($q, Notification) {
    return {
      'responseError': function(rejection) {
        Notification.push({
          message: 'There was a problem with your request: ' + rejection.data.message + ' (' + rejection.status + ')',
          type: 'error'
        });
        return $q.reject(rejection);
      }
    };
  });
```

### HTTP Caching

```
angular.module('phonebookApp')
.factory('cacheInterceptor', function($cacheFactory) {
    return {
      'request': function(config) {
        if (config.method !== 'GET') {
          $cacheFactory.get('$http').removeAll();
        }
        return config;
      }
    };
  });
```