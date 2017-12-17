const faker = require('faker');
const helpers = require('./fixtureGeneratorHelpers.js');
const fs = require('fs');

/*******
CONFIGS 
********/
// const seedNumber = 1000000;
const seedNumber = 100;

/************************
GENERATE DATES INTO ARRAY
*************************/
const numSeedDates = 100;
const dates = helpers.getPreviousDates(numSeedDates);

/******************
GENERATE SEED USERS
*******************/
let dateCounter = 1;
let currentDate = 0; //index
let superHostStatus = true;

// const maxUsersPerDate = 10000;
const maxUsersPerDate = seedNumber/dates.length;
if (maxUsersPerDate % 1 !== 0) {
  maxUsersPerDate = Math.ceil(maxUsersPerDate);
}

// to be written into json file
const data = [];

for (var i = 0; i < seedNumber; i++) {
  if (dateCounter > maxUsersPerDate) {
    currentDate += 1;
    dateCounter = 1;
  }

  // change superhost status halfway through seeding
  if (i === Math.floor(seedNumber/2)) {
    superHostStatus = false;
  } 

  const user = {
    username: `${faker.name.lastName()}${faker.name.firstName()}${faker.random.number()}`,
    isHost: true,
    isSuperhost: superHostStatus,
    updatedAt: dates[currentDate],
    userID: helpers.generateUuid(),
  }

  data.push(user);
  dateCounter += 1;
}

let jsonData = JSON.stringify(data); 
fs.writeFile('./fixtures/user.json', jsonData);
