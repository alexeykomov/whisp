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
    currentThreadId: React.PropTypes.string.isRequired,
    textAreaHeight: React.PropTypes.number.isRequired,
  },

  getDefaultProps() {
    return {
      currentMessageDraft: ''
    }
  },

  shouldComponentUpdate(aProps, aState) {
    if (whisp.TOUCH) {
      return aProps.currentMessageDraft !== this.props.currentMessageDraft ||
          aProps.currentThreadId !== this.props.currentThreadId ||
          aProps.textAreaHeight !== this.props.textAreaHeight;
    }
    return true;
  },

  /**
   * @param {SyntheticEvent} aEvent Submit event.
   */
  onSubmit(aEvent) {
    this.dispatchSendMessage();
    this.messageBoxFocus();
  },

  messageBoxFocus() {
    this.messageBox_.getDOMNode().focus();
  },

  componentDidUpdate() {
    //NOTE(alexk): here we focus after each update, only for desktop.
    if (!whisp.TOUCH) {
      this.messageBoxFocus();
    }
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
        <div className="toolbar messagebar toolbar-hidden" style={{
          height: `${44 + (this.props.textAreaHeight - 28)}px`
        }}>
          <div className="toolbar-inner">
            {/*<a href="#" className="link icon-only">
              <i className="icon icon-camera"/>
            </a>*/}
            <whisp.ui.MessageBox onKeyDown={this.onTextAreaKeyDown}
                                 currentMessageDraft={
                                   this.props.currentMessageDraft}
                                 height={this.props.textAreaHeight}
              ref={aMessageBox => this.messageBox_ = aMessageBox}/>
            <button className="link send-message"
                    onClick={this.onSubmit}
                    onTouchEnd={this.onSubmit}>Send</button>
          </div>
        </div>
    )
  }
});