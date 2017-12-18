const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const queries = require('../middleware/queries.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/listings', queries.getUpdatedListings, (req, res) => {
  // res.json(req.listings);
  // db.execute('SELECT * FROM listing.users')
  // .then((result) => {
  //   console.log('after select all from users')
  //   console.log(result)
  // })

  res.json('hi from get all listings');
});

// app.post('/listings', queries.addListing, (req, res) => {
//   // res.json(req.listings);

//   res.json('hello from post listings');
// });

// app.post('/users', queries.users, (req, res) => {
//   //req.username
//   // res.json(req.listings);

//   res.json('hello from post users');
// });


module.exports = app;

// curl -X GET -H "Content-type: application/json" -H "Accept: application/json"  "localhost:8080/listings"