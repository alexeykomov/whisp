/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Send message reducer.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

goog.provide('whisp.reducer.switchSidePane');


goog.require('whisp.State');


/**
 * @param {whisp.State} aOldState
 * @param {whisp.action.SwitchSidePaneAction} aSwitchSidePaneAction
 * @return {whisp.State}
 */
whisp.reducer.switchSidePane = (aOldState, aSwitchSidePaneAction) => {
  /**@type {whisp.State}*/
  let newStatePart = {};

  newStatePart.activeSidePaneType = aSwitchSidePaneAction.isSmallScreen;

  return Object.assign({}, aOldState, newStatePart);
};