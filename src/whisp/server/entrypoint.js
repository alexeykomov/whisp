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
import { APP_PORT, REDIS_PORT, REDIS_SERVER, APP_URL, LOGIN_URL, COOKIE_AGE,
    SECRET } from './predefined';
import { install } from 'source-map-support';
import * as routesView from './routes/view';
import { connection } from './db/connection';
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const connect = require('connect');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const expressSession = require('express-session');
const passport = require('passport');
const http = require('http');
const bodyParser = require('body-parser');
const compression = require('compression');
const errorHandler = require('errorhandler');
const r = require('rethinkdb');
const P = require('bluebird');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const log = log;
import { passwordlessMiddlware } from 'middleware/passwordless';
import { applyMiddlwares } from 'middleware/index';
import { applyRoutes } from 'routes/index';
install();


const app = express();

//Middleware.
applyMiddlwares(app);

//Routes.
applyRoutes(app);

//Error handling middleware should be loaded after the loading the routes.
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

//Start an application.
http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});