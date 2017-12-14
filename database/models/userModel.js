module.exports = {
  fields: {
    userID: {
      type: 'uuid',
      default: { $db_function: 'uuid()' },
    },
        stuff: 'varchar',
    // updatedAt: {
    //   type: 'timestamp',
    //   default: {'$db_function': 'toTimestamp(now())'},
    // },
    username: 'varchar',
    isHost: {
      type: 'boolean',
      default: false,
    },
    isSuperhost: {
      type: 'boolean',
      default: false,
    },

  },
  key: ['userID'],
  // key: [['userID'], 'updatedAt'],
  // clustering_order: { updatedAt: 'desc' },
  // table_name: 'users',
  // options: {
  //   timestamps: {
  //     createdAt: 'createdAt',
  //     updatedAt: 'updatedAt',
  //   },
  // },
};

// module.exports = {
//   fields: {
//     name: "text",
//     surname: "text",
//     age: "int",
//     created: "timestamp",
//   },
//   key: ["name"],
// }

