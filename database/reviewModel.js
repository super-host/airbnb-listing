// module.exports = {
//   fields: {
//     reviewID: {
//       type: 'uuid',
//       default: { $db_function: 'uuid()' },
//     },
//     body: 'varchar',
//     rating: 'float',
//   },
//   key: [['reviewID'], 'updatedAt'],
//   clustering_order: { updatedAt: 'desc' },
//   table_name: 'reviews',
//   options: {
//     timestamps: {
//       createdAt: 'createdAt',
//       updatedAt: 'updatedAt',
//     },
//   },
// };
