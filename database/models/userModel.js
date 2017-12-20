module.exports = {
  fields: {
    username: 'varchar',
    userid: {
      type: 'uuid',
      default: { $db_function: 'uuid()' },
    },
    updated_at_short: 'varchar',
    updated_at: {
      type: 'timestamp',
      default: {$db_function: 'toTimestamp(now())'},
    },
    is_host: {
      type: 'boolean',
      default: false,
    },
    is_superhost: {
      type: 'boolean',
      default: false,
    },
  },
  key: [['userid'], 'updated_at_short'],
  clustering_order: { updated_at_short: 'desc' },
  indexes: ['is_superhost', 'updated_at', 'updated_at_short'],
};
