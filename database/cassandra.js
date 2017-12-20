const cassandra = require('cassandra-driver');

// const dotenv = require('dotenv');
// dotenv.config(); 

// const dbConfig = {
//   contactPoints: ['127.0.0.1'],
//   protocolOptions: { port: 9042 },
//   keyspace: 'listing', //creates keyspace if it doesn't already exist
  // queryOptions: { 
  //   consistency: models.consistencies.one,
  //   prepare: true,
  //  },
  // socketOptions: {
  //   connectTimeout: 1000000,
  //   readTimeout: 1000000,
  // },
// };
const db = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  keyspace: 'listing',
  queryOptions: {
    prepare: true,
   },
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('cassandra is now connected');
  }
})

// var query = `CREATE KEYSPACE IF NOT EXISTS listing WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };`;
 db.execute(
   `CREATE TABLE IF NOT EXISTS users(
      userid uuid,
      updated_at_short varchar,
      updated_at timestamp,
      username varchar,
      is_host boolean, 
      is_superhost boolean,
      PRIMARY KEY (userid, updated_at_short)
   ) WITH CLUSTERING ORDER BY (updated_at_short DESC);`,
   (err, result) => {
     console.log(err, result);
     console.log('after creating users');
   }
 )
 // .then(() => {
    db.execute(
       `CREATE TABLE IF NOT EXISTS listings(
          reviewid uuid,
          listingid uuid,
          userid uuid,
          created_at timestamp,
          updated_at timestamp,
          body text,
          rating float,
       PRIMARY KEY (reviewid, listingid)
     );`);
  // })
 // .then(() => {
  // db.execute(
         // `CREATE INDEX listingid_idx ON reviews (listingid);`);
 // })

 // .then(() =>
 //   db.execute(
 //     `CREATE TABLE IF NOT EXISTS listings(
 //     listingID int,
 //     lastModified timestamp,
 //     hostID int,
 //     title varchar, 
 //     description varchar,
 //     location varchar,
 //     price float,
 //     maxguests int,
 //     roomtype varchar,
 //     accomodationtype varchar,
 //     beds int,
 //     bedrooms int,
 //     bathrooms int,
 //     overallrating float,
 //     availabilitypreference map<date, boolean>,
 //     PRIMARY KEY (listingID, lastModified)
 //   ) WITH CLUSTERING ORDER BY (lastModified DESC);`,
 //     (err, result) => {
 //       console.log(err, result);
 //       console.log('after creating listing.listings');
 //     }
 //   ))

module.exports = db;
