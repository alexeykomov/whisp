/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview Close thread action.
 *
 */


goog.provide('whisp.action.CloseThreadAction');
goog.provide('whisp.action.CloseThreadAction.TYPE');


goog.require('whisp.action.Action');


/**
 * @constructor
 * @extends {whisp.action.Action}
 */
whisp.action.CloseThreadAction = function() {
  /**
   * Action type.
   * @type {string}
   */
  this.type = whisp.action.CloseThreadAction.TYPE;
};
goog.inherits(whisp.action.CloseThreadAction, whisp.action.Action);


whisp.action.CloseThreadAction.TYPE = 'CLOSE_THREAD_ACTION';



/**
 * @return {whisp.action.CloseThreadAction}
 */
whisp.action.CloseThreadAction.create = () =>
    /**@type {whisp.action.CloseThreadAction}*/(Object.assign({},
    new whisp.action.CloseThreadAction()));


