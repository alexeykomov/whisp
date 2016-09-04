/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application main body, root of all components.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.NoMessagesDummy');


goog.require('whisp.i18n.Symbols');
goog.require('whisp.i18n.Symbols');


/**
 *
 */
whisp.ui.NoMessagesDummy = React.createClass({
  propTypes: {
    avatarLink: React.PropTypes.string.isRequired,
  },

  getDefaultProps() {
    return {
      avatarLink: '',
    }
  },

  shouldComponentUpdate(aProps, aState) {
    return aProps.avatarLink !==
        this.props.avatarLink
  },

  render() {
    return (
        <div className="page-content messages-content no-messages-dummy">
          <div className="avatar" style={{
            backgroundImage: `url(${
                this.props.avatarLink})`
          }}/>
          <div className="no-messages-text">
            {whisp.i18n.Symbols.NO_MESSAGES}
          </div>
        </div>
    );
  }
});