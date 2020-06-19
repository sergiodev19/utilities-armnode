const {
  hash,
  formatPhoneNumber,
  EncryptAndDecryptService
} = require('./lib');

module.exports = {
  createHash: hash.create,
  randomHash: hash.random,
  formatPhoneNumber,
  TransformatorData: EncryptAndDecryptService
};