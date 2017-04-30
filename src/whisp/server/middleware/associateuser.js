/*
 * Copyright (c) 2013. Reflect, Alex K.
 */

/**
 * @fileoverview Put user in request middleware.
 */


const {
    logger,
} = require('../predefined');
const { selectUserByEmail, insertUser } = require('../db/user');
require('proto/commonjs/user_pb');


async function associateUser(req, res, next) {
  try {
    const email = req.user;
    if (email) {
      let user = await selectUserByEmail(email);
      console.log('user: ', user);
      if (!user) {
        user = new proto.User();
        user.setEmail(email);
        await insertUser(user);
      }
      res.locals.user = user;
      next();
    } else {
      next();
    }
  } catch (e) {
    logger.error(e);
    next();
  }
}

module.exports = {
  associateUser,
};
