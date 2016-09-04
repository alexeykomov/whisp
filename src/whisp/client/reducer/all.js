/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Reducer.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.reducer.all');


goog.require('whisp.State');
goog.require('whisp.action.InitAction.TYPE');
goog.require('whisp.action.OpenChatAction.TYPE');
goog.require('whisp.action.SendMessageAction.TYPE');
goog.require('whisp.action.ReceiveMessageAction.TYPE');
goog.require('whisp.action.NotifyAboutWritingActivityAction.TYPE');
goog.require('whisp.action.SwitchSidePaneAction.TYPE');
goog.require('whisp.action.OpenThreadFromContactsAction.TYPE');
goog.require('whisp.action.OpenThreadFromThreadsAction.TYPE');
goog.require('whisp.action.ScreenSlideAction.TYPE');
goog.require('whisp.action.CloseThreadAction.TYPE');
goog.require('whisp.action.ScreenSizeChangeAction.TYPE');
goog.require('whisp.reducer.init');
goog.require('whisp.reducer.openChat');
goog.require('whisp.reducer.sendMessage');
goog.require('whisp.reducer.receiveMessage');
goog.require('whisp.reducer.updateMessageDraft');
goog.require('whisp.reducer.notifyAboutWritingActivity');
goog.require('whisp.reducer.switchSidePane');
goog.require('whisp.reducer.openThreadFromContacts');
goog.require('whisp.reducer.openThreadFromThreads');
goog.require('whisp.reducer.screenSlide');
goog.require('whisp.reducer.closeThread');
goog.require('whisp.reducer.changeApplicationSize');


/**
 * @param {whisp.State} aState whisp.State object.
 * @param {whisp.action.Action} aAction Any action.
 * @return {whisp.State} New state.
 */
whisp.reducer.all = (aState, aAction) => {
  if (typeof aState === 'undefined') {
    return whisp.State;
  }

  switch(aAction.type) {
    case whisp.action.InitAction.TYPE: {
      return whisp.reducer.init(aState,
          /**@type {!whisp.action.InitAction}*/ (aAction));
    }
    case whisp.action.OpenChatAction.TYPE: {
      return whisp.reducer.openChat(aState,
          /**@type {!whisp.action.OpenChatAction}*/ (aAction));
    }
    case whisp.action.SendMessageAction.TYPE: {
      return whisp.reducer.sendMessage(aState,
          /**@type {!whisp.action.SendMessageAction}*/ (aAction));
    }
    case whisp.action.ReceiveMessageAction.TYPE: {
      return whisp.reducer.receiveMessage(aState,
          /**@type {!whisp.action.ReceiveMessageAction}*/ (aAction));
    }
    case whisp.action.UpdateMessageDraftAction.TYPE: {
      return whisp.reducer.updateMessageDraft(aState,
          /**@type {!whisp.action.UpdateMessageDraftAction}*/ (aAction));
    }
    case whisp.action.NotifyAboutWritingActivityAction.TYPE: {
      return whisp.reducer.notifyAboutWritingActivity(aState,
          /**@type {!whisp.action.NotifyAboutWritingActivityAction}*/ (aAction));
    }
    case whisp.action.SwitchSidePaneAction.TYPE: {
      return whisp.reducer.switchSidePane(aState,
          /**@type {!whisp.action.SwitchSidePaneAction}*/ (aAction));
    }
    case whisp.action.OpenThreadFromContactsAction.TYPE: {
      return whisp.reducer.openThreadFromContacts(aState,
          /**@type {!whisp.action.OpenThreadFromContactsAction}*/ (aAction));
    }
    case whisp.action.OpenThreadFromThreadsAction.TYPE: {
      return whisp.reducer.openThreadFromThreads(aState,
          /**@type {!whisp.action.OpenThreadFromThreadsAction}*/ (aAction));
    }
    case whisp.action.ScreenSlideAction.TYPE: {
      return whisp.reducer.screenSlide(aState,
          /**@type {!whisp.action.ScreenSlideAction}*/ (aAction));
    }
    case whisp.action.CloseThreadAction.TYPE: {
      return whisp.reducer.closeThread(aState,
          /**@type {!whisp.action.CloseThreadAction}*/ (aAction));
    }
    case whisp.action.ScreenSizeChangeAction.TYPE: {
      return whisp.reducer.changeApplicationSize(aState,
          /**@type {!whisp.action.ScreenSizeChangeAction}*/ (aAction));
    }
    default:{return aState;}
  }
};