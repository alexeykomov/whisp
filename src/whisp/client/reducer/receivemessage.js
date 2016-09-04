/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Send message reducer.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

goog.provide('whisp.reducer.receiveMessage');


goog.require('whisp.State');
goog.require('goog.array');


/**
 * @param {whisp.State} aOldState
 * @param {whisp.action.ReceiveMessageAction} aReceiveMessageAction
 * @return {whisp.State}
 */
whisp.reducer.receiveMessage = (aOldState, aReceiveMessageAction) => {
  /**@type {whisp.State}*/
  let newStatePart = {};

  newStatePart.messages = [...aOldState.messages];
  goog.array.binaryInsert(newStatePart.messages, aReceiveMessageAction.message,
      (a, b) => {
        if (a.getSenderId() == b.getSenderId()) {
          return a.getSentTimestamp() < b.getSentTimestamp() ? -1 :
              a.getSentTimestamp() > b.getSentTimestamp() ? 1 : 0;
        } else {
          return 0;
        }
      });

  newStatePart[`cached-messages-${aOldState.currentThreadId}`] =
      newStatePart.messages;

  return Object.assign({}, aOldState, newStatePart);
};