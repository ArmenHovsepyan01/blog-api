const crypto = require('node:crypto');

console.log(crypto.randomBytes(10).toString('hex'));
