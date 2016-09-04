/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview Open thread from thread list action.
 *
 */


goog.provide('whisp.action.OpenSettingsAction');
goog.provide('whisp.action.OpenSettingsAction.TYPE');


goog.require('whisp.action.Action');


/**
 * @param {whisp.state.SettingsType} aSettingsItemId Settings item id.
 * @constructor
 * @extends {whisp.action.Action}
 */
whisp.action.OpenSettingsAction = function(aSettingsItemId) {
  /**
   * Action type.
   * @type {string}
   */
  this.type = whisp.action.OpenSettingsAction.TYPE;

  /**
   * Settings item id.
   * @type {whisp.state.SettingsType}
   */
  this.settingsItemId = aSettingsItemId;
};
goog.inherits(whisp.action.OpenSettingsAction, whisp.action.Action);


whisp.action.OpenSettingsAction.TYPE = 'OPEN_SETTINGS_ACTION';



/**
 * @param {whisp.state.SettingsType} aSettingsItemId Settings item id.
 * @return {whisp.action.OpenSettingsAction}
 */
whisp.action.OpenSettingsAction.create = (aSettingsItemId) =>
    /**@type {whisp.action.OpenSettingsAction}*/(Object.assign({},
    new whisp.action.OpenSettingsAction(aSettingsItemId)));


