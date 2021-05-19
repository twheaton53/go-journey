const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'go-journey',
  password: 'Bucsare#1!',
  port: '5432'
});

client.connect((err, res) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected to database.')
  }
});

module.exports = client;