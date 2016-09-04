/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application main body, root of all components.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.NavBar');


goog.require('whisp.ui.Messages');
goog.require('whisp.ui.MessageBar');


/**
 *
 */
whisp.ui.NavBar = React.createClass({
  propTypes: {
    header: React.PropTypes.element.isRequired,
    headerClassName: React.PropTypes.string.isRequired,
  },

  render() {
    return (
        <nav className="navbar">
          <div className="navbar-inner">
            <div className="left"/>
            <div className={`center ${this.props.headerClassName}`}>
              {this.props.header}
            </div>
            <div className="right"/>
          </div>
        </nav>
    );
  }
});