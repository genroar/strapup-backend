const Joi = require('joi');
const { objectId } = require('./custom.validation');


// Create Brand
const createBrand = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    active: Joi.boolean().required()
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
const deleteModel = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
  })
});

const updateBrand = {
  params: Joi.object().keys({
    brandId: Joi.required().custom(objectId),
const updateModel = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
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
  deleteModel,
  updateModel
};


//joi documentation