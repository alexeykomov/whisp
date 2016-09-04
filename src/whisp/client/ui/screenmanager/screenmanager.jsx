/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application main body, root of all components.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.ScreenManager');


goog.require('goog.array');
goog.require('whisp.i18n.Symbols');
goog.require('whisp.ui.Messages');
goog.require('whisp.ui.MessageBar');
goog.require('whisp.ui.NavBar');
goog.require('goog.dom.classlist');
goog.require('whisp.state.ScreenManagerState');
goog.require('goog.events');


/**
 *
 */
whisp.ui.ScreenManager = React.createClass({
  propTypes: {
    screenManagerState: React.PropTypes.string.isRequired,
  },

  getDefaultProps() {
    return {
      screenManagerState: whisp.state.ScreenManagerState.LEFT
    }
  },

  shouldComponentUpdate(aProps, aState) {
    return true/*this.props.screenManagerState !== aProps.screenManagerState;*/
  },

  componentDidMount() {
    this.transitionEndKey_ = goog.events.listen(this.base_.getDOMNode(),
        goog.events.EventType.TRANSITIONEND, this.onTransitionEnd, false,
        this);
  },

  componentWillUnmount() {
    goog.events.unlistenByKey(this.transitionEndKey_);
  },

  onTransitionEnd(aEvent) {
    if (goog.DEBUG)
      console.log('onTransitionEnd: ');
    if (goog.DEBUG)
      console.log('aEvent.target: ', aEvent.target);
    if (goog.dom.classlist.contains(aEvent.target, 'screen-manager')) {
      switch (this.props.screenManagerState) {
        case whisp.state.ScreenManagerState.LEFT_TRANSITS_TO_RIGHT:
          whisp.Store.dispatch(whisp.action.ScreenSlideAction.create(
              whisp.state.ScreenManagerType.SIDEPANE_AND_MAINPANE,
              whisp.state.ScreenManagerState.RIGHT
          ));
          break;
        case whisp.state.ScreenManagerState.RIGHT_TRANSITS_TO_LEFT:
          whisp.Store.dispatch(whisp.action.ScreenSlideAction.create(
              whisp.state.ScreenManagerType.SIDEPANE_AND_MAINPANE,
              whisp.state.ScreenManagerState.LEFT
          ));
          break;
        default:
          break;
      }
    }
  },

  render() {
    if (goog.DEBUG)
      console.log('this.props.screenManagerState: ', this.props.screenManagerState);

    const [firstChild, lastChild] = this.props.children;
    switch (this.props.screenManagerState) {
      case whisp.state.ScreenManagerState.LEFT_TRANSITS_TO_RIGHT:
        return <div className="screen-manager-base screen-manager"
                    ref={aBase => this.base_ = aBase}
                    onTransitionEnd={this.onTransitionEnd}
                    style={{
                      transform: `translate3d(${-100}%,0,0)`
                    }}>
          <div className="screen"
              style={{transform: `translate3d(${0 * 100}%,0,0)`}}>{firstChild}</div>
          <div className="screen"
              style={{transform: `translate3d(${1 * 100}%,0,0)`}}>{lastChild}</div>
        </div>;
      case whisp.state.ScreenManagerState.RIGHT_TRANSITS_TO_LEFT:
        return <div className="screen-manager-base screen-manager"
                    ref={aBase => this.base_ = aBase}
                    onTransitionEnd={this.onTransitionEnd} style={{
          transform: `translate3d(${100}%,0,0)`
        }}>
          <div className="screen"
              style={{transform: `translate3d(${-1 * 100}%,0,0)`}}>{firstChild}</div>
          <div className="screen"
              style={{transform: `translate3d(${0 * 100}%,0,0)`}}>{lastChild}</div>
        </div>;
      case whisp.state.ScreenManagerState.LEFT:
        return <div className="screen-manager-base"
                    ref={aBase => this.base_ = aBase}
        >
          {firstChild}
        </div>;
      case whisp.state.ScreenManagerState.RIGHT:
        return <div className="screen-manager-base"
                    ref={aBase => this.base_ = aBase}
        >
          {lastChild}
        </div>;
      default:
        return null;
    }
  }
});