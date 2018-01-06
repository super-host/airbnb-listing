const db = require('../database/index.js');
const Uuid = require('cassandra-driver').types.Uuid;
const TimeUuid = require('cassandra-driver').types.TimeUuid;
const moment = require('moment');

const getUpdatedListings = (updatedAt) => {
  const processedAt = moment().format('YYYY-MM-DD');

  // does running individual queries for each day faster than using allow filtering?
  const diff = moment().diff(updatedAt, 'days');
  const dates = [];
  for (var i = 0; i <= diff; i++) {
    dates.push(moment().subtract(i, 'days').format('YYYY-MM-DD'));
  }

  const res = {};
  res.updatedListings = {};
  res.processedAt = processedAt;
  const query = "SELECT * FROM listings WHERE updated_at_short = ? ";
  return Promise.all(dates.map((date) => {
    const params = [date];
    return db.execute(query, params)
      .then((result) => {
        for (let row of result.rows) {
          res.updatedListings[row.listingid] = {
            userid: row.userid,
            updated_at_short: row.updated_at_short,
            title: row.title,
            description: row.description,
            location: row.location,
            price: row.price,
            maxguests: row.maxguests,
            roomtype: row.roomtype,
            accomodationtype: row.accomodationtype,
            beds: row.beds,
            bedrooms: row.bedrooms,
            bathrooms: row.bathrooms,
            blackOutDates: row.blackoutdates,
          };
        }
        return res;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }));
};

const addUser = (username, isHost) => {
  // superhost status isn't added because that is updated internally
  //remove hardcoded updated at short. should be a truncated version of timestamp 

  const query = "INSERT INTO users (userid, username, updated_at_short, is_host, is_superhost, updated_at) VALUES (?, ?, ?, ?, ?, ?)";

  const userid = Uuid.random();
  const updatedAtShort = '2018-01-01';
  const updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");

  const params = [userid, username, updatedAtShort, isHost, false, updatedAt];

  return db.execute(query, params)
    .then((result) => {
      console.log(result);
      return {
        userid,
        username,
        isHost,
        updatedAt,
        updatedAtShort,
      };
    })
    .catch((err) => {
      throw err;
    });
};

const addListing = (userid, title, description, location, price, maxguests, roomtype, accomodationtype, beds, bedrooms, bathrooms, blackOutDates) => {
  const query = "INSERT INTO listings (listingid, userid, updated_at_short, title, description, location, price, maxguests, roomtype, accomodationtype, beds, bedrooms, bathrooms, updated_at, blackOutDates ) VALUES (?, ?, ?, ?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ?, ?)";
  const listingid = Uuid.random();

  const params = [listingid, userid, '2018-01-01', title, description, location, price, maxguests, roomtype, accomodationtype, beds, bedrooms, bathrooms, moment().format("YYYY-MM-DD HH:mm:ss"), blackOutDates];

  return db.execute(query, params)
    .then((result) => {
      const res = {
        isNew: true,
        listingid: listingid,
        price: price,
        blackOutDates: blackOutDates,
      };
      return res;
    })
    .catch((err) => {
      throw err;
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
  getUpdatedListings,
  addUser,
  addListing,
};
