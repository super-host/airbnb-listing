require('dotenv').config();
const Consumer = require('sqs-consumer');
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({ region: 'us-east-2' });
const queries = require('../middleware/queries.js');

// var bookingsSNS = new AWS.SNS();

/*
SEND MESSAGE TO MSG BUS TO UPDATE BOOKINGS
*/
// const sendMsgBookings = () => {
//   var params = {  
//     TopicArn : process.env.SNS_BOOKINGS_TOPIC_ARN,
//     Message: JSON.stringify({
//       '7a4e7c01-fa84-be81-ded3-d6c634cf47fd': {
//         isNew: true,
//         price: 300,
//         blackOutDates: ['2017-10-01', '2017-10-25'],
//       },
//       // '8a4e7c01-fa84-be81-ded3-d6c634cf47fd': {
//       //   isNew: false,
//       //   price: 200,
//       //   blackOutDates: ['2017-11-01', '2017-11-25'],
//       // },
//     }), 
//   };

//   bookingsSNS.publish(params, (err, data) => {  
//     // published message
//     if (err) {
//       throw err;
//     } else {
//       console.log('publish to sns for bookings is sent');
//       console.log(data)
//     }
//   }); 
// };

/*
LISTINGS QUEUE
*/
const listingsConsumer = Consumer.create({
  queueUrl: process.env.SQS_LISTINGS_QUEUE_URL,
  batchSize: 10,
  handleMessage: (message, done) => {
    console.log(`message recieved`);
    let jsonMsgBody = JSON.parse(message.Body).Message;
    let { updatedAt } = JSON.parse(jsonMsgBody);
    console.log(updatedAt);

        // console.log(done.toString())
    console.time('listings')
    queries.getUpdatedListings(updatedAt)
      .then((listings) => {
        console.timeEnd('listings')
        console.log(`after db call to listings`);
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
        done();
      });
  },
  sqs: new AWS.SQS(),
});

  // handleMessage: (message, done) => {
  //   const load = JSON.parse(message.Body).Message;
  //   const { listingId } = JSON.parse(load);
  //   getBookings(listingId)
  //     .then((availability) => {
  //       const params = {
  //         MessageBody: JSON.stringify(availability),
  //         QueueUrl: config.aws.responseQueue,
  //         DelaySeconds: 0,
  //       };
  //       sqs.sendMessage(params, (err, data) => {
  //         if (err) {
  //           console.log(err);
  //         }
  //         done();
  //       });
  //     });
  // },

listingsConsumer.on('error', (err) => {
  console.log(err.message);
});

listingsConsumer.start();
// Create an SQS service object
// var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
// var queueUrl = process.env.SQS_LISTINGS_QUEUE_URL;
// sqs.receiveMessage({  
//     QueueUrl : queueUrl,
//   }, 
//   function (err, data) {
//     if (data.Messages && data.Messages.length > 0) {

//       var message = data.Messages[0];

//       // TODO: process the message...

//       // Delete the message from the queue
//       var receiptHandle = message.ReceiptHandle;

//       sqs.deleteMessage({ 
//           QueueUrl: queueUrl, 
//           ReceiptHandle: receiptHandle 
//         }, 
//         function (err, data) {
//           // message deleted
//         }
//       );
//     }
// });

// const queueName = process.env.SQS_QUEUE_NAME;

// const params = {
//   QueueName: queueName,
//   Attributes: {
//     DelaySeconds: '0', // The amount of time to delay the first delivery of all
//     // messages added to this queue.
//     MaximumMessageSize: '262144', // 256 KB - Maximum message size (in bytes) accepted by SQS.
//     MessageRetentionPeriod: '345600', // 4 days - The amount of time that Amazon SQS will retain
//     // a message if it does not get deleted.
//     ReceiveMessageWaitTimeSeconds: '0', // The maximum amount of time that a long polling receive
//     // call will wait for a message to become available before returning an empty response.
//     VisibilityTimeout: '30', // The length of time (in seconds) that a message received from
//     // a queue will be invisible to other receiving components.
//   },
// };
// sqs.createQueue(params, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.QueueUrl);
//   }
// });