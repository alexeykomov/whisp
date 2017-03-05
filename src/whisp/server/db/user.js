/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview DB interaction - settings DAO.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

const { TableName } = require('./constants');
const { getEntity, insertEntity } = require('./entity');


/**
 * Saves settings.
 * @param {Object} aSettingsJSON JSON representing settings.
 */
async function getUserById(aId) {
  return getEntity(aId, TableName.USER);
}


/**
 * Saves settings.
 * @param {Object} aSettingsJSON JSON representing settings.
 */
async function getUserByEmail(aEmail) {
  return getEntity(aEmail, TableName.USER);
}


/**
 * Saves settings.
 * @param {Object} aSettingsJSON JSON representing settings.
 */
async function insertUser(aUser) {
  const id  = await insertEntity(aUser, TableName.USER);
  return id;
}


/**
 * Saves settings.
 * @param {Object} aSettingsJSON JSON representing settings.
 */
async function saveUser(aSettingsJSON) {
  return saveEntity(aSettingsJSON, TableName.SETTINGS);
}


module.exports = {
  saveUser,
  getUser,
};