/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview Updating message draft action.
 *
 */


goog.provide('whisp.action.SaveSettingsIsFailedAction');
goog.provide('whisp.action.SaveSettingsIsFailedAction.TYPE');


goog.require('whisp.action.Action');


/**
 * @constructor
 * @extends {whisp.action.Action}
 */
whisp.action.SaveSettingsIsFailedAction = function() {
  /**
   * Action type.
   * @type {string}
   */
  this.type = whisp.action.SaveSettingsIsFailedAction.TYPE;
};
goog.inherits(whisp.action.SaveSettingsIsFailedAction, whisp.action.Action);


whisp.action.SaveSettingsIsFailedAction.TYPE = 'SAVE_SETTINGS_IS_FAILED_ACTION';


/**
 * @return {whisp.action.SaveSettingsIsFailedAction}
 */
whisp.action.SaveSettingsIsFailedAction.create = () =>
    /**@type {whisp.action.SaveSettingsIsFailedAction}*/(Object.assign({},
    new whisp.action.SaveSettingsIsFailedAction()));