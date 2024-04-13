const Joi = require('joi');

const submitOfferValidation = Joi.object({
  price: Joi.number().required().positive().precision(2), // Assuming price should be a positive number with 2 decimal places
  currency: Joi.string().required(),
  adId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(), // Assuming adId should be a valid MongoDB ObjectId
});

module.exports = { submitOfferValidation };
