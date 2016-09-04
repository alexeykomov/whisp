/**
 * @license
 * Copyright 2015 Google Inc. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview OpenPGP Context WebWorker bootstrap file.
 */

goog.provide('whisp.worker.EntryPoint');

goog.require('e2e.async.Result');
goog.require('e2e.async.WorkerSelf');
goog.require('e2e.ext.utils.IndexedDbStorage');
goog.require('e2e.openpgp.ContextImpl');
goog.require('e2e.openpgp.ContextService');



class WorkerEntryPoint {
  constructor() {
    this.contextPromise = new e2e.async.Result();
    this.db = new e2e.ext.utils.IndexedDbStorage('keyring', storage => {
      if (goog.DEBUG)
        console.log('storage: ', storage);
      this.contextPromise.callback(new e2e.openpgp.ContextImpl(storage));
    });
    
    this.ctxService = null;
  }


  onMessage(aEvent) {
    if (goog.DEBUG)
      console.log('aEvent.data: ', aEvent.data);

     var port = aEvent.ports[0];

    if (goog.DEBUG)
      console.log('port: ', port);
    if (goog.DEBUG)
      console.log('port is mine: ', port.mine);

    if (aEvent.data == 'port') {
      this.ctxService = new e2e.openpgp.ContextService(this.contextPromise, port)
    }
  }


  onLoad() {
    onmessage = this.onMessage.bind(this);
  }
}


/**
 * @typedef {WorkerLoader}
 */
whisp.worker.EntryPoint = WorkerEntryPoint;


// Call main method.
new whisp.worker.EntryPoint().onLoad();