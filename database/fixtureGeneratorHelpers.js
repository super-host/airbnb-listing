const moment = require('moment');

/**********************************************
GENERATE DATES INTO ARRAY
***********************************************/

function getDates(numSeedDays) {
  const dates = [];

  for (let j = 0; j < numSeedDays; j++) {
    dates.push(moment().subtract(j, 'd').format('YYYY-MM-DD'));
  }
  return dates;
}

/****************************************
GENERATE (fake) UUID - from stackoverflow
*****************************************/
function generateUuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

module.exports = {
  getDates: getDates,
  generateUuid: generateUuid,
}