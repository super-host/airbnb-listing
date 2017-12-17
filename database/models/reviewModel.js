module.exports = {
  fields: {
    reviewID: {
      type: 'uuid',
      default: { $db_function: 'uuid()' },
    },
    updatedAt: {
      type: 'date',
      default: {$db_function: 'toDate(now())'},
    },
    createdAt: {
      type: 'timestamp',
      default: {'$db_function': 'toTimestamp(now())'},
    },
    listingID: 'uuid',
    userID: 'uuid',
    body: 'varchar',
    rating: 'float',
  },
  key: [['reviewID'], 'listingID'],
  indexes: ['listingID', 'updatedAt'],
};
