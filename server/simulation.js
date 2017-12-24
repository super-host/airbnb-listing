/*
SIMULATING MESSAGES TO SNS
*/
const getUpdatedListings = () => {
  axios.get('/listings?updated_at=2017-12-17')
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

/*
SEND MESSAGE TO MSG BUS TO UPDATE BOOKINGS
*/

const publishToListingSNS = (date) => {
  const listingsSNS = new AWS.SNS();

  const params = { 
    TopicArn : process.env.SNS_LISTINGS_TOPIC_ARN,
    Message: JSON.stringify({
      updated_at: date,
    }),
  };

  listingsSNS.publish(params, (err, data) => {
    // published message
    if (err) {
      throw err;
    } else {
      console.log('publish to sns for listings is sent');
      console.log(data);
    }
  });
};

/*
TESTING CONFIGS
*/
// publishToListingSNS('2017-12-17');