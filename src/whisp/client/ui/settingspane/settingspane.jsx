/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application main body, root of all components.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.SettingsPane');


goog.require('whisp.ui.Messages');
goog.require('whisp.state.SettingsType');
goog.require('whisp.ui.SettingsGeneral');
goog.require('proto.Settings');


/**
 *
 */
whisp.ui.SettingsPane = React.createClass({
  propTypes: {
    currentSettingsItem: React.PropTypes.string.isRequired,
    settings: React.PropTypes.object.isRequired,
  },

  getDefaultProps() {
    return {
      isSmallScreen: true,
      settings: proto.Settings,
    }
  },

  shouldComponentUpdate(aProps, aState) {
    return this.props.settings !== aProps.settings ||
        this.props.isSmallScreen !== aProps.settings;
  },

  render() {
    return ((aCurrentSettingsItem) => {
    switch (aCurrentSettingsItem) {
      case whisp.state.SettingsType.GENERAL:
        return <whisp.ui.SettingsGeneral
            isSmallScreen={this.props.isSmallScreen}
            settings={this.props.settings}
        />;
      default:
        return null;
    }
    })(this.props.currentSettingsItem)
  }
});