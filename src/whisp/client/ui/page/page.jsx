/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application main body, root of all components.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.Page');


goog.require('goog.array');
goog.require('whisp.i18n.Symbols');
goog.require('whisp.ui.Messages');
goog.require('whisp.ui.MessageBar');
goog.require('whisp.ui.NavBar');


/**
 *
 */
whisp.ui.Page = React.createClass({
  propTypes: {
    child: React.PropTypes.element.isRequired,
  },

  getDefaultProps() {
    return {
      child: null
    }
  },

  render() {
    return (
        <div className="screen" style={{
          transform: `translate3d(${index}%,0,0)`
        }}>
          {this.props.child}
        </div>
    );
  }
});