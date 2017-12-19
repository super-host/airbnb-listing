const db = require('../database/index.js');
const moment = require('moment');

const getUpdatedListings = (req, res, next) => {
  let updatedAt = req.query.updatedAt;
  const processedAt = moment().format('YYYY-MM-DD');
  console.log('processedat');
  console.log(processedAt);
  const query = {
    updated_at_short: {$gte: '2017-12-11'},
    $limit: 2
  }
  // db.instance.listing.findAsync({updatedAt: updatedAt})
  // console.log(db)
  db.instance.xlisting.findAsync(query, {raw: true})

    .then((latestListings) => {
      console.log('after finding listings');
      console.log(latestListings)
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
  const query = "INSERT INTO listing.user (userid, username, is_host, updated_at_short) VALUES (?, ?, ?)";
  const params = [db.uuid(), req.body.username, req.body.isHost, '2017-12-25']; 

  db.instance.user.execute_queryAsync(query, params)
    .then((newUser) => {
      console.log('success adding new user');
      console.log(newUser);
      next();
    }).catch((err) => {
      res.status(500).send(`Error adding new user: ${req.body.username} with ${err}`);
    });
};

const addListing = (req, res, next) => {
  const query = "INSERT INTO listing.user (userID, title, description, location, price, maxguests, roomtype, accomodationtype, beds, bedrooms, bathrooms, blackOutDates) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const params = [
    req.body.userID,
    req.body.title,
    req.body.description,
    req.body.city,
    req.body.price,
    req.body.maxguests,
    req.body.roomtype,
    req.body.accomodationtype,
    req.body.beds,
    req.body.bedrooms,
    req.body.bathrooms,
    req.body.blackOutDates,
  ];
  // db.User.create({
  //   userID: req.body.userID,
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
  //   blackOutDates: req.body.blackOutDates,
  // })
  db.instance.listing.execute_queryAsync(query, params)
    .then((listing) => {
      console.log('success adding new listing');
      console.log(listing);
      next();
    }).catch((err) => {
      res.json(`error adding new listing: ${err}`);
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