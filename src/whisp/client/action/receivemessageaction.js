/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview A base class for action objects.
 *
 */


goog.provide('whisp.action.ReceiveMessageAction');
goog.provide('whisp.action.ReceiveMessageAction.TYPE');


goog.require('whisp.action.Action');


/**
 * @param {proto.Message} aMessage Incoming message.
 * @constructor
 * @extends {whisp.action.Action}
 */
whisp.action.ReceiveMessageAction = function(aMessage) {
  /**
   * Action type.
   * @type {string}
   */
  this.type = whisp.action.ReceiveMessageAction.TYPE;

  /**
   * Incoming message.
   * @type {proto.Message}
   */
  this.message = aMessage;
};
goog.inherits(whisp.action.ReceiveMessageAction, whisp.action.Action);


whisp.action.ReceiveMessageAction.TYPE = 'RECEIVE_MESSAGE_ACTION';


/**
 * @param {proto.Message} aMessage Incoming message.
 * @return {whisp.action.ReceiveMessageAction}
 */
whisp.action.ReceiveMessageAction.create = (aMessage) =>
    /**@type {whisp.action.ReceiveMessageAction}*/(Object.assign({},
    new whisp.action.ReceiveMessageAction(aMessage)));


