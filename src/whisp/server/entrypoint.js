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
import * as express_ from 'express';
import * as appConfig from './config/appconfig';
import * as path_ from 'path';
import * as favicon_ from 'serve-favicon';
import * as connect_ from 'connect';
import * as methodOverride_ from 'method-override';
import * as cookieParser_ from 'cookie-parser';
import * as flash_ from 'connect-flash';
import * as expressSession_ from 'express-session';
import * as passport_ from 'passport';
import * as http_ from 'http';
import * as bodyParser_ from 'body-parser';
import * as compression_ from 'compression';
import * as errorHandler_ from 'errorhandler';
import { install } from 'source-map-support';
import * as routesView from './routes/view';
const express = express_.default;
const path = path_.default;
const favicon = favicon_.default;
const connect = connect_.default;
const methodOverride = methodOverride_.default;
const cookieParser = cookieParser_.default;
const flash = flash_.default;
const expressSession = expressSession_.default;
const passport = passport_.default;
const http = http_.default;
const bodyParser = bodyParser_.default;
const compression = compression_.default;
const errorHandler = errorHandler_.default;
install();

const COOKIE_AGE = 3600000 * 24 * 365 * 3;
const SECRET = 'whisp_apritaionpg391u2390457asdhf2195ghapigf';

const app = express();

// Middleware.
app.set('port', appConfig.APP_PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('env', process.env.NODE_ENV === 'production' ? 'production' :
    'development');
app.use(favicon(path.join(__dirname, './favicon.ico')));
app.use(bodyParser.json());
app.use(compression());
app.use(methodOverride());
app.use(cookieParser(SECRET));
app.use(expressSession({
  cookie: {
    maxAge: COOKIE_AGE
  },
  resave: false,
  saveUninitialized: true,
  secret: SECRET
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use('/static', express.static(path.join(__dirname, '..', 'client')));

// Development only routes.
if ('development' == app.get('env')) {
  app.locals.pretty = true;
}

// Routes.
app.get('/', routesView.render);

// Error handling middleware should be loaded after the loading the routes.
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

// Start an application.
http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});