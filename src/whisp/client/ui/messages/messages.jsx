/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Messages.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.Messages');


goog.require('goog.array');
goog.require('whisp.action.SendMessageAction');
goog.require('whisp.Store');


/**
 */
whisp.ui.Messages = React.createClass({
  propTypes: {
    // List of contacts.
    messages: React.PropTypes.array.isRequired,
  },

  getDefaultProps() {
    return {
      messages: []
    }
  },

  shouldComponentUpdate(aProps, aState) {
    return aProps.messages !== this.props.messages
  },

  /**
   * @param {Array.<proto.Message>} aMessages Messages.
   * @return {Array.<proto.Message>} Prepared messages.
   */
  prepareForUi(aMessages) {
    const processedMessages = [];

    aMessages.forEach((aMessage, aIndex, aMessages) => {
      const prevMessage = /** @type {proto.Message}*/ (goog.array.peek(
          processedMessages));
      const senderHasChanged = !prevMessage || aMessage.getSenderId() !==
          prevMessage.getSenderId();

      aMessage.setFirstInSeries(false);
      aMessage.setLastInSeries(false);

      if (aMessage.getBelongsToGroup()) {
        aMessage.setWithAvatar(true);
        aMessage.setWithTail(true);
        aMessage.setFirstInSeries(true);
        aMessage.setLastInSeries(true);
      } else {
        aMessage.setWithAvatar(false);
        aMessage.setWithTail(false);
        if (senderHasChanged) {
          aMessage.setFirstInSeries(true);
          if (prevMessage) {
            prevMessage.setWithTail(true);
            prevMessage.setLastInSeries(true);
          }
        }
      }
      processedMessages.push(aMessage);
    });

    const lastMessage = goog.array.peek(processedMessages);
    if (lastMessage) {
      lastMessage.setWithTail(true);
      lastMessage.setLastInSeries(true);
    }

    return processedMessages;
  },

  /**
   * @param {proto.Message} aMessage
   * @return {ReactDOMElement} React element.
   */
  messageToElement(aMessage) {
    return <div className={`message ${
        aMessage.getIncoming() ? 'message-received' : 'message-sent'
        } ${
        aMessage.getWithAvatar() ? 'message-with-avatar' : ''
        } ${
        aMessage.getFirstInSeries() ? 'message-first' : ''
        } ${
        aMessage.getLastInSeries() ? 'message-last' : ''
        } ${
        aMessage.getWithTail() ? 'message-with-tail' : ''
        }`}>
      <div className="message-text">{aMessage.getMessageText()}</div>
      { aMessage.getWithAvatar() &&
      <div className="message-avatar" style={{
        backgroundImage: `url(${aMessage.getAvatarLink()})`
      }}></div>
      }
    </div>
  },

  componentDidUpdate() {
    //TODO(alexk): only jump to the end if message was yours.
    const messagesFrame = this.messagesFrame_.getDOMNode();
    messagesFrame.scrollTop = messagesFrame.scrollHeight;
  },

  componentWillUnmount() {
    this.messagesFrame_ = null;
  },

  render() {
    return (
        <div className="page-content messages-content" ref={
          aMessagesFrame => this.messagesFrame_ = aMessagesFrame}>
          <div className="messages messages-auto-layout">
            {
              this.prepareForUi(this.props.messages).map(
                  this.messageToElement)
            }
          </div>
        </div>
    )
  }
});