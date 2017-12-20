// const db = require('../database/index.js');
// const db = require('../database/cassandra.js');

const moment = require('moment');
const helpers = require('../database/generate_fixtures/fixtureGeneratorHelpers.js');

const getUpdatedListings = (req, res, next) => {
  let updatedAt = req.query.updatedAt;
  const processedAt = moment().format('YYYY-MM-DD');
  // console.log('processedat');
  // console.log(processedAt);
  const query = {
    updated_at_short: {$gte: '2017-12-11'},
    $limit: 2
  }
  // db.instance.listing.findAsync({updatedAt: updatedAt})
  // console.log(db)
  db.instance.xlisting.findAsync(query, {raw: true})

    .then((latestListings) => {
      console.log('after finding listings');
      // console.log(latestListings)
      req.listings = latestListings;
      req.processedAt = processedAt;
      next();
    })
    .catch((err) => {
      res.status(500).send(err);
      // res.status(500).send(`Error getting latest listings that were last updated since ${updatedAt}`);
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

  var query = "INSERT INTO user (userid, username, updated_at_short, is_host) VALUES (?, ?, ?, ?)";
  var params = [db.uuid(), "alice", "2017-01-31", true];
  
  // console.time('adduser');
  // db.instance.user.execute_query(query, params, (err, result) =>

  db.users.execute(query, params, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
  // .then((result) => {
      // console.timeEnd('adduser');
    // console.log(result);
    next();
  // })


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
  const newlisting = new db.instance.xlisting({
    userid: db.uuid(),
    updated_at_short: '2017-12-25',
    title: req.body.title,
  })

  newlisting.save((err, listing) => {
    if (err) {
      res.json(`error adding new listing: ${err}`);
    } else {
      console.log('success adding new listing');
      console.log(listing);
      next();
    }
  });
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