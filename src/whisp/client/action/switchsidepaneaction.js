/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview Send message action.
 *
 */


goog.provide('whisp.action.SwitchSidePaneAction');
goog.provide('whisp.action.SwitchSidePaneAction.TYPE');


goog.require('whisp.action.Action');
goog.require('whisp.state.SidePaneType');


/**
 * @param {whisp.state.SidePaneType} aSidePaneType Side pane type.
 * @constructor
 * @extends {whisp.action.Action}
 */
whisp.action.SwitchSidePaneAction = function(aSidePaneType) {
  /**
   * Action type.
   * @type {string}
   */
  this.type = whisp.action.SwitchSidePaneAction.TYPE;

  /**
   * @type {whisp.state.SidePaneType}
   */
  this.isSmallScreen = aSidePaneType;
};
goog.inherits(whisp.action.SwitchSidePaneAction, whisp.action.Action);


whisp.action.SwitchSidePaneAction.TYPE = 'SWITCH_SIDE_PANE_ACTION';


/**
 * @param {whisp.state.SidePaneType} aSidePaneType Side pane type.
 * @return {whisp.action.SwitchSidePaneAction}
 */
whisp.action.SwitchSidePaneAction.create = (aSidePaneType) =>
    /**@type {whisp.action.SwitchSidePaneAction}*/(Object.assign({},
    new whisp.action.SwitchSidePaneAction(aSidePaneType)));