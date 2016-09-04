/*
 * Copyright (c) 2013. Reflect, Alex K.
 */

/**
 * @fileoverview Externs for client-side app code.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


/**
 * List of calendars. Each calendar is in form of array of properties.
 * @type {Array.<Array>}
 */
var CALENDARS;


/**
 * Settings object.
 * @type {Object}
 */
var SETTINGS;


/**
 * List of js modules.
 * @type {Array.<string>}
 */
var MODULES;


/**
 * List of (locale, lang name) pairs.
 * @type {Array.<Array.<string>>}
 */
var LANGUAGE_NAMES;


/**
 * User object.
 * @type {Object}
 */
var USER;


/**
 * @type {string}
 */
USER.prototype.username;


/**
 * @type {boolean}
 */
USER.prototype.guest;


/**
 * @type {Object}
 */
var gmonkey;


/**
 * Sent when the worker thread posts a message to its creator.
 * @type {?function(!MessageEvent<*>)}
 */
var onmessage;