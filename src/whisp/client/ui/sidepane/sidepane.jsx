/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application main body, root of all components.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.SidePane');


goog.require('whisp.i18n.Symbols');
goog.require('whisp.ui.ContactList');
goog.require('whisp.ui.ChatList');
goog.require('whisp.ui.NavBar');
goog.require('whisp.ui.SettingsList');
goog.require('whisp.ui.ToggleBar');



/**
 *
 */
whisp.ui.SidePane = React.createClass({
  propTypes: {
    contacts: React.PropTypes.array.isRequired,
    threads: React.PropTypes.array.isRequired,
    activeSidePaneType: React.PropTypes.string.isRequired,
    currentContactId: React.PropTypes.string.isRequired,
    currentThreadId: React.PropTypes.string.isRequired,
    isSmallScreen: React.PropTypes.bool.isRequired,
    settingsItems: React.PropTypes.array.isRequired,
    currentSettingsItem: React.PropTypes.string.isRequired,
  },

  render() {
    return (
        <div className={`view ${this.props.isSmallScreen ? '' : 'view-left'
            }`}>
          <whisp.ui.NavBar header={whisp.i18n.Symbols[this.props.activeSidePaneType]}/>
          <div className="pages sidepane-pages">
            <div className="page">
              <div className="page-content">{
                ((aActiveSidePaneType) => {
                  switch (aActiveSidePaneType) {

                    case whisp.state.SidePaneType.CONTACTS:
                      return <whisp.ui.ContactList
                          contacts={this.props.contacts}
                          currentContactId={this.props.currentContactId}
                      />;
                    case whisp.state.SidePaneType.CHATS:
                      return <whisp.ui.ChatList
                          threads={this.props.threads}
                          currentThreadId={this.props.currentThreadId}
                      />;
                    case whisp.state.SidePaneType.SETTINGS:
                      return <whisp.ui.SettingsList
                          settingsItems={this.props.settingsItems}
                          currentSettingsItem={this.props.currentSettingsItem}
                      />;
                    default: return null;
                  }
                })(this.props.activeSidePaneType)
              }</div>
            </div>
          </div>
          <whisp.ui.ToggleBar
              activeSidePaneType={this.props.activeSidePaneType}/>
        </div>
    );
  }
});