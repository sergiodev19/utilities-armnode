const {
  hash,
  errors,
  formatPhoneNumber,
  EncryptAndDecryptService
} = require('./lib');

module.exports = {
  errors,
  formatPhoneNumber,
  createHash: hash.create,
  randomHash: hash.random,
  TransformatorData: EncryptAndDecryptService
};