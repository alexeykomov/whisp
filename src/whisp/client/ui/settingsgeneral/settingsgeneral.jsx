/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application main body, root of all components.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.SettingsGeneral');


goog.require('whisp.i18n.Symbols');
goog.require('whisp.state.SettingsType');
goog.require('whisp.ui.SettingsNavBar');
goog.require('proto.Settings');
goog.require('whisp.thunk.saveSettings');


/**
 *
 */
whisp.ui.SettingsGeneral = React.createClass({
  propTypes: {
    isSmallScreen: React.PropTypes.bool.isRequired,
    settings: React.PropTypes.object.isRequired,
  },

  getDefaultProps() {
    return {
      isSmallScreen: true,
      settings: new proto.Settings,
    }
  },

  onLanguageChange(aEvent) {
    if (confirm(whisp.i18n.Symbols.CHANGE_LANGUAGE_CONFIRM)) {
      const uiLanguage = aEvent.target.value;
      const settings = (() => {
        const newSettings = this.props.settings.cloneMessage();
        newSettings.uiLanguage = uiLanguage;
        newSettings.reload = true;
        return newSettings;
      })();
      whisp.Store.dispatch(whisp.thunk.saveSettings(settings));
    }
  },

  render() {
    return (
        <div className={`view ${this.props.isSmallScreen ? '' :
            'view-main'}`}>
          <whisp.ui.SettingsNavBar
              isSmallScreen={this.props.isSmallScreen}
              header={whisp.i18n.Symbols[whisp.state.SettingsType.GENERAL]}/>
          <div className="pages">
            <div className="page">
              <div className="page-content settings-body-inner">
                <div className="list-block">
                  <ul>
                    <li>
                      <div className="item-content">
                        <div className="item-inner">
                          <label className="item-title label"
                                 htmlFor="select-languages">
                            Languages</label>
                          <div className="item-input" id="select-languages">
                            <select onChange={this.onLanguageChange}
                                    value={this.props.settings.uiLanguage}>{
                              whisp.i18n.Symbols.LANGUAGE_NAMES.map(
                                  aLanguageNamePair => <option
                                      value={aLanguageNamePair[0]}>
                                    {aLanguageNamePair[1]}
                                  </option>)
                            }</select>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
    )
  }
});