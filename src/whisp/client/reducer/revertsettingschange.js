/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Send message reducer.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

goog.provide('whisp.reducer.revertSettingsChange');

goog.require('jspb.Message');


/**
 * @param {whisp.State} aOldState
 * @param {whisp.action.ReceiveMessageAction} aReceiveMessageAction
 * @return {whisp.State}
 */
whisp.reducer.revertSettingsChange = (aOldState, aReceiveMessageAction) => {
  /**@type {whisp.State}*/
  let newStatePart = {};

  newStatePart.settings = aOldState.backupSettings.cloneMessage();

  return Object.assign({}, aOldState, newStatePart);
};