/*
 * Copyright (c) 2013. Reflect, Alex K.
 */

/**
 * @fileoverview Passwordless login middleware.
 */


const passwordless = require('passwordless');
const { MAILER_CREDENTIALS, logger, REDIS_SERVER,
    REDIS_PORT, SMTP_SERVER, SMTP_PORT } = require('../predefined');
const P = require('bluebird');
const RedisStore = require('passwordless-redisstore');
const email = require('emailjs');


passwordless.init(new RedisStore(REDIS_PORT, REDIS_SERVER));

const smtpServer  = email.server.connect({
  user:    MAILER_CREDENTIALS.fullUsername,
  password: MAILER_CREDENTIALS.password,
  host:    `${SMTP_SERVER}:${SMTP_PORT}`,
  ssl:     true
});

passwordless.addDelivery(async (tokenToSend, uidToSend, recipient, callback) => {
  const sendMail = P.promisify(smtpServer.send);
  try {
    await sendMail({
      text: `Hello!\nAccess your account here: http://${
          'localhost:3001'}'?token=${tokenToSend}&uid=${
          encodeURIComponent(uidToSend)}`,
      from: MAILER_CREDENTIALS.fullUsername,
      to: recipient,
      subject: 'Token for Whisp'
    });
    logger.info('Mail was successfully sent.');
    callback();
  } catch (e) {
    logger.error(e);
    callback(e);
  }
});

module.exports = {
  passwordless
};