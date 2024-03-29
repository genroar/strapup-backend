const mongoose = require('mongoose');
const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');


const language = (req, res, next) => {
  req.language = req.headers['language'] || 'en';
  next();
};



module.exports = language;
