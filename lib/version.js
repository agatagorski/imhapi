'use strict';

const Pjson = require('../package.json');
const internals = {
    response: Pjson.version
};

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/version',
        handler: function (request, reply) {

            return reply(internals.response);
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Version'
};
