/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview MessageBox.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.MessageBox');


goog.require('goog.array');
goog.require('whisp.action.UpdateMessageDraftAction');
goog.require('whisp.action.NotifyAboutWritingActivityAction');
goog.require('whisp.Store');
goog.require('whisp.thunk.modifyTextAreaSize');


/**
 */
whisp.ui.MessageBox = React.createClass({
  propTypes: {
    currentMessageDraft: React.PropTypes.string.isRequired,
    onKeyDown: React.PropTypes.func.isRequired,
    height: React.PropTypes.number.isRequired,
  },

  getDefaultProps() {
    return {
      currentMessageDraft: '',
      onKeyDown: () => {
      }
    }
  },

  getInitialState() {
    return {
      height: this.props.height
    }
  },

  changeHeight_() {
    this.setState({height: this.props.height});
  },

  componentWillReceiveProps(aProps) {
    if (aProps.height !== this.props.height) {
      requestAnimationFrame(this.changeHeight_);
    }
  },

  shouldComponentUpdate(aProps, aState) {
    return aProps.currentMessageDraft !== this.props.currentMessageDraft ||
        aProps.height !== this.props.height;
  },

  onChange(aEvent) {
    const value = aEvent.target.value;
    whisp.Store.dispatch(whisp.action.UpdateMessageDraftAction.create(value));
    whisp.Store.dispatch(whisp.thunk.modifyTextAreaSize(value));
    whisp.Store.dispatch(whisp.action.NotifyAboutWritingActivityAction.create());
  },

  render() {
    return (
        <div className="message-box-container">
        <textarea placeholder="Message" onChange={this.onChange}
                  onKeyPress={this.onChange}
                  onKeyDown={this.props.onKeyDown}
                  value={this.props.currentMessageDraft}
                  className="message-box"
                  style={{height: this.props.height}}/>
          <div id="message-box-mirror" className="message-box-mirror">{
            /\n/.test(this.props.currentMessageDraft) ?
                '\n' + this.props.currentMessageDraft :
                this.props.currentMessageDraft
          }</div>
        </div>
    )
  }
});