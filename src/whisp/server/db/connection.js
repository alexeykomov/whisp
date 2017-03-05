/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview DB connection.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


const r = require('rethinkdb');
const { DB_SERVER, DB_NAME, DB_PORT} = require('../predefined');
const P = require('bluebird');


const connection = P.promisify(r.connect)({DB_SERVER, DB_PORT});


module.exports = {
  connection,
};

