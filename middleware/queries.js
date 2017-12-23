// const db = require('../database/index.js');
const db = require('../database/cassandra.js');
const Uuid = require('cassandra-driver').types.Uuid;
const TimeUuid = require('cassandra-driver').types.TimeUuid;

const moment = require('moment');
// const helpers = require('../database/generate_fixtures/fixtureGeneratorHelpers.js');

const getUpdatedListings = (req, res, next) => {
  // let updatedAt = req.query.updated_at;
  // console.log(updatedAt)
  const processedAt = moment().format('YYYY-MM-DD');
  // console.log('processedat');
  // console.log(processedAt);
  // const query = {
  //   updated_at_short: {$gte: '2017-12-11'},
  //   $limit: 2
  // }
  // // db.instance.listing.findAsync({updatedAt: updatedAt})
  // // console.log(db)
  // db.instance.xlisting.findAsync(query, {raw: true})

  //   .then((latestListings) => {
  //     console.log('after finding listings');
  //     // console.log(latestListings)
  //     req.listings = latestListings;
  //     req.processedAt = processedAt;
  //     next();
  //   })
  //   .catch((err) => {
  //     res.status(500).send(err);
  //     // res.status(500).send(`Error getting latest listings that were last updated since ${updatedAt}`);
  //   });

  const query = "SELECT * FROM listings WHERE updated_at_short >= ? ";
  const params = [req.query.updated_at];

  db.execute(query, params, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const response = {};

      for (let row of result.rows) {
        response[row.listingid] = {
          userid: row.userid,
          updated_at_short: row.updated_at_short,
          title: row.title,
          description: row.description,
          location: row.city,
          price: row.price,
          maxguests: row.maxguests,
          roomtype: row.roomtype,
          accomodationtype: row.accomodationtype,
          beds: row.beds,
          bedrooms: row.bedrooms,
          bathrooms: row.bathrooms,
          blackOutDates: row.blackOutDates,
        };
      }
      req.response = response;
      req.processedAt = processedAt;
      next();
    }
  });
};

const addUser = (req, res, next) => {
  // superhost status isn't added because that is updated internally
  //removed hardcoded updated at short. should be a truncated version of timestamp 
  // const newperson = new db.instance.user({
  //   username: req.body.username,
  //   is_host: req.body.ishost,
  //   updated_at_short: '2017-12-25',
  // })

  // newperson.save((err, newUser) => {
  //   if (err) {
  //     res.status(500).send(`Error adding new user: ${req.body.username} with ${err}`);
  //   } else {
  //     console.timeEnd('adduser'); 
  //     console.log('success adding new user');
  //     // console.log(newUser);
  //     next();
  //   }
  // });
  // console.time('adduser');
  // db.instance.user.execute_query(query, params, (err, result) =>

  // .then((result) => {
      // console.timeEnd('adduser');
    // console.log(result);
  // })
  const { username, isHost } = req.body;
  const query = "INSERT INTO users (userid, username, updated_at_short, is_host, is_superhost, updated_at) VALUES (?, ?, ?, ?, ?, ?)";
  // moment().format('YYYY-MM-DD')
  const params = [Uuid.random(), username, '2017-12-19' , isHost, false, '2017-07-01'];

  db.execute(query, params, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
  
  next();
};

const addListing = (req, res, next) => {

  // const newlisting = new db.instance.listing({
  //   userid: req.body.userid,
  //   updated_at_short: '2017-12-25',
  //   title: req.body.title,
  //   description: req.body.description,
  //   location: req.body.city,
  //   price: req.body.price,
  //   maxguests: req.body.maxguests,
  //   roomtype: req.body.roomtype,
  //   accomodationtype: req.body.accomodationtype,
  //   beds: req.body.beds,
  //   bedrooms: req.body.bedrooms,
  //   bathrooms: req.body.bathrooms,
  //   blackOutDates: req.body.blackOutDates
  // })

// using cassandra built in uuid doesn't return a string
  // const newlisting = new db.instance.xlisting({
  //   userid: db.uuid(),
  //   updated_at_short: '2017-12-25',
  //   title: req.body.title,
  // })

  // newlisting.save((err, listing) => {
  //   if (err) {
  //     res.json(`error adding new listing: ${err}`);
  //   } else {
  //     console.log('success adding new listing');
  //     console.log(listing);
  //     next();
  //   }
  // });
  const { userid, title, description, location, price, maxguests, roomtype, accomodationtype, beds, bedrooms, bathrooms, blackOutDates } = req.body;

  const query = "INSERT INTO listings (listingid, userid, updated_at_short, title, description, location, price, maxguests, roomtype, accomodationtype, beds, bedrooms, bathrooms, updated_at, blackOutDates ) VALUES (?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ?)";

  //moment().format('YYYY-MM-DD'),
  const params = [Uuid.random(), userid, '2017-12-17', title, description, location, price, maxguests, roomtype, accomodationtype, beds, bedrooms, bathrooms, moment().format("YYYY-MM-DD HH:mm:ss"), blackOutDates];

  db.execute(query, params, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
  
  next();

};

/* not used for now - add review
const addReview = (req, res, next) => {
  db.User.create({
    name: req.body.username,
    role: 'employee',
    password: passHash(req.body.password),
  })
    .then((user) => {
      req.user = user;
      next();
    }).catch((err) => {
      res.json({ flashMessage: { message: 'username already exists', type: 'red'} });
    });
};
*/

module.exports = {
  getUpdatedListings: getUpdatedListings,
  addUser: addUser,
  addListing: addListing,


}