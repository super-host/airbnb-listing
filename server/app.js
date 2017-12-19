require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
// const db = require('../database/index.js');
const app = express();
const queries = require('../middleware/queries.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/listings', queries.getUpdatedListings, (req, res) => {
  
  // console.log(typeof req.query.updatedAt)
  res.json({
    listings: req.listings,
    processedAt: req.processedAt,
  });

  // res.json('hi from get all listings');
});

// app.post('/listings', queries.addListing, (req, res) => {
//   // res.json(req.listings);

//   res.json('hello from post listings');
// });

app.post('/users', queries.addUser, (req, res) => {
  //req.username
  // res.json(req.listings);

  res.json('hello from post users');
});


module.exports = app;

/*
curl -X GET -H "Content-type: application/json" -H "Accept: application/json"  "localhost:8080/listings"

 curl -X GET -H "Content-type: application/json" -H "Accept: application/json"  "localhost:8080/listings?updatedAt=2017-12-15"
 
curl -X POST http://localhost:8080/users -H "Content-Type: application/json" -d "{ \"username\": \"Bob\", \"isHost\": \"true\" }"

curl -d '
{
    userID: "7a4e7c01-fa84-be81-ded3-d6c634cf47fd",
    title: "title",
    description: "description",
    location: "city",
    price: "200",
    maxguests: "2",
    roomtype: "roomtype",
    accomodationtype: "accomodationtype",
    beds: "2",
    bedrooms: "1",
    bathrooms: "1",
    blackOutDates: "{ 2017-12-17, 2017-12-18 }",
  }
   -H "Content-Type: application/json" -X POST http://localhost:8080/users
 */