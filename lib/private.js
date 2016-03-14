'use strict';

const Bcrypt = require('bcrypt');
const Basic = require('hapi-auth-basic');
const Users = require('../users.json');
const internals = {};

exports.register = function (server, options, next){

    server.register(Basic, (err) => {

        if (err) {
            return next(err);
        }
        server.auth.strategy('simple', 'basic', { validateFunc: internals.validate });
        server.route({
            method: 'GET',
            path: '/private',
            config: {
                auth: 'simple',
                handler: function (request, reply) {

                    return reply(internals.response(request.auth.credentials.name));
                }
            }
        });
    });
    return next();
};

exports.register.attributes = {
    name: 'Private'
};

internals.validate = function (request, username, password, callback) {

    const user = Users[username];
    if (!user) {
        return callback(null, false);
    }

    Bcrypt.compare(password, user.password, (err, isValid) => {

        return callback(err, isValid, { id: user.id, name: user.name });
    });
};

internals.response = function (userName){

    return 'Hola ' + userName;
};
