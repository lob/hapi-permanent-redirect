# Hapi Permanent Redirect
[![Build Status](https://travis-ci.org/lob/hapi-permanent-redirect.svg)](https://travis-ci.org/lob/hapi-permanent-redirect)
[![Coverage Status](https://coveralls.io/repos/lob/hapi-permanent-redirect/badge.svg?branch=master)](https://coveralls.io/r/lob/hapi-permanent-redirect?branch=master)
[![NPM version](https://badge.fury.io/js/hapi-permanent-redirect.svg)](https://npmjs.org/package/hapi-permanent-redirect)
[![Downloads](http://img.shields.io/npm/dm/hapi-permanent-redirect.svg)](https://npmjs.org/package/hapi-permanent-redirect)

The purpose of this plugin is to provide a convenient way to do permanent redirects.

# Registering the Plugin
```javascript
var Hapi = require('hapi');

var server = new Hapi.Server();

server.register([
  {
    redirects: [{
      from: '/route1',
      to: 'route2'
    }, {
      from: '/route3',
      to: '/route4'
    }]
  }
], function (err) {
  // An error will be available here if anything goes wrong
});
```

# Options
- ```redirects``` Array of objects with a `from` and `to` key 
