/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview Change text area size action.
 *
 */


goog.provide('whisp.action.ChangeTextAreaSizeAction');
goog.provide('whisp.action.ChangeTextAreaSizeAction.TYPE');


goog.require('whisp.action.Action');


/**
 * @param {string} aHeight Message.
 * @constructor
 * @extends {whisp.action.Action}
 */
whisp.action.ChangeTextAreaSizeAction = function(aHeight) {
  /**
   * Action type.
   * @type {string}
   */
  this.type = whisp.action.ChangeTextAreaSizeAction.TYPE;

  /**
   * @type {string}
   */
  this.height = aHeight;
};
goog.inherits(whisp.action.ChangeTextAreaSizeAction, whisp.action.Action);


whisp.action.ChangeTextAreaSizeAction.TYPE = 'CHANGE_TEXT_AREA_HEIGHT_ACTION';


/**
 * @param {string} aHeight Message.
 * @return {whisp.action.ChangeTextAreaSizeAction}
 */
whisp.action.ChangeTextAreaSizeAction.create = (aHeight) =>
    /**@type {whisp.action.ChangeTextAreaSizeAction}*/(Object.assign({},
    new whisp.action.ChangeTextAreaSizeAction(aHeight)));