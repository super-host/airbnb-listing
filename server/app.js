// require('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const queries = require('../middleware/queries.js');
// const db = require('../database/cassandra.js');
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
const consumers = require('./queues.js');
const simulation = require('./simulation.js');

// consumers.getUpdatedListingsConsumer.start();
// consumers.addListingsConsumer.start();
// consumers.addUserConsumer.start();

app.get('/listings', simulation.publishToListingSNS, (req, res) => {
  // res.json({
  //   listings: req.response,
  //   processedAt: req.processedAt,
  // });

  res.json('hi from get all listings');
});

app.post('/listings', simulation.publishToAddListingSNS, (req, res) => {
  // res.json(req.listings);

  res.json('hello from post listings');
});

app.post('/users', simulation.publishToUsersSNS, (req, res) => {
  //req.username
  // res.json(req.listings);

  res.json('hello from post users');
});

module.exports = app;
