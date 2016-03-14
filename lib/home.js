'use strict';

const Vision = require('vision');
const internals = {};

//Carpeta de las vistas html
const carpeta = 'views/home';

exports.register = function (server, options, next){

    server.register(Vision, (err) => {

        if (err) {
            return next(err);
        }

        server.views({
            engines: { html: require('handlebars') },
            path: __dirname + '/templates'
        });

        server.route({
            method: 'GET',
            path: '/home',
            config: {
                handler: internals.handler
            }
        });
    });
    return next();
};

exports.register.attributes = {
    name: 'Home'
};

internals.handler = function (request, reply) {

    return reply.view(carpeta, {
        title: 'handlebars/basic.js | Hapi ' + request.server.version,
        message: 'La ruta a la pagina actual es : ' + __dirname + carpeta + '.html'
    });
};
