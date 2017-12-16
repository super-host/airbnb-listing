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
const location = ['San Francisco', 'Los Angeles', 'Calgary', 'Quebec City', 'Reykjavik', 'Lima', 'Seattle', 'San Diego', 'Hong Kong', 'New York', 'Boston', 'Toronto', 'Vancouver', 'London', 'Tokyo', 'Paris', 'Rome', 'Taipei', 'Maui', 'Copenhagen', 'Brussels', 'Amsterdam', 'Berlin', 'Beijing', 'Vienna'];
const price = [50, 100, 150, 200, 250, 300];
const roomtype = ['entire place', 'private room', 'shared room'];
const accomodationtype = ['apartment', 'condo', 'house', 'guesthouse'];



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


// let listingCounter = 1;
// let listingID = helpers.generateUuid();
// const maxListingsPerReview = 4;

let currentLocation = 0;

// const seedNumber = 6000000;
const seedNumber = 100;

for (var i = 0; i < seedNumber; i++) {
  if (dateCounter > maxUsersPerDate) {
    currentDate += 1;
    dateCounter = 1;
  }

  //alter the randomization of this part
  // if (ratingCounter > maxReviewsPerRating) {
  //   currentRating += 1;
  //   ratingCounter = 1;
  // }

  // if (listingCounter > maxListingsPerReview) {
  //   listingID = helpers.generateUuid();
  //   listingCounter = 1;
  // }

  let listing = {
    listingID: helpers.generateUuid(),
    userID: helpers.generateUuid(),
    title: faker.lorem.words(),
    description: `${faker.lorem.sentence()}`,
    location: location[currentLocation],
    price: Math.random() * (300 - 50) + 50,
    // beds can equal max guests
    maxguests: Math.floor(Math.random() * (6 - 1 + 1)) + 1,
    roomtype: 'entire place',
    accomodationtype: 'apartment',
    beds: Math.floor(Math.random() * (6 - 1 + 1)) + 1,
    // beds = bedrooms
    bedrooms: Math.floor(Math.random() * (6 - 0 + 1)) + 0,
    // random, max bedrooms
    bathrooms: Math.floor(Math.random() * (6 - 1 + 1)) + 1,
    overallrating: Math.random() * 5, // ratings[currentRating]
    availabilitypreference: {
      type: 'set',
      typeDef: '<date>',
    },
  }

  data.push(listing);
  dateCounter += 1;
  
  // ratingCounter += 1;
  // listingCounter += 1;
}

let jsonData = JSON.stringify(data); 
fs.writeFile('./fixtures/listing.json', jsonData);
