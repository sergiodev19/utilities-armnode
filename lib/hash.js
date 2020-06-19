const crypto = require('crypto');
// const { v4: uuidv4 } = require('uuid');


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
  let random_hash = null; //`$${Date.now()}-${uuidv4()}-${Date.now()}$`;

  return random_hash;
}

module.exports = {
  create,
  random
};