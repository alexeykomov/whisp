/*
 * Copyright (c) 2013. Reflect, Alex K.
 */

/**
 * @fileoverview Put user in request middleware.
 */


const {
    logger,
} = require('../predefined');
const { selectUser } = require('../db/user');


async function associateUser(req, res, next) {
  try {
    const userId = req.user;
    if (userId) {
      const user = await selectUser(userId);
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
