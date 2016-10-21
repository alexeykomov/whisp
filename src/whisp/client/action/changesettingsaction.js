/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview Updating message draft action.
 *
 */


goog.provide('whisp.action.ChangeSettingsAction');
goog.provide('whisp.action.ChangeSettingsAction.TYPE');


goog.require('whisp.action.Action');


/**
 * @param {proto.Settings} aSettings Settings object.
 * @constructor
 * @extends {whisp.action.Action}
 */
whisp.action.ChangeSettingsAction = function(aSettings) {
  /**
   * Action type.
   * @type {string}
   */
  this.type = whisp.action.ChangeSettingsAction.TYPE;

  /**
   * @type {proto.Settings}
   */
  this.settings = aSettings;
};
goog.inherits(whisp.action.ChangeSettingsAction, whisp.action.Action);


whisp.action.ChangeSettingsAction.TYPE = 'CHANGE_SETTINGS_ACTION';


/**
 * @param {proto.Settings} aSettings Settings object.
 * @return {whisp.action.ChangeSettingsAction}
 */
whisp.action.ChangeSettingsAction.create = (aSettings) =>
    /**@type {whisp.action.ChangeSettingsAction}*/(Object.assign({},
    new whisp.action.ChangeSettingsAction(aSettings)));