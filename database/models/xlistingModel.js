module.exports = {
  fields: {
    listingid: {
      type: 'uuid',
      default: { $db_function: 'uuid()' },
    },
    userid: 'uuid',
    updated_at_short: 'varchar',
    updated_at: {
      type: 'timestamp',
      default: { $db_function: 'toTimestamp(now())' },
    },
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
    blackOutDates: {
      type: 'set',
      typeDef: '<date>',
    },
  },
  key: [['listingid'], 'updated_at_short'],
  indexes: ['location', 'updated_at_short'],
};

