/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Main view.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


import * as appConfig from '../config/appconfig';
import { STATIC_DIR } from '../util/pagehelper';
const install  = require('source-map-support');
const log = appConfig.log;
install();


/**
 * Saves user.
 */
export function save(req, res){
  var onUserSave = function(aUserId) {
    res.send(JSON.stringify(aUserId));
  }

  userDAO.saveUserAsync(req.body, onUserSave);
};