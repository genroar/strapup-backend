const { Years } = require('../models/year.model');

const generateYears = (startYear, endYear) => {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return years;
};

module.exports = {
  generateYears
};
