/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application main body, root of all components.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.MainBody');


goog.require('whisp.ui.ScreenManager');
goog.require('whisp.state.ScreenManagerType');
goog.require('whisp.Store');
goog.require('whisp.ui.MainPane');
goog.require('whisp.ui.SidePane');



/**
 *
 */
whisp.ui.MainBody = React.createClass({
  propTypes: {
    // Store.
    store: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      storeState: whisp.Store.getState()
    }
  },

  trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.props.store.subscribe(this.handleChange.bind(this));
      this.handleChange()
    }
  },

  tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  },

  componentDidMount() {
    this.trySubscribe()
  },

  componentWillUnmount() {
    this.tryUnsubscribe();
  },

  handleChange() {
    if (!this.unsubscribe) {
      return
    }

    const storeState = whisp.Store.getState();
    const prevStoreState = this.getStoreState();
    if (prevStoreState === storeState) {
      return
    }

    this.setState({storeState});
  },

  /**
   * @return {whisp.State}
   */
  getStoreState() {
    return this.state.storeState;
  },

  render() {
    if (this.getStoreState().isSmallScreen) {
      return <whisp.ui.ScreenManager
          screenManagerState={
            this.getStoreState()[whisp.state.ScreenManagerType.SIDEPANE_AND_MAINPANE]}>
        <whisp.ui.SidePane threads={this.getStoreState().threads}
                           contacts={this.getStoreState().contacts}
                           activeSidePaneType={this.getStoreState().activeSidePaneType}
                           currentContactId={this.getStoreState().currentContactId}
                           currentThreadId={this.getStoreState().currentThreadId}
                           isSmallScreen={this.getStoreState().isSmallScreen}
                           settingsItems={this.getStoreState().settingsItems}
                           currentSettingsItem={this.getStoreState().currentSettingsItem}
        />

        <whisp.ui.MainPane messages={this.getStoreState().messages}
                           currentMessageDraft={this.getStoreState().currentMessageDraft}
                           activeSidePaneType={this.getStoreState().activeSidePaneType}
                           currentThreadId={this.getStoreState().currentThreadId}
                           contacts={this.getStoreState().contacts}
                           isSmallScreen={this.getStoreState().isSmallScreen}
                           currentSettingsItem={this.getStoreState().currentSettingsItem}
                           settings={this.getStoreState().settings}
        />
      </whisp.ui.ScreenManager>
    } else {
      return <div className="views">
        <whisp.ui.SidePane threads={this.getStoreState().threads}
                           contacts={this.getStoreState().contacts}
                           activeSidePaneType={this.getStoreState().activeSidePaneType}
                           currentContactId={this.getStoreState().currentContactId}
                           currentThreadId={this.getStoreState().currentThreadId}
                           isSmallScreen={this.getStoreState().isSmallScreen}
                           settingsItems={this.getStoreState().settingsItems}
                           currentSettingsItem={this.getStoreState().currentSettingsItem}
        />

        <whisp.ui.MainPane messages={this.getStoreState().messages}
                           currentMessageDraft={this.getStoreState().currentMessageDraft}
                           textAreaHeight={this.getStoreState().textAreaHeight}
                           activeSidePaneType={this.getStoreState().activeSidePaneType}
                           currentThreadId={this.getStoreState().currentThreadId}
                           contacts={this.getStoreState().contacts}
                           isSmallScreen={this.getStoreState().isSmallScreen}
                           currentSettingsItem={this.getStoreState().currentSettingsItem}
                           settings={this.getStoreState().settings}
        />
      </div>
    }
  }
});