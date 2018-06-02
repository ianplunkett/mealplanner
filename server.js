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

            return h.file('./dist/index.html');
        }
    });

    server.route({
        method: 'GET',
        path: '/mealplanner.js',
        handler: (request, h) => {
            return h.file('./dist/mealplanner.js');
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
