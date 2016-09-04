/**
 * Created by alexk on 8/3/16.
 */


/**
 * @fileoverview Action dispatched on application load.
 *
 */


goog.provide('whisp.action.InitAction');
goog.provide('whisp.action.InitAction.TYPE');



/**
 * Init action.
 * @constructor
 * @extends {whisp.action.Action}
 */
whisp.action.InitAction = function() {
  /**
   * InitAction type.
   * @type {string}
   */
  this.type = whisp.action.InitAction.TYPE;
};
goog.inherits(whisp.action.InitAction, whisp.action.Action);


whisp.action.InitAction.TYPE = 'INIT_ACTION';


/**
 * @return {whisp.action.InitAction}
 */
whisp.action.InitAction.create = () =>
    /**@type {whisp.action.InitAction}*/(Object.assign({},
    new whisp.action.InitAction()));