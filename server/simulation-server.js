// require('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const simulation = require('./simulation-sns.js');

app.get('/listings', simulation.publishToListingSNS, (req, res) => {
  res.json('hi from get all listings');
});

app.post('/listings', simulation.publishToAddListingSNS, (req, res) => {
  res.json('hello from post listings');
});

app.post('/users', simulation.publishToUsersSNS, (req, res) => {
  res.json('hello from post users');
});

module.exports = app;
