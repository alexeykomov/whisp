/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview DB helpers.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


/**
 * Wraps RethinkDB requests in order to catch errors from DB result.
 * @param {Promise} request
 * @return {Promise} Result
 */
async function wrap(request) {
  const result = await request;
  if (result.errors) {
    return Promise.reject(result);
  }
  return result;
}


module.exports = {
  wrap,
};