const faker = require('faker');
const helpers = require('./fixtureGeneratorHelpers.js');
const Promise = require('bluebird');
const fs = require('fs');
const JSONStream = require('JSONStream');

function listingFixtureCreator() {
  return new Promise((resolve, reject) => {
    const transformStream = JSONStream.stringify();
    const outputStream = fs.createWriteStream('../fixtures/listing.json');
    transformStream.pipe(outputStream);
    /*******
    CONFIGS 
    ********/
    const seedNumber = 1500000; // 1.5M
    // const seedNumber = 500000;

    const numSeedDates = 100;
    const dates = helpers.getPreviousDates(numSeedDates);
    // const ratings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
    const location = ['San Francisco', 'Los Angeles', 'Calgary', 'Quebec City', 'Reykjavik', 'Lima', 'Seattle', 'San Diego', 'Hong Kong', 'New York', 'Boston', 'Toronto', 'Vancouver', 'London', 'Tokyo', 'Paris', 'Rome', 'Taipei', 'Maui', 'Copenhagen', 'Brussels', 'Amsterdam', 'Berlin', 'Beijing', 'Vienna'];
    const price = [50, 100, 150, 200, 250, 300];
    const roomtype = ['entire place', 'private room', 'shared room'];
    const accomodationtype = ['apartment', 'condo', 'house', 'guesthouse'];
    const blackOutDates = helpers.getDates('2017-07-01', '2017-07-14');

    let dateCounter = 1;
    let currentDate = 0; // index
    // const maxUsersPerDate = 10000;

    let maxListingsPerDate = seedNumber / dates.length;
    if (maxListingsPerDate % 1 !== 0) {
      maxListingsPerDate = Math.ceil(maxListingsPerDate);
    }

    let locationCounter = 1;
    let currentLocation = 0;
    // const maxLocationPerListing = 60000;
    let maxLocationPerListing = seedNumber / location.length;
    if (maxLocationPerListing % 1 !== 0) {
      maxLocationPerListing = Math.ceil(maxLocationPerListing);
    }

    /******************
    GENERATE SEED USERS
    *******************/

    for (var i = 0; i < seedNumber; i++) {
      if (dateCounter > maxListingsPerDate) {
        currentDate += 1;
        dateCounter = 1;
      }

      if (locationCounter > maxLocationPerListing) {
        currentLocation += 1;
        locationCounter = 1;
      }

      const currentRoomType = Math.floor(Math.random() * 3);
      const currentAccomodationType = Math.floor(Math.random() * 4);

      if (!dates[currentDate] && !foundNull) {
        console.log(`i: ${i}`)
        foundNull = true;
      }
      const listing = {
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
      };

      transformStream.write(listing);

      dateCounter += 1;
      locationCounter += 1;
    }

    transformStream.end();

    outputStream.on('finish', () => resolve('done writing user stream'));
    outputStream.on('error', error => reject(error));
  });
}

console.time('listingFixtureCreator');
listingFixtureCreator();
console.timeEnd('listingFixtureCreator');
