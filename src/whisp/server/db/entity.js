/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview DB interaction - settings DAO.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


const r = require('rethinkdb');
const { connection } = require('./connection');
const { DB_NAME } = require('../predefined');


/**
 * Saves entity.
 * @param {Object} aBody JSON representing condition.
 * @param {string} aTableName
 * @return {Promise} Result
 */
async function getEntity(aBody, aTableName) {
  try {
    const conn = await connection;
    const getResult = await r.db(DB_NAME).table(aTableName)
        .select(aBody).run(conn);
    return getResult;
  } catch (e) {
    logger.log(e);
  }
}


/**
 * Saves entity.
 * @param {Object} aBody JSON representing entity.
 * @param {string} aTableName
 * @return {Promise} Result
 */
async function insertEntity(aBody, aTableName) {
  try {
    const conn = await connection;
    const { generated_keys: [ primaryKey ] = [] } = await r.db(DB_NAME)
        .table(aTableName).insert(aBody).run(conn);
    return primaryKey;
  } catch (e) {
    logger.log(e);
  }
}


/**
 * Saves entity.
 * @param {Object} aBody JSON representing entity.
 * @param {string} aTableName
 * @return {Promise} Result
 */
async function updateEntity(aId, aBody, aTableName) {
  try {
    const conn = await connection;
    const insertResult = await r.db(DB_NAME).table(aTableName)
        .insert(aBody).run(conn);
    return insertResult;
  } catch (e) {
    logger.log(e);
  }
}

module.exports = {
  saveEntity,
  insertEntity,
  updateEntity,
};