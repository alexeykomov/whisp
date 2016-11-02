/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application main body, root of all components.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.MainPane');

goog.require('whisp.ui.MessagePane');
goog.require('whisp.ui.SettingsPane');



/**
 *
 */
whisp.ui.MainPane = React.createClass({
  propTypes: {
    messages: React.PropTypes.array.isRequired,
    currentMessageDraft: React.PropTypes.array.isRequired,
    activeSidePaneType: React.PropTypes.string.isRequired,
    contacts: React.PropTypes.array.isRequired,
    currentThreadId: React.PropTypes.string.isRequired,
    isSmallScreen: React.PropTypes.bool.isRequired,
    currentSettingsItem: React.PropTypes.string.isRequired,
    settings: React.PropTypes.object.isRequired,
    textAreaHeight: React.PropTypes.number.isRequired,
  },

  render() {
    return ((aActiveSidePaneType) => {
      switch (aActiveSidePaneType) {
        case whisp.state.SidePaneType.CONTACTS:
        case whisp.state.SidePaneType.CHATS:
          return <whisp.ui.MessagePane
              messages={this.props.messages}
              currentMessageDraft={this.props.currentMessageDraft}
              activeSidePaneType={this.props.activeSidePaneType}
              contacts={this.props.contacts}
              currentThreadId={this.props.currentThreadId}
              isSmallScreen={this.props.isSmallScreen}
              textAreaHeight={this.props.textAreaHeight}
          />;
        case whisp.state.SidePaneType.SETTINGS:
          return <whisp.ui.SettingsPane
              currentSettingsItem={this.props.currentSettingsItem}
              isSmallScreen={this.props.isSmallScreen}
              settings={this.props.settings}
          />;
        default:
          return null;
      }
    })(this.props.activeSidePaneType)
  }
});