/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Open chat reducer.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

goog.provide('whisp.reducer.openChat');


goog.require('whisp.State');


/**
 * @param {whisp.State} aOldState
 * @param {whisp.action.OpenChatAction} aOpenChatAction
 * @return {whisp.State}
 */
whisp.reducer.openChat = (aOldState, aOpenChatAction) => {
  /**@type {whisp.State}*/
  let newStatePart = {};

  //Cache previous thread.
  newStatePart.currentChatId = aOpenChatAction.contactId;
  newStatePart.messages = aOldState[`cached-messages-${
      aOpenChatAction.contactId}`] || [];

  return Object.assign({}, aOldState, newStatePart);
};