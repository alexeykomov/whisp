/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview Send message action.
 *
 */


goog.provide('whisp.action.SendMessageAction');
goog.provide('whisp.action.SendMessageAction.TYPE');


goog.require('whisp.action.Action');


/**
 * @param {string} aMessageText Message.
 * @constructor
 * @extends {whisp.action.Action}
 */
whisp.action.SendMessageAction = function(aMessageText) {
  /**
   * Action type.
   * @type {string}
   */
  this.type = whisp.action.SendMessageAction.TYPE;

  /**
   * @type {string}
   */
  this.messageText = aMessageText;
};
goog.inherits(whisp.action.SendMessageAction, whisp.action.Action);


whisp.action.SendMessageAction.TYPE = 'SEND_MESSAGE_ACTION';


/**
 * @param {string} aMessageText Message.
 * @return {whisp.action.SendMessageAction}
 */
whisp.action.SendMessageAction.create = (aMessageText) =>
    /**@type {whisp.action.SendMessageAction}*/(Object.assign({},
    new whisp.action.SendMessageAction(aMessageText)));