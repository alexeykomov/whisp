/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview ToggleBar.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.ToggleBar');


goog.require('whisp.action.SwitchSidePaneAction');
goog.require('whisp.i18n.Symbols');
goog.require('whisp.state.SidePaneType');
goog.require('whisp.Store');



/**
 */
whisp.ui.ToggleBar = React.createClass({
  propTypes: {
    // Active side pane.
    activeSidePaneType: React.PropTypes.string.isRequired,
    unreadChatCount: React.PropTypes.number.isRequired,
  },

  getDefaultProps() {
    return {
      activeSidePaneType: whisp.state.SidePaneType.CONTACTS,
      unreadChatCount: 0
    }
  },

  shouldComponentUpdate(aProps, aState) {
    if (goog.DEBUG)
      console.log('shouldComponentUpdate: ');
    if (goog.DEBUG)
      console.log('aProps: ', aProps);
    if (goog.DEBUG)
      console.log('this.props: ', this.props);
    return aProps.activeSidePaneType !== this.props.activeSidePaneType ||
        aProps.unreadChatCount !== this.props.unreadChatCount
  },

  onClick(aEvent) {
    aEvent.preventDefault();

    const dataset = aEvent.currentTarget.dataset;
    const sidePaneType = dataset && dataset['sidePaneType'];

    if (!sidePaneType) {
      return;
    }

    whisp.Store.dispatch(whisp.action.SwitchSidePaneAction.create(
        sidePaneType));
  },

  tabIsActiveChecker(aForWhichSidePaneType) {
    return `tab-link ${aForWhichSidePaneType === this.props.activeSidePaneType ? 'active' : ''}`;
  },

  sidePaneTypeToElement(aSidePaneType, aIndex) {
    return <a href={`/pane-${aSidePaneType.toLowerCase()}`} type="button"
              className={
      this.tabIsActiveChecker(aSidePaneType)}
                   onClick={this.onClick}
                   onMouseDown={this.onClick}
                   onTouchStart={this.onClick}
                   data-side-pane-type={aSidePaneType}>
      <i className={`icon togglebar-icon-${aIndex + 1}`}>{
        whisp.state.SidePaneType.CHATS === aSidePaneType &&
        this.props.unreadChatCount ?
            <span className="badge bg-red">{this.props.unreadChatCount}</span> :
            null
      }</i>
      {whisp.i18n.Symbols[aSidePaneType]}
    </a>
  },

  render() {
    return (
        <div className="toolbar tabbar toolbar-hidden togglebar">
          <div className="toolbar-inner">{
            Object.keys(whisp.state.SidePaneType).
                map(key => whisp.state.SidePaneType[key]).
                map(this.sidePaneTypeToElement)
          }</div>
        </div>
    )
  }
});