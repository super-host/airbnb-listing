const models = require('express-cassandra');
const Promise = require('bluebird');

// const dotenv = require('dotenv');
// dotenv.config(); 

const dbConfig = {
  contactPoints: ['127.0.0.1'],
  protocolOptions: { port: 9042 },
  keyspace: 'listing', //creates keyspace if it doesn't already exist
  queryOptions: { consistency: models.consistencies.one },
  promiseFactory: Promise.fromCallback,
  socketOptions: {
    connectTimeout: 1000000,
    readTimeout: 1000000,
  },
};
let db;
// Tell express-cassandra to use the models-directory, and
// use bind() to load the models using cassandra configurations.
models.setDirectory(__dirname + '/models').bindAsync(
  {
    clientOptions: dbConfig,
    ormOptions: {
      defaultReplicationStrategy: {
        class: 'SimpleStrategy',
        replication_factor: 5,
        // replication_factor: 1,
      },
      migration: 'safe', // if NODE_ENV==="production", always set to safe. only sends an error msg in cb for any kind of model attribute changes
    },
  })

  .then((result) => {
    console.log('done setting up db');
// console.log(models)
    // console.log(result);

    console.time('importAsync');
    return models.importAsync(__dirname + '/fixtures');
  })
    .then((result) => {
    console.timeEnd('importAsync');
    console.log('finished doing some fixtures');
    // return 'done setup of db'
  });

module.exports = models;
