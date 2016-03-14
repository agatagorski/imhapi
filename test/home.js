'use strict';

// Load modules

//const Hapi = require('hapi');
const Vision = require('vision');
const Code = require('code');

const Lab = require('lab');
const Server = require('../lib');
const internals = {};
const Home = require('../lib/home');

const lab = exports.lab = Lab.script();
const it = lab.test;
const expect = Code.expect;

const Path = require('path');

it('returns a home page via http', (done) => {

    Server.init(internals.manifest, internals.composeOptions, (err, server) => {

        expect(err).to.not.exist();

        const request = {
            method: 'GET',
            url: '/home'
        };

        server.inject(request, (res) => {

            expect(res.statusCode).to.equal(200);

            server.stop(done);
        });
    });
});



internals.manifest = {
    connections: [
        {
            port: 0
        }
    ],
    registrations: [
        {
            plugin:'./home'
        }
    ]
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
