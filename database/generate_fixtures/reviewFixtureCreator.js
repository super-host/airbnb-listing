const faker = require('faker');
const helpers = require('./fixtureGeneratorHelpers.js');
const Promise = require('bluebird');
const fs = require('fs');
const JSONStream = require('JSONStream');

function reviewFixtureCreator() {  
  return new Promise((resolve, reject) => {
    const transformStream = JSONStream.stringify();
    const outputStream = fs.createWriteStream('../fixtures/xreview.json');
    transformStream.pipe(outputStream);
    /*******
    CONFIGS 
    ********/
    // const seedNumber = 7500000; // 7.5M
    const seedNumber = 100;

    const numSeedDates = 100;
    const dates = helpers.getPreviousDates(numSeedDates);

    const ratings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
    const body = faker.lorem.sentence();

    let dateCounter = 1;
    let currentDate = 0; // index
    // const maxReviewsPerDate = 10000;
    let maxReviewsPerDate = seedNumber / dates.length;
    if (maxReviewsPerDate % 1 !== 0) {
      maxReviewsPerDate = Math.ceil(maxReviewsPerDate);
    }

    let listingCounter = 1;
    let listingID = helpers.generateUuid();
    const maxListingsPerReview = 4;

    /******************
    GENERATE SEED USERS
    *******************/

    for (var i = 0; i < seedNumber; i++) {
      if (dateCounter > maxReviewsPerDate) {
        currentDate += 1;
        dateCounter = 1;
      }

      if (listingCounter > maxListingsPerReview) {
        listingID = helpers.generateUuid();
        listingCounter = 1;
      }

      const currentRating = Math.floor(Math.random() * ratings.length);

      const review = {
        reviewid: helpers.generateUuid(),
        listingid: listingID,
        userid: helpers.generateUuid(),
        created_at: dates[currentDate],
        updated_at: dates[currentDate],
        body: body,
        rating: ratings[currentRating],
      };

      transformStream.write(review);

      dateCounter += 1;
      listingCounter += 1;
    }

    transformStream.end();
    outputStream.on('finish', () => resolve('done writing review stream'));
    outputStream.on('error', error => reject(error));
  });
}

console.time('reviewFixtureCreator');
reviewFixtureCreator().then((result) => {
    console.timeEnd('reviewFixtureCreator');
    console.log(result);
  }
);