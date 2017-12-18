const db = require('../database/index.js');
const moment = require('moment');

const getUpdatedListings = (req, res, next) => {
  let updatedAt = req.body.updatedAt;
  let processedAt = moment().format('YYYY-MM-DD');

  // db.User.findAll({})
  //   .then((allUsers) => {
  //     req.users = allUsers;
  //     next();
  //   }).catch((err) => {
  //     res.status(500).send('Error getting users');
  //   });
};

const addUser = (req, res, next) => {
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

const addListing = (req, res, next) => {
  db.User.create({
    userID: req.body.userID,
    title: req.body.title,
    description: req.body.description,
    location: req.body.city,
    price: req.body.price,
    maxguests: req.body.maxguests,
    roomtype: req.body.roomtype,
    accomodationtype: req.body.accomodationtype,
    beds: req.body.beds,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    blackOutDates: req.body.blackOutDates,
  })
    .then((listing) => {
      req.listing = listing;
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