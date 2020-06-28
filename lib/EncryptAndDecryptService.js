const crypto = require('crypto');
const zlib = require('zlib');
const cryptoJSON = require('crypto-json');


class EncryptAndDecryptService {
  constructor(algorithm, password, encoding) {
    this._algorithm = algorithm || 'aes192';
    this._password = password ?
      crypto.scryptSync(password, 'GfG', 24) :
      crypto.scryptSync('password-text', 'GfG', 24);
    this._encoding = encoding || 'hex';
  }

  static encryptText(text, cipher) {
    let crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
  }

  static decryptText(text, decipher) {
    let dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
  }

  static encryptJSON(data, password) {
    return cryptoJSON.encrypt(data, password, {
      encoding: this._encoding,
      algorithm: this._algorithm
    });
  }

  static decryptJSON(encryptedObject, password) {
    return cryptoJSON.decrypt(encryptedObject, password, {
      encoding: this._encoding,
      algorithm: this._algorithm
    });
  }

  static encryptBuffer(buffer, cipher) {
    let crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
    return crypted;
  }

  static decryptBuffer(buffer, decipher) {
    let dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
    return dec;
  }

  static encryptStream(stream, cipher) {
    let zip = zlib.createGzip();
    let encryptedStream = stream.pipe(zip).pipe(cipher);
    return encryptedStream;
  }

  static decryptStream(encryptedStream, decipher) {
    let unzip = zlib.createGunzip();
    let decryptedStream = encryptedStream.pipe(decipher).pipe(unzip);
    return decryptedStream;
  }

  encrypt(data) {
    let cipher = crypto.createCipheriv(
      this._algorithm,
      this._password,
      EncryptAndDecryptService.iv
    );

    if (typeof data === 'string') {
      return EncryptAndDecryptService.encryptText(data, cipher);
    }
    if (data instanceof Buffer) {
      return EncryptAndDecryptService.encryptBuffer(data, cipher);
    }
    if (typeof data === 'object' && data.pipe && typeof data.pipe ==='function') {
      return EncryptAndDecryptService.encryptStream(data, cipher);
    }
    if (typeof data === 'object') {
      return EncryptAndDecryptService.encryptJSON(data, this._password);
    }
    else {
      throw new Error("Type error, invalid type of encrypting data");
    }
  }

  decrypt(data) {
    let decipher = crypto.createDecipheriv(
      this._algorithm,
      this._password,
      EncryptAndDecryptService.iv
    );

    if (typeof data === 'string') {
      return EncryptAndDecryptService.decryptText(data, decipher);
    }
    if (data instanceof Buffer) {
      return EncryptAndDecryptService.decryptBuffer(data, decipher);
    }
    if (typeof data === 'object' && data.pipe && typeof data.pipe ==='function') {
      return EncryptAndDecryptService.decryptStream(data, decipher);
    }
    if (typeof data === 'object') {
      return EncryptAndDecryptService.decryptJSON(data, this._password);
    }
    else {
      throw new Error("Type error, invalid type of decrypting data");
    }
  }

}

EncryptAndDecryptService.iv = crypto.randomBytes(16);

module.exports = EncryptAndDecryptService;