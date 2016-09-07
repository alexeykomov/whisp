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

  const oldThreadId = aOldState.currentThreadId;
  const newThreadId = aOpenThreadFromThreadsAction.threadId;

  newStatePart.currentThreadId = newThreadId;
  //Cache previous thread.
  newStatePart.messages = aOldState[`cached-messages-${
      newThreadId}`] || [];
  newStatePart.messageDrafts = Object.assign({}, aOldState.messageDrafts);
  newStatePart.messageDrafts[oldThreadId] =
      aOldState.currentMessageDraft;
  newStatePart.currentMessageDraft = aOldState.messageDrafts[newThreadId];

  const correspondingContact = goog.array.find(aOldState.contacts,
      aContact => newThreadId === aContact.getLinkedThreadId());
  newStatePart.currentContactId = correspondingContact && correspondingContact.
      getContactId();

  return Object.assign({}, aOldState, newStatePart);
};