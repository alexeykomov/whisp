/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview DB interaction - settings DAO.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

const { TableName } = require('./constants');
const { getEntity, insertEntity } = require('./entity');


/**
 * Saves settings.
 * @param {Object} aSettingsJSON JSON representing settings.
 */
async function selectUser(aId) {
  return getEntity(aId, TableName.USER);
}


/**
 * @param {string} aEmail.
 * @return {Promise.<Object>}
 */
async function selectUserByEmail(aEmail) {
  return getEntity(aEmail, TableName.USER);
}


/**
 * @param {Object} aUser.
 */
async function insertUser(aUser) {
  const id  = await insertEntity(aUser, TableName.USER);
  return id;
}


/**
 * Saves settings.
 * @param {Object} aSettingsJSON JSON representing settings.
 */
async function updateUser(aSettingsJSON) {
  return saveEntity(aSettingsJSON, TableName.SETTINGS);
}


module.exports = {
  updateUser,
  selectUser,
  selectUserByEmail,
  insertUser,
};