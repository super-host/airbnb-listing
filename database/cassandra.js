const cassandra = require('cassandra-driver');

const dbConfig = {
  contactPoints: ['127.0.0.1'],
  // protocolOptions: { port: 9042 },
  keyspace: 'listing',
  
}
const db = new cassandra.Client(dbConfig);

// connect this session and set default keyspace for all queries
db.connect('listing', (err, result) => {
  // if (result) {
    // console.log(result)
    console.log('cassandra connected')
  // } else {
  //   console.log(err);
  // }
});

  db.execute(`CREATE KEYSPACE IF NOT EXISTS listing WITH REPLICATION = { ‘class’ : ‘SimpleStrategy’, ‘replication_factor’ : 1 };`)
  .then(() =>
    db.execute(
      `CREATE TABLE IF NOT EXISTS users(
        userID int,
        lastModified timestamp,
        username varchar,
        isHost boolean, 
        isSuperhost boolean,
        PRIMARY KEY (userID, lastModified)
      ) WITH CLUSTERING ORDER BY (lastModified DESC);`,
      (err, result) => {
        console.log(err, result);
        console.log('after creating listing.users')
      }
    )
      .then(() =>
        db.execute(
          `CREATE TABLE IF NOT EXISTS listings(
          listingID int,
          lastModified timestamp,
          hostID int,
          title varchar, 
          description varchar,
          location varchar,
          price float,
          maxguests int,
          roomtype varchar,
          accomodationtype varchar,
          beds int,
          bedrooms int,
          bathrooms int,
          overallrating float,
          availabilitypreference map<date, boolean>,
          PRIMARY KEY (listingID, lastModified)
        ) WITH CLUSTERING ORDER BY (lastModified DESC);`,
          (err, result) => {
            console.log(err, result);
            console.log('after creating listing.listings');
          }
        ))

  );

module.exports = db;

/*
CREATE  KEYSPACE "listing" 
   WITH REPLICATION = { 
      'class' : 'SimpleStrategy', 
      'replication_factor' : 1
    };

CREATE TABLE IF NOT EXISTS users (
  userID int,
  lastModified timestamp,
  username varchar,
  isHost boolean,
  isSuperhost boolean,
  PRIMARY KEY (userID, lastModified)
  ) WITH CLUSTERING ORDER BY (lastModified DESC);

INSERT INTO users (userID, lastModified, username, isHost,
   isSuperhost) VALUES(1, totimestamp(now()), 'Alice', true, false);

ALTER TABLE listing.users 
ALTER lastModified TYPE timestamp;

curl -XPUT -H "Content-Type: application/json" -u elastic 'localhost:9200/_xpack/security/user/elastic/_password' -d '{
  "password" : "password"
}'

curl -XPUT -H "Content-Type: application/json" -u kibana 'localhost:9200/_xpack/security/user/kibana/_password' -d '{
  "password" : "password"
}'

curl -XPUT -H "Content-Type: application/json" -u logstash_system 'localhost:9200/_xpack/security/user/logstash_system/_password' -d '{
  "password" : "password"
}'

q#E_rxVg?5Ik2v@Ih!a_

curl -H "Content-Type: application/json" -X GET 'localhost:8080/listings'

*/