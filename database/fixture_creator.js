const faker = require('faker');
const fs = require('fs');

let data = [];
let timeNow = Date.now();
for (var i = 0; i < 500000; i++) {
  let user = {
    username: `${faker.name.lastName()}${faker.name.firstName()}${faker.random.number()}`,
    isHost: true,
    isSuperhost: true,
    updatedAt: timeNow,
    userID: guid(),
  }
  data.push(user);
}

for (var i = 0; i < 500000; i++) {
  let user = {
    username: `${faker.name.lastName()}${faker.name.firstName()}${faker.random.number()}`,
    isHost: true,
    isSuperhost: false,
    updatedAt: timeNow,
    userID: guid(),
  }
  data.push(user);
}

let jsonData = JSON.stringify(data); 
fs.writeFile('./fixtures/user.json', jsonData);


// [{"username":"Bob","isHost":false,"isSuperhost":false,"updatedAt":"2017-12-15T07:22:52.709Z","userID":"2632ad1f-b777-45dc-93f7-d45491a481e8"}]

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}