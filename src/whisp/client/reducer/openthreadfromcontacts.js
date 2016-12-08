/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Open chat reducer.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

goog.provide('whisp.reducer.openThreadFromContacts');


goog.require('whisp.State');


/**
 * @param {whisp.State} aOldState
 * @param {whisp.action.OpenThreadFromContactsAction} aOpenThreadFromContactsAction
 * @return {whisp.State}
 */
whisp.reducer.openThreadFromContacts = (aOldState,
                                        aOpenThreadFromContactsAction) => {
  if (goog.DEBUG)
      console.log('aOpenThreadFromContactsAction: ', aOpenThreadFromContactsAction);

  /**@type {whisp.State}*/
  let newStatePart = {};
  const oldThreadId = aOldState.currentThreadId;

  newStatePart.currentContactId = aOpenThreadFromContactsAction.contactId;
  newStatePart.messageDrafts = Object.assign({}, aOldState.messageDrafts);
  newStatePart.messagesShouldBeScrolledDown = true;

  if (aOpenThreadFromContactsAction.threadId) {
    const threadId = aOpenThreadFromContactsAction.threadId;
    newStatePart.messages = aOldState[`cached-messages-${threadId}`] || [];
    newStatePart.currentThreadId = threadId;
    newStatePart.messageDrafts[oldThreadId] =
        aOldState.currentMessageDraft;
    newStatePart.currentMessageDraft = aOldState.messageDrafts[threadId];
  } else {
    newStatePart.contacts = [...aOldState.contacts];
    const contact = goog.array.find(newStatePart.contacts,
        aContact => newStatePart.currentContactId === aContact.getContactId());
    const newThreadId = String(goog.getUid({}));

    newStatePart.threads = [...aOldState.threads, (() => {
      const newThread = new proto.Thread();
      newThread.setName(contact.getName());
      newThread.setThreadId(newThreadId);
      return newThread;
    })()];
    contact.setLinkedThreadId(newThreadId);
    newStatePart.messages = [];
    newStatePart.currentThreadId = newThreadId;
    newStatePart.messageDrafts[oldThreadId] =
        aOldState.currentMessageDraft;
    newStatePart.currentMessageDraft = aOldState.messageDrafts[newThreadId];
  }


  return Object.assign({}, aOldState, newStatePart);
};