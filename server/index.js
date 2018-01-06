/*
SIMULATION WITH SNS, REAL APP WITH SQS CONSUMERS. DISABLE WHEN LOAD TESTING
*/
// const app = require('./simulation-server.js');
// const startConsumers = require('./app.js');
// startConsumers();

/*
HTTP REQUESTS - ONLY FOR LOAD TESTING
*/
require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`now listening on port ${PORT}`));