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
const TableName = require('./tables');


/**
 * Creates all tables.
 */
async function setup() {
  try {
    const conn = await connection;
    const existingDbs = await r.dbList().run(conn);
    if (!existingDbs.includes(DB_NAME)) {
      await r.dbCreate(DB_NAME).run(conn);
    }

    await createTables(conn);
    logger.info('All tables were created.');
  } catch (e) {
    logger.error(e);
  }
}


async function createTables(conn) {
  const existingTables = await r.db(DB_NAME).tableList().run(conn);

  const tableCreateAttempts = Object.keys(TableName).map(aTableName => {
    return async () => {
      if (!existingTables.includes(aTableName)) {
        const tableCreateResult = await r.db(DB_NAME).tableCreate(aTableName);
        logger.info(`Table ${aTableName} wasn't existing and was created.`);
      } else {
        logger.info(`Table ${aTableName} was existing and was skipped.`);
      }
    }
  });

  return Promise.all(tableCreateAttempts);
}


module.exports = {
  setup,
};