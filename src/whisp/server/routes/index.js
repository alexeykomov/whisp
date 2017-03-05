/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview Application routes.
 * @author alexeykcontact@gmail.com (Alex K)
 */


{ APP_PORT, REDIS_PORT, REDIS_SERVER, APP_URL, LOGIN_URL, COOKIE_AGE,
  SECRET, USE_OAUTH, LOGIN_URL, LOGOUT_URL } from '../predefined';
{ install } from 'source-map-support';
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
const log = log;
const { passwordless } = require('middleware/passwordless');
const { applyMiddlwares } = require('middleware/index');
const routesSettings = require('./settings');
const routesView = require('./view');


function applyRoutes(aApp) {
  //Development only routes.
  if ('development' == aApp.get('env')) {
    aApp.locals.pretty = true;
  }

  //Routes.
  if (USE_PASSWORDLESS) {
    aApp.post(`${APP_URL}/sendtoken`,
        passwordless.requestToken((email, delivery, callback, req) => {
          callback(null, email);
        }), (req, res) => {
          // success!
          res.render('sent');
        });
  }
  aApp.get(LOGIN_URL, (req, res) => res.redirect(LOGIN_URL));
  aApp.get(LOGOUT_URL, (req, res) => {
    req.logout();
    res.redirect(APP_URL);
  });
  aApp.get(APP_URL, ensureAuthenticated, routesView.render);
  aApp.post('/settings/save', ensureAuthenticated, routesSettings.save);
}


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(LOGIN_URL);
}