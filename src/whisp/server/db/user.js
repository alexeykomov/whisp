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
const { fieldNameFromGetter } = require('../helpers/string');
const { connection } = require('./connection');
const r = require('rethinkdb');
const { wrap } = require('../helpers/db');
require('proto/commonjs/user_pb');


/**
 * Saves settings.
 * @param {string} aId User id.
 */
async function selectUser(aId) {
  return selectEntity(aId, USER);
}


/**
 * @param {string} aEmail.
 * @return {Promise.<proto.User>}
 */
async function selectUserByEmail(aEmail) {
  const emailKey = fieldNameFromGetter(proto.User,
      proto.User.prototype.getEmail);
  try {
    const conn = await connection;
    const usersCursor = await wrap(r.db(DB_NAME).table(USER).filter({
          [emailKey]: aEmail
        }).run(conn));
    const users = await usersCursor.toArray();
    return users.length ? proto.User.fromObject(users[0]) : null;
  } catch (e) {
    logger.error(e);
  }
}


/**
 * @param {proto.User} aUser
 */
async function insertUser(aUser) {
  try {
    const id = await insertEntity(aUser.toObject(), USER);
    return id;
  } catch (e) {
    logger.error(e);
  }
}


/**
 * Saves settings.
 * @param {proto.User} aUser
 */
async function updateUser(aUser) {
  try {
    return updateEntity(aUser.toObject(), USER);
  } catch (e) {
    logger.error(e);
  }
}


module.exports = {
  updateUser,
  selectUser,
  selectUserByEmail,
  insertUser,
};