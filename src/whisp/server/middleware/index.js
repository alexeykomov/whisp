/*
 * Copyright (c) 2013. Reflect, Alex K.
 */

/**
 * @fileoverview Middlewares init.
 */


const {
    REDIS_PORT,
    REDIS_SERVER,
    COOKIE_AGE,
    SECRET,
    logger,
} = require('../predefined');
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
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const { passwordless } = require('./passwordless');
const { associateUser } = require('./associateuser');


function* middlewares() {
  yield favicon(path.join(__dirname, './../favicon.ico'));
  yield bodyParser.json();
  yield compression();
  yield methodOverride();
  yield cookieParser(SECRET);
  yield expressSession({
    store: new RedisStore({
      host: REDIS_SERVER,
      port: REDIS_PORT,
    }),
    cookie: {
      maxAge: COOKIE_AGE
    },
    resave: false,
    saveUninitialized: true,
    secret: SECRET
  });
  yield flash();
  yield passport.initialize();
  yield passport.session();
  yield ['/static', express.static(path.join(__dirname, '..', 'client'))];
  yield passwordless.sessionSupport();
  yield passwordless.acceptToken({ successRedirect: '/'});
  yield associateUser;
}


function applyMiddleware(aApp, aMiddleware) {
  if (Array.isArray(aMiddleware)) {
    aApp.use.apply(aApp, aMiddleware);
  } else {
    aApp.use(aMiddleware);
  }
}


function applyMiddlewares(aApp) {
  [...middlewares()].forEach(aMiddleware => applyMiddleware(aApp, aMiddleware));
}


module.exports = {
  applyMiddlewares,
};
