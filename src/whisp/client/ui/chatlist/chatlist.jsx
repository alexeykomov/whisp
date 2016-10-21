/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Application main body, root of all components.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.ui.ChatList');


goog.require('whisp.action.OpenThreadFromThreadsAction');
goog.require('whisp.Store');
goog.require('goog.string');



/**
 */
whisp.ui.ChatList = React.createClass({
  propTypes: {
    // List of threads.
    threads: React.PropTypes.array.isRequired,
    currentThreadId: React.PropTypes.string.isRequired,
  },

  getDefaultProps() {
    return {
      threads: [],
      currentThreadId: goog.getUid({})
    }
  },

  onClick(aEvent) {
    aEvent.preventDefault();
    const threadId = aEvent.currentTarget.dataset[
        goog.string.toCamelCase('thread-id')];

    whisp.Store.dispatch(whisp.action.OpenThreadFromThreadsAction.create(
        threadId));
    whisp.Store.dispatch(whisp.action.ScreenSlideAction.create(
        whisp.state.ScreenManagerType.SIDEPANE_AND_MAINPANE,
        whisp.state.ScreenManagerState.LEFT_TRANSITS_TO_RIGHT
    ));
  },

  shouldComponentUpdate(aProps, aState) {
    return aProps.threads !== this.props.threads || aProps.currentThreadId !==
        this.props.currentThreadId
  },

  /**
   * @param {proto.Thread} aThread
   */
  threadToElement(aThread) {
    if (goog.DEBUG)
        console.log('aThread: ', aThread);
    const lastMessagePreview = aThread.getLastMessagePreview();
    return <li>
      <a href={`./chats/${aThread.getThreadId()}`}
         onMouseDown={this.onClick}
         onClick={this.onClick}
         data-thread-id={aThread.getThreadId()}>
        <div className={`item-content ${aThread.getThreadId() ===
        this.props.currentThreadId ? 'selected' : ''}`}>
          <div className="thread-avatar" style={{
            backgroundImage: `url(${aThread.getAvatarLink()})`
          }}></div>
          <div className="item-inner">
            <div className="item-title">{aThread.getName()}</div>
            <div className="message-preview">
              {lastMessagePreview ? String(lastMessagePreview) : ''}
            </div>
          </div>
        </div>
      </a>
    </li>;
  },

  render() {
    return (
        <div className="list-block thread-list">
          <ul>{
            this.props.threads.map(this.threadToElement)
          }</ul>
        </div>
    );
  }
});