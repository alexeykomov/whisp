/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview DB interaction - settings DAO.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

const { TableName } = require('./constants');
const { getEntity, saveEntity } = require('./entity');


/**
 * Saves settings.
 * @param {Object} aSettingsJSON JSON representing settings.
 */
async function getSettings(aSettingsJSON) {
  return getEntity(aSettingsJSON, TableName.SETTINGS);
}


/**
 * Saves settings.
 * @param {Object} aSettingsJSON JSON representing settings.
 */
async function saveSettings(aSettingsJSON) {
  return saveEntity(aSettingsJSON, TableName.SETTINGS);
}


module.exports = {
  saveSettings,
  getSettings,
};