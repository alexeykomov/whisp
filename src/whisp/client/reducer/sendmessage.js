/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Send message reducer.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

goog.provide('whisp.reducer.sendMessage');


goog.require('whisp.State');
goog.require('proto.Message');
goog.require('goog.array');
goog.require('goog.string');


/**
 * @param {whisp.State} aOldState
 * @param {whisp.action.SendMessageAction} aSendMessageAction
 * @return {whisp.State}
 */
whisp.reducer.sendMessage = (aOldState, aSendMessageAction) => {
  /**@type {whisp.State}*/
  let newStatePart = {};

  const newMessage = new proto.Message();
  const messageText = aSendMessageAction.messageText;

  if (messageText && !/^\s+$/.test(messageText)) {
    newMessage.setMessageText(messageText);

    newStatePart.messages = [...aOldState.messages, newMessage];
    newStatePart[`cached-messages-${aOldState.currentThreadId}`] =
        newStatePart.messages;
    newStatePart.threads = [...aOldState.threads];
    const threadToUpdate = goog.array.find(newStatePart.threads, aThread =>
        aThread.getThreadId() === aOldState.currentThreadId);
    threadToUpdate.setLastMessagePreview(goog.string.truncate(messageText, 100));

    newStatePart.currentMessageDraft = '';
  }

  return Object.assign({}, aOldState, newStatePart);
};