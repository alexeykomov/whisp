/**
 * Created by alexk on 8/3/16.
 */


/**
 * @fileoverview A base class for action objects.
 *
 */


goog.provide('whisp.action.Action');
goog.provide('whisp.action.Action.TYPE');



/**
 * A base class for action objects.
 *
 * @constructor
 */
whisp.action.Action = function() {
  /**
   * Action type.
   * @type {string}
   */
  this.type = whisp.action.Action.TYPE;
};


whisp.action.Action.TYPE = 'BASE_ACTION';


/**
 * @return {whisp.action.Action}
 */
whisp.action.Action.create = () =>
    /**@type {whisp.action.InitAction}*/(Object.assign({},
    new whisp.action.Action()));