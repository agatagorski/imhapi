'use strict';

// Load modules

//const Hapi = require('hapi');
const Basic = require('hapi-auth-basic');
const Code = require('code');
const Lab = require('lab');
const Server = require('../lib');
const internals = {};
const Private = require('../lib/private');

const lab = exports.lab = Lab.script();
const it = lab.test;
const expect = Code.expect;

//Conexion establecida
it('Conexion establecida', (done) => {

    Server.init(0, (err, server) => {

        expect(err).to.not.exist();
        const request = { method: 'GET', url: '/private', headers: { authorization: internals.header('agata', 'secret') } };
        server.inject(request, (res) => {

            expect(res.statusCode).to.equal(200);
            expect(res.result).to.equal('Hola Agata Gorski');
            server.stop(done);
        });
    });
});

internals.header = function (username, password) {

    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};

//Usuario no existe
it('Usuario no existe', (done) => {

    Server.init(0, (err, server) => {

        expect(err).to.not.exist();
        const request = { method: 'GET', url: '/private', headers: { authorization: internals.header('agata2', 'secret') } };
        server.inject(request, (res) => {

            expect(res.statusCode).to.equal(401);
            server.stop(done);
        });
    });
});

//plugin
it('handles register plugin errors', { parallel: false }, (done) => {

    const orig = Basic.register;

    Basic.register = function (server, options, next) {

        Private.register = orig;
        return next(new Error('register version failed'));
    };

    Basic.register.attributes = {
        name: 'Fake Version'
    };

    Server.init(0, (err, server) => {

        expect(err).to.exist();
        expect(err.message).to.equal('register version failed');

        done();
    });
});
