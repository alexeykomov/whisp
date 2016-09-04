/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview Open thread from contacts list action.
 *
 */


goog.provide('whisp.action.OpenThreadFromContactsAction');
goog.provide('whisp.action.OpenThreadFromContactsAction.TYPE');


goog.require('whisp.action.Action');


/**
 * @param {string} aContactId Contact id.
 * @param {string} aThreadId Thread id.
 * @constructor
 * @extends {whisp.action.Action}
 */
whisp.action.OpenThreadFromContactsAction = function(aContactId, aThreadId) {
  /**
   * Action type.
   * @type {string}
   */
  this.type = whisp.action.OpenThreadFromContactsAction.TYPE;

  /**
   * Contact id.
   * @type {string}
   */
  this.contactId = aContactId;

  /**
   * Thread id.
   * @type {string}
   */
  this.threadId = aThreadId;
};
goog.inherits(whisp.action.OpenThreadFromContactsAction, whisp.action.Action);


whisp.action.OpenThreadFromContactsAction.TYPE = 'OPEN_THREAD_FROM_CONTACTS_ACTION';



/**
 * @param {string} aContactId Contact id.
 * @param {string} aThreadId Thread id.
 * @return {whisp.action.OpenThreadFromContactsAction}
 */
whisp.action.OpenThreadFromContactsAction.create = (aContactId, aThreadId) =>
    /**@type {whisp.action.OpenThreadFromContactsAction}*/(Object.assign({},
    new whisp.action.OpenThreadFromContactsAction(aContactId, aThreadId)));


