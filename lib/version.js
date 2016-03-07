'use strict';

const Pjson = require('../package.json');
const internals = {
    response: {
        version: Pjson.version
    }
};

exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/version',
        config: {
            description: 'Returns the version of the server',
            handler: (request, reply) => {

                return reply(internals.response);
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'Version'
};
