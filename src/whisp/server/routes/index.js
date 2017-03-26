/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview Application routes.
 * @author alexeykcontact@gmail.com (Alex K)
 */


const {
  APP_URL,
  LOGIN_URL,
  LOGOUT_URL,
  logger,
  MAIL_SENT_URL
} = require('../predefined');
const routesSettings = require('./settings');
const routesView = require('./view');
const routesAuth = require('./auth');
const express = require('express');


const router = express.Router();


router.get(APP_URL, ensureAuthenticated, routesView.render);
router.get(LOGIN_URL, (req, res) => res.redirect(LOGIN_URL));
router.post(`${APP_URL}/sendtoken`,
    routesAuth.sendToken,
    (err, req, res, next) => {
      logger.error(err.stack);
      res.status(500).send('Error ${err}');
    },
    (req, res) => {
      const user = req.user;
      res.redirect(`${MAIL_SENT_URL}?email=${user.email}`)
    });
router.get(LOGOUT_URL, (req, res) => {
  req.logout();
  res.redirect(APP_URL);
});
router.post('/settings/save', ensureAuthenticated, routesSettings.save);


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(LOGIN_URL);
}


module.exports = {
  router,
};