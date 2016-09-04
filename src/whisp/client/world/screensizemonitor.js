/*
 * Copyright (c) 2016. Whisp, Alex K.
 */


/**
 * @fileoverview .
 * @author alexeykcontact@gmail.com (Alex K.)
 */


goog.provide('whisp.world.ScreenSizeMonitor');


goog.require('goog.events.EventHandler');
goog.require('goog.dom.ViewportSizeMonitor');
goog.require('whisp.action.ScreenSizeChangeAction');
goog.require('whisp.Store');



class ScreenSizeMonitor extends goog.events.EventHandler{
  constructor() {
    super(this);
    this.viewPortSizeMonitor_ = new goog.dom.ViewportSizeMonitor();

  }

  enterDocument() {
    this.listen(this.viewPortSizeMonitor_, goog.events.EventType.RESIZE,
        this.onScreenSizeChange);
    this.onScreenSizeChange();
  }

  onScreenSizeChange() {
    if (window.matchMedia && window.matchMedia(
            whisp.world.ScreenSizeMonitor.BIG_SCREEN_QUERY).matches) {
      whisp.Store.dispatch(whisp.action.ScreenSizeChangeAction.create(false));
    } else {
      whisp.Store.dispatch(whisp.action.ScreenSizeChangeAction.create(true))
    }
  }

  /**
   * @override
   */
  disposeInternal() {
    ScreenSizeMonitor.superClass_.disposeInternal.call(this);
    this.viewPortSizeMonitor_.dispose();
  }
}


/**
 * @typedef {ScreenSizeMonitor}
 */
whisp.world.ScreenSizeMonitor = ScreenSizeMonitor;


whisp.world.ScreenSizeMonitor.BIG_SCREEN_QUERY = '(min-width: 640px)';
