/*
 * Copyright (c) 2012. Rflect, Alex K.
 */

/**
 * @fileoverview Set of locale-dependent strings for application.
 * @see {../../closure-library/closure/goog/i18n/datetimesymbols.js}.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('whisp.i18n.Symbols');
goog.provide('whisp.i18n.Symbols_by');
goog.provide('whisp.i18n.Symbols_en');
goog.provide('whisp.i18n.Symbols_en_US');
goog.provide('whisp.i18n.Symbols_ru');
goog.provide('whisp.i18n.Symbols_fr');


goog.require('whisp.state.SidePaneType');
goog.require('whisp.state.SettingsType');


/**
 * Date/time formatting symbols for locale en.
 */
whisp.i18n.Symbols_en = {
  [whisp.state.SidePaneType.CONTACTS]: 'Contacts',
  [whisp.state.SidePaneType.CHATS]: 'Chats',
  [whisp.state.SidePaneType.SETTINGS]: 'Settings',
  [whisp.state.SettingsType.GENERAL]: 'General',
  ONLINE: 'online',
  NO_THREADS: 'Select chat to message someone...',
  NO_MESSAGES: 'This dialog has no messages...',
  LANGUAGE_NAMES: [
    ['en', 'English'],
    ['ru', 'Русский'],
    ['by', 'Беларускi'],
    ['fr', 'Français']
  ],
  CHANGE_LANGUAGE_CONFIRM: 'Changing a language requires reload. Do you want to proceed?',
};


/**
 * Date/time formatting symbols for locale ru.
 */
whisp.i18n.Symbols_ru = {
  [whisp.state.SidePaneType.CONTACTS]: 'Контакты',
  [whisp.state.SidePaneType.CHATS]: 'Чаты',
  [whisp.state.SidePaneType.SETTINGS]: 'Настройки',
  [whisp.state.SettingsType.GENERAL]: 'Основные',
  ONLINE: 'онлайн',
  NO_THREADS: 'Выберите чат для сообщения кому-то...',
  NO_MESSAGES: 'В этом диалоге нет сообщений...',
  LANGUAGE_NAMES: [
    ['en', 'English'],
    ['ru', 'Русский'],
    ['by', 'Беларускi'],
    ['fr', 'Français']
  ],
  CHANGE_LANGUAGE_CONFIRM: 'Для изменения языка нужна перезагрука. Продолжить?',
};


/**
 * Date/time formatting symbols for locale by.
 */
whisp.i18n.Symbols_by = {
  [whisp.state.SidePaneType.CONTACTS]: 'Кантакты',
  [whisp.state.SidePaneType.CHATS]: 'Чаты',
  [whisp.state.SidePaneType.SETTINGS]: 'Налады',
  [whisp.state.SettingsType.GENERAL]: 'Заснаўные',
  ONLINE: 'анлайн',
  NO_THREADS: 'Выберыце чат для паведамлення камусьцi...',
  NO_MESSAGES: 'Ў гэтым дыялоге няма паведамленняў...',
  LANGUAGE_NAMES: [
    ['en', 'English'],
    ['ru', 'Русский'],
    ['by', 'Беларускi'],
    ['fr', 'Français']
  ],
  CHANGE_LANGUAGE_CONFIRM: 'Для змены мовы неабходна перазагрузка. Працягваць?',
};


/**
 * Date/time formatting symbols for locale fr.
 */
whisp.i18n.Symbols_fr = {
  [whisp.state.SidePaneType.CONTACTS]: 'Contacts',
  [whisp.state.SidePaneType.CHATS]: 'Causeries',
  [whisp.state.SidePaneType.SETTINGS]: 'Paramètres',
  [whisp.state.SettingsType.GENERAL]: 'Généraux',
  ONLINE: 'ligne',
  NO_THREADS: 'Sélectionnez le chat à un message de quelqu\'un...',
  NO_MESSAGES: 'Cette boîte de dialogue n\'a pas de messages...',
  LANGUAGE_NAMES: [
    ['en', 'English'],
    ['ru', 'Русский'],
    ['by', 'Беларускi'],
    ['fr', 'Français']
  ],
  CHANGE_LANGUAGE_CONFIRM: 'Modification d\'une langue requiert reload. Voulez-vous poursuivre?',
};


/**
 * Selected date/time formatting symbols by locale.
 * "switch" statement won't work here. JsCompiler cannot handle it yet.
 */
if (goog.LOCALE == 'en') {
  whisp.i18n.Symbols = whisp.i18n.Symbols_en;
} else if (goog.LOCALE == 'ru') {
  whisp.i18n.Symbols = whisp.i18n.Symbols_ru;
} else if (goog.LOCALE == 'by') {
  whisp.i18n.Symbols = whisp.i18n.Symbols_by;
} else if (goog.LOCALE == 'fr') {
  whisp.i18n.Symbols = whisp.i18n.Symbols_fr;
} else {
  whisp.i18n.Symbols = whisp.i18n.Symbols_en;
}