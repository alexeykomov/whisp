/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Save settings thunk.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.thunk.modifyTextAreaSize');


goog.require('whisp.action.ChangeSettingsAction');
goog.require('whisp.action.SaveSettingsIsSuccessfulAction');
goog.require('whisp.action.SaveSettingsIsFailedAction');
goog.require('whisp.transport');
goog.require('goog.style');


/**
 * @param {proto.Settings} aValue
 * @return {function(proto.Settings):Object}
 */
whisp.thunk.modifyTextAreaSize = (aValue) =>
    aDispatch => {
      const messageBoxMirror = document.getElementById('message-box-mirror');
      const { height } = goog.style.getSize(messageBoxMirror);
      if (goog.DEBUG)
        console.log('height: ', height);
      aDispatch(whisp.action.ChangeTextAreaSizeAction.create(height));
    };