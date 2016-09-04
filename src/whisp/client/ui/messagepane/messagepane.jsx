/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application main body, root of all components.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.MessagePane');


goog.require('whisp.ui.Messages');
goog.require('whisp.ui.MessageBar');
goog.require('whisp.ui.ThreadNavBar');
goog.require('whisp.ui.NoThreadDummy');
goog.require('whisp.ui.NoMessagesDummy');


/**
 *
 */
whisp.ui.MessagePane = React.createClass({
  propTypes: {
    messages: React.PropTypes.array.isRequired,
    currentMessageDraft: React.PropTypes.array.isRequired,
    activeSidePaneType: React.PropTypes.string.isRequired,
    contacts: React.PropTypes.array.isRequired,
    currentThreadId: React.PropTypes.string.isRequired,
    isSmallScreen: React.PropTypes.bool.isRequired,
  },

  render() {
    const contactIsFound = !!this.props.currentThreadId;

    return (() => {
      if (contactIsFound) {
        /**@type {proto.Contact}*/
        const thisDialogContact = goog.array.find(this.props.contacts,
            (aContact) => aContact.getLinkedThreadId() ===
            this.props.currentThreadId);
        return <div className={`view ${this.props.isSmallScreen ? '' :
            'view-main'}`}>
          <whisp.ui.ThreadNavBar
              threadName={thisDialogContact.getName()}
              threadStatus={thisDialogContact.getOnline() ? 'online' :
                  'last seen 2 min ago'}
              statusIsHighlighted={thisDialogContact.getOnline()}
              isSmallScreen={this.props.isSmallScreen}
          />
          <div className="pages messages-pages">
            <div className="page">
              {<whisp.ui.Messages
                  messages={this.props.messages}/>
              }
              <whisp.ui.MessageBar currentMessageDraft={
                this.props.currentMessageDraft}/>
            </div>
          </div>
        </div>
      } else {
        return <whisp.ui.NoThreadDummy/>
      }
    })()
  }
});