const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, res, next) => {
  // Update the schema to include 'multipart/form-data' fields
  const validSchema = pick(schema, ['params', 'query', 'body', 'files']);
  // Pick relevant fields from the request object
  const object = pick(req, Object.keys(validSchema));
  
  // Compile and validate the schema
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  
  // Assign validated values to the request object
  Object.assign(req, value);
  return next();
};

module.exports = validate;
