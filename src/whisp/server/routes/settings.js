/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Settings routes.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


const { updateUser } = require('../db/user');
const { logger } = require('../predefined');


/**
 * Saves user.
 */
async function save(req, res){
  try {
    await updateUser(req.body);
    res.send(200);
  } catch (e) {
    logger.error(e);
    res.send(400);
  }
}


module.exports = {
  save,
};