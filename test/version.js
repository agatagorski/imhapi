'use strict';

// Load modules
const Code = require('code'); //Aserciones
const Lab = require('lab');
const Pjson = require('../package.json');
const Server = require('../lib/index.js');

const lab = exports.lab = Lab.script();
const it = lab.it;
const describe = lab.experiment;
const expect = Code.expect;

describe('/version', () => {

    it('devuelve la version del package.json', { parallel: false }, (done) => {

        Server.init(0, (err,server) => {

            expect(err).to.not.exist();

            server.inject('/version', (res) => {

                expect(res.statusCode).to.be.equal(200);
                expect(res.result).to.be.deep.equal({ version: Pjson.version });

                server.stop();

            });
        });
        done();
    });
});
