/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview Updating message draft action.
 *
 */


goog.provide('whisp.action.SaveSettingsIsSuccessfulAction');
goog.provide('whisp.action.SaveSettingsIsSuccessfulAction.TYPE');


goog.require('whisp.action.Action');


/**
 * @constructor
 * @extends {whisp.action.Action}
 */
whisp.action.SaveSettingsIsSuccessfulAction = function() {
  /**
   * Action type.
   * @type {string}
   */
  this.type = whisp.action.SaveSettingsIsSuccessfulAction.TYPE;
};
goog.inherits(whisp.action.SaveSettingsIsSuccessfulAction, whisp.action.Action);


whisp.action.SaveSettingsIsSuccessfulAction.TYPE = 'SAVE_SETTINGS_IS_SUCCESSFUL_ACTION';


/**
 * @return {whisp.action.SaveSettingsIsSuccessfulAction}
 */
whisp.action.SaveSettingsIsSuccessfulAction.create = () =>
    /**@type {whisp.action.SaveSettingsIsSuccessfulAction}*/(Object.assign({},
    new whisp.action.SaveSettingsIsSuccessfulAction()));