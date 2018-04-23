'use strict';

const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const init = async () => {

    await server.register(Inert);

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return h.file('./index.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/index.js',
        handler: (request, h) => {
            return h.file('./index.js');
        }
    });
    server.route({
        method: 'GET',
        path: '/index2.html',
        handler: (request, h) => {

            return h.file('./index2.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/index2.js',
        handler: (request, h) => {
            return h.file('./index2.js');
        }
    });

    server.route({
        method: 'GET',
        path: '/styles.css',
        handler: (request, h) => {

            return h.file('./styles.css');
        }
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
