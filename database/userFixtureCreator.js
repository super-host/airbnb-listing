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

/******************
GENERATE SEED USERS
*******************/
let dateCounter = 1;
let currentDate = 0; //index
let superHostStatus = true;
const maxUsersPerDate = 10000;
const seedNumber = 1000000;

for (var i = 0; i < seedNumber; i++) {
  if (dateCounter > maxUsersPerDate) {
    currentDate += 1;
    dateCounter = 1;
  }

  // change superhost status halfway through seeding
  if (i === Math.floor(seedNumber/2)) {
    superHostStatus = false;
  } 

  let user = {
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


// [{"username":"Bob","isHost":false,"isSuperhost":false,"updatedAt":"2017-12-15T07:22:52.709Z","userID":"2632ad1f-b777-45dc-93f7-d45491a481e8"}]
