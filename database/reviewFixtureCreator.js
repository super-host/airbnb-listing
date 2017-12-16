const faker = require('faker');
const helpers = require('./fixtureGeneratorHelpers.js');
const fs = require('fs');

// to be written into json file
const data = [];

/************************
GENERATE DATES INTO ARRAY
*************************/
const numSeedDates = 100;
const dates = helpers.getDates(numSeedDates);
const ratings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
const body = faker.lorem.sentence();

/******************
GENERATE SEED USERS
*******************/
let dateCounter = 1;
let currentDate = 0; // index
// const maxUsersPerDate = 10000;
const maxUsersPerDate = 10;


let ratingCounter = 1;
let currentRating = 0; // index
// const maxReviewsPerRating = 100000;
const maxReviewsPerRating = 10;


let listingCounter = 1;
let listingID = helpers.generateUuid();
const maxListingsPerReview = 4;

// const seedNumber = 6000000;
const seedNumber = 100;

for (var i = 0; i < seedNumber; i++) {
  if (dateCounter > maxUsersPerDate) {
    currentDate += 1;
    dateCounter = 1;
  }

  //alter the randomization of this part
  if (ratingCounter > maxReviewsPerRating) {
    currentRating += 1;
    ratingCounter = 1;
  }

  if (listingCounter > maxListingsPerReview) {
    listingID = helpers.generateUuid();
    listingCounter = 1;
  }

  let review = {
    reviewID: helpers.generateUuid(),
    listingID: listingID,
    userID: helpers.generateUuid(),
    createdAt: dates[currentDate],
    updatedAt: dates[currentDate],
    body: body,
    rating: ratings[currentRating],
  }

  data.push(review);
  dateCounter += 1;
  ratingCounter += 1;
  listingCounter += 1;
}

let jsonData = JSON.stringify(data); 
fs.writeFile('./fixtures/review.json', jsonData);
