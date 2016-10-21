/*
 * Copyright (c) 2015. Reflect, Alex K.
 */

/**
 * @fileoverview Set of predefined constants for app.
 * @author alexeykcontact@gmail.com (Alex K.)
 */

goog.provide('whisp.predefined');


//TODO(alexk): much of this file will go to cfg
/**
 * @define {string} UI type constant. Defined on compile time. Either '' or
 * 'TOUCH'.
 */
whisp.UI_TYPE = '';


/**
 * @define {string} Name of worker script.
 */
whisp.WORKER_SCRIPT_NAME = 'static/output-compiled-worker.js';


/**
 * Whether ui type is mobile.
 * @type {boolean}
 * @const
 */
whisp.TOUCH = whisp.UI_TYPE == 'TOUCH';


/**
 * Feature flag - whether larger targets enabled, for touch.
 * @type {boolean}
 */
whisp.TOUCH_INTERFACE_ENABLED = whisp.TOUCH;


/**
 * Feature flag - whether non-native scroller enabled.
 * @type {boolean}
 */
whisp.ARTIFICIAL_SCROLLER_ENABLED = goog.userAgent.IPHONE ||
    goog.userAgent.IPAD;


/**
 * Whether wireless communication is used.
 * @type {boolean}
 */
whisp.WIRELESS_COMMUNICATION_IS_USED = whisp.TOUCH;