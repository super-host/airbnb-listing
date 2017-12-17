const moment = require('moment');

/**********************************************
GENERATE DATES INTO ARRAY
***********************************************/

function getPreviousDates(numSeedDays) {
  const dates = [];

  for (let i = 0; i < numSeedDays; i++) {
    dates.push(moment().subtract(i, 'd').format('YYYY-MM-DD'));
  }
  return dates;
}

function getDates(startDateString, endDateString) {
  const dates = [];
  const startDate = moment(startDateString);
  const endDate = moment(endDateString, "YYYY-MM-DD");
  const diff = endDate.diff(startDate, 'days');

  for (let j = 0; j < diff; j++) {
    dates.push(moment(startDateString).add(j, 'd').format('YYYY-MM-DD'));
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
  getPreviousDates: getPreviousDates,
  generateUuid: generateUuid,
}