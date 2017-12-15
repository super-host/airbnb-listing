module.exports = {
  fields: {
    listingID: {
      type: 'uuid',
      default: { $db_function: 'uuid()' },
    },
    updatedAt: {
      type: 'timestamp',
      default: { $db_function: 'toTimestamp(now())' },
    },
    hostusername: 'varchar',
    title: 'varchar',
    description: 'varchar',
    location: 'varchar',
    price: 'float',
    maxguests: 'int',
    roomtype: 'varchar',
    accomodationtype: 'varchar',
    beds: 'int',
    bedrooms: 'int',
    bathrooms: 'int',
    overallrating: {
      type: 'float',
      default: 0,
    },
    availabilitypreference: {
      type: 'map',
      typeDef: '<date, boolean>',
    },
  },
  key: [['listingID'], 'hostusername'],
};

