/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Send message reducer.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

goog.provide('whisp.reducer.finishSettingsChange');

goog.require('jspb.Message');


/**
 * @param {whisp.State} aOldState
 * @param {whisp.action.SaveSettingsIsSuccessfulAction} aSaveSettingsIsSuccessfulAction
 * @return {whisp.State}
 */
whisp.reducer.finishSettingsChange = (aOldState, aSaveSettingsIsSuccessfulAction) => {
  /**@type {whisp.State}*/
  let newStatePart = {};

  newStatePart.backupSettings = aOldState.settings.cloneMessage();

  return Object.assign({}, aOldState, newStatePart);
};