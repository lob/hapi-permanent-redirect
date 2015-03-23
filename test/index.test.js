var expect  = require('chai').expect;
var Hapi    = require('hapi');

describe('plugin', function () {
  it('should fail to load with bad options', function () {
    var server = new Hapi.Server();

    server.register([{
      register: require('../index'),
      options: { }
    }], function (err) {
      expect(err).to.be.instanceof(Error);
    });
  });

  it('should work with valid options', function (done) {
    var server = new Hapi.Server();
    server.connection({ port: 3000 });

    server.route({
      method: 'GET',
      path: '/redirected',
      config: {
        handler: function (request, reply) {
          reply('hello');
        }
      }
    });

    server.register([{
      register: require('../index'),
      options: {
        redirects: [
          { from: '/start', to: '/redirected' }
        ]
      }
    }], function (err) {
      expect(err).to.be.undefined;
      server.inject({
        method: 'GET',
        url: '/start'
      }, function (res) {
        expect(res.statusCode).to.eql(301);
        expect(res.headers.location).to.eql('https://undefined/redirected');
        done();
      });
    });
  });
});
