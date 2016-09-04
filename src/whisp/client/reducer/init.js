/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Init reducer.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

goog.provide('whisp.reducer.init');


goog.require('whisp.State');


/**
 * @param {whisp.State} aOldState
 * @param {whisp.action.InitAction} aInitAction
 * @return {whisp.State}
 */
whisp.reducer.init = (aOldState, aInitAction) => {
  return Object.assign({}, aOldState);
};