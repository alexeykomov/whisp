/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview Network interaction helper class.
 * @author alexeykofficial@gmail.com (Alex K.)
 */

goog.provide('whisp.transport');
goog.provide('whisp.transport.EventTypes');


goog.require('goog.net.XhrIo');


/**
 * String prepended to JSON to avoid xss.
 * @type {string}
 * @const
 */
whisp.transport.JSON_XSS_PREPENDER = '])}>"';


/**
 * Headers for POST request.
 * @type {Object.<string, string>}
 * @const
 */
whisp.transport.DEFAULT_POST_HEADERS = {
  'Content-Type': 'application/json;charset=utf-8'
};


/**
 * Web sockets protocol.
 * @type {string}
 * @const
 */
whisp.transport.WEB_SOCKET_PROTOCOL = 'ws://';


/**
 * Web sockets port.
 * @type {number}
 * @const
 */
whisp.transport.WEB_SOCKET_PORT = 3002;


/**
 * How many milliseconds to add left and right to request interval.
 * @type {number}
 * @const
 */
whisp.transport.REQUEST_TIMEOUT = 1000 * 60;


/**
 * @enum {string}
 */
whisp.transport.OperationUrls = {
  SAVE_SETTINGS: './settings/save/',
};


/**
 * @param {Object} aOperation Object to turn into JSON.
 * @return {string} JSON string.
 */
whisp.transport.serialize = function(aOperation) {
  return JSON.stringify(aOperation);
}


/**
 * @param {string} aOperation String to turn into in-memory object.
 * @return {*} Object from JSON.
 */
whisp.transport.parse = function(aOperation) {
  return JSON.parse(aOperation);
}


/**
 * @param {string} aResponseText Response to extract JSON from.
 * @param {boolean=} opt_dontUseXssiPrefix Whether not to use anti-xssi prefix.
 * @see {http://jeremiahgrossman.blogspot.com/2006/01/advanced-web-attack-techniques-using.html}
 * @throws {SyntaxError}
 */
whisp.transport.getResponseJSON = function(aResponseText, 
    opt_dontUseXssiPrefix) {
  var xssiPrefix = whisp.transport.JSON_XSS_PREPENDER;

  if (!opt_dontUseXssiPrefix && aResponseText.indexOf(xssiPrefix) == 0) {
    aResponseText = aResponseText.substring(xssiPrefix.length);
  }
  return whisp.transport.parse(aResponseText);
}


/**
 * @type {goog.net.XhrIo}
 */
whisp.transport.pendingSaveSettingsXhrIo_;


/**
 * @type {number}
 */
whisp.transport.pendingSaveSettingsTimer_;


whisp.transport.clearPendingSaveSettings = function () {
  if (whisp.transport.pendingSaveSettingsXhrIo_) {
    whisp.transport.pendingSaveSettingsXhrIo_.dispose();
  }
  clearTimeout(whisp.transport.pendingSaveSettingsTimer_);
};


/**
 * Saves settings.
 * @param {proto.Settings} aSettings Settings object.
 * @param {boolean} aReload Whether reload is needed after settings are saved.
 * @return {Promise} Promised with save result.
 */
whisp.transport.saveSettings = function(aSettings, aReload) {
  whisp.transport.clearPendingSaveSettings();
  return new Promise((resolve, reject) => {
    whisp.transport.pendingSaveSettingsXhrIo_ =
        goog.net.XhrIo.send(whisp.transport.OperationUrls.SAVE_SETTINGS,
            function() {
              return whisp.transport.onSaveSettings.call(null, this, resolve,
                  reject);
            },
            'POST',
            whisp.transport.serialize(aSettings.toObject()),
            whisp.transport.DEFAULT_POST_HEADERS,
            whisp.transport.REQUEST_TIMEOUT);
    whisp.transport.pendingSaveSettingsTimer_ = setTimeout(reject,
        whisp.transport.REQUEST_TIMEOUT);
  });
};


/**
 * Save settings callback.
 * @param {goog.net.XhrIo} aXhrIo Xhr object.
 * @param {Function} aResolve Success callback.
 * @param {Function} aReject Error callback.
 */
whisp.transport.onSaveSettings = function(aXhrIo, aResolve, aReject) {
  try {
    var response = whisp.transport.getResponseJSON(aXhrIo.getResponseText());
  } catch (e) {
    aReject(new Error(`Error: ${response}.`));
  }

  if (aXhrIo.isSuccess()) {
    if (response === '0') {
      aResolve(response);
    } else {
      aReject(new Error(`Server response of failure: ${response}.`));
    }
  } else {
    aReject(new Error(`Error: ${aXhrIo.getLastError()}.`));
  }
};


/***/
whisp.transport.dispose = function() {
  goog.net.XhrIo.cleanup();
};
