/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview Updating message draft action.
 *
 */


goog.provide('whisp.action.UpdateMessageDraftAction');
goog.provide('whisp.action.UpdateMessageDraftAction.TYPE');


goog.require('whisp.action.Action');


/**
 * @param {string} aMessageText Message.
 * @constructor
 * @extends {whisp.action.Action}
 */
whisp.action.UpdateMessageDraftAction = function(aMessageText) {
  /**
   * Action type.
   * @type {string}
   */
  this.type = whisp.action.UpdateMessageDraftAction.TYPE;

  /**
   * @type {string}
   */
  this.messageText = aMessageText;
};
goog.inherits(whisp.action.UpdateMessageDraftAction, whisp.action.Action);


whisp.action.UpdateMessageDraftAction.TYPE = 'UPDATE_MESSAGE_DRAFT_ACTION';


/**
 * @param {string} aMessageText Message.
 * @return {whisp.action.UpdateMessageDraftAction}
 */
whisp.action.UpdateMessageDraftAction.create = (aMessageText) =>
    /**@type {whisp.action.UpdateMessageDraftAction}*/(Object.assign({},
    new whisp.action.UpdateMessageDraftAction(aMessageText)));