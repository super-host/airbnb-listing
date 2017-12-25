require('dotenv').config();
const Consumer = require('sqs-consumer');
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'us-east-2' });
const queries = require('../middleware/queries.js');

/*
SEND MESSAGE TO MSG BUS TO UPDATE BOOKINGS
*/
const sendMsgBookings = (message) => {
  const bookingsSNS = new AWS.SNS();
  const params = {
    TopicArn : process.env.SNS_BOOKINGS_TOPIC_ARN,
    Message: JSON.stringify(message),
  };

  bookingsSNS.publish(params, (err, data) => {
    // published message
    if (err) {
      throw err;
    } else {
      console.log('publish to sns for bookings is sent');
      console.log(data);
    }
  });
};

/*
GET UPDATED LISTINGS QUEUE
*/
const getUpdatedListingsConsumer = Consumer.create({
  queueUrl: process.env.SQS_LISTINGS_QUEUE_URL,
  batchSize: 10,
  handleMessage: (message, done) => {
    // console.log(`message recieved`);
    const jsonMsgBody = JSON.parse(message.Body).Message;
    const { updatedAt } = JSON.parse(jsonMsgBody);
    // console.log(updatedAt);

    console.time('listings')
    queries.getUpdatedListings(updatedAt)
      .then((listings) => {
        console.timeEnd('listings')
        // console.log(`after db call to listings`);
        console.log(listings)
        // done();
        //when results come back, put in result queue, call done
        const sqs = new AWS.SQS();
        const params = {
          MessageBody: JSON.stringify(listings),
          QueueUrl: process.env.SQS_LISTINGS_RESPONSE_QUEUE_URL,
          DelaySeconds: 0,
        };
        sqs.sendMessage(params, (err, data) => {
          if (err) {
            console.log(err);
          }
        });
  //does done belong before or after msg has been put into the response queue?
        done();
      });
  },
  sqs: new AWS.SQS(),
});

getUpdatedListingsConsumer.on('error', (err) => {
  console.log(err.message);
});

/*
ADD LISTING QUEUE
*/

const addListingsConsumer = Consumer.create({
  queueUrl: process.env.SQS_ADD_LISTING_QUEUE_URL,
  batchSize: 10,
  handleMessage: (message, done) => {
    console.log(`message recieved`);
    let jsonMsgBody = JSON.parse(message.Body).Message;

    let { userid, title, description, location, price, maxguests, roomtype, accomodationtype, beds, bedrooms, bathrooms, blackOutDates } = JSON.parse(jsonMsgBody);

    // console.log(userid, title, description, location, price, maxguests, roomtype, accomodationtype, beds, bedrooms, bathrooms, blackOutDates);

    console.time('addlistings')
    queries.addListing(userid, title, description, location, price, maxguests, roomtype, accomodationtype, beds, bedrooms, bathrooms, blackOutDates)
      .then((listing) => {
        console.timeEnd('addlistings')
        // console.log(`after db call to listings`);
        console.log(listing)
        // done();
        // when results come back, put in result queue, call done
        const sqs = new AWS.SQS();
        const params = {
          MessageBody: JSON.stringify('done adding new listing'),
          QueueUrl: process.env.SQS_ADD_LISTING_RESPONSE_QUEUE_URL,
          DelaySeconds: 0,
        };
        sqs.sendMessage(params, (err, data) => {
          if (err) {
            console.log(err);
          }
        });

        sendMsgBookings(listing);
  //does done belong before or after msg has been put into the response queue?
        done();
      });
  },
  sqs: new AWS.SQS(),
});

addListingsConsumer.on('error', (err) => {
  console.log(err.message);
});

addListingsConsumer.start();

/*
ADD USER QUEUE
*/

const addUserConsumer = Consumer.create({
  queueUrl: process.env.SQS_USERS_QUEUE_URL,
  batchSize: 10,
  handleMessage: (message, done) => {
    console.log(`message recieved`);
    let jsonMsgBody = JSON.parse(message.Body).Message;

    let { username, isHost } = JSON.parse(jsonMsgBody);

    // console.log(username, isHost);

    console.time('adduser')
    queries.addUser(username, isHost)
      .then((user) => {
        console.timeEnd('adduser')
        // console.log(`after db call to users`);
        // console.log(user)
        // done();
        // when results come back, put in result queue, call done
        const sqs = new AWS.SQS();
        const params = {
          MessageBody: JSON.stringify('done adding new user'),
          QueueUrl: process.env.SQS_ADD_USER_RESPONSE_QUEUE_URL,
          DelaySeconds: 0,
        };
        sqs.sendMessage(params, (err, data) => {
          if (err) {
            console.log(err);
          }
        });

  //does done belong before or after msg has been put into the response queue?
        done();
      });
  },
  sqs: new AWS.SQS(),
});

addUserConsumer.on('error', (err) => {
  console.log(err.message);
});

module.exports = {
  getUpdatedListingsConsumer: getUpdatedListingsConsumer,
  addListingsConsumer: addListingsConsumer,
  addUserConsumer: addUserConsumer,
}