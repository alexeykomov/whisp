/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview DB connection.
 * @author alexeykofficial@gmail.com (Alex K.)
 */


const r = require('rethinkdb');
import { DB_SERVER as host, DB_NAME, DB_PORT as port} from '../predefined'
const P = require('bluebird');


export const connection = P.promisify(r.connect)({host, port});

