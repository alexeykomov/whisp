/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Send message reducer.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

goog.provide('whisp.reducer.changeSettings');

goog.require('whisp.State');
goog.require('jspb.Message');


/**
 * @param {whisp.State} aOldState
 * @param {whisp.action.ChangeSettingsAction} aChangeSettingsAction
 * @return {whisp.State}
 */
whisp.reducer.changeSettings = (aOldState, aChangeSettingsAction) => {
  /**@type {whisp.State}*/
  let newStatePart = {};

  newStatePart.settings = aChangeSettingsAction.settings.cloneMessage();

  return Object.assign({}, aOldState, newStatePart);
};