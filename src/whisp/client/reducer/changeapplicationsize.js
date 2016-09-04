/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Change app size reducer.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

goog.provide('whisp.reducer.changeApplicationSize');


goog.require('whisp.State');


/**
 * @param {whisp.State} aOldState
 * @param {whisp.action.ScreenSizeChangeAction} aScreenSizeChangeAction
 * @return {whisp.State}
 */
whisp.reducer.changeApplicationSize = (aOldState, aScreenSizeChangeAction) => {
  if (aOldState.isSmallScreen == aScreenSizeChangeAction.isSmallScreen) {
    return aOldState;
  } else {
    /**@type {whisp.State}*/
    let newStatePart = {};

    newStatePart.isSmallScreen = aScreenSizeChangeAction.isSmallScreen;
    newStatePart[whisp.state.ScreenManagerType.SIDEPANE_AND_MAINPANE] =
        whisp.state.ScreenManagerState.LEFT;

    return Object.assign({}, aOldState, newStatePart);
  }
};