const express = require('express');
const mongoose = require('mongoose');
const api = require('./api');
const config = require('./config');
const setMiddlewares = require('./middlewares');
const reporter = require('./middlewares/error-reporter');
// const log = require('debug')('@SERVER');

const server = express();

mongoose.connect(config.db.url);

if (config.seed) {
  require('./utils/seeder');
}

setMiddlewares(api.router, {});

server.use(api.path, api.router);
server.use(reporter);

module.exports = server;
