// require('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

/*
USING HTTP REQUESTS DIRECTLY TO QUERIES FOR LOAD TESTING. COMMENT OUT WHEN ENABLING SNS AND SQS
*/

const queries = require('../middleware/queries.js');

app.get('/listings', (req, res) => {
  queries.getUpdatedListings(req.body.updatedAt)
    .then((listings) => {
      console.log(listings);
      res.json('hi from get all listings');
    });
});

app.post('/listings', (req, res) => {
  queries.addListing(req.body.userid, req.body.title, req.body.description, req.body.location, req.body.price, req.body.maxguests, req.body.roomtype, req.body.accomodationtype, req.body.beds, req.body.bedrooms, req.body.bathrooms, req.body.blackOutDates)
    .then((listing) => {
      console.log(listing);
      res.json('hello from post listings');
    });
});

app.post('/users', (req, res) => {
  queries.addUser(req.body.username, req.body.isHost)
    .then((user) => {
      console.log(user);
      res.json('hello from post users');
    });
});

/*
SIMULATION WITH SNS - COMMENT OUT WHEN LOAD TESTING
*/
// const simulation = require('./simulation-sns.js');

// app.get('/listings', simulation.publishToListingSNS, (req, res) => {
//   res.json('hi from get all listings');
// });

// app.post('/listings', simulation.publishToAddListingSNS, (req, res) => {
//   res.json('hello from post listings');
// });

// app.post('/users', simulation.publishToUsersSNS, (req, res) => {
//   res.json('hello from post users');
// });

module.exports = app;
