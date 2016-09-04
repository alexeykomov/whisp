/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application main body, root of all components.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.SettingsNavBar');


goog.require('goog.array');
goog.require('whisp.i18n.Symbols');
goog.require('whisp.ui.Messages');
goog.require('whisp.ui.MessageBar');
goog.require('whisp.ui.NavBar');
goog.require('whisp.action.CloseThreadAction');
goog.require('whisp.action.ScreenSlideAction');
goog.require('whisp.state.SettingsType');



/**
 *
 */
whisp.ui.SettingsNavBar = React.createClass({
  propTypes: {
    header: React.PropTypes.string.isRequired,
    isSmallScreen: React.PropTypes.bool.isRequired,
  },

  getDefaultProps() {
    return {
      header: whisp.state.SettingsType.GENERAL,
      isSmallScreen: true
    }
  },

  shouldComponentUpdate(aProps, aState) {
    return aProps.header !== this.props.header ||
        aProps.isSmallScreen !== this.props.isSmallScreen
  },

  onClick(aEvent) {
    aEvent.preventDefault();
    if (this.props.isSmallScreen) {
      whisp.Store.dispatch(whisp.action.ScreenSlideAction.create(
          whisp.state.ScreenManagerType.SIDEPANE_AND_MAINPANE,
          whisp.state.ScreenManagerState.RIGHT_TRANSITS_TO_LEFT
      ));
    }
  },

  render() {
    return (
        <nav className="navbar">
          <div className="navbar-inner">
            <div className="left">{
              this.props.isSmallScreen ?
                  <a href="index.html" className="back link"
                     onClick={this.onClick}>
                    <i className="icon icon-back">
                    </i>
                    <span>Back</span>
                  </a> : null 
            }</div>
            <div className="center">
              <div className="thread-name">{this.props.header}</div>
            </div>
            <div className="right">&nbsp;</div>
          </div>
        </nav>
    );
  }
});