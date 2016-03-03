'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();
const Hoek = require('hoek');
const Version = require('./version');

const Pjson = require('../package.json');
const internals = {};
internals.response = Pjson.version;

server.connection({ port : process.env.PORT || 8000 });

server.register(Version, (err) => {

    Hoek.assert(!err, err);
    server.start((err) => {

        Hoek.assert(!err, err);
        console.log('Server running at:', server.info.uri);
    });
});
