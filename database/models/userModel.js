module.exports = {
  fields: {
    username: 'varchar',
    userID: {
      type: 'uuid',
      default: { $db_function: 'uuid()' },
    },
    updatedAt: {
      type: 'timestamp',
      default: {'$db_function': 'toTimestamp(now())'},
    },
    isHost: {
      type: 'boolean',
      default: false,
    },
    isSuperhost: {
      type: 'boolean',
      default: false,
    },
  },
  key: [['username']],
};