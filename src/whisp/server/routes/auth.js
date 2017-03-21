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
const User = require('../../../src/proto/commonjs/user_pb').User;
const Settings = require('../../../src/proto/commonjs/settings_pb').Settings;


/**
 * Saves user.
 */
const sendToken = passwordless.requestToken(grantAccess);


async function grantAccess(email, delivery, callback, req) {
  try {
    const user = await selectUserByEmail(email);
    if (!user) {
      const user = new User();
      user.setEmail(email);
      user.setSettings(new Settings);
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