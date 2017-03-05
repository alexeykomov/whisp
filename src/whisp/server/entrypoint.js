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
const { logger } = require('./predefined');
const express = require('express');
const http = require('http');
const errorHandler = require('errorhandler');
const P = require('bluebird');
const { applyRoutes } = require('routes/index');
const { applyMiddlewares } = require('middleware/index');


const app = express();

//Middleware.
applyMiddlewares(app);

//Routes.
applyRoutes(app);

//Error handling middleware should be loaded after the loading the routes.
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

//Start an application.
async function startup() {
  try {
    await Promise.all([
      P.promisify(http.createServer(app).listen)(app.get('port')),
      setup()
    ]);
    logger.log('Express server listening on port ' + app.get('port'));
  } catch (e) {
    logger.log(e);
  }
}

startup();