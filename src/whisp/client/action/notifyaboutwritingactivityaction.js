/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview Action is dispatched when sender changes message box, so that
 * recipient sees bubble.
 */


goog.provide('whisp.action.NotifyAboutWritingActivityAction');
goog.provide('whisp.action.NotifyAboutWritingActivityAction.TYPE');


goog.require('whisp.action.Action');


/**
 * @constructor
 * @extends {whisp.action.Action}
 */
whisp.action.NotifyAboutWritingActivityAction = function() {
  /**
   * Action type.
   * @type {string}
   */
  this.type = whisp.action.NotifyAboutWritingActivityAction.TYPE;
};
goog.inherits(whisp.action.NotifyAboutWritingActivityAction, whisp.action.Action);


whisp.action.NotifyAboutWritingActivityAction.TYPE = 'NOTIFY_ABOUT_WRITING_ACTIVITY';


/**
 * @return {whisp.action.NotifyAboutWritingActivityAction}
 */
whisp.action.NotifyAboutWritingActivityAction.create = () =>
    /**@type {whisp.action.NotifyAboutWritingActivityAction}*/(Object.assign({},
    new whisp.action.NotifyAboutWritingActivityAction()));