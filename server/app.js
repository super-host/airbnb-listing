const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/listings', (req, res) => {
  // res.json(req.listings);
  db.execute('SELECT * FROM listing.users')
  .then((result) => {
    console.log('after select all from users')
    console.log(result)
  })
  res.json('hi');
});

module.exports = app;