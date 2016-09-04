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
goog.require('whisp.ui.Messages');
goog.require('whisp.ui.SettingsNavBar');


/**
 *
 */
whisp.ui.SettingsGeneral = React.createClass({
  propTypes: {
    isSmallScreen: React.PropTypes.bool.isRequired,
  },

  getDefaultProps() {
    return {
      isSmallScreen: true,
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
                            <select>
                              <option
                                  value="eC9kYi53svvCYkZi1wB7GMULj-G6dWw7YBCgIKab4mwXr9ziXpIAFHJCPxfVh-jr">
                                Work
                              </option>
                              <option
                                  value="eN6k8k9O-0L2tnhtwHXCSOxsIYXzBudjwi1pjXxlk-xJooMkMh7cPgawwFO7cuJS">
                                Test
                              </option>
                              <option
                                  value="e5o2Ov8rklEotXtN-1nGmPBcrYLzP4eJ4gLXgMleFkGDvwAFGogaUzUNxouoBw54">
                                Meetings
                              </option>
                            </select>
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