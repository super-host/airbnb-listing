module.exports = {
  fields: {
    reviewid: {
      type: 'uuid',
      default: { $db_function: 'uuid()' },
    },
    updated_at: {
      type: 'date',
      default: {$db_function: 'toDate(now())'},
    },
    created_at: {
      type: 'timestamp',
      default: {'$db_function': 'toTimestamp(now())'},
    },
    listingid: 'uuid',
    userid: 'uuid',
    body: 'varchar',
    rating: 'float',
  },
  key: [['reviewid'], 'listingid'],
  indexes: ['listingid', 'updated_at'],
};
