/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Settings routes.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


const { logger } = require('../predefined');
const { passwordless } = require('../middleware/passwordless');
const { insertUser, selectUserByEmail } = require('../db/user');
require('proto/commonjs/user_pb');
require('proto/commonjs/settings_pb');


/**
 * Saves user.
 */
const sendToken = passwordless.requestToken(grantAccess);


async function grantAccess(email, delivery, callback, req) {
      console.log('grantAccess: ', email);
  try {
    let user = await selectUserByEmail(email);
    if (!user) {
      user = new proto.User();
      user.setEmail(email);
      user.setSettings(new proto.Settings);
      await insertUser(user);
    }
    callback(null, email);
  } catch (e) {
    logger.error(e);
    callback(e, null);
  }
}


module.exports = {
  sendToken,
};