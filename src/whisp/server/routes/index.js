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
  MAIL_SENT_URL,
} = require('../predefined');
const path = require('path');
const settings = require('./settings');
const view = require('./view');
const auth = require('./auth');
const express = require('express');
const passwordless = require('passwordless');


const router = express.Router();


router.get(APP_URL, ensureAuthenticated, view.render);
router.post(`${APP_URL}/sendtoken`,
    auth.sendToken,
    (err, req, res, next) => {
      logger.error(err.stack);
      res.status(500).send('Error ${err}');
    },
    (req, res) => {
      const url = `${MAIL_SENT_URL}?email=${req.body.user}`;
      res.redirect(url)
    });
router.get(LOGOUT_URL, passwordless.logout(), (req, res) => {
  res.redirect(LOGIN_URL);
});
router.post('/settings/save', ensureAuthenticated, settings.save);


function ensureAuthenticated(req, res, next) {
  passwordless.restricted({ failureRedirect: LOGIN_URL })(req, res, next);
}


module.exports = {
  router,
};