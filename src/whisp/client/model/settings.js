/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Settings.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('proto.Settings');


goog.require('whisp.i18n.Symbols');


/**
 * @typedef {Object}
 * Settings are in separate object.
 */
proto.Settings = {
  /**
   * @type {string}
   */
  'uiLanguage': whisp.i18n.Symbols.LANGUAGE_NAMES[0][0],

  /**
   * Whether we need to reload after applying these settings.
   * @type {boolean}
   */
  'reload': false,
};
