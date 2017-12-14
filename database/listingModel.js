// module.exports = {
//   fields: {
//     listingID: {
//       type: 'uuid',
//       default: { $db_function: 'uuid()' },
//     },
//     hostID: 'uuid',
//     title: 'varchar', 
//     description: 'varchar',
//     location: 'varchar',
//     price: 'float',
//     maxguests: 'int',
//     roomtype: 'varchar',
//     accomodationtype: 'varchar',
//     beds: 'int',
//     bedrooms: 'int',
//     bathrooms: 'int',
//     overallrating: {
//       type: 'float',
//       default: 0,
//     },
//     availabilitypreference: 'map<date, boolean>',
//   },
//   key: [['listingID'], 'updatedAt'],
//   clustering_order: { updatedAt: 'desc' },
//   table_name: 'listings',
//   options: {
//     timestamps: {
//       createdAt: 'createdAt',
//       updatedAt: 'updatedAt',
//     },
//   },
// };
