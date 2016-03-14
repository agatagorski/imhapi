'use strict';

// Load modules
const Code = require('code'); //Aserciones
const Lab = require('lab');
const Pjson = require('../package.json');
const Server = require('../lib/index');
const Path = require('path');

const lab = exports.lab = Lab.script();
const it = lab.it;
const describe = lab.experiment;
const expect = Code.expect;

const internals = {};

describe('/version', () => {

    it('devuelve la version del package.json', { parallel: false }, (done) => {

        Server.init(internals.manifest, internals.composeOptions, (err, server) => {

            expect(err).to.not.exist();

            server.inject('/version', (res) => {

                expect(res.statusCode).to.be.equal(200);
                expect(res.result).to.be.deep.equal( { version: Pjson.version } );

                server.stop(done);

            });
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
            plugin:'./version'
        }
    ]
};

internals.composeOptions = {
    relativeTo: Path.resolve(__dirname, '../lib')
};
