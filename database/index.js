const { Client } = require('pg')
const { password } = require('../password.js');

const client = new Client({
  user: 'kevinpozzi',
  host: 'localhost',
  database: 'openforcedb',
  password: password,
  port: 5432,
})

client.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to DB');
  }
})

module.exports.db = client;