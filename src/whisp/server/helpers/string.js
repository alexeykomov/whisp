/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview String helpers.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


/**
 * @param {proto.Message} aProto
 * @param {Function} aGetter
 */
function fieldNameFromGetter(aProto, aGetter) {
  const messagePrototype = aProto.prototype;
  let foundKey;
  for (let key in messagePrototype) {
    if (messagePrototype.hasOwnProperty(key)) {
      if (messagePrototype[key] == aGetter) {
        foundKey = key;
      }
    }
  }

  if (!foundKey) {
    throw new TypeError(`There's no key for getter.`);
  }

  const str = foundKey.replace(/^get/, '');
  return str.charAt(0).toLowerCase() + String(str.substr(1));
}


module.exports = {
  fieldNameFromGetter,
};