/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Page state for screen manager.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.state.ScreenManagerType');


/**
 * Types of screen managers.
 * @enum {string}
 */
whisp.state.ScreenManagerType = {
  SIDEPANE_AND_MAINPANE: 'SIDEPANE_AND_MAINPANE',
  SETTINGS_1ST_AND_LEVEL_2ND_LEVEL: 'SETTINGS_1ST_AND_LEVEL_2ND_LEVEL',
  SETTINGS_2ND_AND_LEVEL_3RD_LEVEL: 'SETTINGS_2ND_AND_LEVEL_3RD_LEVEL',
  MESSAGES_AND_PROFILE: 'MESSAGES_AND_PROFILE',
  PROFILE_AND_MESSAGES: 'PROFILE_AND_MESSAGES',
};