const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBrand = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    active: Joi.boolean().required(),
  }),
};

const getBrands = {
  query: Joi.object().keys({
    name: Joi.string(),
    active: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateBrand = {
  params: Joi.object().keys({
    brandId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      active: Joi.bool(),
    })
    .min(1),
};
module.exports = {
  createBrand,
  getBrands,
  updateBrand,
};

// joi documentation
