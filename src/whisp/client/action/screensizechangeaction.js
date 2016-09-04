/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview Screen change action.
 *
 */


goog.provide('whisp.action.ScreenSizeChangeAction');
goog.provide('whisp.action.ScreenSizeChangeAction.TYPE');


goog.require('whisp.action.Action');



/**
 * @param {boolean} aSmallScreen Whether screen is small.
 * @constructor
 * @extends {whisp.action.Action}
 */
whisp.action.ScreenSizeChangeAction = function(aSmallScreen) {
  /**
   * Action type.
   * @type {string}
   */
  this.type = whisp.action.ScreenSizeChangeAction.TYPE;

  /**
   * @type {boolean}
   */
  this.isSmallScreen = aSmallScreen;
};
goog.inherits(whisp.action.ScreenSizeChangeAction, whisp.action.Action);


whisp.action.ScreenSizeChangeAction.TYPE = 'SCREEN_SIZE_CHANGE_ACTION';


/**
 * @param {boolean} aSmallScreen Whether screen is small.
 * @return {whisp.action.ScreenSizeChangeAction}
 */
whisp.action.ScreenSizeChangeAction.create = (aSmallScreen) =>
    /**@type {whisp.action.ScreenSizeChangeAction}*/(Object.assign({},
    new whisp.action.ScreenSizeChangeAction(aSmallScreen)));