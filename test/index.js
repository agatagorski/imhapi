'use strict';

// Load modules

const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const Server = require('../lib');
const Version = require('../lib/version');

const lab = exports.lab = Lab.script();
const it = lab.test;
const expect = Code.expect;


it('starts a server and returns a hapi server object', (done) => {

    Server.init(0, (err, server) => {

        expect(err).to.not.exist();
        expect(server).to.be.instanceof(Hapi.Server);

        server.stop();
    });
    done();
});

it('starts a server on provided port', (done) => {

    Server.init(3200, (err, server) => {

        expect(err).to.not.exist();
        expect(server.info.port).to.equal(3200);

        server.stop();
    });
    done();
});

it('handles register plugin errors', { parallel: false }, (done) => {

    const orig = Version.register;

    Version.register = function (server, options, next) {

        Version.register = orig;
        return next(new Error('register version failed'));
    };

    Version.register.attributes = {
        name: 'Fake Version'
    };

    Server.init(0, (err, server) => {

        expect(err).to.exist();
        expect(err.message).to.equal('register version failed');

        done();
    });
});
