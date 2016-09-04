/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview Open thread from thread list action.
 *
 */


goog.provide('whisp.action.OpenThreadFromThreadsAction');
goog.provide('whisp.action.OpenThreadFromThreadsAction.TYPE');


goog.require('whisp.action.Action');


/**
 * @param {string} aContactId Contact Id.
 * @constructor
 * @extends {whisp.action.Action}
 */
whisp.action.OpenThreadFromThreadsAction = function(aContactId) {
  /**
   * Action type.
   * @type {string}
   */
  this.type = whisp.action.OpenThreadFromThreadsAction.TYPE;

  /**
   * Thread id.
   * @type {string}
   */
  this.threadId = aContactId;
};
goog.inherits(whisp.action.OpenThreadFromThreadsAction, whisp.action.Action);


whisp.action.OpenThreadFromThreadsAction.TYPE = 'OPEN_THREAD_FROM_THREADS_ACTION';



/**
 * @param {string} aThreadId Thread id.
 * @return {whisp.action.OpenThreadFromThreadsAction}
 */
whisp.action.OpenThreadFromThreadsAction.create = (aThreadId) =>
    /**@type {whisp.action.OpenThreadFromThreadsAction}*/(Object.assign({},
    new whisp.action.OpenThreadFromThreadsAction(aThreadId)));


