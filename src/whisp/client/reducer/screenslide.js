/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Send message reducer.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

goog.provide('whisp.reducer.screenSlide');


goog.require('whisp.State');


/**
 * @param {whisp.State} aOldState
 * @param {whisp.action.ScreenSlideAction} aScreenSlideAction
 * @return {whisp.State}
 */
whisp.reducer.screenSlide = (aOldState, aScreenSlideAction) => {
  /**@type {whisp.State}*/
  let newStatePart = {};

  newStatePart[aScreenSlideAction.screenManagerType] =
      aScreenSlideAction.screenManagerState;

  return Object.assign({}, aOldState, newStatePart);
};