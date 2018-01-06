const consumers = require('./queues.js');
// const express = require('express');
// const app = express();

const startConsumers = function () {
  consumers.getUpdatedListingsConsumer.start();
  consumers.addListingsConsumer.start();
  consumers.addUserConsumer.start();
}

module.exports = startConsumers;
