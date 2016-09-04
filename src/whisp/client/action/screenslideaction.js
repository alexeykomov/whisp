/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview Updating message draft action.
 *
 */


goog.provide('whisp.action.ScreenSlideAction');
goog.provide('whisp.action.ScreenSlideAction.TYPE');


goog.require('whisp.action.Action');


/**
 * @param {whisp.state.ScreenManagerType} screenManagerType Screen manager type.
 * @param {whisp.state.ScreenManagerState} screenManagerState Screen manager state.
 * @constructor
 * @extends {whisp.action.Action}
 */
whisp.action.ScreenSlideAction = function(screenManagerType, screenManagerState) {
  /**
   * Action type.
   * @type {string}
   */
  this.type = whisp.action.ScreenSlideAction.TYPE;

  /**
   * @type {whisp.state.ScreenManagerType}
   */
  this.screenManagerType = screenManagerType;

  /**
   * @type {whisp.state.ScreenManagerState}
   */
  this.screenManagerState = screenManagerState;
};
goog.inherits(whisp.action.ScreenSlideAction, whisp.action.Action);


whisp.action.ScreenSlideAction.TYPE = 'SCREEN_SLIDE_ACTION';


/**
 * @param {whisp.state.ScreenManagerType} screenManagerType Screen manager type.
 * @param {whisp.state.ScreenManagerState} screenManagerState Screen manager state.
 * @return {whisp.action.ScreenSlideAction}
 */
whisp.action.ScreenSlideAction.create = (screenManagerType, screenManagerState) =>
    /**@type {whisp.action.ScreenSlideAction}*/(Object.assign({},
    new whisp.action.ScreenSlideAction(screenManagerType, screenManagerState)));