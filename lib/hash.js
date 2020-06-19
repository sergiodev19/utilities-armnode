const crypto = require('crypto');
const { uuid } = require('uuidv4');


function create(data, salt = '', iteration = 5) {
  if (!data) {
    throw new Error("Can not create hash without data");
  }

  let c = crypto.createHmac('sha1', salt.toString());

  for (let i=0; i < iteration; i++) {
    c = c.update(data.toString());
  }

  return c.digest('hex');
}


function random() {
  let random_hash = `$${Date.now()}-${uuid()}-${Date.now()}$`;

  return random_hash;
}

module.exports = {
  create,
  random
};