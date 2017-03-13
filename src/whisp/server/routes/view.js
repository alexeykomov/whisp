/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview View routes.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


const { selectUser } = require('../db/user');
const { logger } = require('../predefined');


/**
 * Saves user.
 */
async function render(req, res) {
  try {
    const user = await selectUser(req.user);
    res.render('main', {
      jsFileNames: ['output-compiled-ui.js'],
      cssFileNames: ['output-compiled.css'],
      // Late modules are all js files except first one.
      modules: JSON.stringify([].slice(1)),
      languageNames: JSON.stringify([]),
      user: JSON.stringify(user, null, ' '),
    });
  } catch (e) {
    logger.error(e);
    res.send(400);
  }
}


module.exports = {
  render,
};

