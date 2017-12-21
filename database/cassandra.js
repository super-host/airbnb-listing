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
// console.log(db)
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
    if (err) {
      throw err;
    }
    console.log('after creating users');
  }
);
 // .then(() => {
db.execute(
   `CREATE TABLE IF NOT EXISTS reviews(
      reviewid uuid,
      listingid uuid,
      userid uuid,
      created_at timestamp,
      updated_at timestamp,
      body text,
      rating float,
   PRIMARY KEY (reviewid, listingid)
 );`,    
   (err, result) => {
    if (err) {
      throw err;
    }
    console.log('after creating reviews');
  }
);
 // })
 // .then(() => {

 // })

 // .then(() =>
db.execute(
 `CREATE TABLE IF NOT EXISTS listings(
   listingid uuid,
   userid uuid,
   updated_at_short text,
   updated_at timestamp,
   title text,
   description text,
   location text,
   price float,
   maxguests int,
   roomtype text,
   accomodationtype text,
   beds int,
   bedrooms int,
   bathrooms int,
   overallrating float,
   blackOutDates list<date>,
   PRIMARY KEY (listingid, updated_at_short)
) WITH CLUSTERING ORDER BY (updated_at_short DESC);`,
   (err, result) => {
    if (err) {
      throw err;
    }
    console.log('after creating listings');
    db.execute(
      `CREATE INDEX IF NOT EXISTS listingid_idx ON listings (updated_at_short);`);
  }
);


module.exports = db;
