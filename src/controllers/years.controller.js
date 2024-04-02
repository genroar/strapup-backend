const httpStatus = require('http-status'); 
const modelService = require('../services/modal.service');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const yearService = require('../services/years.service')

const generateYears = (req, res) => {
  const { startYear, endYear } = req.query;
  const years = yearService.generateYears(Number(startYear), Number(endYear));
  res.json(years);
};

const getYears = (req, res) => {
  const years = yearService.generateYears(1970, new Date().getFullYear());
  res.json(years);
};

module.exports = {
  generateYears,
  getYears
};

