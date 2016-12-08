/*
 * Copyright (c) 2016. Whisp, Alex K.
 */

/**
 * @fileoverview Application entry point.
 * @author alexeykcontact@gmail.com (Alex K)
 */

goog.provide('whisp.ui.EntryPoint');


goog.require('goog.dom');
goog.require('goog.dom.classlist');
goog.require('goog.events.EventHandler');
goog.require('goog.labs.style.PixelDensityMonitor');
goog.require('goog.labs.style.PixelDensityMonitor.Density');
goog.require('goog.labs.style.PixelDensityMonitor.EventType');
goog.require('e2e.openpgp.WorkerContextImpl');
goog.require('whisp.predefined');
goog.require('whisp.Store');
goog.require('whisp.ui.MainBody');
goog.require('whisp.action.InitAction');
goog.require('whisp.world.ScreenSizeMonitor');
goog.require('whisp.transport');



/**
 * @unrestricted
 */
class EntryPoint extends goog.events.EventHandler {
  constructor() {
    super();

    /**
     * Whether load event was fired and whisp main class instance was created.
     * @type {boolean}
     * @private
     */
    this.documentLoaded_ = false;

    /**
     * @type {MessageChannel}
     */
    this.channel;

    /**
     * @type {Worker}
     */
    this.worker;

    /**
     * @type {goog.labs.style.PixelDensityMonitor}
     */
    this.pixelDensityMonitor = new goog.labs.style.PixelDensityMonitor();

    /**
     * @type {whisp.world.ScreenSizeMonitor}
     */
    this.screenSizeMonitor = new whisp.world.ScreenSizeMonitor();
  }


  /**
   * Binds creation of whisp instance to load events.
   */
  enterDocument() {
    this.listen(window, 'load', this.onLoad, false);

    this.listen(window, 'DOMContentLoaded', this.onLoad, false);

    this.listen(window, 'unload', (aEvent) => {
      if (this.documentLoaded_) {
        this.dispose();
      }
    }, false);

    this.listen(this.pixelDensityMonitor,
        goog.labs.style.PixelDensityMonitor.EventType.CHANGE,
        this.onPixelDensityChange, false);
  }


  onPixelDensityChange() {
    if (goog.DEBUG)
        console.log('this.pixelDensityMonitor.getDensity(): ', this.pixelDensityMonitor.getDensity());

    const documentElement = document.documentElement;
    goog.dom.classlist.removeAll(documentElement, [1, 2, 3].map(aNumber =>
        `pixel-ratio-${aNumber}`));
    goog.dom.classlist.add(documentElement,
        `pixel-ratio-${this.pixelDensityMonitor.getDensity()}`);
  }


  /**
   * Binds creation of whisp instance to load events.
   */
  onLoad() {
    // Load event will fire later than dom ready.
    if (!this.documentLoaded_) {
      this.documentLoaded_ = true;
      this.onLoadInternal()
    }
  }

  onLoadInternal() {

    this.channel = new MessageChannel();

    this.worker = new Worker(whisp.WORKER_SCRIPT_NAME);
    var ctx = new e2e.openpgp.WorkerContextImpl(this.channel.port1);
    this.channel.port2.mine = true;

    setTimeout(() => {
      this.worker.postMessage('port', [this.channel.port2]);
      setTimeout(() => {
        ctx.setKeyRingPassphrase('pass').addCallback(() => {
          console.log('keyring is encrypted');
          ctx.isKeyRingEncrypted().addCallback(value => {
            console.log('keyring is encrypted: ', value);
          }).addErrback(e => {
            console.log('error: ', e);
          });
        }).addErrback(e => {
          console.log('error: ', e);
        });
      }, 2000);
    }, 2000);


    this.screenSizeMonitor.enterDocument();
    this.createDom();
  }

  createDom() {
    const container = goog.dom.createDom('div', 'main-cont');

    this.onPixelDensityChange();
    document.body.appendChild(container);
    React.render(React.createElement(whisp.ui.MainBody, {
      store: whisp.Store
    }), container);
  }


  /**
   * Disposes of the main instance.
   * @override
   * @protected
   */
  disposeInternal() {
    super.disposeInternal();

    this.pixelDensityMonitor.dispose();
    this.screenSizeMonitor.dispose();
    whisp.transport.dispose();

    //This class dispose logic.
    this.channel.port1.close();
    this.channel.port2.close();
    this.worker.terminate();
  };
}


/**
 * @typedef {EntryPoint}
 */
whisp.ui.EntryPoint = EntryPoint;


// Call main method.
new whisp.ui.EntryPoint().enterDocument();


