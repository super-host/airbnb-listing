const faker = require('faker');
const helpers = require('./fixtureGeneratorHelpers.js');
const Promise = require('bluebird');
const fs = require('fs');
const JSONStream = require('JSONStream');
const moment = require('moment');

function userFixtureCreator() {
  return new Promise((resolve, reject) => {
    const transformStream = JSONStream.stringify();
    const outputStream = fs.createWriteStream('../fixtures/user.json');
    transformStream.pipe(outputStream);
    /*******
    CONFIGS 
    ********/
    // const seedNumber = 1000000; // 1M
    const seedNumber = 100;

    const numSeedDates = 100;
    const dates = helpers.getPreviousDates(numSeedDates);

    let dateCounter = 1; 
    let currentDate = 0; //index
    let superHostStatus = true;

    // const maxUsersPerDate = 10000;
    let maxUsersPerDate = seedNumber / dates.length;
    if (maxUsersPerDate % 1 !== 0) {
      maxUsersPerDate = Math.ceil(maxUsersPerDate);
    }

    /******************
    GENERATE SEED USERS
    *******************/

    for (var i = 0; i < seedNumber; i++) {
      if (dateCounter > maxUsersPerDate) {
        currentDate += 1;
        dateCounter = 1;
      }

      // change superhost status halfway through seeding
      if (i === Math.floor(seedNumber / 2)) {
        superHostStatus = false;
      }

      const user = {
        username: `${faker.name.lastName()}${faker.name.firstName()}${faker.random.number()}`,
        updated_at_short: dates[currentDate],
        is_host: true,
        is_superhost: superHostStatus,
        updated_at: moment(dates[currentDate]),
        userid: helpers.generateUuid(),
      };

      transformStream.write(user);
      dateCounter += 1;
    }

    transformStream.end();

    outputStream.on('finish', () => resolve('done writing user stream'));
    outputStream.on('error', error => reject(error));
  });
}

console.time('userFixtureCreator');
userFixtureCreator().then((result) => {
    console.timeEnd('userFixtureCreator');
    console.log(result);
  }
);
