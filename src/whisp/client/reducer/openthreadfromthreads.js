/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Open thread form threads reducer.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

goog.provide('whisp.reducer.openThreadFromThreads');


goog.require('whisp.State');
goog.require('goog.array');


/**
 * @param {whisp.State} aOldState
 * @param {whisp.action.OpenThreadFromThreadsAction} aOpenThreadFromThreadsAction
 * @return {whisp.State}
 */
whisp.reducer.openThreadFromThreads = (aOldState, aOpenThreadFromThreadsAction) => {
  /**@type {whisp.State}*/
  let newStatePart = {};

  const threadId = aOpenThreadFromThreadsAction.threadId;
  newStatePart.currentThreadId = threadId;
  //Cache previous thread.
  newStatePart.messages = aOldState[`cached-messages-${
      threadId}`] || [];

  const correspondingContact = goog.array.find(aOldState.contacts,
      aContact => threadId === aContact.getLinkedThreadId());
  newStatePart.currentContactId = correspondingContact && correspondingContact.
      getContactId();

  return Object.assign({}, aOldState, newStatePart);
};