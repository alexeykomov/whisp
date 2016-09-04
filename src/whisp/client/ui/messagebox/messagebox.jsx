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



/**
 */
whisp.ui.MessageBox = React.createClass({
  propTypes: {
    currentMessageDraft: React.PropTypes.string.isRequired,
    onKeyDown: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      currentMessageDraft: '',
      onKeyDown: () => {}
    }
  },

  shouldComponentUpdate(aProps, aState) {
    return aProps.currentMessageDraft !== this.props.currentMessageDraft
  },

  onChange(aEvent) {
    const value = aEvent.target.value;
    whisp.Store.dispatch(whisp.action.UpdateMessageDraftAction.create(value));
    whisp.Store.dispatch(whisp.action.NotifyAboutWritingActivityAction.
        create());
  },

  render() {
    return (
        <textarea placeholder="Message" onChange={this.onChange}
                  onKeyPress={this.onChange}
                      onKeyDown={this.props.onKeyDown}
                      value={this.props.currentMessageDraft}/>
    )
  }
});