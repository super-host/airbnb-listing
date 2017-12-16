const faker = require('faker');
const Promise = require('bluebird');
const models = require('./index.js');

const users = [];
const user = (n) => {
  for (var i = 0; i < n; i++) {
    var newperson = new models.instance.user({
      username: `${faker.name.lastName()}${faker.name.firstName()}${faker.random.number()}`,
      isHost: true,
      isSuperhost: true,
    });
    users.push(newperson);
  }

  const cbForPromise = (err, result) => {
    if (err) {
      throw err;
    } else {
      return result;
    }
  };

  return Promise.all(users.map((person) => {
    return Promise.fromCallback((cbForPromise) => {
      newperson.save(cbForPromise);
    });
  }))
}

module.exports = {
  user: user,
}

/*
Seeing reviews table
const fakeBody = faker.lorem.sentence();
const rating = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]

    listingID: 'uuid',
    username: `${faker.name.lastName()}${faker.name.firstName()}${faker.random.number()}`,
    body: fakeBody,
    rating: Math.random() * 5,

*/

/*
1.5M listings
Seeing listings table
const location = ['San Francisco', 'Los Angeles', 'Seattle', 'San Diego', 'Hong Kong', 'New York', 'Boston', 'Las Vegas', 'Toronto', 'Vancouver', 'London', 'Tokyo', 'Paris', 'Rome', 'Seoul', 'Taipei', 'Oslo', 'Stockholm', 'Copenhagen', 'Brussels', 'Amsterdam', '']
hostID: 4 listings

    listingID: 'uuid',
    updatedAt: {
      type: 'timestamp',
      default: { $db_function: 'toTimestamp(now())' },
    },
    hostusername: `${faker.name.lastName()}${faker.name.firstName()}${faker.random.number()}`,
    title: faker.lorem.words(),
    description: `${faker.lorem.sentence()}`,
    location: faker.address.city(),
    price: Math.random() * (300 - 50) + 50,
    maxguests: Math.floor(Math.random() * (6 - 1 + 1)) + 1,
    roomtype: 'entire place',
    accomodationtype: 'apartment',
    beds: Math.floor(Math.random() * (6 - 1 + 1)) + 1,
    bedrooms: Math.floor(Math.random() * (6 - 0 + 1)) + 0,
    bathrooms: Math.floor(Math.random() * (6 - 1 + 1)) + 1,
    overallrating: Math.random() * 5,
    availabilitypreference: {
      type: 'map',
      typeDef: '<date, boolean>',
    },
*/

// user 1M, review: 6m , listing: 3m
