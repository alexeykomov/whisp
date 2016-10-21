/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Save settings thunk.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.thunk.saveSettings');


goog.require('whisp.action.ChangeSettingsAction');
goog.require('whisp.action.SaveSettingsIsSuccessfulAction');
goog.require('whisp.action.SaveSettingsIsFailedAction');
goog.require('whisp.transport');


/**
 * @param {proto.Settings} aSettings
 * @return {function(proto.Settings):Object}
 */
whisp.thunk.saveSettings = (aSettings) =>
    aDispatch => {
      aDispatch(whisp.action.ChangeSettingsAction.create(aSettings));
      return whisp.transport.saveSettings(aSettings).then(
          aSuccessResponse => {
            aDispatch(whisp.action.SaveSettingsIsSuccessfulAction.create());
            if (aSettings.getReload()) {
              location.reload();
            }
          },
          aError => {
            if (goog.DEBUG) {
              console.log('Save settings error: ', aError);
            }
            aDispatch(whisp.action.SaveSettingsIsFailedAction.create())
          }
      )
    };