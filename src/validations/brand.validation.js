const Joi = require('joi');



const createBrand = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    active: Joi.boolean().required()
  }),
};


module.exports = {
  createBrand,
};


//joi documentation