module.exports = {
  fields: {
    reviewID: {
      type: 'uuid',
      default: { $db_function: 'uuid()' },
    },
    updatedAt: {
      type: 'timestamp',
      default: {'$db_function': 'toTimestamp(now())'},
    },
    createdAt: {
      type: 'timestamp',
      default: {'$db_function': 'toTimestamp(now())'},
    },
    listingID: 'uuid',
    username: 'varchar',
    body: 'varchar',
    rating: 'float',
  },
  key: [['reviewID'], 'listingID'],
};
