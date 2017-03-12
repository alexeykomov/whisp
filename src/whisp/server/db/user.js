/*
 * Copyright (c) 2013. Reflect, Alex K.
 */

/**
 * @fileoverview DB interaction - settings DAO.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

const { USER } = require('./tables');
const { selectEntity, insertEntity, updateEntity } = require('./entity');
const { DB_NAME, logger } = require('../predefined');
const { proto: { User }} = require('../../../src/proto/commonjs/user_pb');
const { fieldNameFromGetter } = require('../helpers/string');
const { connection } = require('./connection');
const r = require('rethinkdb');


/**
 * Saves settings.
 * @param {Object} aId User id.
 */
async function selectUser(aId) {
  return selectEntity(aId, USER);
}


/**
 * @param {string} aEmail.
 * @return {Promise.<Object>}
 */
async function selectUserByEmail(aEmail) {
  const emailKeyName = fieldNameFromGetter(User.prototype.getEmail.name);
  try {
    const conn = await connection;
    const users = await r.db(DB_NAME).table(USER).filter({
          [emailKeyName]: aEmail
        }).run(conn);
    return users;
  } catch (e) {
    logger.log(e);
  }
}


/**
 * @param {Object} aUser.
 */
async function insertUser(aUser) {
  const id  = await insertEntity(aUser, USER);
  return id;
}


/**
 * Saves settings.
 * @param {Object} aSettingsJSON JSON representing settings.
 */
async function updateUser(aSettingsJSON) {
  return updateEntity(aSettingsJSON, USER);
}


module.exports = {
  updateUser,
  selectUser,
  selectUserByEmail,
  insertUser,
};