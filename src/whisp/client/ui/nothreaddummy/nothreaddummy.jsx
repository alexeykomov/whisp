/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application main body, root of all components.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.NoThreadDummy');


goog.require('whisp.i18n.Symbols');


/**
 *
 */
whisp.ui.NoThreadDummy = React.createClass({
  shouldComponentUpdate() {
    return false
  },

  render() {
    return (
        <div className="view view-main navbar-through no-thread-dummy">
          {whisp.i18n.Symbols.NO_THREADS}
        </div>
    );
  }
});