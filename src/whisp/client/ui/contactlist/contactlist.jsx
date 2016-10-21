/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application main body, root of all components.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.ContactList');


goog.require('whisp.action.OpenThreadFromContactsAction');
goog.require('whisp.Store');
goog.require('goog.string');



/**
 */
whisp.ui.ContactList = React.createClass({
  propTypes: {
    // List of contacts.
    contacts: React.PropTypes.array.isRequired,
    currentContactId: React.PropTypes.string.isRequired,
  },

  getDefaultProps() {
    return {
      contacts: [],
      currentContactId: goog.getUid({})
    }
  },

  onClick(aEvent) {
    aEvent.preventDefault();

    const threadId = aEvent.currentTarget.dataset[
        goog.string.toCamelCase('thread-id')];
    const contactId = aEvent.currentTarget.dataset[
        goog.string.toCamelCase('contact-id')];
    whisp.Store.dispatch(whisp.action.OpenThreadFromContactsAction.create(
        contactId, threadId));
    whisp.Store.dispatch(whisp.action.ScreenSlideAction.create(
        whisp.state.ScreenManagerType.SIDEPANE_AND_MAINPANE,
        whisp.state.ScreenManagerState.LEFT_TRANSITS_TO_RIGHT
    ));
  },

  shouldComponentUpdate(aProps, aState) {
    return aProps.contacts !== this.props.contacts ||
        aProps.currentContactId !== this.props.currentContactId
  },

  contactToElement(aContact) {
    return <li>
      <a href={`./chats/${aContact.getContactId()}`}
         onMouseDown={this.onClick}
         onClick={this.onClick}
         data-contact-id={aContact.getContactId()}
         data-thread-id={aContact.getLinkedThreadId()}>
        <div className={`item-content ${aContact.getContactId() ===
            this.props.currentContactId ? 'selected' : ''}`}>
        <div className="contact-avatar" style={{
          backgroundImage: `url(${aContact.getAvatarLink()})`
        }}></div>
          <div className="item-inner">
            <div className="item-title">{aContact.getName()}</div>
            <div className={`online-status ${aContact.getOnline() ? 'online' :
                ''}`}>
              {aContact.getOnline() ? 'online' : `Last was seen 2 min ago`}
            </div>
          </div>
        </div>
      </a>
    </li>;
    /* <li>
     <a href={`./chats/${aContact.getContactId()}`}
     onTouchEnd={this.onClick.bind(this, aContact.getContactId())}
     onClick={this.onClick.bind(this, aContact.getContactId())}
     className="item-link item-content">
     <div className="item-media">
     <i className="icon icon-f7"/>
     </div>
     <div className="item-inner">
     <div className="item-title">{aContact.getName()}</div>
     <div className="item-after">CEO</div>
     </div>
     </a>
     </li>*/

  },

  render() {
    return (
        <div className="list-block contact-list">
          <ul>{
            this.props.contacts.map(this.contactToElement)
          }</ul>
        </div>
    );
  }
});