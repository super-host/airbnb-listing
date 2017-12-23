// require('newrelic');

// Load the SDK for JavaScript
// var AWS = require('aws-sdk');
// Set the region 
// AWS.config.update({region: 'us-east-2'});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const queries = require('../middleware/queries.js');
// const db = require('../database/cassandra.js');
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/listings', queries.getUpdatedListings, (req, res) => {
  res.json({
    listings: req.response,
    processedAt: req.processedAt,
  });

  // res.json('hi from get all listings');
});

app.post('/listings', queries.addListing, (req, res) => {
  // res.json(req.listings);

  res.json('hello from post listings');
});

app.post('/users', queries.addUser, (req, res) => {
  //req.username
  // res.json(req.listings);

  res.json('hello from post users');
});

module.exports = app;

/*
curl -X GET -H "Content-type: application/json" -H "Accept: application/json"  "localhost:8080/listings"

 curl -X GET -H "Content-type: application/json" -H "Accept: application/json"  "localhost:8080/listings?updatedAt=2017-12-15"
 
curl -X POST http://localhost:8080/users -H "Content-Type: application/json" -d "{ \"username\": \"Bob\", \"is_host\": \"true\" }"

curl -d { "userid":"7a4e7c01-fa84-be81-ded3-d6c634cf47fd",
"title":"title", "description":"description",
"location": "city", "price":"300", "maxguests":"2", "roomtype":"entire place", "accomodationtype":"condo", "beds":"2", "bedrooms":"2",
"bathrooms":"2", "blackOutDates":"{ '2017-07-01', '2017-08-01'}" } -H "Content-Type: application/json" -X POST http://localhost:8080/listings
 */