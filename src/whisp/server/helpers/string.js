/*
 * Copyright (c) 2013. Rflect, Alex K.
 */

/**
 * @fileoverview String helpers.
 * @author alexeykcontact@gmail.com (Alex K.)
 */


function fieldNameFromGetter(aGetterName) {
  const str = aGetterName.replace(/$get/, '');
  return str.charAt(0).toLowerCase() + String(str.substr(1));
}


module.exports = {
  fieldNameFromGetter,
};