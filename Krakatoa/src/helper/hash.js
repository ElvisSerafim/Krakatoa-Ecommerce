const crypto = require('crypto');

module.exports = {
  setPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
    const obj = {
      salt,
      hash,
    };
    return obj;
  },
  validadePassword(hash, salt, password) {
    let valid = false;
    const tester = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
    if (tester === hash) {
      valid = true;
      return (valid);
    }
    return valid;
  },
};
