/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview MessageBox.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.MessageBox');


goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.ui.Textarea');
goog.require('goog.ui.Textarea.EventType');
goog.require('whisp.action.NotifyAboutWritingActivityAction');
goog.require('whisp.action.UpdateMessageDraftAction');
goog.require('whisp.i18n.Symbols');
goog.require('whisp.Store');


/**
 */
whisp.ui.MessageBox = React.createClass({
  propTypes: {
    currentMessageDraft: React.PropTypes.string.isRequired,
    onKeyDown: React.PropTypes.func.isRequired,
  },

  getDefaultProps() {
    return {
      currentMessageDraft: '',
    }
  },

  componentDidMount() {
    this.textArea_ = new goog.ui.Textarea(whisp.i18n.Symbols.MESSAGE);
    this.textArea_.setMinHeight(whisp.ui.MessageBox.MIN_MESSAGEBOX_HEIGHT);
    this.textArea_.setMaxHeight(12 * whisp.ui.MessageBox.MIN_MESSAGEBOX_HEIGHT);
    this.textArea_.decorate(this.textAreaElement_.getDOMNode());

    this.resizeListenerKey_ = goog.events.listen(this.textArea_.getElement(),
        goog.events.EventType.TRANSITIONEND, this.onTextAreaResize_, false,
        this);
  },

  onTextAreaResize_() {
    //whisp.Store.dispatch(whisp.action.MessageBoxWasResizedAction.create());
  },

  componentWillUnmount() {
    goog.events.unlistenByKey(this.resizeListenerKey_);
    this.textArea_.dispose();
    this.textAreaElement_ = null;
  },

  shouldComponentUpdate(aProps, aState) {
    return aProps.currentMessageDraft !== this.props.currentMessageDraft;
  },

  componentDidUpdate() {
    this.textArea_.resize();
    this.textAreaElement_.getDOMNode().focus();
  },

  onChange(aEvent) {
    const value = aEvent.target.value;
    whisp.Store.dispatch(whisp.action.UpdateMessageDraftAction.create(value));
    whisp.Store.dispatch(whisp.action.NotifyAboutWritingActivityAction.create());
  },

  render() {
    return (
          <textarea
               placeholder={whisp.i18n.Symbols.MESSAGE}
               value={this.props.currentMessageDraft}
               onChange={this.onChange}
               onKeyDown={this.props.onKeyDown}
               className="message-box"
               ref={aTextAreaElement => this.textAreaElement_ = aTextAreaElement}/>
    )
  }
});


/**
 * @type {number}
 */
whisp.ui.MessageBox.MIN_MESSAGEBOX_HEIGHT = 30;