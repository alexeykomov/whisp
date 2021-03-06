/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application configuration.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


const winston = require('winston');
const fs = require('fs');
const path = require('path');


/**
 * Host of db.
 * @type {string}
 */
const DB_SERVER = 'localhost';


/**
 * Port of db.
 * @type {number}
 */
const DB_PORT = 28015;


/**
 * Port of Redis instance.
 * @type {string}
 */
const REDIS_SERVER = 'localhost';


/**
 * Port of Redis instance.
 * @type {number}
 */
const REDIS_PORT = 6379;


/**
 * Port of application.
 * @type {number}
 */
const APP_PORT = process.env.NODE_ENV === 'production' ? 80 : 3001;


/**
 * URL of app.
 * @type {string}
 */
const APP_URL = '';


/**
 * URL of app.
 * @type {string}
 */
const LANDING_URL = 'http://localhost:8000';


/**
 * URL of login form.
 * @type {string}
 */
const LOGIN_URL = `${LANDING_URL}/login-email.html`;


/**
 * @type {string}
 */
const MAIL_SENT_URL = `${LANDING_URL}/mail-sent.html`;


/**
 * URL of login form.
 * @type {string}
 */
const LOGOUT_URL = `${APP_URL}/logout`;


/**
 * @type {string}
 */
const STATIC_URL = `${APP_URL}/static`;


/**
 * @type {number}
 */
const COOKIE_AGE = 3600000 * 24 * 365 * 3;


/**
 * @type {string}
 */
const SECRET = 'ahNgahbouVooTew6';


/**
 * Whether to use oauth authentication. If false, fallback to local strategy.
 * @type {boolean}
 */
const USE_OAUTH = true;


/**
 * Whether to use passwordless authentication.
 * @type {boolean}
 */
const USE_PASSWORDLESS = true;


/**
 * Whether to use local authentication. If false, fallback to guest mode.
 * @type {boolean}
 */
const USE_LOCAL_AUTH = false;


/**
 * Whether app is in production.
 * @type {boolean}
 */
const PRODUCTION = process.env.NODE_ENV === 'production';


/**
 * Name of db.
 * @type {string}
 */
const DB_NAME = 'whisp';


/**
 * @type {string}
 */
const SMTP_SERVER = 'smtp.gmail.com';


/**
 * @type {number}
 */
const SMTP_PORT = 465;


/**
 * List of locales.
 * @type {Array.<string>}
 */
const LOCALES = ['en', 'ru', 'by', 'fr'];


/**
 * Logger.
 */
const LOG_FILE = '../../logs/info.log';

winston.level = 'debug';
winston.add(winston.transports.File, { filename: LOG_FILE });

const logger = winston;


const credsObject = require('./mail-credentials.json');

/**
 * Mail options.
 */
const MAIL_OPTIONS = {
  from: credsObject.fullUsername,
  to: '',
  subject: '',
  text: '',
  html: ''
};


const MAILER_CREDENTIALS = credsObject;


module.exports = {
  DB_SERVER,
  DB_PORT,
  REDIS_SERVER,
  REDIS_PORT,
  APP_PORT,
  APP_URL,
  LOGIN_URL,
  MAIL_SENT_URL,
  LOGOUT_URL,
  STATIC_URL,
  COOKIE_AGE,
  SECRET,
  USE_OAUTH,
  USE_PASSWORDLESS,
  USE_LOCAL_AUTH,
  PRODUCTION,
  DB_NAME,
  LOCALES,
  logger,
  MAIL_OPTIONS,
  MAILER_CREDENTIALS,
  SMTP_SERVER,
  SMTP_PORT,
};