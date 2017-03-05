/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview Application routes.
 * @author alexeykcontact@gmail.com (Alex K)
 */


const { APP_URL, LOGIN_URL, LOGOUT_URL, logger, } = require('../predefined');
const routesSettings = require('./settings');
const routesView = require('./view');
const routesAuth = require('./auth');


function applyRoutes(app) {
  //Development only routes.
  if ('development' == app.get('env')) {
    app.locals.pretty = true;
  }

  //Routes.
  app.post(`${APP_URL}/sendtoken`, routesAuth.sendToken,
      (req, res) => res.render('sent'));
  app.get(LOGIN_URL, (req, res) => res.redirect(LOGIN_URL));
  app.get(LOGOUT_URL, (req, res) => {
    req.logout();
    res.redirect(APP_URL);
  });
  app.get(APP_URL, ensureAuthenticated, routesView.render);
  app.post('/settings/save', ensureAuthenticated, routesSettings.save);
}


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(LOGIN_URL);
}


module.exports = {
  applyRoutes,
};