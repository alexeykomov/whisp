/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Notify about writing activity reducer.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

goog.provide('whisp.reducer.notifyAboutWritingActivity');


/**
 * @param {whisp.State} aOldState
 * @param {whisp.action.NotifyAboutWritingActivityAction} aNotifyAboutWritingActivityAction
 * @return {whisp.State}
 */
whisp.reducer.notifyAboutWritingActivity = (aOldState, aNotifyAboutWritingActivityAction) => {

  /**
   * This action exists purely to invoke side-effect of sending notification.
   * So nothings's here.
   */

  return aOldState;
};