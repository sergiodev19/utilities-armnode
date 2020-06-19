const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

module.exports = (phoneNumber, country) => {
  phoneNumber = phoneUtil.parseAndKeepRawInput(phoneNumber, country);
  let isValid = phoneUtil.isValidNumberForRegion(phoneNumber, country);

  if (isValid)
    return phoneUtil.format(phoneNumber, PNF.INTERNATIONAL);
  else
    return isValid;
};