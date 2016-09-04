/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview MessageBar.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.MessageBar');


goog.require('goog.array');
goog.require('whisp.action.SendMessageAction');
goog.require('whisp.Store');
goog.require('whisp.ui.MessageBox');


/**
 */
whisp.ui.MessageBar = React.createClass({
  propTypes: {
    // List of contacts.
    currentMessageDraft: React.PropTypes.string.isRequired,
  },

  getDefaultProps() {
    return {
      currentMessageDraft: ''
    }
  },

  shouldComponentUpdate(aProps, aState) {
    return aProps.currentMessageDraft !== this.props.currentMessageDraft
  },

  /**
   * @param {SyntheticEvent} aEvent Submit event.
   */
  onSubmit(aEvent) {
    this.dispatchSendMessage();
    this.messageBox_.getDOMNode().focus();
  },

  dispatchSendMessage: function () {
    whisp.Store.dispatch(whisp.action.SendMessageAction.create(
        this.props.currentMessageDraft));
  },

  /**
   * @param {SyntheticEvent} aEvent Key down event.
   */
  onTextAreaKeyDown(aEvent) {
    if (aEvent.metaKey && aEvent.keyCode == 13) {
      this.dispatchSendMessage();
    }
  },

  render() {
    return (
        <div className="toolbar messagebar toolbar-hidden">
          <div className="toolbar-inner">
            {/*<a href="#" className="link icon-only">
              <i className="icon icon-camera"/>
            </a>*/}
            <whisp.ui.MessageBox onKeyDown={this.onTextAreaKeyDown}
                                 currentMessageDraft={this.props.currentMessageDraft}
            ref={aMessageBox => this.messageBox_ = aMessageBox}/>
            <button className="link send-message"
                    onClick={this.onSubmit}
                    onTouchEnd={this.onSubmit}>Send</button>
          </div>
        </div>
    )
  }
});