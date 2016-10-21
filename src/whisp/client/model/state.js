/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Main app state.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.State');


goog.require('proto.Contact');
goog.require('proto.Message');
goog.require('proto.Thread');
goog.require('proto.SettingsItem');
goog.require('whisp.i18n.Symbols');
goog.require('proto.Settings');
goog.require('whisp.state.SidePaneType');
goog.require('whisp.state.SettingsType');
goog.require('whisp.state.ScreenManagerState');
goog.require('whisp.state.ScreenManagerType');


const messages = [
  (() => {
    const m = new proto.Message();
    m.setMessageText('Hello!');
    m.setAvatarLink('');
    m.setIncoming(false);
    m.setSenderId(1);
    m.setSentTimestamp(String(new Date().getTime()));
    return m
  })(),
  (() => {
    const m = new proto.Message();
    m.setMessageText('u2!');
    m.setAvatarLink('');
    m.setIncoming(true);
    m.setSenderId(2);
    m.setSentTimestamp(String(new Date().getTime()));
    return m
  })(),
  (() => {
    const m = new proto.Message();
    m.setMessageText('What\'s up?');
    m.setAvatarLink('');
    m.setIncoming(false);
    m.setSenderId(1);
    m.setSentTimestamp(String(new Date().getTime()));
    return m
  })(),
  (() => {
    const m = new proto.Message();
    m.setMessageText('Nothing\'s really up? What about you?');
    m.setAvatarLink('');
    m.setIncoming(true);
    m.setSenderId(2);
    m.setSentTimestamp(String(new Date().getTime()));
    return m
  })(),
  (() => {
    const m = new proto.Message();
    m.setMessageText('The same. Wanna meet up?');
    m.setAvatarLink('');
    m.setIncoming(false);
    m.setSenderId(1);
    m.setSentTimestamp(String(new Date().getTime()));
    return m
  })(),
  (() => {
    const m = new proto.Message();
    m.setMessageText('Yeah, sure, why not');
    m.setAvatarLink('');
    m.setIncoming(true);
    m.setSenderId(2);
    m.setSentTimestamp(String(new Date().getTime()));
    return m
  })(),
  (() => {
    const m = new proto.Message();
    m.setMessageText('Maybe movie?');
    m.setAvatarLink('');
    m.setIncoming(false);
    m.setSenderId(1);
    m.setSentTimestamp(String(new Date().getTime()));
    return m
  })(),
  (() => {
    const m = new proto.Message();
    m.setMessageText('What about Suicide squad or Neon demon?');
    m.setAvatarLink('');
    m.setIncoming(false);
    m.setSenderId(1);
    m.setSentTimestamp(String(new Date().getTime()));
    return m
  })(),
  (() => {
    const m = new proto.Message();
    m.setMessageText('I\'d rather go to the latter.');
    m.setAvatarLink('');
    m.setIncoming(false);
    m.setSenderId(1);
    m.setSentTimestamp(String(new Date().getTime()));
    return m
  })(),
  (() => {
    const m = new proto.Message();
    m.setMessageText('But it\'s R-rated.');
    m.setAvatarLink('');
    m.setIncoming(false);
    m.setSenderId(1);
    m.setSentTimestamp(String(new Date().getTime()));
    return m
  })(),
  (() => {
    const m = new proto.Message();
    m.setMessageText('What\'s your call?');
    m.setAvatarLink('');
    m.setIncoming(false);
    m.setSenderId(1);
    m.setSentTimestamp(String(new Date().getTime()));
    return m
  })(),
];


/**
 * @typedef {Object}
 */
whisp.State = {

  /**
   * @type {string}
   */
  uiLanguage: 'en',

  /**
   * @type {!Array.<proto.Message>}
   */
  messages: messages,

  [`cached-messages-${1}`]: messages,

  /**
   * @type {!Array.<proto.Contact>}
   */
  contacts: [
    (() => {
      const c = new proto.Contact();
      c.setContactId(String(1));
      c.setName('Alexey Komov');
      c.setContactId(String(goog.getUid(c)));
      c.setAvatarLink('https://pp.vk.me/c624522/v624522020/3394a/JPELIhdredM.jpg');
      c.setLinkedThreadId('10');
      return c
    })(),
    (() => {
      const c = new proto.Contact();
      c.setContactId(String(2));
      c.setName('Katya');
      c.setContactId(String(goog.getUid(c)));
      c.setAvatarLink('https://pp.vk.me/c629525/v629525564/4ad42/lVbS_nO5GAM.jpg');
      c.setLinkedThreadId('20');
      return c
    })(),
    (() => {
      const c = new proto.Contact();
      c.setContactId(String(3));
      c.setName('Lex');
      c.setOnline(true);
      c.setContactId(String(goog.getUid(c)));
      c.setAvatarLink('');
      return c
    })()
  ],

  /**
   * @type {!Array.<proto.Thread>}
   */
  threads: [
    (() => {
      const t = new proto.Thread();
      t.setName('Alexey Komov');
      t.setThreadId(String(10));
      t.setAvatarLink('https://pp.vk.me/c624522/v624522020/3394a/JPELIhdredM.jpg');
      t.setLastMessagePreview('What\'s your call?');
      return t
    })(),
    (() => {
      const t = new proto.Thread();
      t.setName('Katya');
      t.setThreadId(String(20));
      t.setAvatarLink('https://pp.vk.me/c629525/v629525564/4ad42/lVbS_nO5GAM.jpg');
      t.setLastMessagePreview('');
      return t
    })(),
  ],


  /**
   * @type {!Array.<proto.SettingsItem>}
   */
  settingsItems: [
    (() => {
      const i = new proto.SettingsItem();
      i.setName('General');
      i.setType(whisp.state.SettingsType.GENERAL);
      i.setName(whisp.i18n.Symbols[whisp.state.SettingsType.GENERAL]);
      return i
    })(),
  ],

  /**
   * @type {string}
   */
  currentThreadId: '',

  /**
   * @type {string}
   */
  currentContactId: '',

  /**
   * @type {whisp.state.SettingsType}
   */
  currentSettingsItem: whisp.state.SettingsType.GENERAL,

  /**
   * @type {whisp.state.SidePaneType}
   */
  activeSidePaneType: whisp.state.SidePaneType.CONTACTS,

  /**
   * Map of threadId -> text.
   * @type {Object.<string, string>}
   */
  messageDrafts: {},

  /**
   * @type {string}
   */
  currentMessageDraft: '',

  /**
   * @type {number}
   */
  unreadChatCount: 1,

  /**
   * State of particular screen manager.
   */
  [whisp.state.ScreenManagerType.SIDEPANE_AND_MAINPANE]:
      whisp.state.ScreenManagerState.LEFT,

  /**
   * @type {boolean}
   */
  isSmallScreen: false,

  /**
   * @type {proto.Settings}
   */
  settings: (() => {
    const settings = new proto.Settings;
    settings.setUiLanguage('en');
    settings.setReload(false);
    return settings;
  })(),

  /**
   * @type {proto.Settings}
   */
  backupSettings: (() => {
    const settings = new proto.Settings;
    settings.setUiLanguage('en');
    settings.setReload(false);
    return settings;
  })(),
};
