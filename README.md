# utilities-armnode

![](https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQoRNotK8e1GIfluPHlmGvvQe3INexzi3k5YA&usqp=CAU)

`utilities-armnode` is a Node.js package for help to code.

## Installation
Use the package manager [npm](https://www.npmjs.com/package/utilities-armnode) to install utilities-armnode.

```bash
npm install utilities-armnode
```

## Usage
```javascript
const { TransformatorData } = require('utilities-armnode');

let transformator = new TransformatorData();

let encryptedString = transformator.encrypt('string');
console.log(encryptedString) // 6741a576d4607031131e809108d5a1c1

let decryptedString = transformator.decrypt(encryptedString);
console.log(decryptedString) // 'string'
```

## Helpers
+ [TransformatorData](#TransformatorData)
    + encrypt
    + decrypt
+ [hash](#hash)
    + create
    + random
+ [errors](#errors)
    + AssertionError
    + NotFoundError
    + AccessError
    + errorHandler
+ [formatPhoneNumber](#formatPhoneNumber)

#### TransformatorData
```javascript
const fs = require('fs');
const { TransformatorData } = require('utilities-armnode');

let transformator = new TransformatorData(algorithm, password, encoding); 
// Or just new TransformatorData();
// algorithm - optional param, default value is 'aes192', also available values | 'aes-128-ccm'
// password - optional param, default value is 'password-text', you can use any string
// encoding - optional param, default value is 'hex', you can use any string

// Encryption and decryption examples for different data types

// String
let encryptedString = transformator.encrypt('string');
let decryptedString = transformator.decrypt(encryptedString);

// Buffer
let encryptedBuffer = transformator.encrypt(new Buffer("hello world", "utf8"));
let decryptedBuffer = transformator.decrypt(encryptedBuffer).toString('utf8');

// Stream data
let readStreamData = fs.createReadStream('./test.txt');
let encryptedStream = transformator.encrypt(readStreamData);
let writeStreamData = fs.createWriteStream('./file.out.txt');
let decryptedStream = transformator.decrypt(encryptedStream).pipe(writeStreamData);

// JSON or sample Object
let encryptedJSON = transformator.encrypt({ "key": "value" });
let decryptedJSON = transformator.decrypt(encryptedJSON);
```
#### hash
```javascript
const { hash } = require('utilities-armnode');
let data = 'sample string';
let salt = 'salt-striing';
let iteration = 2;

let dataHash = hash.create(data, salt, iteration);
// Or just hash.create();
// data - required param, data from which will be generate hash
// salt - optional param, default value is '', you can use any string
// iteration - optional param, default value is 5, you can use any number

let randomHash = hash.random();
```
#### errors
```javascript
const { errors } = require('utilities-armnode');
let message = 'error-message';

throw new errors.AssertionError(message); // status code is 500
// message - optional param, default value is 'Bad request', you can use any string

throw new errors.NotFoundError(message); // status code is 404
// message - optional param, default value is 'Not found', you can use any string

throw new errors.AccessError(message); // status code is 403
// message - optional param, default value is 'Forbidden', you can use any string

// Error handling in Node.js express app
const express = require("express");
const app = express();

app.use(errors.errorHandler);
// OR
errors.errorHandler(err, req, res, next);
// err - required param, Error object
// req - required param, express request object
// res - required param, express response object
// next - required param, express next function
```
#### formatPhoneNumber
```javascript
const { formatPhoneNumber } = require('utilities-armnode');
let phone = '091**15**'; // change to real phone number
let country = 'am';

let formattedPhoneNumber = formatPhoneNumber(phone, country);
// phone - required param, real phone number type of String
// country - required param, real country code type oy String

// formattedPhoneNumber = +374 91 ** 15 ** - if it is valid phone number
// formattedPhoneNumber = false - if it is invalid phone number
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)