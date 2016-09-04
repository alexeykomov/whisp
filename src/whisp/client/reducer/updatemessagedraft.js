/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Send message reducer.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

goog.provide('whisp.reducer.updateMessageDraft');


goog.require('whisp.State');
goog.require('proto.Message');


/**
 * @param {whisp.State} aOldState
 * @param {whisp.action.UpdateMessageDraftAction} aUpdateMessageDraftAction
 * @return {whisp.State}
 */
whisp.reducer.updateMessageDraft = (aOldState, aUpdateMessageDraftAction) => {
  /**@type {whisp.State}*/
  let newStatePart = {};

  newStatePart.currentMessageDraft = aUpdateMessageDraftAction.messageText;

  return Object.assign({}, aOldState, newStatePart);
};