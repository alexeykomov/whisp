/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview DB setup.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


const r = require('rethinkdb');
const { connection } = require('./connection');
const { logger, DB_NAME } = require('../predefined');
const { TableName } = require('./constants');


/**
 * Creates all tables.
 */
async function setup() {
  try {
    const conn = await connection;
    const existingTables = await r.db(DB_NAME).tableList().run(conn);

    const tableCreateAttempts = Object.keys(TableName).map(aTableName => {
      return async () => {
        if (existingTables.indexOf(aTableName) < 0) {
          const tableCreateResult = await r.db(DB_NAME).tableCreate(aTableName);
          logger.log(`Table ${aTableName} wasn't existing and was created.`);
        } else {
          logger.log(`Table ${aTableName} was existing and was skipped.`);
        }
      }
    });

    await Promise.all(tableCreateAttempts);
    logger.log('All tables were created.');
  } catch (e) {
    logger.error(e);
  }
}


module.exports = {
  setup,
};