// const ExpressCassandra = require('express-cassandra');
const models = require('express-cassandra');
const Promise = require('bluebird');
// const userModel = require('./models/userModel.js');
// console.log(userModel)
// const reviewModel = require('./models/listingModel.js');
// const listingModel = require('./models/reviewModel.js');
// const dotenv = require('dotenv');

// dotenv.config();


const dbConfig = {
  contactPoints: ['127.0.0.1'],
  protocolOptions: { port: 9042 },
  keyspace: 'listing', //creates keyspace if it doesn't already exist
  queryOptions: {consistency: models.consistencies.one},
  promiseFactory: Promise.fromCallback,
};

//Tell express-cassandra to use the models-directory, and
//use bind() to load the models using cassandra configurations.
// console.log( __dirname + '/models')
models.setDirectory( __dirname + '/models').bindAsync(
// let db = ExpressCassandra.createClient(
  {
      clientOptions: dbConfig,
      ormOptions: {
          defaultReplicationStrategy : {
              class: 'SimpleStrategy',
              replication_factor: 1,
          },
          migration: 'safe', // if NODE_ENV==="production", always set to safe. only sends an error msg in cb for any kind of model attribute changes
          // dropTableOnSchemaChange: true,
          // createKeyspace: true,
      },
  }
  // ,

  // (err) => {
  //   console.log(err)
  //   if (err) throw err;
  // }
      // in `models.instance.Person` object containing supported orm operations.
)
.then (() => {
// console.log(models)
  var newperson = new models.instance.user({
  username: 'Bob',
  stuff: 'hi',
  // age: 22,
  });

  newperson.save((err, result) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log('person was saved!');
    console.log(result);
    // return result
  })
  // .then((result => {
  //     console.log(result);

  // }))
})
// .then(() => {
//   console.log('hi')
// });

// let User = db.loadSchema('user', userModel);

// console.log(db.instance.user === User);

// User.syncDB((err, result) => {
//   if (err) throw err;
// })

// models.getTableListAsync()
// .then((results) => {
//   console.log(results)
// })
// var newperson = new models.user({
//     username: 'Bob',
//   stuff: 'hi',
// })

// var newperson = new User({
//   username: 'Bob',
//   stuff: 'hi',
//   // age: 22,
// });

// newperson.save((err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('person was saved!');
// });

// User.find({}, function(err, bob){
//     if(err) {
//         console.log(err);
//         return;
//     }
//     //Note that returned variable bob here is an instance of your model,
//     //so you can also do bob.delete(), bob.save() type operations on the instance.
//     console.log('Found ' + bob.username + ' is a host: ' + bob.isHost);
// });

// module.export = models;
