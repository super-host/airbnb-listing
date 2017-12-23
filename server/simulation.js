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
