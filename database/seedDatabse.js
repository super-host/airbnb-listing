const faker = require('faker');

const user = () => {
  for (var i = 0; i < 10; i++) {
    username: `${faker.name.lastName()}${faker.name.firstName()}${faker.random.number()}`,

    isHost: true,
    isSuperhost: true,

  }
  
}


/*
Seeing reviews table

    listingID: 'uuid',
    username: `${faker.name.lastName()}${faker.name.firstName()}${faker.random.number()}`,
    body: `${faker.lorem.sentence()}`,
    rating: Math.random() * 5,

*/

/*
Seeing listings table

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

