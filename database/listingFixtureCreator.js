const faker = require('faker');
const helpers = require('./fixtureGeneratorHelpers.js');
const Promise = require('bluebird');
const fs = require('fs');
// let openAsync = Promise.promisify(fs.open);
const JSONStream = require('JSONStream');
let writeAsync = Promise.promisify(fs.write);

function listingFixtureCreator() {
// to be written into json file
const data1 = [];
const data2 = [];
const data3 = [];
const data4 = [];
const data5 = [];

var transformStream = JSONStream.stringify();
var outputStream = fs.createWriteStream( __dirname + "/fixtures/listing.json" );
transformStream.pipe( outputStream );
/************************
GENERATE DATES INTO ARRAY
*************************/
const numSeedDates = 100;
const dates = helpers.getPreviousDates(numSeedDates);
const ratings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
const location = ['San Francisco', 'Los Angeles', 'Calgary', 'Quebec City', 'Reykjavik', 'Lima', 'Seattle', 'San Diego', 'Hong Kong', 'New York', 'Boston', 'Toronto', 'Vancouver', 'London', 'Tokyo', 'Paris', 'Rome', 'Taipei', 'Maui', 'Copenhagen', 'Brussels', 'Amsterdam', 'Berlin', 'Beijing', 'Vienna'];
const price = [50, 100, 150, 200, 250, 300];
const roomtype = ['entire place', 'private room', 'shared room'];
const accomodationtype = ['apartment', 'condo', 'house', 'guesthouse'];
const blackOutDates = helpers.getDates('2017-07-01', '2017-07-14');
console.log(dates.length);

/******************
GENERATE SEED USERS
*******************/
let dateCounter = 1;
let currentDate = 0; // index
// const maxUsersPerDate = 10000;
const seedNumber = 1500000;
// const seedNumber = 500000;

const maxListingsPerDate = (seedNumber/dates.length);
if (maxListingsPerDate % 1 !== 0) {
  maxListingsPerDate = Math.ceil(maxListingsPerDate);
}
console.log(maxListingsPerDate);

let locationCounter = 1;
let currentLocation = 0;
// const maxLocationPerListing = 60000;
const maxLocationPerListing = (seedNumber/location.length);
let foundNull = false;
for (var i = 0; i < seedNumber; i++) {
  if (dateCounter > maxListingsPerDate) {
    currentDate += 1;
    dateCounter = 1;
  }

  if (locationCounter > maxLocationPerListing) {
    currentLocation += 1;
    locationCounter = 1;
  }

  currentRoomType = Math.floor(Math.random() * 3);
  currentAccomodationType = Math.floor(Math.random() * 4);

  if (!dates[currentDate] && !foundNull) {
    console.log(`i: ${i}`)
    foundNull = true;
  }
  let listing = {
    listingID: helpers.generateUuid(),
    userID: helpers.generateUuid(),
    updatedAt: dates[currentDate],
    title: faker.lorem.words(),
    description: faker.lorem.sentence(),
    location: location[currentLocation],
    price: Math.floor(Math.random() * (300 - 50) + 50),
    // beds can equal max guests
    // 10k per location
    maxguests: Math.floor(Math.random() * (6 - 1 + 1)) + 1,
    roomtype: roomtype[currentRoomType],
    accomodationtype: accomodationtype[currentAccomodationType],
    beds: Math.floor(Math.random() * (6 - 1 + 1)) + 1,
    // beds = bedrooms
    bedrooms: Math.floor(Math.random() * (6 - 0 + 1)) + 0,
    // random, max bedrooms
    bathrooms: Math.floor(Math.random() * (6 - 1 + 1)) + 1,
    overallrating: Math.random() * 5, // ratings[currentRating]
    blackOutDates: blackOutDates,
  }

  transformStream.write(listing);

  dateCounter += 1;
  locationCounter += 1;
}

transformStream.end();

outputStream.on(
    "finish",
    function handleFinish() {

        console.log('done stream');

    }
);
};
console.time('listingFixtureCreator');
listingFixtureCreator();
console.timeEnd('listingFixtureCreator');
// let fd = fs.openSync('./fixtures/listing.json', 'a');
// console.log(`fd: ${fd}`)

// let jsonData1 = JSON.stringify(data1); 
// return writeAsync(fd, jsonData1)
//   .catch((err) => {
//     console.log('after trying to write 1')
//     throw err;
//   })
//   .then((result) => {
//     console.log('after writing first time')
//     let jsonData2 = JSON.stringify(data2); 
//     return writeAsync(fd, jsonData2);
//   })
//   .catch((err) => {
//     console.log('after trying to write 2')
//     throw err;
//   })
//     .then((result) => {
//     console.log('after writing second time')
//   let jsonData3 = JSON.stringify(data3); 
//     return writeAsync(fd, jsonData3);
//   })
//       .catch((err) => {
//     console.log('after trying to write 3')
//     throw err;
//   })
//   //     .then((result) => {
//   //   console.log('after writing third time')
//   //     let jsonData4 = JSON.stringify(data4); 

//   //   return writeAsync(fd, jsonData4);
//   // })
//   //       .then((result) => {
//   //   console.log('after writing fourth time')
//   //     let jsonData5 = JSON.stringify(data5); 

//   //   return writeAsync(fd, jsonData5);
//   // })
//     .then((result) => {
//     console.log('after writing fifth time')
//     return fs.close(fd)
//   });
