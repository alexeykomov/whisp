/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Settings routes.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


const {logger} = require('../predefined');
const { passwordless } = require('../middleware/passwordless');
const { insertUser, selectUserByEmail } = require('../db/user');
const { proto: { User }} = require('../../../src/proto/commonjs/user_pb');


/**
 * Saves user.
 */
function sendToken(req, res) {
  passwordless.requestToken(grantAccess).call(this, req, res);
}


async function grantAccess(email, delivery, callback, req) {
  try {
    const user = await selectUserByEmail(email);
    if (!user) {
      const user = new User();
      user.setEmail(email);
      await insertUser(user);
    }
    callback(null, email);
  } catch (e) {
    logger.error(e);
  }
}


module.exports = {
  sendToken,
};