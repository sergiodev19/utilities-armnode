const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

module.exports = (phoneNumber, country) => {
  if (typeof phoneNumber !== 'string') {
    throw new Error("Type of phoneNumber param must be a string");
  }

  if (typeof country !== 'string') {
    throw new Error("Type of country param must be a string");
  }

  phoneNumber = phoneUtil.parseAndKeepRawInput(phoneNumber, country);
  let isValid = phoneUtil.isValidNumberForRegion(phoneNumber, country);

  if (isValid)
    return phoneUtil.format(phoneNumber, PNF.INTERNATIONAL);
  else
    return isValid;
};