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
const { wrap } = require('../helpers/db');


/**
 * Selects entity.
 * @param {Object} aId Primary key.
 * @param {string} aTableName
 * @return {Promise} Result
 */
async function selectEntity(aId, aTableName) {
  try {
    const conn = await connection;
    const result = await wrap(r.db(DB_NAME).table(aTableName)
        .get(aId).run(conn));
    return result;
  } catch (e) {
    logger.info(e);
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
    const body = Object.assign({}, aBody);
    //Deleting id to allow DB to generate it.
    delete body.id;
    const conn = await connection;
    const { generated_keys: [ primaryKey = null ] = [] } =
        await wrap(r.db(DB_NAME)
            .table(aTableName).insert(body).run(conn)) || {};
    return primaryKey;
  } catch (e) {
    logger.error(e);
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
    const result = await wrap(r.db(DB_NAME).table(aTableName)
        .get(aId).insert(aBody).run(conn));
    return result;
  } catch (e) {
    logger.error(e);
  }
}

module.exports = {
  selectEntity,
  insertEntity,
  updateEntity,
};