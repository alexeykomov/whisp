/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview DB interaction - settings DAO.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


const r = require('rethinkdb');
import { connection } from './connection';
const P = require('bluebird');
import { DB_NAME } from '../predefined';


const SETTINGS_TABLE = 'settings';


/**
 * Loads settings.
 * @param {function(Object)} aOnSettingsLoad Callback that will be executed
 * when db request is ready.
 */
export function getSettings(aOnSettingsLoad) {
}


/**
 * Saves settings.
 * @param {Object} aSettingsJSON JSON representing settings.
 * @param {function(string|number)} aOnSettingsSave Callback that will be
 * called when db request is ready.
 */
export function saveSettingsAsync(aSettingsJSON, aOnSettingsSave){
  let conn;
  connection.then(aConn => {
    conn = aConn;
    return r.db(DB_NAME).tableCreate(SETTINGS_TABLE).run(aConn);
  }).then(result => {
    return r.db(DB_NAME).table(SETTINGS_TABLE).insert(aSettingsJSON).run(conn);
  }).catch(error => {
    throw error;
  });
}