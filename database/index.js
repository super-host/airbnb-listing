const models = require('express-cassandra');
const uuid = require('cassandra-driver').types.Uuid;
const Promise = require('bluebird');
const seed = require('./seedDatabase.js');
// const dotenv = require('dotenv');
// dotenv.config();


const dbConfig = {
  contactPoints: ['127.0.0.1'],
  protocolOptions: { port: 9042 },
  keyspace: 'listing', //creates keyspace if it doesn't already exist
  queryOptions: {consistency: models.consistencies.one},
  promiseFactory: Promise.fromCallback,
};

const cbForPromise = (err, result) => {
  if (err) {
    throw err;
  } else {
    return result;
  }
};
// Tell express-cassandra to use the models-directory, and
// use bind() to load the models using cassandra configurations.
models.setDirectory( __dirname + '/models').bindAsync(
  {
    clientOptions: dbConfig,
    ormOptions: {
      defaultReplicationStrategy: {
        class: 'SimpleStrategy',
        replication_factor: 1,
      },
      migration: 'safe', // if NODE_ENV==="production", always set to safe. only sends an error msg in cb for any kind of model attribute changes
    },
  })
  .then(() => {
    // console.log(models.instance.user)
    var newperson = new models.instance.user({
    username: 'Bob',
    stuff: 'hii',
    });


    return Promise.fromCallback((cbForPromise) => {
      newperson.save(cbForPromise);
    });
  })
  .then((result) => {
    console.log(result);
    return models.instance.user.findAsync({ username: 'Bob'})
  })
  .then((result) => {
    console.log('in find')
    console.log(result[0].username);

    var newreview = new models.instance.review({
    username: 'Bob',
    body: 'hello world!',
    rating: 3.5,
    listingID: 'someID',
    });

    return Promise.fromCallback((cbForPromise) => {
      newreview.save(cbForPromise);
    });
  })
    .then((result) => {
    console.log(result);
    return models.instance.review.findAsync({username: 'Bob'}, {allow_filtering: true})
  })
      .then((result) => {
    console.log('in find review')
    console.log(result[0].username);
  });


// module.export = models;
