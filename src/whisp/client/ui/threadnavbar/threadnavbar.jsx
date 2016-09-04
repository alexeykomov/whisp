/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application main body, root of all components.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.ThreadNavBar');


goog.require('goog.array');
goog.require('whisp.i18n.Symbols');
goog.require('whisp.ui.Messages');
goog.require('whisp.ui.MessageBar');
goog.require('whisp.ui.NavBar');
goog.require('whisp.action.CloseThreadAction');
goog.require('whisp.action.ScreenSlideAction');



/**
 *
 */
whisp.ui.ThreadNavBar = React.createClass({
  propTypes: {
    threadName: React.PropTypes.string.isRequired,
    threadStatus: React.PropTypes.array.isRequired,
    statusIsHighlighted: React.PropTypes.bool.isRequired,
    avatarLink: React.PropTypes.string.isRequired,
    isSmallScreen: React.PropTypes.bool.isRequired,
  },

  getDefaultProps() {
    return {
      threadName: '',
      threadStatus: '',
      statusIsHighlighted: false,
      avatarLink: '',
      isSmallScreen: true
    }
  },

  shouldComponentUpdate(aProps, aState) {
    return aProps.threadName !== this.props.threadName ||
        aProps.threadStatus !== this.props.threadStatus ||
        aProps.statusIsHighlighted !== this.props.statusIsHighlighted
  },

  onClick(aEvent) {
    aEvent.preventDefault();
    if (this.props.isSmallScreen) {
      whisp.Store.dispatch(whisp.action.ScreenSlideAction.create(
          whisp.state.ScreenManagerType.SIDEPANE_AND_MAINPANE,
          whisp.state.ScreenManagerState.RIGHT_TRANSITS_TO_LEFT
      ));
    } else {
      whisp.Store.dispatch(whisp.action.CloseThreadAction.create());
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
                  </a> :
                  <a href="index.html" className="back link"
                     onClick={this.onClick}>
                    <span>Close</span>
                  </a>
            }</div>
            <div className="center thread-header">
              <div className="thread-name">{this.props.threadName}</div>
              <div className={`thread-status ${this.props.statusIsHighlighted ?
                  'online' : ''}`}>{this.props.threadStatus}</div>
            </div>
            <div className="right">
              <div className="contact-avatar" style={{
                backgroundImage: `url(${this.props.avatarLink})`
              }}></div>
            </div>
          </div>
        </nav>
    );
  }
});