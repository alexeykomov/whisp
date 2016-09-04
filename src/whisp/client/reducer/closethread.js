/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Open chat reducer.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

goog.provide('whisp.reducer.closeThread');


goog.require('whisp.State');


/**
 * @param {whisp.State} aOldState
 * @param {whisp.action.CloseThreadAction} aCloseThreadAction
 * @return {whisp.State}
 */
whisp.reducer.closeThread = (aOldState, aCloseThreadAction) => {
  /**@type {whisp.State}*/
  let newStatePart = {};

  //Сlear previous thread.
  newStatePart.currentThreadId = '';
  //Сlear previous contact.
  newStatePart.currentContactId = '';

  return Object.assign({}, aOldState, newStatePart);
};