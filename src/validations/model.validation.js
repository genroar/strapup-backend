const Joi = require('joi');


// Create Model
const createModel = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    active: Joi.boolean().required()
  }),
};

// Get Model
const getModels = {
  query: Joi.object().keys({
    name: Joi.string(),
    active: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};


// Get Model byid 

const getModelById = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};


// Update 
const updateModel = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
  }),
  body: Joi.object({
    name: Joi.string().required(),
    active: Joi.boolean().required()
  })
});

// Delete Model
const deleteModel = Joi.object({
  params: Joi.object({
    id: Joi.string().required()
  })
});


module.exports = {
  createModel,
  getModels,
  getModelById,
  updateModel,
  deleteModel
};


//joi documentation