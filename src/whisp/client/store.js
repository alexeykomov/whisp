/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Store.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.Store');


goog.require('whisp.reducer.all');


/**
 * @type {Store}
 * @const
 */
whisp.Store = Redux.createStore(whisp.reducer.all, Redux.applyMiddleware(
    ReduxThunk.default));