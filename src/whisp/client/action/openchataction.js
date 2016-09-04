/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview Open chat action.
 *
 */


goog.provide('whisp.action.OpenChatAction');
goog.provide('whisp.action.OpenChatAction.TYPE');


goog.require('whisp.action.Action');


/**
 * @param {string} aContactId Contact Id.
 * @constructor
 * @extends {whisp.action.Action}
 */
whisp.action.OpenChatAction = function(aContactId) {
  /**
   * Action type.
   * @type {string}
   */
  this.type = whisp.action.OpenChatAction.TYPE;

  /**
   * Contact id.
   * @type {string}
   */
  this.threadId = aContactId;
};
goog.inherits(whisp.action.OpenChatAction, whisp.action.Action);


whisp.action.OpenChatAction.TYPE = 'OPEN_CHAT_ACTION';



/**
 * @param {string} aContactId Contact Id.
 * @return {whisp.action.OpenChatAction}
 */
whisp.action.OpenChatAction.create = (aContactId) =>
    /**@type {whisp.action.OpenChatAction}*/(Object.assign({},
    new whisp.action.OpenChatAction(aContactId)));


