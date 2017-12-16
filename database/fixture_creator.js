const faker = require('faker');
const moment = require('moment');
const fs = require('fs');

let data = [];

/**********************************************
GENERATE DATES INTO ARRAY
 - goes through every day for the last 4 months
***********************************************/
const dates = [];

const months = [11, 10, 09, 08];
const year = '2017';
const days = [];
for (var i = 1; i <= 31; i++) {
  days.push(i.toString());
}

let monthCount = 1;
let dayCount = 1;
let currentMonth = 0;
let currentDay = 0;

// only want 100 days
for (var i = 0; i < 100; i++) {
  if ((currentDay === 30 && months[currentMonth] % 2 === 1) ||currentDay === 31) {
    currentMonth += 1;
    currentDay = 0;
  }

  let month = months[currentMonth];
  let day = days[currentDay];

  let date = `${year}-${month.toString()}-${day.toString()}`;
  dates.push(date);

  currentDay += 1;
}
/****************************************
GENERATE (fake) UUID - from stackoverflow
*****************************************/
function generateUuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

/******************
GENERATE SEED USERS
*******************/
let dateCounter = 1;
let currentDate = 0; //index
let superHostStatus = true;
const maxUsersPerDate = 5000;
const seedNumber = 500000;

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
    userID: generateUuid(),
  }

  data.push(user);
  dateCounter += 1;
}

// for (var i = 0; i < 500000; i++) {
//   let user = {
//     username: `${faker.name.lastName()}${faker.name.firstName()}${faker.random.number()}`,
//     isHost: true,
//     isSuperhost: false,
//     updatedAt: dateNowYYYYMMDD,
//     userID: generateUuid(),
//   }
//   data.push(user);
// }

let jsonData = JSON.stringify(data); 
fs.writeFile('./fixtures/user.json', jsonData);


// [{"username":"Bob","isHost":false,"isSuperhost":false,"updatedAt":"2017-12-15T07:22:52.709Z","userID":"2632ad1f-b777-45dc-93f7-d45491a481e8"}]
