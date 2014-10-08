/**
* Contact.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    picture: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    company: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    phone: {
      type: 'string'
    },
    address: {
      type: 'string'
    },
    latitude: {
      type: 'float'
    },
    longitude: {
      type: 'float'
    }
  }
};

