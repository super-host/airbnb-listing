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
const consumers = require('./queues.js');

// consumers.getUpdatedListingsConsumer.start();
// consumers.addListingsConsumer.start();
// consumers.addUserConsumer.start();

// app.get('/listings', queries.getUpdatedListings, (req, res) => {
//   res.json({
//     listings: req.response,
//     processedAt: req.processedAt,
//   });

//   // res.json('hi from get all listings');
// });

// app.post('/listings', queries.addListing, (req, res) => {
//   // res.json(req.listings);

//   res.json('hello from post listings');
// });

// app.post('/users', queries.addUser, (req, res) => {
//   //req.username
//   // res.json(req.listings);

//   res.json('hello from post users');
// });

module.exports = app;
