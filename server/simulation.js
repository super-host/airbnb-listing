require('dotenv').config();
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'us-east-2' });

/*
SEND MESSAGE TO MSG BUS TO GET UPDATED LISTINGS
*/

const publishToListingSNS = (req, res, next) => {
  const listingsSNS = new AWS.SNS();

  const params = { 
    TopicArn : process.env.SNS_LISTINGS_TOPIC_ARN,
    Message: JSON.stringify({
      updatedAt: req.body.updatedAt,
    }),
  };

  listingsSNS.publish(params, (err, data) => {
    // published message
    if (err) {
      throw err;
    } else {
      console.log('publish to sns for listings is sent');
      console.log(data);
      next();
    }
  });
};

/*
SEND MESSAGE TO MSG BUS TO ADD USER
*/

const publishToUsersSNS = (req, res, next) => {
  const usersSNS = new AWS.SNS();

  const params = { 
    TopicArn : process.env.SNS_ADD_USERS_TOPIC_ARN,
    Message: JSON.stringify({
      username: req.body.username,
      isHost: req.body.isHost,
    }),
  };

  usersSNS.publish(params, (err, data) => {
    // published message
    if (err) {
      throw err;
    } else {
      console.log('publish to sns for add users is sent');
      console.log(data);
      next();
    }
  });
};

/*
SEND MESSAGE TO MSG BUS TO ADD USER
*/

const publishToAddListingSNS = (req, res, next) => {
  const addListingSNS = new AWS.SNS();

  const params = {
    TopicArn : process.env.SNS_ADD_LISTINGS_TOPIC_ARN,
    Message: JSON.stringify({
      userid: req.body.userid,
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      price: req.body.price,
      maxguests: req.body.maxguests,
      roomtype: req.body.roomtype,
      accomodationtype: req.body.accomodationtype,
      beds: req.body.beds,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      blackOutDates: req.body.blackOutDates,
    }),
  };

  addListingSNS.publish(params, (err, data) => {
    // published message
    if (err) {
      throw err;
    } else {
      console.log('publish to sns for add listing is sent');
      console.log(data);
      next();
    }
  });
};

module.exports = {
  publishToListingSNS,
  publishToUsersSNS,
  publishToAddListingSNS,
};
