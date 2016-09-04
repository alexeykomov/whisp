/*
 * Copyright (c) 2016. Reflect, Alex K.
 */

/**
 * @fileoverview Externs for Redux.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


/***/
const Redux = {};


/**
 * @param {Function} reducer A reducing function that
 * returns the next state tree, given the current state tree and an action to
 * handle.
 * @param {Object=} preloadedState The initial state. You may optionally specify
 * it to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session. If you produced reducer with
 * combineReducers, this must be a plain object with the same shape as the keys
 * passed to it. Otherwise, you are free to pass anything that your reducer can
 * understand.
 * @param {Object=} enhancer The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware, time
 * travel, persistence, etc. The only store enhancer that ships with Redux is
 * <code>applyMiddleware()</code>.
 * @return {Store} An object that holds the complete state of your app. The
 * only way to change its state is by dispatching actions. You may also
 * subscribe to the changes to its state to update the UI.
 */
Redux.createStore = function(reducer, preloadedState, enhancer) {};


/**
 * @param {Object.<string, function(Object, Object):Object>} reducers An object
 * whose values correspond to different reducing functions that need to be
 * combined into one. See the notes below for some rules every passed reducer
 * must follow.An object whose values correspond to different reducing functions
 * that need to be combined into one. See the notes below for some rules every
 * passed reducer must follow.
 */
Redux.combineReducers = function(reducers) {};


/**
 * @param {...function(
 *              Store
 *            ):function(function(Action):Object):Action} middlewares
 *            Functions that conform to the Redux middleware API.
 *
 * Each middleware receives Store’s dispatch and getState functions as named
 * arguments, and returns a function. That function will be given the next
 * middleware’s dispatch method, and is expected to return a function of action
 * calling next(action) with a potentially different argument, or at a different
 * time, or maybe not calling it at all. The last middleware in the chain will
 * receive the real store’s dispatch method as the next parameter, thus ending
 * the chain. So, the middleware signature is
 * ({ getState, dispatch }) => next => action.
 */
Redux.applyMiddleware = function(middlewares) {};


/**
 * @param {Function|Object.<string, Function>} actionCreators An action creator,
 * or an object whose values are action creators.
 * @param {function():Object} dispatch A dispatch function available on the
 * Store instance.
 * @return {Function|Object.<string, Function>} An object mimicking the original
 * object, but with each function immediately dispatching the action returned by
 * the corresponding action creator. If you passed a function as actionCreators,
 * the return value will also be a single function.
 */
Redux.bindActionCreators = function(actionCreators, dispatch) {};


/**
 * @param {...function(*):*} functions The functions to compose. Each function
 * is expected to accept a single parameter. Its return value will be provided
 * as an argument to the function standing to the left, and so on. The exception
 * is the right-most argument which can accept multiple parameters, as it will
 * provide the signature for the resulting composed function.
 */
Redux.compose = function(functions) {};


/**
 * @typedef {Object}
 */
const Store = {};


/**
 * @return {Object} The current state tree of your application.
 */
Store.getState = function() {};


/**
 * @param {{type: string}} action A plain object describing the change that
 * makes sense for your application. Actions are the only way to get data into
 * the store, so any data, whether from the UI events, network callbacks, or
 * other sources such as WebSockets needs to eventually be dispatched as
 * actions. Actions must have a type field that indicates the type of action
 * being performed. Types can be defined as constants and imported from another
 * module. It’s better to use strings for type than Symbols because strings are
 * serializable. Other than type, the structure of an action object is really up
 * to you. If you’re interested, check out Flux Standard Action for
 * recommendations on how actions could be constructed.
 * @return {{type: string}}
 */
Store.dispatch = function(action) {};


/**
 * @param {Function} listener The callback to be invoked any time an action has
 * been dispatched, and the state tree might have changed. You may call
 * getState() inside this callback to read the current state tree. It is
 * reasonable to expect that the store’s reducer is a pure function, so you may
 * compare references to some deep path in the state tree to learn whether its
 * value has changed.
 * @return {Function} A function that unsubscribes the change listener.
 */
Store.subscribe = function(listener) {};


/**
 * @param {Function} nextReducer The next reducer for the store to use.
 */
Store.replaceReducer = function(nextReducer) {};


/**
 * @typedef {Object}
 */
const Action = {};


/**
 * @type {string}
 */
Action.type;