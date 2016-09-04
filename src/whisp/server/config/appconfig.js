/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application configuration.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


import * as bunyan from 'bunyan';
import { install } from 'source-map-support';
import * as fs from 'fs';
import * as path from 'path';
install();


/**
 * Host of db.
 * @type {string}
 */
export const DB_SERVER = 'mongodb://localhost';


/**
 * Port of db.
 * @type {number}
 */
export const DB_PORT = 27017;


/**
 * Port of application.
 * @type {number}
 */
export const APP_PORT = process.env.NODE_ENV === 'production' ? 80 : 3001;


/**
 * Whether app is in production.
 * @type {boolean}
 */
export const PRODUCTION = process.env.NODE_ENV === 'production';


/**
 * Name of db.
 * @type {string}
 */
export const DB_NAME = 'rflectevents';


/**
 * List of locales.
 * @type {Array.<string>}
 */
export const LOCALES = ['en', 'ru', 'by', 'fr'];


/**
 * Logger.
 */
export const log = bunyan.default.createLogger({
  name: 'reflectcal-mailer',
  streams: [
    {
      level: 'info',
      type: 'stream',
      stream: process.stdout
    },
    {
      level: 'info',
      type: 'rotating-file',
      path: 'logs/info.log',
      period: '1d',
      count: 10
    },
    {
      level: 'error',
      type: 'rotating-file',
      path: 'logs/error.log',
      period: '1d',
      count: 10
    }
  ]
});