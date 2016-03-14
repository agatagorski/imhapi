'use strict';

const Hoek = require('hoek');
const Server = require('./index');
const Composer = require('./manifest');

const internals = {};

Server.init(Composer.manifest, Composer.composeOptions, (err, server) => {

    const web = server.select('web');
    Hoek.assert(!err, err);
    console.log('Server started at: ' + web.info.uri);
});

/*
'use strict';

const Hoek = require('hoek');
const Server = require('./index.js');

Server.init(8000, (err, server) => {

    Hoek.assert(!err, err);
    console.log('Server started at: ' + server.info.uri);
});

*/
