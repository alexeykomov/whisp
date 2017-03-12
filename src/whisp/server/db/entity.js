/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Generic db functions.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


const r = require('rethinkdb');
const { connection } = require('./connection');
const { DB_NAME, logger } = require('../predefined');


/**
 * Selects entity.
 * @param {Object} aId Primary key.
 * @param {string} aTableName
 * @return {Promise} Result
 */
async function selectEntity(aId, aTableName) {
  try {
    const conn = await connection;
    const getResult = await r.db(DB_NAME).table(aTableName)
        .get(aId).run(conn);
    return getResult;
  } catch (e) {
    logger.log(e);
  }
}


/**
 * Inserts entity.
 * @param {Object} aBody Object representing entity.
 * @param {string} aTableName
 * @return {Promise} Result
 */
async function insertEntity(aBody, aTableName) {
  try {
    const conn = await connection;
    const { generated_keys: [ primaryKey ] = [] } = await r.db(DB_NAME)
        .table(aTableName).insert(aBody).run(conn) || {};
    return primaryKey;
  } catch (e) {
    logger.log(e);
  }
}


/**
 * Updates entity.
 * @param {Object} aId JSON representing entity.
 * @param {Object} aBody JSON representing entity.
 * @param {string} aTableName
 * @return {Promise} Result
 */
async function updateEntity(aId, aBody, aTableName) {
  try {
    const conn = await connection;
    const insertResult = await r.db(DB_NAME).table(aTableName)
        .get(aId).insert(aBody).run(conn);
    return insertResult;
  } catch (e) {
    logger.log(e);
  }
}

module.exports = {
  selectEntity,
  insertEntity,
  updateEntity,
};