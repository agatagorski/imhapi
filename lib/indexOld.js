'use strict';

const Hapi = require('hapi');

const Version = require('./version');
const Private = require('./private');
const Home = require('./home');

exports.init = function (port, next) {

    const server = new Hapi.Server();
    server.connection({ port : port });
    server.register( [Version, Home, Private] , (err) => {

        if (err){
            return next(err);
        }
        server.start((err) => {

            return next(err, server); //server para poder ver el console.log
        });
    });
};
