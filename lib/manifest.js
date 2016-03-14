'use strict';

const internals = {};

const composer = module.exports = {};

composer.manifest = {
    connections: [
        {
            port: 8000,
            labels: ['web']
        }
    ],
    registrations: [
        {
            plugin: './version'
        },
        {
            plugin: './private'
        },
        {
            plugin: './home'
        }
    ]
};

composer.composeOptions = {
    relativeTo: __dirname
};
