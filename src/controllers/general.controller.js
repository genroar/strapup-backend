const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const enums = require('../utils/enums');
const getAllCountry = require('country-state-city').Country;
const translation = require('../static/translation.json')

const getConditions = catchAsync(async (req, res) => {
  const conditions = enums.conditions;
  const language = req.language;
  const responseData = {
    message: translation[language]['hello'],
    data: conditions,
    status: httpStatus.OK 
  };
  res.status(httpStatus.OK).json(responseData);
});

const getCaseSizes = catchAsync(async (req, res) => {
  const caseSizes = enums.caseSize;
  const language = req.language;
  const responseData = {
    message: translation[language]['hello'],
    data: caseSizes,
    status: httpStatus.OK 
  };
  res.status(httpStatus.OK).json(responseData);
});


const getCaseMaterial = catchAsync(async (req, res) => {
  const caseMaterial = enums.caseMaterial;
  const language = req.language;
  
  const responseData = {
    message: translation[language]['hello'],
    data: caseMaterial,
    status: httpStatus.OK 
  };
  res.status(httpStatus.OK).json(responseData);
});


const OriginalBoxPapers = catchAsync(async (req, res) => {
  const OriginalBoxPapers = enums.OriginalBoxPapers;
  
  const language = req.language;
  const responseData = {
    message: translation[language]['hello'],
    data: OriginalBoxPapers,
    status: httpStatus.OK 
  };
  res.status(httpStatus.OK).json(responseData);
});


const PriceType = catchAsync(async (req, res) => {
  const PriceType = enums.PriceType;
  
  const language = req.language;
  const responseData = {
    message: translation[language]['hello'],
    data: PriceType,
    status: httpStatus.OK 
  };
  res.status(httpStatus.OK).json(responseData);
});

const Currency = catchAsync(async (req, res) => {
  const Currency = enums.Currency;
  
  const responseData = {
    data: Currency,
    status: httpStatus.OK 
  };
  res.status(httpStatus.OK).json(responseData);
});


const getAllFlags = catchAsync(async (req, res) => {
  const flagsData = getAllCountry.getAllCountries(); 
  const language = req.language;
  const responseData = {
      message: translation[language]['hello'],
      data: flagsData,
      status: httpStatus.OK 
  };
  res.status(httpStatus.OK).json(responseData);
});




module.exports = {
  getConditions,
  getCaseSizes,
  getCaseMaterial,
  OriginalBoxPapers,
  PriceType,
  Currency,
  getAllFlags
};
