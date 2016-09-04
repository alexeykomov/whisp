/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application main body, root of all components.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.SettingsList');


goog.require('whisp.action.OpenSettingsAction');
goog.require('whisp.state.SettingsType');
goog.require('whisp.Store');


/**
 */
whisp.ui.SettingsList = React.createClass({
  propTypes: {
    // List of threads.
    settingsItems: React.PropTypes.array.isRequired,
    currentSettingsItem: React.PropTypes.string.isRequired,
  },

  getDefaultProps() {
    return {
      settingsItems: [],
      currentSettingsItem: whisp.state.SettingsType.GENERAL
    }
  },

  onClick(aEvent) {
    aEvent.preventDefault();
    const itemType = aEvent.currentTarget.dataset['itemType'];

    whisp.Store.dispatch(whisp.action.OpenSettingsAction.create(
        itemType));
    whisp.Store.dispatch(whisp.action.ScreenSlideAction.create(
        whisp.state.ScreenManagerType.SIDEPANE_AND_MAINPANE,
        whisp.state.ScreenManagerState.LEFT_TRANSITS_TO_RIGHT
    ));
  },

  shouldComponentUpdate(aProps, aState) {
    return aProps.settingsItems !== this.props.settingsItems ||
        aProps.currentSettingsItem !== this.props.currentSettingsItem
  },

  /**
   * @param {proto.SettingsItem} aItem
   */
  itemToElement(aItem) {
    return <li>
      <a href={`./settings-items/${aItem.getSettingsItemId()}`}
         onMouseDown={this.onClick}
         onClick={this.onClick}
         data-item-type={aItem.getType()} className="item-link">
        <div className={`item-content ${aItem.getType() ===
        this.props.currentSettingsItem ? 'selected' : ''}`}>
          <div className="item-inner">
            <div className="item-title">{aItem.getName()}</div>
          </div>
        </div>
      </a>
    </li>;
  },

  render() {
    return (
        <div className="list-block settings-list">
          <ul>{
            this.props.settingsItems.map(this.itemToElement.bind(this))
          }</ul>
        </div>
    );
  }
});