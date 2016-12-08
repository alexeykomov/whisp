/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Change text area height reducer.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

goog.provide('whisp.reducer.notifyAboutTextAreaResize');


goog.require('whisp.State');


/**
 * @param {whisp.State} aOldState
 * @param {whisp.action.MessagesShouldBeScrolledDownAction} aTextAreaWasResizedAction
 * @return {whisp.State}
 */
whisp.reducer.notifyAboutTextAreaResize = (aOldState, aTextAreaWasResizedAction) => {
  if (aOldState.messagesShouldBeScrolledDown === aTextAreaWasResizedAction.resized) {
    return aOldState;
  } else {

    /**@type {whisp.State}*/
    let newStatePart = {};
    newStatePart.messagesShouldBeScrolledDown = aTextAreaWasResizedAction.resized;

    return Object.assign({}, aOldState, newStatePart);
  }
};
