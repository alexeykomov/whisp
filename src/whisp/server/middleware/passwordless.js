/*
 * Copyright (c) 2013. Reflect, Alex K.
 */

/**
 * @fileoverview Passwordless login middleware.
 */


const passwordlessMw = require('passwordless');
const createTransport = require('nodemailer');
import { APP_URL, MAIL_OPTIONS, MAILER_CREDENTIALS, log, REDIS_SERVER,
    REDIS_PORT } from '../predefined';
const P = require('bluebird');
import { log } from '../predefined';
const RedisStore = require('passwordless-redisstore');


passwordlessMw.init(new RedisStore(REDIS_PORT, REDIS_SERVER));

const transporter = createTransport({
  service: 'Gmail',
  auth: MAILER_CREDENTIALS
});

passwordlessMw.addDelivery((aTokenToSend, aUidToSend, aUserTo, aCallback) => {
  const mailOptions = Object.assign({}, MAIL_OPTIONS, {
    to: aUserTo,
    subject: message,
    text: `'Hello!
    
    Access your account here: http://${APP_URL}?token=${aTokenToSend}&uid=${
        encodeURIComponent(aUidToSend)}`,
    /*html: ''*/
  });

  P.promisify(transporter.sendMail, {
    context: tranporter
  })(mailOptions).then(() => {
    log.debug('Mail was sent.');
    aCallback();
  }).catch(aError => {
    log.error(`Mail wasn't sent: ${aError}.`)
    aCallback(aError);
  })
});

export const passwordless = passwordlessMw;