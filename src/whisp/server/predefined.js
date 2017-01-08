/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application configuration.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


const winston = require('winston');
import { install } from 'source-map-support';
const fs = require('fs');
const path = require('path');
install();


/**
 * Host of db.
 * @type {string}
 */
export const DB_SERVER = 'localhost';


/**
 * Port of db.
 * @type {number}
 */
export const DB_PORT = 28015;


/**
 * Port of Redis instance.
 * @type {number}
 */
export const REDIS_SERVER = 'localhost';


/**
 * Port of Redis instance.
 * @type {number}
 */
export const REDIS_PORT = 6379;


/**
 * Port of application.
 * @type {number}
 */
export const APP_PORT = process.env.NODE_ENV === 'production' ? 80 : 3001;


/**
 * URL of app.
 * @type {string}
 */
export const APP_URL = 'http://localhost:3002';


/**
 * URL of login form.
 * @type {string}
 */
export const LOGIN_URL = `${APP_URL}/login`;


/**
 * URL of login form.
 * @type {string}
 */
export const LOGOUT_URL = `${APP_URL}/logout`;


/**
 * @type {number}
 */
export const COOKIE_AGE = 3600000 * 24 * 365 * 3;


/**
 * @type {string}
 */
export const SECRET = 'ahNgahbouVooTew6';


/**
 * Whether to use oauth authentication. If false, fallback to local strategy.
 * @type {boolean}
 */
export const USE_OAUTH = true;


/**
 * Whether to use passwordless authentication.
 * @type {boolean}
 */
export const USE_PASSWORDLESS = true;


/**
 * Whether to use local authentication. If false, fallback to guest mode.
 * @type {boolean}
 */
export const USE_LOCAL_AUTH = false;


/**
 * Whether app is in production.
 * @type {boolean}
 */
export const PRODUCTION = process.env.NODE_ENV === 'production';


/**
 * Name of db.
 * @type {string}
 */
export const DB_NAME = 'whisp';


/**
 * List of locales.
 * @type {Array.<string>}
 */
export const LOCALES = ['en', 'ru', 'by', 'fr'];


/**
 * Logger.
 */
const LOG_FILE = '../../logs/info.log';

winston.level = 'debug';
winston.add(winston.transports.File, { filename: LOG_FILE });
winston.add(winston.transports.Console);

export const log = winston;


const credsObject = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..',
    '..', 'mail-credentials.json')));

/**
 * Mail options.
 */
export const MAIL_OPTIONS = {
  from: credsObject.fullUsername,
  to: '',
  subject: '',
  text: '',
  html: ''
};


export const MAILER_CREDENTIALS = {
  user: credsObject.username,
  pass: credsObject.password
};