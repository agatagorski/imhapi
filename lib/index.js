'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
const Pjson = require('../package.json');
const Hoek = require('hoek');

const internals = {
    response: Pjson.version
};

server.connection({ port : process.env.PORT || 8000 });

server.route( {
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {

        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.route({
    method: 'GET',
    path: '/version',
    handler: function (request, reply) {

        reply('version: "' + internals.response + '"');
    }
});

server.start((err) => {

    Hoek.assert(!err, err);
    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});
