var Joi = require('joi');

exports.register = function (server, options, next) {

  var schema = {
    redirects: Joi.array().items(Joi.object().keys({
      from: Joi.string().required(),
      to: Joi.string().required()
    })).required()
  };

  try {
    Joi.assert(options, schema, 'Invalid Configuration Object');
  } catch (ex) {
    return next(ex);
  }

  options.redirects.forEach(function (redirect) {
    server.route({
      method: 'GET',
      path: redirect.from,
      config: {
        handler: function (request, reply) {
          reply().redirect('https://' + request.headers.host + redirect.to)
          .permanent().rewritable();
        }
      }
    });
  });

  next();
};

exports.register.attributes = {
  name: 'permanentRedirect',
  version: '1.0.0'
};
