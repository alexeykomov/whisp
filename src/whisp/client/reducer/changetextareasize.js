/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Change text area height reducer.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

goog.provide('whisp.reducer.changeTextAreaHeight');


goog.require('whisp.State');


/**
 * @param {whisp.State} aOldState
 * @param {whisp.action.ChangeTextAreaSizeAction} aChangeTextAreaSizeAction
 * @return {whisp.State}
 */
whisp.reducer.changeTextAreaHeight = (aOldState, aChangeTextAreaSizeAction) => {
  if (aOldState.textAreaHeight === aChangeTextAreaSizeAction.height) {
    return aOldState;
  } else {

    /**@type {whisp.State}*/
    let newStatePart = {};
    newStatePart.textAreaHeight = aChangeTextAreaSizeAction.height;

    return Object.assign({}, aOldState, newStatePart);
  }
};
