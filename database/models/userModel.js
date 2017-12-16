module.exports = {
  fields: {
    username: 'varchar',
    userID: {
      type: 'uuid',
      default: { $db_function: 'uuid()' },
    },
    updatedAt: {
      type: 'date',
      default: {$db_function: 'toDate(now())'},
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
  key: [['userID'], 'updatedAt'],
  clustering_order: { updatedAt: 'desc' },
  indexes: ["isSuperhost"],
};
