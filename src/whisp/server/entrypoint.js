/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview Application entry point.
 * @author alexeykcontact@gmail.com (Alex K)
 */


/**
 * Module dependencies.
 */
const { logger, APP_PORT } = require('./predefined');
const express = require('express');
const http = require('http');
const errorHandler = require('errorhandler');
const P = require('bluebird');
const { applyRoutes } = require('./routes/index');
const { applyMiddlewares } = require('./middleware/index');
const { setup } = require('./db/setup');


const app = express();

//Middleware.
applyMiddlewares(app);

//Routes.
applyRoutes(app);

app.set('port', APP_PORT);

//Error handling middleware should be loaded after the loading the routes.
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

//Start an application.
async function startup() {
  try {
    await setup();
    const server = http.createServer(app);
    const promisifiedServer = P.promisify(server.listen.bind(server));
    await promisifiedServer(app.get('port'));
    logger.info('Express server listening on port ' + app.get('port'));
  } catch (e) {
    logger.info(e);
  }
}

startup();