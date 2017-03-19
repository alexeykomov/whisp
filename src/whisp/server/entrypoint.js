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
const { logger, APP_PORT, APP_URL } = require('./predefined');
const express = require('express');
const http = require('http');
const errorHandler = require('errorhandler');
const P = require('bluebird');
const { router } = require('./routes/index');
const { applyMiddlewares } = require('./middleware/index');
const { setup } = require('./db/setup');
require('google-closure-library');


const app = express();

//Middleware.
applyMiddlewares(app);

//Development only routes.
if ('development' == app.get('env')) {
  app.locals.pretty = true;
}
//Routes.
app.use(APP_URL, router);

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
    const launchServer = P.promisify(server.listen.bind(server));
    await launchServer(app.get('port'));
    logger.info('Express server listening on port ' + app.get('port'));
  } catch (e) {
    logger.info(e);
  }
}


startup();