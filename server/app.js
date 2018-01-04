const consumers = require('./queues.js');
const express = require('express');
const app = express();

consumers.getUpdatedListingsConsumer.start();
consumers.addListingsConsumer.start();
consumers.addUserConsumer.start();

module.exports = app;
