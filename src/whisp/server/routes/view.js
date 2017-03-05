/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Main view.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


* as appConfig from '../config/appconfig';
{ STATIC_DIR } from '../util/pagehelper';
const install  = require('source-map-support');
const log = appConfig.log;
install();


/**
 * Renders main page for compiled view.
 */
function render(req, res) {
  res.render('main', {
    processed: true,
    staticDir: STATIC_DIR,

    jsFileNames: ['output-compiled-ui.js'],
    cssFileNames: ['output-compiled.css'],
    // Late modules are all js files except first one.
    modules: JSON.stringify([].slice(1)),
    languageNames: JSON.stringify([]),
    user: JSON.stringify({}, null, ' ')
  });
}