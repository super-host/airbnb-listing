const env = require('dotenv')
env.config();
const Consumer = require('sqs-consumer');
// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-2'});

/*
LISTINGS QUEUE
*/
console.log('jhbjhbjh', process.env)
const app = Consumer.create({
  queueUrl: process.env.SQS_LISTINGS_QUEUE_URL,
  // process.env.SQS_LISTINGS_QUEUE_URL,
  // batchSize: 10,
  handleMessage: (message, done) => {
    // ...
    console.log(`message recieved`);
    console.log(message);
    done();
  },
  // sqs: new AWS.SQS()
});

app.on('error', (err) => {
  console.log(err.message);
});

app.start();

// var sns = new AWS.SNS();

// var params = {
//   AWSAccountId: [ /* required */
//     'STRING_VALUE',
//     /* more items */
//   ],
//   ActionName: [ /* required */
//     'STRING_VALUE',
//     /* more items */
//   ],
//   Label: 'STRING_VALUE', /* required */
//   TopicArn: process.env.SNS_TOPIC_ARN /* required */
// };
// sns.addPermission(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });



/*
SEND MESSAGE TO MSG BUS TO UPDATE BOOKINGS
*/

// var params = {  
//   TopicArn : process.env.SNS_BOOKINGS_TOPIC_ARN,
//   Message: JSON.stringify({
//     '7a4e7c01-fa84-be81-ded3-d6c634cf47fd': {
//       isNew: true,
//       price: 300,
//       blackOutDates: ['2017-10-01', '2017-10-25'],
//     },
//     // '8a4e7c01-fa84-be81-ded3-d6c634cf47fd': {
//     //   isNew: false,
//     //   price: 200,
//     //   blackOutDates: ['2017-11-01', '2017-11-25'],
//     // },
//   }), 
// };

// sns.publish(params, (err, data) => {   
//   // published message
//   if (err) {
//     throw err;
//   } else {
//     console.log('publish to sns for bookings is sent');
//     console.log(data)
//   }
// });

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